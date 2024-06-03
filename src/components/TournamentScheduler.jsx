import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import BookSingleTurf from './BookSingleTurf';
import Header from './Header/Header';

const TournamentScheduler = () => {
  const { id, tournamentid } = useParams();
  const location = useLocation();
  const { tournamentType, numTeams, teamNames, matchNumber, ratePerHour } =
    location.state || {};

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const generatedMatches =
      tournamentType === 'knockout'
        ? generateKnockoutSchedule()
        : generateRoundRobinSchedule();

    setMatches(generatedMatches);
  }, [tournamentType, numTeams, teamNames]);

  if (!location.state) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-500 text-white p-4 rounded-md">
          No tournament data available. Please go back and fill in the details.
        </div>
      </div>
    );
  }
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  shuffleArray(teamNames);

  const generateKnockoutSchedule = () => {
    const numMatches = Math.ceil(numTeams / 2);
    const matchArray = [];

    for (let i = 0; i < numMatches; i++) {
      matchArray.push(`${teamNames[i * 2]} vs ${teamNames[i * 2 + 1]}`);
    }

    return matchArray;
  };

  const generateRoundRobinSchedule = () => {
    const matchArray = [];

    for (let i = 0; i < numTeams; i++) {
      for (let j = i + 1; j < numTeams; j++) {
        matchArray.push(`${teamNames[i]} vs ${teamNames[j]}`);
      }
    }

    return matchArray;
  };

  const renderMatch = (match, i) => (
    <div
      key={i}
      className="flex items-center justify-between bg-gray-800 text-gray-300 border border-gray-600 rounded-lg p-6 m-4 shadow-lg"
    >
      <span className="font-semibold text-xl">{match.split(' vs ')[0]}</span>
      <div className="bg-gray-700 h-12 w-12 mx-4 rounded-full flex items-center justify-center text-white text-lg font-bold">
        vs
      </div>
      <span className="font-semibold text-xl">{match.split(' vs ')[1]}</span>
    </div>
  );

  const renderKnockoutMatches = () => {
    return matches.map((match, i) => renderMatch(match, i));
  };

  const renderRoundRobinMatches = () => {
    return matches.map((match, i) => renderMatch(match, i));
  };

  const renderGroupStageMatches = () => {
    return (
      <>
        {renderRoundRobinMatches()}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Semifinals</h3>
          <div className="flex flex-wrap">
            <div className=" p-2">
              {renderMatch('1st vs 4th', matches.length)}
            </div>
            <div className=" p-2">
              {renderMatch('2nd vs 3rd', matches.length + 1)}
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Finals</h3>
            {renderMatch(
              'Winner of Semifinal 1 vs Winner of Semifinal 2',
              matches.length + 2,
            )}
          </div>
        </div>
      </>
    );
  };

  const renderKnockoutStages = () => {
    if (numTeams === 4) {
      return (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Finals</h3>
          {renderMatch(
            'Winner of Match 1 vs Winner of Match 2',
            matches.length,
          )}
        </div>
      );
    } else if (numTeams === 8) {
      return (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Semifinals</h3>
          <div className="flex flex-wrap">
            <div className=" p-2">
              {renderMatch(
                'Winner of Match 1 vs Winner of Match 2',
                matches.length,
              )}
            </div>
            <div className=" p-2">
              {renderMatch(
                'Winner of Match 3 vs Winner of Match 4',
                matches.length + 1,
              )}
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Finals</h3>
            {renderMatch(
              'Winner of Semifinal 1 vs Winner of Semifinal 2',
              matches.length + 2,
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto flex mt-8">
        <div className="w-3/4 p-4">
          <h2 className="text-3xl font-bold mb-6">Tournament Schedule</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tournamentType === 'knockout' ? (
              <>
                {renderKnockoutMatches()}
                {renderKnockoutStages()}
              </>
            ) : (
              renderGroupStageMatches()
            )}
          </div>
        </div>
        <div className="w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-6">Book Tournament</h2>
          <p>You have to book {Math.ceil(matchNumber / 2)} slots</p>
          <BookSingleTurf
            turfId={id}
            tournament_id={tournamentid}
            numberofmatches={matchNumber}
            teams={teamNames}
            matches={matches}
            ratePerHour={ratePerHour}
          />
        </div>
      </div>
    </div>
  );
};

export default TournamentScheduler;
