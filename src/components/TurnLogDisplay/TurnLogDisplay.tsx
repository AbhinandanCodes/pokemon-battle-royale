import React from "react";
import { TurnLog } from "../../features/battle/types";

interface TurnLogDisplayProps {
  turnData: TurnLog | undefined;
}

const TurnLogDisplay: React.FC<TurnLogDisplayProps> = ({ turnData }) => {
  if (!turnData) return null;

  return (
    <div className="mt-10 bg-gray-100 p-4 rounded-lg max-w-2xl mx-auto shadow">
      <h2 className="text-lg font-semibold text-indigo-600 mb-2">
        Turn {turnData.turn}
      </h2>
      <ul className="list-disc list-inside space-y-1">
        {turnData.actions.map((action, index) => (
          <li key={index} className="text-sm text-gray-800">
            {action.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TurnLogDisplay;
