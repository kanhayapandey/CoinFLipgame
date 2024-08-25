// src/components/CoinFlip.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const CoinFlip = ({ account }) => {
  const [betAmount, setBetAmount] = useState('');
  const [side, setSide] = useState('');
  const [result, setResult] = useState('');

  const flipCoin = () => Math.random() < 0.5;

  const handleBet = async (selectedSide) => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    setSide(selectedSide);

    const outcome = flipCoin() ? 'heads' : 'tails';
    if (outcome === selectedSide) {
      setResult(`You win! It was ${outcome}.`);
    } else {
      setResult(`You lose! It was ${outcome}.`);
    }
  };

  return (
    <div>
      <TextField
        label="Bet Amount (ETH)"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
        variant="outlined"
      />
      <div>
        <Button variant="contained" color="primary" onClick={() => handleBet('heads')}>
          Heads
        </Button>
        <Button variant="contained" color="secondary" onClick={() => handleBet('tails')}>
          Tails
        </Button>
      </div>
      <div>{result}</div>
    </div>
  );
};

export default CoinFlip;
