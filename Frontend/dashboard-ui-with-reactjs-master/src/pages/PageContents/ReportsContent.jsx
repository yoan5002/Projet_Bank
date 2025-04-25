import { useState } from 'react';
import { reportData, transactions, budget } from '../../data/data';
import { iconsImgs } from '../../utils/images';

const ReportsContent = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('income');

  // Simulated data for charts
  const monthlyData = [
    { month: 'Jan', income: 45000, expenses: 32000 },
    { month: 'Feb', income: 48000, expenses: 35000 },
    { month: 'Mar', income: 52000, expenses: 38000 },
    { month: 'Apr', income: 49000, expenses: 36000 },
    { month: 'May', income: 53000, expenses: 37000 },
    { month: 'Jun', income: 55000, expenses: 40000 }
  ];

  // Statistics calculations
  const totalIncome = monthlyData.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = monthlyData.reduce((sum, item) => sum + item.expenses, 0);
  const netIncome = totalIncome - totalExpenses;
  const savingsRate = Math.round((netIncome / totalIncome) * 100);

  // Expense categories
  const expenseCategories = [
    { name: 'Housing', amount: 12000, percentage: 30 },
    { name: 'Food', amount: 8000, percentage: 20 },
    { name: 'Transportation', amount: 6000, percentage: 15 },
    { name: 'Leisure', amount: 5000, percentage: 12.5 },
    { name: 'Health', amount: 4000, percentage: 10 },
    { name: 'Others', amount: 5000, percentage: 12.5 }
  ];

  // Simplified chart
  const renderChart = () => {
    const maxValue = Math.max(...monthlyData.map(d => Math.max(d.income, d.expenses)));
    
    return (
      <div className="chart-container">
        {monthlyData.map((data, index) => (
          <div key={index} className="chart-bar-group">
            <div className="chart-bar-label">{data.month}</div>
            <div className="chart-bars">
              <div 
                className="chart-bar income-bar" 
                style={{ height: `${(data.income / maxValue) * 200}px` }}
                title={`Income: ${data.income}€`}
              ></div>
              <div 
                className="chart-bar expense-bar" 
                style={{ height: `${(data.expenses / maxValue) * 200}px` }}
                title={`Expenses: ${data.expenses}€`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="page-content-holder">
      <h1 className="page-title">Financial Reports</h1>
      
      <div className="report-controls">
        <div className="period-selector">
          <button 
            className={`btn-filter ${selectedPeriod === 'month' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('month')}
          >
            Monthly
          </button>
          <button 
            className={`btn-filter ${selectedPeriod === 'quarter' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('quarter')}
          >
            Quarterly
          </button>
          <button 
            className={`btn-filter ${selectedPeriod === 'year' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('year')}
          >
            Yearly
          </button>
        </div>
        
        <div className="report-type-selector">
          <button 
            className={`btn-filter ${selectedReport === 'income' ? 'active' : ''}`}
            onClick={() => setSelectedReport('income')}
          >
            Income & Expenses
          </button>
          
        </div>
      </div>
      
      <div className="page-section">
        <div className="full-width-container">
          <h2 className="page-section-title">{selectedPeriod === 'month' ? 'Monthly' : selectedPeriod === 'quarter' ? 'Quarterly' : 'Annual'} Overview</h2>
          <div className="page-grid">
            <div className="page-grid-item">
              <h3>Total Income</h3>
              <p className="lg-value">€ {totalIncome.toLocaleString()}</p>
            </div>
            <div className="page-grid-item">
              <h3>Total Expenses</h3>
              <p className="lg-value">€ {totalExpenses.toLocaleString()}</p>
            </div>
            <div className="page-grid-item">
              <h3>Net Income</h3>
              <p className="lg-value">€ {netIncome.toLocaleString()}</p>
            </div>
            <div className="page-grid-item">
              <h3>Savings Rate</h3>
              <p className="lg-value">{savingsRate}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="page-section">
        <div className="full-width-container">
          <h2 className="page-section-title">Income & Expenses Analysis</h2>
          <div className="chart-wrapper">
            {renderChart()}
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color income-color"></div>
                <span>Income</span>
              </div>
              <div className="legend-item">
                <div className="legend-color expense-color"></div>
                <span>Expenses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="page-section">
        <div className="full-width-container">
          <h2 className="page-section-title">Expense Breakdown</h2>
          <div className="expenses-breakdown">
            {expenseCategories.map((category, index) => (
              <div key={index} className="expense-category">
                <div className="expense-category-header">
                  <span className="expense-category-name">{category.name}</span>
                  <span className="expense-category-amount">€ {category.amount.toLocaleString()}</span>
                </div>
                <div className="expense-category-bar">
                  <div 
                    className="expense-category-fill"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <div className="expense-category-percentage">{category.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="page-section">
        <div className="full-width-container">
          <h2 className="page-section-title">Recommendations</h2>
          <div className="tips-container">
            <div className="tip-item">
              <div className="tip-icon">
                <img src={iconsImgs.check} alt="Tip" />
              </div>
              <div className="tip-content">
                <h3>Increase your savings rate</h3>
                <p>Aim to save at least 20% of your income each month to reach your long-term financial goals.</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">
                <img src={iconsImgs.check} alt="Tip" />
              </div>
              <div className="tip-content">
                <h3>Reduce non-essential expenses</h3>
                <p>Analyze your leisure expenses and identify where you could save money without affecting your quality of life.</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">
                <img src={iconsImgs.check} alt="Tip" />
              </div>
              <div className="tip-content">
                <h3>Plan your major purchases</h3>
                <p>Spread your major purchases throughout the year to avoid overloading your budget in certain months.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsContent; 