import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPokemon, clearData } from "../features/pokemon/pokemonSlice";
import { Link } from "react-router-dom";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import InfoToolTip from "../components/InfoToolTip/InfoToolTip";

const Home = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.pokemon);

  const [count, setCount] = useState(5);
  const isReady = !loading && data.length > 0 && !error;

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(151, Math.max(2, Number(e.target.value)));
    setCount(value);
  };

  return (
    <div className="min-h-screen bg-emerald-100 bg-[url('/emerald-bg.png')] bg-cover bg-center p-6 font-pixel">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-emerald-900 drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
          Pokémon Battle Royale
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-4 mb-10 bg-emerald-200 border-4 border-emerald-700 rounded-xl p-6 shadow-lg">
          <input
            type="number"
            min={2}
            max={151}
            value={count}
            onChange={handleCountChange}
            className="w-24 px-4 py-2 bg-lime-200 text-emerald-900 text-lg font-bold text-center rounded-lg border-4 border-emerald-900 shadow-[3px_3px_0_rgba(0,0,0,0.3)] focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          />

          <button
            onClick={() => dispatch(fetchPokemon(count))}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold rounded-lg border-4 border-emerald-900 shadow-[3px_3px_0_rgba(0,0,0,0.3)] transition"
          >
            Fetch {count} Pokémon
          </button>

          {isReady && (
            <>
              <button
                onClick={() => dispatch(clearData())}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white text-lg font-bold rounded-lg border-4 border-red-800 shadow-[3px_3px_0_rgba(0,0,0,0.3)] transition"
              >
                Clear
              </button>

              <Link to="/battle">
                <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold rounded-lg border-4 border-blue-900 shadow-[3px_3px_0_rgba(0,0,0,0.3)] transition">
                  Start Battle
                </button>
              </Link>
            </>
          )}
        </div>

        {loading && (
          <p className="text-xl font-semibold text-yellow-800 mb-4">
            ⚡ Loading Pokémon...
          </p>
        )}
        {error && (
          <p className="text-xl font-semibold text-red-700 mb-4">
            ❌ Error: {error}
          </p>
        )}
        {!loading && data.length === 0 && !error && (
          <p className="text-xl font-semibold text-emerald-800 mb-4">
            🔴⚪ Fetch some Pokémon to watch the Battle Royale unfold!
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-6">
          {data.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>

        <div className="flex flex-row items-center mb-4 mt-4 justify-center">
          <InfoToolTip
            message={<p>Fetch 151 Pokémon once for faster fetches later on!</p>}
            direction="top"
          />
          <p className=" text-xl text-gray-700 font-semi-bold ml-3">Slower Fetching?</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
