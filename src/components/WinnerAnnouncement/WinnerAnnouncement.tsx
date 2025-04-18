import React from "react";
import { FaCrown } from "react-icons/fa";

interface WinnerAnnouncementProps {
  winnerNames: string[];
}

const WinnerAnnouncement: React.FC<WinnerAnnouncementProps> = ({
  winnerNames,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4"> 
        {winnerNames.map((name, index) => (
          <div key={index} className="flex items-center">
            <span className="text-2xl text-yellow-500">
              <FaCrown />
            </span>
            <span className="font-semibold text-lg ml-2">{name}</span> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinnerAnnouncement;
