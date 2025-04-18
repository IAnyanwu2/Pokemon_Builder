import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddPokemon from './AddPokemon';
import EditPokemon from './EditPokemon';
import { supabase } from './supabaseClient';
import PokemonDetail from './PokemonDetail';
import axios from 'axios'; 
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokeSprites, setPokeSprites] = useState({});

  // Fetch Pokémon from Supabase
  const fetchPokemon = async () => {
    const { data } = await supabase
      .from('pokemon_team')
      .select()
      .order('created_at', { ascending: false });
    setPokemon(data);
    
    // Fetch sprites and types from PokeAPI for each Pokémon
    data.forEach(async (poke) => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke.name.toLowerCase()}`);
      setPokeSprites(prevState => ({
        ...prevState,
        [poke.id]: {
          sprite: response.data.sprites.front_default,
          type: response.data.types[0].type.name // Get first type
        }
      }));
    });
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon Team Builder</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddPokemon onAdd={fetchPokemon} />
              <ul className="space-y-2">
                {pokemon.map((poke) => (
                  <li key={poke.id} className="border p-2 rounded shadow-sm">
                    <Link to={`/detail/${poke.id}`} className="text-blue-600 hover:underline">
                      {poke.name} – Type: {poke.type}, Level: {poke.level}
                      {/* Display the Pokémon sprite here */}
                      {pokeSprites[poke.id] && (
                        <img
                          src={pokeSprites[poke.id].sprite}
                          alt={poke.name}
                          className="w-16 h-16 inline-block ml-2"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          }
        />
        <Route path="/edit/:id" element={<EditPokemon />} />
        <Route path="/detail/:id" element={<PokemonDetail />} />
      </Routes>
    </div>
  );
}

export default App;