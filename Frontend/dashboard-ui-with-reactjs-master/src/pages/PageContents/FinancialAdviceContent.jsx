import { useState } from 'react';
import { iconsImgs } from '../../utils/images';

const FinancialAdviceContent = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Financial advice articles
  const adviceArticles = [
    {
      id: 1,
      title: "How to Create an Effective Budget",
      description: "Learn how to manage your finances with a budget that actually works for you.",
      category: "budget",
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      date: "03/15/2024"
    },
    {
      id: 2,
      title: "Savings Strategies for Beginners",
      description: "Start saving smartly with these simple but effective tips.",
      category: "savings",
      imageUrl: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      date: "04/02/2024"
    },
    {
      id: 3,
      title: "Understanding Investment Fundamentals",
      description: "Discover the basics of investing and how to grow your money.",
      category: "investment",
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 4,
      title: "Effective Debt Reduction",
      description: "Proven methods to free yourself from debt faster.",
      category: "debt",
      imageUrl: "https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      date: "04/08/2024"
    },
    {
      id: 5,
      title: "Planning for Retirement Now",
      description: "Why and how to start saving for retirement, regardless of your age.",
      category: "retirement",
      imageUrl: "https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      date: "03/25/2024"
    },
    {
      id: 6,
      title: "Protecting Your Family with the Right Insurance",
      description: "Comprehensive guide to different types of insurance and how to choose what's right for your situation.",
      category: "insurance",
      imageUrl: "https://images.unsplash.com/photo-1556740772-1a741367b93e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      date: "04/12/2024"
    }
  ];

  // Filter articles based on active category
  const filteredArticles = activeCategory === 'all' 
    ? adviceArticles 
    : adviceArticles.filter(article => article.category === activeCategory);

  // Quick financial tips
  const quickTips = [
    {
      id: 1,
      title: "Track Your Spending",
      description: "Record all your expenses for a month to identify where your money is going."
    },
    {
      id: 2,
      title: "The 50/30/20 Rule",
      description: "Allocate 50% of your income to needs, 30% to wants, and 20% to savings."
    },
    {
      id: 3,
      title: "Emergency Fund",
      description: "Save 3-6 months of expenses for unexpected situations."
    },
    {
      id: 4,
      title: "Invest Early",
      description: "The earlier you start investing, the more you benefit from compound interest."
    }
  ];

  // Advice categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'budget', name: 'Budget' },
    { id: 'savings', name: 'Savings' },
    { id: 'investment', name: 'Investment' },
    { id: 'debt', name: 'Debt' },
    { id: 'retirement', name: 'Retirement' },
    { id: 'insurance', name: 'Insurance' }
  ];

  return (
    <div className="page-content-holder">
      <h1 className="page-title">Financial Advice</h1>
      
      <div className="financial-advice-container">
        <aside className="financial-advice-sidebar">
          <div className="sidebar-section">
            <h2>Categories</h2>
            <ul className="category-list">
              {categories.map(category => (
                <li key={category.id}>
                  <button 
                    className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h2>Quick Tips</h2>
            <div className="quick-tips">
              {quickTips.map(tip => (
                <div key={tip.id} className="quick-tip">
                  <div className="tip-icon">
                    <img src={iconsImgs.check} alt="Tip" />
                  </div>
                  <div>
                    <h3>{tip.title}</h3>
                    <p>{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="sidebar-section">
            <h2>Need Personalized Help?</h2>
            <div className="advice-cta">
              <p>Our financial advisors are available to guide you toward your goals.</p>
              <button className="btn-primary">Schedule Appointment</button>
            </div>
          </div>
        </aside>
        
        <main className="financial-advice-content">
          <div className="monthly-overview-grid">
            {filteredArticles.map(article => (
              <div key={article.id} className="overview-card article-card">
                <div className="article-date">{article.date}</div>
                <div className="overview-title">
                  {article.title}
                </div>
                <div className="overview-value article-image-container">
                  <img src={article.imageUrl} alt={article.title} className="article-thumbnail" />
                </div>
                <div className="overview-details">
                  <div className="overview-detail article-description">
                    {article.description}
                  </div>
                  <button className="article-read-more">Read Article</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="featured-advice">
            <div className="featured-advice-header">
              <h2>Advice of the Month</h2>
            </div>
            <div className="featured-advice-content">
              <h3>How to Effectively Diversify Your Investments</h3>
              <p>Diversification is a key strategy to reduce risk and optimize returns. Learn how to spread your investments across different asset classes to create a balanced portfolio.</p>
              <p>A diversified portfolio typically includes a mix of stocks, bonds, real estate, and cash. This approach protects you against fluctuations in any specific market.</p>
              <div className="featured-advice-tips">
                <div className="featured-tip">
                  <h4>Asset Class Allocation</h4>
                  <p>Distribute your investments among stocks, bonds, real estate, and cash.</p>
                </div>
                <div className="featured-tip">
                  <h4>Geographic Diversification</h4>
                  <p>Invest in different global markets to reduce risks tied to specific regions.</p>
                </div>
                <div className="featured-tip">
                  <h4>Regular Rebalancing</h4>
                  <p>Periodically adjust your portfolio to maintain your target allocation.</p>
                </div>
              </div>
              <button className="btn-primary">Read Full Article</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FinancialAdviceContent; 