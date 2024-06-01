import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header/Header';

const TournamentScheduler = () => {
  const location = useLocation();
  const { tournamentType, numTeams, teamNames, playDays } =
    location.state || {};

  if (!location.state) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-500 text-white p-4 rounded-md">
          No tournament data available. Please go back and fill in the details.
        </div>
      </div>
    );
  }

  const generateKnockoutSchedule = () => {
    const numMatches = numTeams / 2;
    return Array.from({ length: numMatches }, (_, i) => (
      <div
        key={i}
        className="flex items-center justify-between bg-gray-800 text-gray-300 border border-gray-600 rounded-md p-4 m-2"
      >
        <span>{teamNames[i * 2]}</span>
        <div className="bg-gray-700 h-10 w-10 mx-2 rounded-md flex items-center justify-center text-white">
          vs
        </div>
        <span>{teamNames[i * 2 + 1]}</span>
      </div>
    ));
  };

  const generateRoundRobinSchedule = () => {
    const matches = [];
    for (let i = 0; i < numTeams; i++) {
      for (let j = i + 1; j < numTeams; j++) {
        matches.push(
          <div
            key={`${i}-${j}`}
            className="flex items-center justify-between bg-gray-800 text-gray-300 border border-gray-600 rounded-md p-4 m-2"
          >
            <span>{teamNames[i]}</span>
            <div className="bg-gray-700 h-10 w-10 mx-2 rounded-md flex items-center justify-center text-white">
              vs
            </div>
            <span>{teamNames[j]}</span>
          </div>,
        );
      }
    }
    return matches;
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tournamentType === 'knockout'
            ? generateKnockoutSchedule()
            : generateRoundRobinSchedule()}
        </div>
      </div>
    </div>
  );
};

export default TournamentScheduler;
