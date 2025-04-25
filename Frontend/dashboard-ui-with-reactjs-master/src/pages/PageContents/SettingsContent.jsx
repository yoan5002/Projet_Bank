import { useState } from 'react';

const SettingsContent = () => {
  // States for settings
  const [activeTab, setActiveTab] = useState('appearance');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('english');
  const [notificationSettings, setNotificationSettings] = useState({
    email: true, push: true, sms: false, transactions: true, security: true, marketing: false, budget: true
  });
  const [displayPreferences, setDisplayPreferences] = useState({
    currency: 'usd', dateFormat: 'mm/dd/yyyy', startScreen: 'dashboard'
  });

  // Handle notification toggle changes
  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  // Handle display preferences changes
  const handleDisplayPreferenceChange = (e) => {
    const { name, value } = e.target;
    setDisplayPreferences({
      ...displayPreferences,
      [name]: value
    });
  };

  return (
    <div className="page-content-holder">
      <h1 className="page-title">Settings</h1>
      
      <div className="settings-tabs">
        <button 
          className={`settings-tab ${activeTab === 'appearance' ? 'active' : ''}`}
          onClick={() => setActiveTab('appearance')}
        >
          Appearance
        </button>
        <button 
          className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button 
          className={`settings-tab ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          Preferences
        </button>
        <button 
          className={`settings-tab ${activeTab === 'privacy' ? 'active' : ''}`}
          onClick={() => setActiveTab('privacy')}
        >
          Privacy
        </button>
      </div>
      
      {activeTab === 'appearance' && (
        <div className="settings-section">
          <h2 className="page-section-title">Appearance Settings</h2>
          
          <div className="monthly-overview-grid">
            <div className="overview-card setting-card">
              <div className="overview-title">Dark Mode</div>
              <div className="overview-value setting-description">
                Enable dark theme for the interface
              </div>
              <div className="overview-details">
                <label className="toggle-switch large-toggle">
                  <input 
                    type="checkbox" 
                    checked={darkMode} 
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="overview-card setting-card">
              <div className="overview-title">Language</div>
              <div className="overview-value setting-description">
                Select display language
              </div>
              <div className="overview-details">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="settings-select modern-select"
                >
                  <option value="english">English</option>
                  <option value="french">French</option>
                  <option value="spanish">Spanish</option>
                  <option value="german">German</option>
                </select>
              </div>
            </div>
            
            <div className="overview-card setting-card">
              <div className="overview-title">Animations</div>
              <div className="overview-value setting-description">
                Enable interface animations
              </div>
              <div className="overview-details">
                <label className="toggle-switch large-toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'notifications' && (
        <div className="settings-section">
          <h2 className="page-section-title">Notification Settings</h2>
          
          <h3 className="section-subtitle">Notification Channels</h3>
          <div className="monthly-overview-grid">
            <div className="overview-card setting-card">
              <div className="overview-title">Email</div>
              <div className="overview-value setting-description">
                Receive notifications via email
              </div>
              <div className="overview-details">
                <label className="toggle-switch large-toggle">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.email} 
                    onChange={() => handleNotificationChange('email')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="overview-card setting-card">
              <div className="overview-title">Push Notifications</div>
              <div className="overview-value setting-description">
                Receive notifications on your device
              </div>
              <div className="overview-details">
                <label className="toggle-switch large-toggle">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.push} 
                    onChange={() => handleNotificationChange('push')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="overview-card setting-card">
              <div className="overview-title">SMS</div>
              <div className="overview-value setting-description">
                Receive notifications via SMS
              </div>
              <div className="overview-details">
                <label className="toggle-switch large-toggle">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.sms} 
                    onChange={() => handleNotificationChange('sms')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
          
          <h3 className="section-subtitle">Notification Types</h3>
          <div className="monthly-overview-grid">
            <div className="overview-card setting-card">
              <div className="overview-title">Transaction Alerts</div>
              <div className="overview-value setting-description">
                Notifications for deposits, withdrawals and payments
              </div>
              <div className="overview-details">
                <label className="toggle-switch large-toggle">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.transactions} 
                    onChange={() => handleNotificationChange('transactions')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="overview-card setting-card">
              <div className="overview-title">Security Alerts</div>
              <div className="overview-value setting-description">
                Notifications for logins and security changes
              </div>
              <div className="overview-details">
                <label className="toggle-switch large-toggle">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.security} 
                    onChange={() => handleNotificationChange('security')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="overview-card setting-card">
              <div className="overview-title">Marketing Emails</div>
              <div className="overview-value setting-description">
                Newsletters and information about new products
              </div>
              <div className="overview-details">
                <label className="toggle-switch large-toggle">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.marketing} 
                    onChange={() => handleNotificationChange('marketing')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="overview-card setting-card">
              <div className="overview-title">Budget Alerts</div>
              <div className="overview-value setting-description">
                Notifications when you reach spending limits
              </div>
              <div className="overview-details">
                <label className="toggle-switch large-toggle">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.budget} 
                    onChange={() => handleNotificationChange('budget')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'preferences' && (
        <div className="settings-section">
          <h2 className="page-section-title">Display Preferences</h2>
          
          <div className="monthly-overview-grid">
            <div className="overview-card setting-card">
              <div className="overview-title">Currency</div>
              <div className="overview-value setting-description">
                Choose your preferred currency
              </div>
              <div className="overview-details">
                <select
                  name="currency"
                  value={displayPreferences.currency}
                  onChange={handleDisplayPreferenceChange}
                  className="settings-select modern-select"
                >
                  <option value="usd">US Dollar ($)</option>
                  <option value="eur">Euro (€)</option>
                  <option value="gbp">British Pound (£)</option>
                  <option value="jpy">Japanese Yen (¥)</option>
                </select>
              </div>
            </div>
            
            <div className="overview-card setting-card">
              <div className="overview-title">Date Format</div>
              <div className="overview-value setting-description">
                Choose how to display dates
              </div>
              <div className="overview-details">
                <select
                  name="dateFormat"
                  value={displayPreferences.dateFormat}
                  onChange={handleDisplayPreferenceChange}
                  className="settings-select modern-select"
                >
                  <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                  <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                  <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
            
            <div className="overview-card setting-card">
              <div className="overview-title">Start Screen</div>
              <div className="overview-value setting-description">
                Choose your start screen
              </div>
              <div className="overview-details">
                <select
                  name="startScreen"
                  value={displayPreferences.startScreen}
                  onChange={handleDisplayPreferenceChange}
                  className="settings-select modern-select"
                >
                  <option value="dashboard">Dashboard</option>
                  <option value="transactions">Transactions</option>
                  <option value="accounts">Accounts</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'privacy' && (
        <div className="settings-section">
          <h2 className="page-section-title">Privacy Settings</h2>
          
          <div className="monthly-overview-grid">
            <div className="overview-card setting-card">
              <div className="overview-title">Data Collection</div>
              <div className="overview-value setting-description">
                Allow data collection to improve our services
              </div>
              <div className="overview-details">
                <label className="toggle-switch large-toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="overview-card setting-card">
              <div className="overview-title">Third-Party Cookies</div>
              <div className="overview-value setting-description">
                Allow third-party cookies on our site
              </div>
              <div className="overview-details">
                <label className="toggle-switch large-toggle">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="overview-card setting-card">
              <div className="overview-title">Browsing History</div>
              <div className="overview-value setting-description">
                Save browsing history for personalized suggestions
              </div>
              <div className="overview-details">
                <label className="toggle-switch large-toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="privacy-actions">
            <button className="btn privacy-btn">Download My Data</button>
            <button className="btn privacy-btn danger">Delete Account</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsContent; 