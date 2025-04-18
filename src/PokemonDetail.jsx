import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import axios from 'axios';

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [pokeSprites, setPokeSprites] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      // Fetch Pokémon from Supabase by ID
      const { data, error } = await supabase
        .from('pokemon_team')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        setError('Error fetching Pokémon');
        return;
      }

      setPokemon(data);

      // Fetch Pokémon sprite and type from PokeAPI
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${data.name.toLowerCase()}`);
        setPokeSprites({
          sprite: response.data.sprites.front_default,
          type: response.data.types[0].type.name, // Get first type
        });
      } catch (e) {
        setError('Pokémon not found in PokeAPI.');
      }
    };

    fetchPokemon();
  }, [id]);

  // Handle the case where the Pokémon or sprite is not found
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!pokemon || !pokeSprites) return <p className="p-4">Loading Pokémon details...</p>;

  // Function to delete Pokémon
  const handleDelete = async () => {
    const { error } = await supabase
      .from('pokemon_team')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error deleting Pokémon');
      return;
    }

    // Navigate back to the main page after deletion
    navigate('/');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{pokemon.name}</h2>
      {/* Display Pokémon sprite */}
      <img
        src={pokeSprites.sprite}
        alt={pokemon.name}
        className="w-32 h-32 mb-4"
      />
      <p className="mb-1">Type: {pokeSprites.type}</p>
      <p className="mb-1">Level: {pokemon.level}</p>
      <p className="mb-4 text-sm text-gray-500">Created At: {new Date(pokemon.created_at).toLocaleString()}</p>

      <Link to={`/edit/${pokemon.id}`} className="text-blue-600 underline mr-4">
        Edit Pokémon
      </Link>
      <button
        onClick={handleDelete}
        className="text-red-600 underline"
      >
        Delete Pokémon
      </button>

      <Link to="/" className="text-gray-600 underline">
        Back to Team
      </Link>
    </div>
  );
}

export default PokemonDetail;