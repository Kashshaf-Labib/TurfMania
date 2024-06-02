import { Button, Label, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header/Header';

const user = localStorage.getItem('user');
const customerId = JSON.parse(user);

const TeamForm = ({ index, onChange }) => (
  <div className="mb-6">
    <Label
      htmlFor={`team-${index}`}
      value={`Team ${index + 1}`}
      className="text-gray-300"
    />
    <TextInput
      id={`team-${index}`}
      placeholder={`Enter name for Team ${index + 1}`}
      required
      className="mt-2 bg-gray-800 text-gray-300 border border-gray-600 rounded-md"
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

const Tournament = () => {
  const [numTeams, setNumTeams] = useState(2);
  const [teamNames, setTeamNames] = useState(
    Array.from({ length: numTeams }, (_, i) => `Team ${i + 1}`),
  );
  const [playDays, setPlayDays] = useState('');
  const [tournamentType, setTournamentType] = useState('knockout');
  const navigate = useNavigate();
  const { id: turfId } = useParams();

  const handleNumTeamsChange = event => {
    const newNumTeams = parseInt(event.target.value, 10);
    setNumTeams(newNumTeams);
    setTeamNames(
      Array.from(
        { length: newNumTeams },
        (_, i) => teamNames[i] || `Team ${i + 1}`,
      ),
    );
  };

  const handleTeamNameChange = (index, name) => {
    const newTeamNames = [...teamNames];
    newTeamNames[index] = name;
    setTeamNames(newTeamNames);
  };

  const handlePlayDaysChange = event => {
    setPlayDays(event.target.value);
  };

  const handleTournamentTypeChange = event => {
    setTournamentType(event.target.value);
    if (event.target.value === 'group') {
      setNumTeams(5); // Default to 5 teams for group stage
      setTeamNames(
        Array.from({ length: 5 }, (_, i) => teamNames[i] || `Team ${i + 1}`),
      );
    } else {
      setNumTeams(2); // Default to 2 teams for knockout stage
      setTeamNames(
        Array.from({ length: 2 }, (_, i) => teamNames[i] || `Team ${i + 1}`),
      );
    }
  };

  const calculateMatchNumber = () => {
    if (tournamentType === 'knockout') {
      let n = numTeams;
      let matches = 0;
      while (n > 1) {
        matches += Math.floor(n / 2);
        n = Math.ceil(n / 2);
      }
      return matches;
    } else if (tournamentType === 'group') {
      return (numTeams * (numTeams - 1)) / 2 + 3;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const matchNumber = calculateMatchNumber();
    console.log('Match number:', matchNumber); // Debugging line

    try {
      const response = await fetch('http://localhost:3001/tournaments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          turf_id: turfId,
          creator_id: customerId, // Ensure correct customer ID
          matchnumber: matchNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Tournament created:', data);

      navigate(`TournamentSchedular/${data._id}`, {
        state: {
          matchNumber,
          tournamentType,
          numTeams,
          teamNames,
          playDays,
        },
      });
    } catch (error) {
      console.error('Error creating tournament:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-900 min-h-screen flex justify-center items-center">
        <div className="flex flex-row max-w-4xl w-full bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="w-1/2 mr-4">
            <h1 className="font-serif text-4xl font-bold text-white mb-8 text-center">
              Sports Schedule Maker
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <Label
                  htmlFor="tournamentType"
                  value="Tournament Type"
                  className="text-gray-300"
                />
                <Select
                  id="tournamentType"
                  value={tournamentType}
                  onChange={handleTournamentTypeChange}
                  required
                  className="mt-2 bg-gray-800 text-gray-300 border border-gray-600 rounded-md"
                >
                  <option value="knockout">Knockout</option>
                  <option value="group">Group Stage</option>
                </Select>
              </div>
              <div className="mb-6">
                <Label
                  htmlFor="teams"
                  value="Number of teams"
                  className="text-gray-300"
                />
                <Select
                  id="teams"
                  value={numTeams}
                  onChange={handleNumTeamsChange}
                  required
                  className="mt-2 bg-gray-800 text-gray-300 border border-gray-600 rounded-md"
                >
                  {tournamentType === 'group'
                    ? Array.from({ length: 28 }, (_, i) => i + 5).map(
                        option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ),
                      )
                    : [2, 4, 8, 16, 32].map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                </Select>
              </div>
              {teamNames.map((team, index) => (
                <TeamForm
                  key={index}
                  index={index}
                  onChange={name => handleTeamNameChange(index, name)}
                />
              ))}

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Generate Schedule
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tournament;
