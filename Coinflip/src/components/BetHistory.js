
import React from 'react';

const BetHistory = ({ betHistory }) => {
  return (
    <div className="mt-8 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Bet History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">Bet Amount (ETH)</th>
              <th className="p-3 border-b">Selected Side</th>
              <th className="p-3 border-b">Result</th>
              <th className="p-3 border-b">Outcome</th>
              <th className="p-3 border-b">Balance After Spin (ETH)</th>
            </tr>
          </thead>
          <tbody>
            {betHistory.map((bet) => (
              <tr
                key={bet.id}
                className={`${
                  bet.outcome === 'win' ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                <td className="p-3 border-b">{bet.id}</td>
                <td className="p-3 border-b">{bet.betAmount}</td>
                <td className="p-3 border-b">{bet.selectedSide}</td>
                <td className="p-3 border-b">{bet.result}</td>
                <td className="p-3 border-b capitalize">{bet.outcome}</td>
                <td className="p-3 border-b">{bet.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BetHistory;
