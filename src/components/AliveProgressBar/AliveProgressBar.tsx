import React from "react";

interface AliveProgressBarProps {
  aliveCount: number;
  totalCount: number;
}

const AliveProgressBar: React.FC<AliveProgressBarProps> = ({
  aliveCount,
  totalCount,
}) => {
  const percentage = (aliveCount / totalCount) * 100;

  return (
    <div className="flex flex-col justify-center bg-blue-500 text-white font-bold rounded-lg border-4 border-emerald-900 px-4 py-2 h-full w-48 font-pixel">
      <div className="text-sm text-left w-full mb-1 drop-shadow-[1px_1px_0_rgba(0,0,0,0.3)]">
        {aliveCount} / {totalCount} Alive
      </div>
      <div className="w-full h-3 bg-blue-300 rounded-full overflow-hidden border-2 border-blue-700 shadow-inner">
        <div
          className="h-full bg-blue-100 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default AliveProgressBar;
