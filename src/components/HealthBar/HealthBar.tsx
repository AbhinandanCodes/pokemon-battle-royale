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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHp]);

  const healthPercent = Math.max((currentHpState / maxHp) * 100, 0);

  let barColor = "bg-green-500";
  if (healthPercent < 50) barColor = "bg-yellow-400";
  if (healthPercent < 25) barColor = "bg-red-500";

  return (
    <div className="w-full px-4 mb-2">
      <div className="text-sm font-bold mb-1 capitalize">{name}</div>
      <div className="w-full h-5 bg-gray-300 rounded-md overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-500 ease-in-out`}
          style={{ width: `${healthPercent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default HealthBar;
