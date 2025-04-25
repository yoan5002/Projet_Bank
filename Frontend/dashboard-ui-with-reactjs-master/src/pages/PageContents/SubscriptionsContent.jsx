import { useState } from 'react';
import { subscriptions } from '../../data/data';
import { iconsImgs } from '../../utils/images';

const SubscriptionsContent = () => {
  const [subscriptionsList, setSubscriptionsList] = useState(subscriptions);
  const [newSubscription, setNewSubscription] = useState({
    title: '',
    due_date: '',
    amount: ''
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSubscription({
      ...newSubscription,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubscriptionItem = {
      id: Date.now(),
      title: newSubscription.title,
      due_date: newSubscription.due_date,
      amount: parseInt(newSubscription.amount)
    };
    
    setSubscriptionsList([...subscriptionsList, newSubscriptionItem]);
    setNewSubscription({ title: '', due_date: '', amount: '' });
    setShowForm(false);
  };

  // Function to calculate days left until due date
  const calculateDaysLeft = (dueDate) => {
    const [day, month, yearStr] = dueDate.split('/');
    const year = yearStr.length === 2 ? 2000 + parseInt(yearStr) : parseInt(yearStr);
  
    const dueDateTime = new Date(year, parseInt(month) - 1, parseInt(day));
    const today = new Date();
  
    // Remise à zéro de l'heure pour une comparaison de date uniquement
    today.setHours(0, 0, 0, 0);
  
    const timeDiff = dueDateTime - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
    return daysLeft;
  };
  

  return (
    <div className="page-content-holder">
      <h1 className="page-title">Subscriptions Management</h1>
      
      <div className="page-section">
        <div className="full-width-container">
          <div className="flex-between">
            <h2 className="page-section-title">Active Subscriptions</h2>
            <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel' : 'Add Subscription'}
            </button>
          </div>
          
          {showForm && (
            <div className="page-section">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Service</label>
                  <input 
                    type="text" 
                    name="title"
                    value={newSubscription.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Due Date (DD/MM/YY)</label>
                  <input 
                    type="text" 
                    name="due_date"
                    value={newSubscription.due_date}
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
                    value={newSubscription.amount}
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
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptionsList.map((subscription) => {
                  const daysLeft = calculateDaysLeft(subscription.due_date);
                  let statusClass = 'success';
                  let statusText = `${daysLeft} days`;
                  
                  if (daysLeft < 0) {
                    statusClass = 'danger';
                    statusText = 'Overdue';
                  } else if (daysLeft < 7) {
                    statusClass = 'warning';
                    statusText = `${daysLeft} days`;
                  }
                  
                  return (
                    <tr key={subscription.id}>
                      <td>{subscription.title}</td>
                      <td>{subscription.due_date}</td>
                      <td>$ {subscription.amount}</td>
                      <td>
                        <span className={`status-badge ${statusClass}`}>
                          {statusText}
                        </span>
                      </td>
                      <td>
                        {/* Actions */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="page-section">
        <h2 className="page-section-title">Subscriptions Analysis</h2>
        <div className="page-grid">
          <div className="page-grid-item">
            <h3>Total Monthly</h3>
            <p className="lg-value">$ {subscriptionsList.reduce((acc, item) => acc + item.amount, 0)}</p>
          </div>
          <div className="page-grid-item">
            <h3>Total Yearly</h3>
            <p className="lg-value">$ {subscriptionsList.reduce((acc, item) => acc + item.amount, 0) * 12}</p>
          </div>
          <div className="page-grid-item">
            <h3>Number of Subscriptions</h3>
            <p className="lg-value">{subscriptionsList.length}</p>
          </div>
        </div>
      </div>
      
      <div className="page-section">
        <div className="full-width-container">
          <h2 className="page-section-title">Optimization Tips</h2>
          <div className="tips-container">
            <div className="tip-item">
              <div className="tip-icon">
                <img src={iconsImgs.check} alt="Tip" />
              </div>
              <div className="tip-content">
                <h3>Regularly audit your subscriptions</h3>
                <p>Review your subscriptions quarterly to identify those you no longer use.</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">
                <img src={iconsImgs.check} alt="Tip" />
              </div>
              <div className="tip-content">
                <h3>Choose annual plans when possible</h3>
                <p>Annual subscriptions often offer discounts of up to 20% compared to monthly payments.</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">
                <img src={iconsImgs.check} alt="Tip" />
              </div>
              <div className="tip-content">
                <h3>Share family subscriptions</h3>
                <p>Many services offer family plans that are more cost-effective than individual subscriptions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsContent; 