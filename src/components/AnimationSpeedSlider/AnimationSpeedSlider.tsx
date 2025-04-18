type Props = {
  speedFactor: number;
  setSpeedFactor: (speed: number) => void;
};

const AnimationSpeedSlider = ({ speedFactor, setSpeedFactor }: Props) => {
  return (
      <div className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold rounded-lg border-4 border-emerald-900 px-4 py-2 h-full">
        <span role="img" aria-label="slow">
          ⚡
        </span>
        <input
          id="speedSlider"
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={speedFactor}
          onChange={(e) => setSpeedFactor(Number(e.target.value))}
          className="w-32 bg-emerald-500 rounded-lg accent-yellow-400"
        />
        <span role="img" aria-label="fast">
          🐢
        </span>
      </div>

  );
};

export default AnimationSpeedSlider;
