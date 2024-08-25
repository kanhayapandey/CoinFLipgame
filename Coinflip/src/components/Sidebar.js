
import React, { useState } from 'react';

const Sidebar = () => {
  const [selectedGame, setSelectedGame] = useState('CoinFlip');

  const games = ['CoinFlip', 'Pancake Protectors', 'Axie Infinity'];

  return (
    <div className="h-screen bg-gray-900 text-white w-64 p-4 border-r border-gray-700">
      <h2 className="text-2xl font-semibold mb-6 text-blue-300">Games</h2>
      <ul className="space-y-2">
        {games.map((game) => (
          <li
            key={game}
            onClick={() => setSelectedGame(game)}
            className={`p-3 rounded-lg cursor-pointer transition-transform transform ${
              selectedGame === game
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-800 hover:bg-gray-700'
            } border border-transparent hover:border-blue-500`}
          >
            {game}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
