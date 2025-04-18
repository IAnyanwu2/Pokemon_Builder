import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

export default function EditPokemon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const { data } = await supabase.from('pokemon_team').select().eq('id', id).single();
      setPokemon(data);
    };
    fetchPokemon();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('pokemon_team')
      .update({ name: pokemon.name, type: pokemon.type, level: pokemon.level })
      .eq('id', id);
    if (!error) navigate('/');
  };

  const handleDelete = async () => {
    const { error } = await supabase.from('pokemon_team').delete().eq('id', id);
    if (!error) navigate('/');
  };

  if (!pokemon) return <p>Loading...</p>;

  return (
    <form onSubmit={handleUpdate} className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Edit Pokémon</h2>
      <input
        className="block w-full mb-2 p-2 border rounded"
        value={pokemon.name}
        onChange={(e) => setPokemon({ ...pokemon, name: e.target.value })}
        required
      />
      <input
        className="block w-full mb-2 p-2 border rounded"
        value={pokemon.type}
        onChange={(e) => setPokemon({ ...pokemon, type: e.target.value })}
        required
      />
      <input
        type="number"
        className="block w-full mb-4 p-2 border rounded"
        value={pokemon.level}
        onChange={(e) => setPokemon({ ...pokemon, level: parseInt(e.target.value) })}
        required
      />
      <div className="flex justify-between">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Save Changes
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </form>
  );
}