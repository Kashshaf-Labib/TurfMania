import { Button, Label, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';

const TeamForm = ({ index, onChange }) => (
  <div className="mb-4">
    <Label
      htmlFor={`team-${index}`}
      value={`Team ${index + 1}`}
      className="text-gray-200"
    />
    <TextInput
      id={`team-${index}`}
      placeholder={`Enter name for Team ${index + 1}`}
      required
      className="mt-1 bg-gray-700 text-gray-200"
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

  const handleSubmit = event => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-md bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="font-serif text-4xl font-bold text-white mb-8">
          Sports Schedule Maker
        </h1>
        <div className="mb-4">
          <Label
            htmlFor="teams"
            value="Number of teams"
            className="text-gray-200"
          />
          <Select
            id="teams"
            value={numTeams}
            onChange={handleNumTeamsChange}
            required
            className="mt-1 bg-gray-700 text-gray-200"
          >
            {[2, 4, 8, 16, 32].map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
        <form onSubmit={handleSubmit}>
          {teamNames.map((team, index) => (
            <TeamForm
              key={index}
              index={index}
              onChange={name => handleTeamNameChange(index, name)}
            />
          ))}
          <div className="mb-4">
            <Label
              htmlFor="playDays"
              value="Number of play days"
              className="text-gray-200"
            />
            <TextInput
              id="playDays"
              placeholder="Enter number of play days"
              required
              className="mt-1 bg-gray-700 text-gray-200"
              onChange={handlePlayDaysChange}
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            >
              Generate Schedule
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tournament;
