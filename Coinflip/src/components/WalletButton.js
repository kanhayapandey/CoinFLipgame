// src/components/WalletButton.js
import React from 'react';
import Button from '@mui/material/Button';

const WalletButton = ({ onAccountChange }) => {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        onAccountChange(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask not detected!");
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={connectWallet}>
      Connect Wallet
    </Button>
  );
};

export default WalletButton;
