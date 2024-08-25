import React from 'react';
import '../Coin.css'; 
const Coin = ({ spinning }) => {
  return (
    <div className={`coin ${spinning ? 'spin' : ''}`}>
      <div className="heads">🪙</div>
      <div className="tails">🪙</div>
    </div>
  );
};

export default Coin;