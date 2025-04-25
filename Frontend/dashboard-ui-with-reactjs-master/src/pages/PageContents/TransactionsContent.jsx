import { useState } from 'react';
import { transactions } from '../../data/data';
import { personsImgs } from '../../utils/images';

const TransactionsContent = () => {
  const [transactionsList, setTransactionsList] = useState(transactions);
  const [newTransaction, setNewTransaction] = useState({
    name: '',
    date: '',
    amount: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransactionItem = {
      id: Date.now(),
      name: newTransaction.name,
      image: personsImgs.person_one,
      date: newTransaction.date,
      amount: parseInt(newTransaction.amount)
    };
    
    setTransactionsList([...transactionsList, newTransactionItem]);
    setNewTransaction({ name: '', date: '', amount: '' });
    setShowForm(false);
  };

  const filteredTransactions = () => {
    if (filter === 'all') return transactionsList;
    if (filter === 'high') return transactionsList.filter(t => t.amount > 25000);
    if (filter === 'low') return transactionsList.filter(t => t.amount <= 25000);
    return transactionsList;
  };

  return (
    <div className="page-content-holder">
      <h1 className="page-title">Transaction History</h1>
      
      <div className="full-width-container">
        <div className="flex-between">
          <div>
            <h2 className="page-section-title">Recent Transactions</h2>
            <div className="filter-options">
              <button 
                className={`btn-filter ${filter === 'all' ? 'active' : ''}`} 
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`btn-filter ${filter === 'high' ? 'active' : ''}`} 
                onClick={() => setFilter('high')}
              >
                High Amount
              </button>
              <button 
                className={`btn-filter ${filter === 'low' ? 'active' : ''}`} 
                onClick={() => setFilter('low')}
              >
                Low Amount
              </button>
            </div>
          </div>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'New Transaction'}
          </button>
        </div>
        
        {showForm && (
          <div className="page-section">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={newTransaction.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date (DD/MM/YY)</label>
                <input 
                  type="text" 
                  name="date"
                  value={newTransaction.date}
                  onChange={handleChange}
                  placeholder="23/04/25"
                  required
                />
              </div>
              <div className="form-group">
                <label>Amount ($)</label>
                <input 
                  type="number" 
                  name="amount"
                  value={newTransaction.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">Save</button>
            </form>
          </div>
        )}
        
        <div className="page-section transactions-list">
          {filteredTransactions().map((transaction) => (
            <div className="transaction-item" key={transaction.id}>
              <div className="transaction-info">
                <div className="transaction-avatar">
                  <img src={transaction.image} alt={transaction.name} />
                </div>
                <div className="transaction-details">
                  <h3 className="transaction-name">{transaction.name}</h3>
                  <p className="transaction-date">{transaction.date}</p>
                </div>
              </div>
              <div className="transaction-amount">
                $ {transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="page-section">
        <h2 className="page-section-title">Transaction Summary</h2>
        <div className="page-grid">
          <div className="page-grid-item">
            <h3>Total Transactions</h3>
            <p className="lg-value">$ {transactionsList.reduce((acc, t) => acc + t.amount, 0)}</p>
          </div>
          <div className="page-grid-item">
            <h3>Average per Transaction</h3>
            <p className="lg-value">$ {Math.round(transactionsList.reduce((acc, t) => acc + t.amount, 0) / transactionsList.length)}</p>
          </div>
          <div className="page-grid-item">
            <h3>Number of Transactions</h3>
            <p className="lg-value">{filteredTransactions().length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsContent; 