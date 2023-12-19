
import React, { useState } from 'react';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [transactionAmount, setTransactionAmount] = useState(0);

  const handleDeposit = () => {
    const newBalance = balance + transactionAmount;
    setBalance(newBalance);
    addTransaction(Deposit: +${transactionAmount});
  };

  const handleWithdraw = () => {
    if (transactionAmount > balance) {
      alert('Insufficient funds');
      return;
    }

    const newBalance = balance - transactionAmount;
    setBalance(newBalance);
    addTransaction(Withdrawal: -${transactionAmount});
  };

  const addTransaction = (transaction) => {
    const newTransactionHistory = [...transactionHistory, transaction];
    setTransactionHistory(newTransactionHistory);
  };

  return (
    <div>
      <h2>Cryptocurrency Wallet</h2>
      <div>
        <strong>Balance: {balance} BTC</strong>
      </div>
      <div>
        <label>
          Transaction Amount:
          <input
            type="number"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <button onClick={handleDeposit}>Deposit</button>
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
      <div>
        <h3>Transaction History</h3>
        <ul>
          {transactionHistory.map((transaction, index) => (
            <li key={index}>{transaction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Wallet;