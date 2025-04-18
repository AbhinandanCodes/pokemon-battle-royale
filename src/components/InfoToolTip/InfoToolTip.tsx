import React, { useState, ReactNode } from "react";

interface InfoToolTipProps {
  message: ReactNode;
  direction?: "top" | "right" | "bottom" | "left";
}

const InfoToolTip: React.FC<InfoToolTipProps> = ({ message, direction = "top" }) => {
  const [isHovered, setIsHovered] = useState(false);

  const tooltipPositionClasses = {
    top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
    bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
    left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
  };

  return (
    <div className="relative">
      <button
        className="text-blue-600 hover:text-blue-800 text-xl focus:outline-none bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        i
      </button>

      {isHovered && (
        <div
          className={`absolute ${tooltipPositionClasses[direction]} text-xs text-gray-700 bg-white border border-gray-300 rounded px-3 py-2 shadow w-64`}
        >
          <div>{message}</div>
        </div>
      )}
    </div>
  );
};

export default InfoToolTip;
