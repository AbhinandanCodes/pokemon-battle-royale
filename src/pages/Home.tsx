import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPokemon, clearData } from "../features/pokemon/pokemonSlice";
import { Link } from "react-router-dom";
import PokemonCard from "../components/PokemonCard/PokemonCard";

const Home = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.pokemon);

  const [count, setCount] = useState(5);

  const isReady = data.length === count && !error;

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(151, Math.max(2, Number(e.target.value)));
    setCount(value);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Pokémon Home</h1>

        {/* Controls */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          <input
            type="number"
            min={2}
            max={151}
            value={count}
            onChange={handleCountChange}
            className="w-28 px-4 py-2 rounded-xl border border-gray-400 text-center text-lg font-bold text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          <button
            onClick={() => dispatch(fetchPokemon(count))}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            Fetch {count} Pokémon
          </button>

          <button
            onClick={() => dispatch(clearData())}
            className="bg-red-400 hover:bg-red-500 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            Clear
          </button>

          {isReady && (
            <Link to="/battle">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold transition">
                Start Battle
              </button>
            </Link>
          )}
        </div>

        {/* Status */}
        {loading && (
          <p className="text-lg text-gray-700 mb-4">Loading Pokémon...</p>
        )}
        {error && <p className="text-lg text-red-600 mb-4">Error: {error}</p>}

        {/* Pokémon Cards */}
        <div className="flex flex-wrap justify-center gap-4">
          {data.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
