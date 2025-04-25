import { useState } from 'react';
import { iconsImgs } from '../../utils/images';

const initialLoans = [
  {
    id: 1,
    name: "Mortgage Loan",
    amount: 250000,
    interest: 2.5,
    term: 240,
    remaining: 180,
    type: "Mortgage"
  },
  {
    id: 2,
    name: "Auto Loan",
    amount: 25000,
    interest: 4.2,
    term: 60,
    remaining: 36,
    type: "Auto"
  },
  {
    id: 3,
    name: "Personal Loan",
    amount: 10000,
    interest: 7.8,
    term: 36,
    remaining: 24,
    type: "Personal"
  }
];

const LoansContent = () => {
  const [loans, setLoans] = useState(initialLoans);
  const [newLoan, setNewLoan] = useState({
    name: '',
    amount: '',
    interest: '',
    term: '',
    remaining: '',
    type: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLoan({
      ...newLoan,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loanItem = {
      id: Date.now(),
      name: newLoan.name,
      amount: parseFloat(newLoan.amount),
      interest: parseFloat(newLoan.interest),
      term: parseInt(newLoan.term),
      remaining: parseInt(newLoan.remaining),
      type: newLoan.type
    };
    
    setLoans([...loans, loanItem]);
    setNewLoan({ name: '', amount: '', interest: '', term: '', remaining: '', type: '' });
    setShowForm(false);
  };

  const selectLoan = (loan) => {
    setSelectedLoan(loan);
  };

  // Calculate monthly payment
  const calculateMonthlyPayment = (loan) => {
    const r = loan.interest / 100 / 12;
    const n = loan.term;
    const p = loan.amount;
    
    const monthlyPayment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return monthlyPayment.toFixed(2);
  };

  // Calculate total interest
  const calculateTotalInterest = (loan) => {
    const monthlyPayment = calculateMonthlyPayment(loan);
    const totalPayment = monthlyPayment * loan.term;
    const totalInterest = totalPayment - loan.amount;
    return totalInterest.toFixed(2);
  };

  return (
    <div className="page-content-holder">
      <h1 className="page-title">Loan Management</h1>
      
      <div className="page-section">
        <div className="full-width-container">
          <div className="flex-between">
            <h2 className="page-section-title">Your Active Loans</h2>
            <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel' : 'Add Loan'}
            </button>
          </div>
          
          {showForm && (
            <div className="page-section">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Loan Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={newLoan.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Amount ($)</label>
                  <input 
                    type="number" 
                    name="amount"
                    value={newLoan.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Interest Rate (%)</label>
                  <input 
                    type="number" 
                    name="interest"
                    step="0.01"
                    value={newLoan.interest}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Term (months)</label>
                  <input 
                    type="number" 
                    name="term"
                    value={newLoan.term}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Remaining Months</label>
                  <input 
                    type="number" 
                    name="remaining"
                    value={newLoan.remaining}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Loan Type</label>
                  <select 
                    name="type"
                    value={newLoan.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a type</option>
                    <option value="Mortgage">Mortgage</option>
                    <option value="Auto">Auto</option>
                    <option value="Personal">Personal</option>
                    <option value="Education">Education</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary">Save</button>
              </form>
            </div>
          )}
          
          <div className="page-section">
            <div className="monthly-overview-grid">
              {loans.map((loan) => (
                <div 
                  key={loan.id} 
                  className={`overview-card ${selectedLoan && selectedLoan.id === loan.id ? 'selected' : ''}`}
                  onClick={() => selectLoan(loan)}
                >
                  <div className="overview-title">
                    {loan.name}
                  </div>
                  <div className="overview-value">
                    $ {loan.amount.toLocaleString()}
                  </div>
                  <div className="overview-details">
                    <div className="overview-detail">
                      <span>Interest: {loan.interest}%</span>
                    </div>
                    <div className="overview-detail">
                      <span>Type: {loan.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {selectedLoan && (
        <div className="page-section">
          <div className="full-width-container">
            <h2 className="page-section-title">Loan Details: {selectedLoan.name}</h2>
            <div className="loan-details-grid">
              <div className="loan-detail-card">
                <h3>Monthly Payment</h3>
                <p className="lg-value">$ {calculateMonthlyPayment(selectedLoan)}</p>
              </div>
              <div className="loan-detail-card">
                <h3>Total Interest</h3>
                <p className="lg-value">$ {calculateTotalInterest(selectedLoan)}</p>
              </div>
              <div className="loan-detail-card">
                <h3>Remaining Months</h3>
                <p className="lg-value">{selectedLoan.remaining}</p>
              </div>
              <div className="loan-detail-card">
                <h3>Remaining Amount</h3>
                <p className="lg-value">$ {(selectedLoan.amount * selectedLoan.remaining / selectedLoan.term).toFixed(2)}</p>
              </div>
            </div>
            
            <div className="loan-actions">
              <button className="btn-primary">Simulate Early Repayment</button>
              <button className="btn-primary">Download Amortization</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="page-section">
        <div className="full-width-container">
          <h2 className="page-section-title">Repayment Tips</h2>
          <div className="tips-container">
            <div className="tip-item">
              <div className="tip-icon">
                <img src={iconsImgs.check} alt="Tip" />
              </div>
              <div className="tip-content">
                <h3>Early Repayments</h3>
                <p>Making early repayments can reduce the total duration of the loan and the amount of interest paid.</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">
                <img src={iconsImgs.check} alt="Tip" />
              </div>
              <div className="tip-content">
                <h3>Loan Refinancing</h3>
                <p>If interest rates have decreased, consider refinancing your loan for a more favorable rate.</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">
                <img src={iconsImgs.check} alt="Tip" />
              </div>
              <div className="tip-content">
                <h3>Biweekly Payments</h3>
                <p>Making biweekly payments instead of monthly can help you pay off your loan faster and save on interest.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoansContent; 