type Props = {
    paused: boolean;
    togglePause: () => void;
  };
  
  const PauseButton = ({ paused, togglePause }: Props) => {
    return (
      <button
        onClick={togglePause}
        className="w-36 ml-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold rounded-lg border-4 border-emerald-900 shadow-[3px_3px_0_rgba(0,0,0,0.3)] transition h-full"
      >
        {paused ? "▶️ Resume" : "⏸ Pause"}
      </button>
    );
  };
  
  export default PauseButton;
  