import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function AddPokemon({ onAdd }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [level, setLevel] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('pokemon_team')
      .insert([{ name, type, level }]);

    if (error) {
      console.error('Error adding Pokémon:', error);
    } else {
      onAdd(); // Refresh the list in App.jsx
      setName('');
      setType('');
      setLevel(1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg max-w-sm mx-auto mb-4">
      <h2 className="text-lg font-bold mb-2">Add a Pokémon</h2>
      <input
        className="block w-full mb-2 p-2 border rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="block w-full mb-2 p-2 border rounded"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
      <input
        className="block w-full mb-2 p-2 border rounded"
        type="number"
        min="1"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Pokémon
      </button>
    </form>
  );
}