import { useState } from 'react';
import { budget } from '../../data/data';
import { iconsImgs } from '../../utils/images';

const BudgetContent = () => {
  const [budgetItems, setBudgetItems] = useState(budget);
  const [newBudget, setNewBudget] = useState({
    title: '',
    type: '',
    amount: ''
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBudget({
      ...newBudget,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBudgetItem = {
      id: Date.now(),
      title: newBudget.title,
      type: newBudget.type || null,
      amount: parseInt(newBudget.amount)
    };
    
    setBudgetItems([...budgetItems, newBudgetItem]);
    setNewBudget({ title: '', type: '', amount: '' });
    setShowForm(false);
  };

  return (
    <div className="page-content-holder">
      <h1 className="page-title">Budget Management</h1>
      
      <div className="full-width-container">
        <div className="flex-between">
          <h2 className="page-section-title">Current Budget</h2>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Budget'}
          </button>
        </div>
        
        {showForm && (
          <div className="page-section">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={newBudget.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select 
                  name="type"
                  value={newBudget.type}
                  onChange={handleChange}
                >
                  <option value="">Select a type</option>
                  <option value="Automated">Automated</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div className="form-group">
                <label>Amount ($)</label>
                <input 
                  type="number" 
                  name="amount"
                  value={newBudget.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">Save</button>
            </form>
          </div>
        )}
        
        <div className="page-section">
          <table className="page-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {budgetItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.type || 'Manual'}</td>
                  <td>$ {item.amount}</td>
                  <td>
                    <span className={`status-badge ${item.type === 'Automated' ? 'success' : 'warning'}`}>
                      {item.type === 'Automated' ? 'Active' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="page-section">
        <h2 className="page-section-title">Budget Analysis</h2>
        <div className="page-grid">
          <div className="page-grid-item">
            <h3>Total Budget</h3>
            <p className="lg-value">$ {budgetItems.reduce((acc, item) => acc + item.amount, 0)}</p>
          </div>
          <div className="page-grid-item">
            <h3>Automated Budget</h3>
            <p className="lg-value">$ {budgetItems.filter(item => item.type === 'Automated').reduce((acc, item) => acc + item.amount, 0)}</p>
          </div>
          <div className="page-grid-item">
            <h3>Manual Budget</h3>
            <p className="lg-value">$ {budgetItems.filter(item => item.type !== 'Automated').reduce((acc, item) => acc + item.amount, 0)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetContent; 