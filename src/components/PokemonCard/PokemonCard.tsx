import { Pokemon } from "../../features/pokemon/types";
import { typeColors } from "../../utils/colors/typeColors";
import { statColors } from "../../utils/colors/statColors";
import { GiPunchBlast, GiShield, GiMagicSwirl, GiSprint } from "react-icons/gi";
import { FaBolt, FaHeartbeat, FaDiceD6 } from "react-icons/fa";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  const { name, type, stat, move, sprite } = pokemon;

  const topColor = typeColors[type] || typeColors.default;
  const bottomColor = typeColors[move.type] || typeColors.default;

  const stats = [
    {
      label: "HP",
      value: stat.hp,
      icon: <FaHeartbeat />,
      color: statColors.hp,
    },
    {
      label: "ATK",
      value: stat.atk,
      icon: <GiPunchBlast />,
      color: statColors.atk,
    },
    {
      label: "DEF",
      value: stat.def,
      icon: <GiShield />,
      color: statColors.def,
    },
    {
      label: "SPATK",
      value: stat.spatk,
      icon: <GiMagicSwirl />,
      color: statColors.spatk,
    },
    {
      label: "SPDEF",
      value: stat.spdef,
      icon: <GiShield />,
      color: statColors.spdef,
    },
    {
      label: "SPD",
      value: stat.speed,
      icon: <GiSprint />,
      color: statColors.speed,
    },
  ];

  return (
    <div className="rounded-2xl shadow-xl overflow-hidden border-none w-[300px] transform transition-transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
      {/* Top Section */}
      <div
        style={{ backgroundColor: topColor }}
        className="p-4 text-white text-center"
      >
        <img
          src={sprite}
          alt={name}
          className="mx-auto w-24 h-24 transition-all duration-300 ease-in-out hover:scale-110"
        />
        <h2 className="text-xl font-bold capitalize">{name}</h2>
        <p className="capitalize text-sm">Type: {type}</p>
      </div>

      {/* Bottom Section */}
      <div style={{ backgroundColor: bottomColor }} className="p-4 text-white">
        <h3 className="text-lg font-semibold capitalize mb-2">{move.name}</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 bg-black bg-opacity-20 px-2 py-1 rounded">
            <FaBolt /> Power: {move.power}
          </div>
          <div className="flex items-center gap-2 bg-black bg-opacity-20 px-2 py-1 rounded">
            <FaHeartbeat /> PP: {move.pp}
          </div>
          <div className="flex items-center gap-2 bg-black bg-opacity-20 px-2 py-1 rounded">
            <FaDiceD6 /> Accuracy: {move.accuracy}
          </div>
          <div className="flex items-center gap-2 bg-black bg-opacity-20 px-2 py-1 rounded">
            <GiSprint /> Priority: {move.priority}
          </div>
        </div>

        <h4 className="mt-4 mb-1 font-semibold">Stats</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {stats.map((s, i) => (
            <div
              key={i}
              style={{ backgroundColor: s.color }}
              className="flex items-center gap-1 px-2 py-1 rounded text-black font-semibold"
            >
              {s.icon} {s.label}: {s.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
