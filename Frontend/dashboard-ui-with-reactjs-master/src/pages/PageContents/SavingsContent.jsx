import { useState } from 'react';
import { iconsImgs } from '../../utils/images';

const initialGoals = [
  {
    id: 1,
    title: "Emergency Fund",
    currentAmount: 8500,
    targetAmount: 15000,
    deadline: "2024-12-31",
    priority: "High",
    category: "Security"
  },
  {
    id: 2,
    title: "Summer Vacation",
    currentAmount: 3200,
    targetAmount: 5000,
    deadline: "2024-06-15",
    priority: "Medium",
    category: "Leisure"
  },
  {
    id: 3,
    title: "New Vehicle",
    currentAmount: 12000,
    targetAmount: 25000,
    deadline: "2025-03-01",
    priority: "Low",
    category: "Transportation"
  }
];

const SavingsContent = () => {
  const [savingsGoals, setSavingsGoals] = useState(initialGoals);
  const [newSavingsGoal, setNewSavingsGoal] = useState({
    title: '',
    currentAmount: '',
    targetAmount: '',
    deadline: '',
    priority: '',
    category: ''
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSavingsGoal({
      ...newSavingsGoal,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savingsGoal = {
      id: Date.now(),
      title: newSavingsGoal.title,
      currentAmount: parseFloat(newSavingsGoal.currentAmount),
      targetAmount: parseFloat(newSavingsGoal.targetAmount),
      deadline: newSavingsGoal.deadline,
      priority: newSavingsGoal.priority,
      category: newSavingsGoal.category
    };
    
    setSavingsGoals([...savingsGoals, savingsGoal]);
    setNewSavingsGoal({ title: '', currentAmount: '', targetAmount: '', deadline: '', priority: '', category: '' });
    setShowForm(false);
  };

  const handleContribution = (id, amount) => {
    setSavingsGoals(savingsGoals.map(goal => {
      if (goal.id === id) {
        const newAmount = goal.currentAmount + parseFloat(amount);
        return {
          ...goal,
          currentAmount: newAmount > goal.targetAmount ? goal.targetAmount : newAmount
        };
      }
      return goal;
    }));
  };

  // Function to calculate progress percentage
  const calculateProgress = (current, target) => {
    return Math.round((current / target) * 100);
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    }).format(date);
  };

  // Function to calculate monthly amount needed
  const calculateMonthlyAmount = (goal) => {
    const today = new Date();
    const deadline = new Date(goal.deadline);
    const monthsLeft = (deadline.getFullYear() - today.getFullYear()) * 12 + 
                       (deadline.getMonth() - today.getMonth());
    
    if (monthsLeft <= 0) return "Date passed";
    
    const amountLeft = goal.targetAmount - goal.currentAmount;
    return (amountLeft / monthsLeft).toFixed(2);
  };

  return (
    <div className="page-content-holder">
      <h1 className="page-title">Savings Management</h1>
      
      <div className="page-section">
        <div className="full-width-container">
          <div className="flex-between">
            <h2 className="page-section-title">Savings Goals</h2>
            <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel' : 'Add Goal'}
            </button>
          </div>
          
          {showForm && (
            <div className="page-section">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Goal Name</label>
                  <input 
                    type="text" 
                    name="title"
                    value={newSavingsGoal.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Target Amount ($)</label>
                  <input 
                    type="number" 
                    name="targetAmount"
                    value={newSavingsGoal.targetAmount}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Current Savings ($)</label>
                  <input 
                    type="number" 
                    name="currentAmount"
                    value={newSavingsGoal.currentAmount}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Target Date</label>
                  <input 
                    type="date" 
                    name="deadline"
                    value={newSavingsGoal.deadline}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select 
                    name="priority"
                    value={newSavingsGoal.priority}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    name="category"
                    value={newSavingsGoal.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Home">Home</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Travel">Travel</option>
                    <option value="Education">Education</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Retirement">Retirement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary">Save</button>
              </form>
            </div>
          )}
          
          <div className="page-section monthly-overview-grid">
            {savingsGoals.map((goal) => {
              const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
              return (
                <div 
                  key={goal.id} 
                  className={`overview-card ${selectedGoal && selectedGoal.id === goal.id ? 'selected' : ''}`}
                  onClick={() => setSelectedGoal(goal)}
                >
                  <div className="overview-title">
                    {goal.title}
                  </div>
                  <div className="overview-value">
                    ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">{progress}% achieved</div>
                  <div className="overview-details">
                    <div className="overview-detail">
                      <span>Priority: {goal.priority}</span>
                    </div>
                    <div className="overview-detail">
                      <span>Deadline: {formatDate(goal.deadline)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {selectedGoal && (
        <div className="page-section">
          <div className="full-width-container">
            <h2 className="page-section-title">Details: {selectedGoal.title}</h2>
            <div className="savings-goal-details-grid">
              <div className="savings-detail-card">
                <h3>Current Savings</h3>
                <p className="lg-value">${selectedGoal.currentAmount.toLocaleString()}</p>
              </div>
              <div className="savings-detail-card">
                <h3>Remaining Amount</h3>
                <p className="lg-value">${(selectedGoal.targetAmount - selectedGoal.currentAmount).toLocaleString()}</p>
              </div>
              <div className="savings-detail-card">
                <h3>Recommended Monthly Amount</h3>
                <p className="lg-value">${calculateMonthlyAmount(selectedGoal)}</p>
              </div>
              <div className="savings-detail-card">
                <h3>Progress</h3>
                <p className="lg-value">{calculateProgress(selectedGoal.currentAmount, selectedGoal.targetAmount)}%</p>
              </div>
            </div>
            
            <div className="contribution-section">
              <h3>Add a contribution</h3>
              <div className="contribution-form">
                <input 
                  type="number" 
                  placeholder="Amount ($)"
                  id="contributionAmount"
                />
                <button 
                  className="btn-primary"
                  onClick={() => {
                    const amount = document.getElementById('contributionAmount').value;
                    if (amount && parseFloat(amount) > 0) {
                      handleContribution(selectedGoal.id, amount);
                      document.getElementById('contributionAmount').value = '';
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="page-section">
        <div className="full-width-container">
          <h2 className="page-section-title">Savings Tips</h2>
          <div className="tips-container">
            <div className="tip-item">
              <div className="tip-icon">
                <img src={iconsImgs.check} alt="Tip" />
              </div>
              <div className="tip-content">
                <h3>Automate Your Savings</h3>
                <p>Set up automatic transfers to your savings account on payday to ensure consistent saving.</p>
              </div>
            </div>
            
            <div className="tip-item">
              <div className="tip-icon">
                <img src={iconsImgs.check} alt="Tip" />
              </div>
              <div className="tip-content">
                <h3>Use the 50/30/20 Rule</h3>
                <p>Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.</p>
              </div>
            </div>
            
            <div className="tip-item">
              <div className="tip-icon">
                <img src={iconsImgs.check} alt="Tip" />
              </div>
              <div className="tip-content">
                <h3>Save Windfalls</h3>
                <p>When you receive unexpected money, such as tax refunds or bonuses, save at least half of it.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsContent; 