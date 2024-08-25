import React, { useState } from 'react';
import Web3 from 'web3';

const Navbar = ({ setWeb3, setAccount }) => {
  const [balance, setBalance] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Initialize Web3
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        // Get account and balance
        const accounts = await web3Instance.eth.getAccounts();
        const account = accounts[0];
        setAccount(account);

        // Fetch balance
        const balanceInWei = await web3Instance.eth.getBalance(account);
        const balanceInEth = web3Instance.utils.fromWei(balanceInWei, 'ether');
        setBalance(balanceInEth);
      } catch (error) {
        console.error("User rejected connection request:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">🪙 COIN FLIP</div>
        <div className="hidden md:flex space-x-4 items-center">
          <button
            onClick={connectWallet}
            className={`px-4 py-2 rounded text-white font-semibold ${
              balance ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-700'
            }`}
          >
            {balance ? `Balance: ${balance} ETH` : 'Connect Wallet'}
          </button>
          <a href="#" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
            Contact
          </a>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 focus:outline-none"
          >
            {/* Menu icon */}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-2">
          <button
            onClick={connectWallet}
            className={`px-4 py-2 rounded text-white font-semibold ${
              balance ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-700'
            }`}
          >
            {balance ? `Balance: ${balance} ETH` : 'Connect Wallet'}
          </button>
          <a href="#" className="text-gray-300 hover:text-white">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
