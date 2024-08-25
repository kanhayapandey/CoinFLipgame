
import React, { useState, useEffect } from 'react';
import Coin from '../components/Coins';
import Sidebar from '../components/Sidebar';
import Navbar from "../components/navbar";
import BetHistory from '../components/BetHistory';

const HomePage = () => {
  const [selectedSide, setSelectedSide] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(1); 
  const [notification, setNotification] = useState('');
  const [betHistory, setBetHistory] = useState([]);

  useEffect(() => {
    if (web3 && account) {
      const fetchBalance = async () => {
        try {
          const balanceInWei = await web3.eth.getBalance(account);
          const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");
          setBalance(parseFloat(balanceInEth));
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      };
      fetchBalance();
    }
  }, [web3, account]);

  const handleSelection = (side) => {
    setSelectedSide(side);
  };

  const handleSpin = async () => {
    if (selectedSide) {
      if (!web3 || !account) {
        alert("Please connect your wallet first.");
        return;
      }

      try {
        const betAmount = 1; // The bet amount in ETH

        

        setSpinning(true);

        setTimeout(() => {
          setSpinning(false);

          // Simulate the spin result
          const result = Math.random() < 0.5 ? 'Head' : 'Tail';
          const outcome = result === selectedSide ? 'win' : 'lose';

          let newBalance;
          if (outcome === 'win') {
            // Add double the bet amount to the user's balance
            newBalance = balance + betAmount * 2;
            setNotification(`Congratulations! The coin landed on ${result}. You won! Your balance is now ${newBalance} ETH.`);
          } else {
            newBalance = balance - betAmount;
            setNotification(`The coin landed on ${result}. You lost. Your balance is now ${newBalance} ETH.`);
          }

          setBalance(newBalance);

          // Add to bet history
          setBetHistory([
            ...betHistory,
            {
              id: betHistory.length + 1,
              betAmount,
              selectedSide,
              result,
              outcome,
              balance: newBalance,
            }
          ]);

          console.log(`You selected: ${selectedSide}. Spin result: ${result}.`);
        }, 2000); // Spin duration
      } catch (error) {
        console.error("Transaction failed:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Please select Head or Tail before spinning.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setWeb3={setWeb3} setAccount={setAccount} />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-col items-center justify-center flex-1 bg-gray-100 relative">
          {notification && (
            <div className="notification absolute top-4 left-1/2 transform -translate-x-1/2 p-4 bg-blue-600 text-white rounded-lg shadow-lg">
              <p>{notification}</p>
            </div>
          )}
          <h1 className="text-4xl font-bold mb-8">CoinFlip</h1>
          <Coin spinning={spinning} />
          <div className="mt-8 space-x-4">
            <button
              onClick={() => handleSelection('Head')}
              className={`px-6 py-2 text-white font-semibold rounded ${
                selectedSide === 'Head' ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-700'
              }`}
            >
              Head
            </button>
            <button
              onClick={() => handleSelection('Tail')}
              className={`px-6 py-2 text-white font-semibold rounded ${
                selectedSide === 'Tail' ? 'bg-red-700' : 'bg-red-500 hover:bg-red-700'
              }`}
            >
              Tail
            </button>
          </div>
          <div className="mt-8">
            <button
              onClick={handleSpin}
              className="px-8 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-700"
            >
              Spin
            </button>
          </div>
          <div className="mt-8 text-xl font-bold">
            Balance: {balance} ETH
          </div>
          <BetHistory betHistory={betHistory} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
