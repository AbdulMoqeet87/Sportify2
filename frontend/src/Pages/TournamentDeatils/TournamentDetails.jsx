import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import NB from "../../components/Navbar";
import { useLocation } from 'react-router-dom';

const Tournament = () => {
  const { state } = useLocation();
  const g_id = `6631fe7f69bb61094ab8c3e6`;

  const [tournamentName, setTournamentName] = useState('');
  const [winningPrize, setWinningPrize] = useState('');
  const [posterPath, setPosterPath] = useState(null);
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [regStartingDate, setRegStartingDate] = useState('');
  const [regEndingDate, setRegEndingDate] = useState('');
  const [teamsCount, setTeamsCount] = useState('');

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setPosterPath(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('TournamentName', tournamentName);
    form.append('winningPrize', winningPrize);
    form.append('PosterPath', posterPath);
    form.append('startingDate', startingDate);
    form.append('endingDate', endingDate);
    form.append('RegStartingDate', regStartingDate);
    form.append('RegEndingDate', regEndingDate);
    form.append('teamsCount', teamsCount);

    try {
      console.log("form data", form);
      console.log("g_id", g_id);
      for (let pair of form.entries()) {
        if (pair[1] instanceof File) {
          console.log(pair[0] + ': ');
          console.log('  Name: ' + pair[1].name);
          console.log('  Size: ' + pair[1].size + ' bytes');
          console.log('  Type: ' + pair[1].type);
          console.log('  Last Modified: ' + new Date(pair[1].lastModified));
        } else {
          console.log(pair[0] + ': ' + pair[1]);
        }
      }

      await axios.post(
        `http://localhost:4000/GroundOwner/tournaments/${g_id}`,
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setTournamentName('');
      setWinningPrize('');
      setPosterPath(null);
      setStartingDate('');
      setEndingDate('');
      setRegStartingDate('');
      setRegEndingDate('');
      setTeamsCount('');
      navigate('/tournaments');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg_images_T min-h-screen flex items-center justify-center">
      <NB />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto mt-20">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Tournament Registration</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="TournamentName" className="block text-gray-700 text-sm font-bold mb-2">
              Tournament Name
            </label>
            <input
              type="text"
              id="TournamentName"
              name="TournamentName"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              placeholder="Enter tournament name"
              className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="winningPrize" className="block text-gray-700 text-sm font-bold mb-2">
              Winning Prize
            </label>
            <input
              type="number"
              id="winningPrize"
              name="winningPrize"
              value={winningPrize}
              onChange={(e) => setWinningPrize(e.target.value)}
              placeholder="Enter winning prize amount"
              className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="PosterPath" className="block text-gray-700 text-sm font-bold mb-2">
              Poster
            </label>
            <input
              type="file"
              id="PosterPath"
              name="PosterPath"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startingDate" className="block text-gray-700 text-sm font-bold mb-2">
              Starting Date
            </label>
            <input
              type="date"
              id="startingDate"
              name="startingDate"
              value={startingDate}
              onChange={(e) => setStartingDate(e.target.value)}
              className="w-full px-4 text-black py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endingDate" className="block text-gray-700 text-sm font-bold mb-2">
              Ending Date
            </label>
            <input
              type="date"
              id="endingDate"
              name="endingDate"
              value={endingDate}
              onChange={(e) => setEndingDate(e.target.value)}
              className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="RegStartingDate" className="block text-gray-700 text-sm font-bold mb-2">
              Registration Starting Date
            </label>
            <input
              type="date"
              id="RegStartingDate"
              name="RegStartingDate"
              value={regStartingDate}
              onChange={(e) => setRegStartingDate(e.target.value)}
              className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="RegEndingDate" className="block text-gray-700 text-sm font-bold mb-2">
              Registration Ending Date
            </label>
            <input
              type="date"
              id="RegEndingDate"
              name="RegEndingDate"
              value={regEndingDate}
              onChange={(e) => setRegEndingDate(e.target.value)}
              className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="teamsCount" className="block text-gray-700 text-sm font-bold mb-2">
              Teams Count
            </label>
            <input
              type="number"
              id="teamsCount"
              name="teamsCount"
              value={teamsCount}
              onChange={(e) => setTeamsCount(e.target.value)}
              placeholder="Enter number of teams"
              className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            Register Tournament
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tournament;
