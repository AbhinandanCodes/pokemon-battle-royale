import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import HealthBar from "../HealthBar/HealthBar";
import { BattlePokemon } from "../../features/battle/types";

interface BattleArenaProps {
  pokemons: BattlePokemon[];
}

const BattleArena: React.FC<BattleArenaProps> = ({ pokemons }) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.id}
          id={String(pokemon.id)}
          className="relative flex flex-col items-center w-[300px]"
        >
          <HealthBar
            currentHp={pokemon.currentHp}
            maxHp={pokemon.maxHp}
            name={pokemon.name}
          />

          <div className="relative">
            {pokemon.currentHp <= 0 && (
              <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rotate-[-20deg] bg-red-600 text-white px-4 py-2 font-extrabold text-2xl tracking-widest border-4 border-white drop-shadow-md pointer-events-none">
                FAINTED
              </div>
            )}

            <div
              className={`${
                pokemon.currentHp <= 0 ? "opacity-30 grayscale" : ""
              } transition-all duration-500`}
            >
              <PokemonCard pokemon={pokemon} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BattleArena;
