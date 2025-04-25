import { useState, useEffect } from 'react';
import { personsImgs } from '../../utils/images';
import { useUser } from '../../context/UserContext';

const AccountContent = () => {
  const { user, loading } = useUser();

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    accountNumber: '',
    accountType: '',
    joinDate: ''
  });

  const [accountActivity] = useState([
    { date: '09/25/2023', activity: 'Login from Montreal, Canada', device: 'iPhone 13' },
    { date: '09/23/2023', activity: 'Password changed', device: 'MacBook Pro' },
    { date: '09/20/2023', activity: 'Login from Toronto, Canada', device: 'Samsung Galaxy S22' },
    { date: '09/15/2023', activity: 'Profile information updated', device: 'MacBook Pro' },
    { date: '09/10/2023', activity: 'Login from Montreal, Canada', device: 'iPhone 13' }
  ]);

  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({ ...userInfo });

  useEffect(() => {
    if (user) {
      const updatedUser = {
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '+1 514-123-4567',
        address: user.address || '123 Rue Sainte-Catherine, Montréal, QC H3B 1A7, Canada',
        accountNumber: user.accountNumber || 'CA12 3456 7890 1234 5678',
        accountType: user.accountType || 'Current Account',
        joinDate: user.created_at ? new Date(user.created_at).toLocaleDateString() : '01/15/2021'
      };
      setUserInfo(updatedUser);
      setEditedUserInfo(updatedUser);
    }
  }, [user]);

  if (loading) return <div style={{ padding: '20px', color: '#fff' }}>Chargement des données...</div>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserInfo(editedUserInfo);
    setEditMode(false);
  };

  const securityOptions = [
    {
      id: 'two-factor',
      title: 'Two-Factor Authentication',
      enabled: true,
      description: 'Strengthens your account security by adding an extra layer of protection.'
    },
    {
      id: 'login-alerts',
      title: 'Login Alerts',
      enabled: true,
      description: 'Receive notifications when your account is accessed from a new device.'
    },
    {
      id: 'devices',
      title: 'Manage Connected Devices',
      enabled: false,
      description: 'View and manage devices connected to your account.'
    }
  ];

  return (
    <div className="page-content-holder">
      <h1 className="page-title">My Account</h1>

      <div className="account-tabs">
        <button className={`account-tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Profile</button>
        <button className={`account-tab ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>Security</button>
        <button className={`account-tab ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}>Recent Activity</button>
      </div>

      {activeTab === 'profile' && (
        <div className="account-profile">
          <div className="user-overview">
            <div className="user-avatar-container">
              <img src={personsImgs.person_one} alt="Profile" className="user-avatar" />
              {!editMode && <button className="change-avatar-btn">Change</button>}
            </div>
            <div className="user-basic-info">
              <h2>{userInfo.name}</h2>
              <p>Customer since: {userInfo.joinDate}</p>
              <p>Account #: {userInfo.accountNumber}</p>
              <p>Account type: {userInfo.accountType}</p>
            </div>
          </div>

          {!editMode ? (
            <div className="monthly-overview-grid">
              <div className="overview-card">
                <div className="overview-title">Full Name</div>
                <div className="overview-value">{userInfo.name}</div>
              </div>
              <div className="overview-card">
                <div className="overview-title">Email</div>
                <div className="overview-value">{userInfo.email}</div>
              </div>
              <div className="overview-card">
                <div className="overview-title">Phone</div>
                <div className="overview-value">{userInfo.phone}</div>
              </div>
              <div className="overview-card">
                <div className="overview-title">Address</div>
                <div className="overview-value">{userInfo.address}</div>
              </div>

              <div className="account-actions" style={{ gridColumn: '1 / -1', marginTop: '20px' }}>
                <button className="btn edit-profile-btn" onClick={() => { setEditedUserInfo({ ...userInfo }); setEditMode(true); }}>Edit Profile</button>
                <button className="btn download-data-btn">Download My Data</button>
              </div>
            </div>
          ) : (
            <div className="edit-profile-form">
              <h3>Edit Profile</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full name</label>
                  <input type="text" id="name" name="name" value={editedUserInfo.name} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={editedUserInfo.email} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" name="phone" value={editedUserInfo.phone} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea id="address" name="address" value={editedUserInfo.address} onChange={handleInputChange} />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn save-btn">Save</button>
                  <button type="button" className="btn cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {activeTab === 'security' && (
        <div className="account-security">
          <h2 className="page-section-title">Security Settings</h2>

          <div className="monthly-overview-grid">
            {securityOptions.map((option) => (
              <div className="overview-card setting-card" key={option.id}>
                <div className="overview-title">{option.title}</div>
                <div className="overview-value setting-description">{option.description}</div>
                <div className="overview-details">
                  {option.id === 'devices' || option.id === 'login-alerts' ? (
                    <button className="btn security-btn">{option.id === 'devices' ? 'Manage Devices' : 'Configure'}</button>
                  ) : (
                    <label className="toggle-switch large-toggle">
                      <input type="checkbox" defaultChecked={option.enabled} />
                      <span className="toggle-slider"></span>
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="account-activity">
          <h2 className="page-section-title">Recent Account Activity</h2>

          <div className="monthly-overview-grid">
            {accountActivity.map((item, index) => (
              <div className="overview-card" key={index}>
                <div className="overview-title">{item.activity}</div>
                <div className="overview-value">{item.date}</div>
                <div className="overview-details">
                  <div className="overview-detail">
                    <span>Device: {item.device}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="activity-actions">
            <button className="btn view-all-btn">View All Activity</button>
            <button className="btn export-btn">Export Activity</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountContent;