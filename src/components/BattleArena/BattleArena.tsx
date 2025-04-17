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
          className="flex flex-col items-center w-[300px]"
        >
          <HealthBar
            currentHp={pokemon.currentHp}
            maxHp={pokemon.maxHp}
            name={pokemon.name}
          />
          <div
            className={`${
              pokemon.currentHp <= 0 ? "opacity-30 grayscale" : ""
            } transition-all duration-500`}
          >
            <PokemonCard pokemon={pokemon} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BattleArena;
