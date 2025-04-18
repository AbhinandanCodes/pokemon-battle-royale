import React, { useEffect, useState } from "react";

interface HealthBarProps {
  currentHp: number;
  maxHp: number;
  name: string;
}

const HealthBar: React.FC<HealthBarProps> = ({ currentHp, maxHp, name }) => {
  const [currentHpState, setCurrentHpState] = useState(currentHp);

  useEffect(() => {
    if (currentHp !== currentHpState) {
      setCurrentHpState(currentHp);
    }
  }, [currentHp]);

  const healthPercent = Math.max((currentHpState / maxHp) * 100, 0);

  let barColor = "bg-green-500";
  if (healthPercent < 50) barColor = "bg-yellow-400";
  if (healthPercent < 25) barColor = "bg-red-500";

  return (
    <div className="w-full px-4 mb-4 font-pixel">
      <div className="text-sm text-emerald-900 font-bold mb-1 capitalize drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]">
        {name}
      </div>
      <div className="w-full h-5 bg-emerald-200 border-4 border-emerald-700 rounded-md shadow-inner overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-500 ease-in-out`}
          style={{ width: `${healthPercent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default HealthBar;
