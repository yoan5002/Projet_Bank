import { iconsImgs } from "../../utils/images";
import "./ContentTop.css";
import { useContext, useState, useRef } from "react";
import { SidebarContext } from "../../context/sidebarContext";

const ContentTop = () => {
  const { toggleSidebar } = useContext(SidebarContext);

  const notificationMenuRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const toggleNotificationMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseLeave = (e) => {
    if (!notificationMenuRef.current.contains(e.relatedTarget)) {
      setIsMenuOpen(false);
    }
  };

  const toggleSearchField = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="main-content-top">
      <div className="content-top-left">
        <button
          type="button"
          className="sidebar-toggler"
          onClick={() => toggleSidebar()}
        >
          <img src={iconsImgs.menu} alt="Menu" />
        </button>
        <h3 className="content-top-title">Home</h3>
      </div>
      <div className="content-top-btns">
        <div className="search-container">
          {isSearchOpen && (
            <div className="search-field">
              <input
                type="text"
                placeholder="Search......."
                className="search-input"
              />
            </div>
          )}
          <button
            type="button"
            className="search-btn content-top-btn"
            onClick={toggleSearchField}
          >
            <img src={iconsImgs.search} alt="Search" />
          </button>
        </div>
        
        <button
          className="notification-btn content-top-btn"
          onClick={toggleNotificationMenu}
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={handleMouseLeave}
        >
          <img src={iconsImgs.bell} alt="Notifications" />
          <span className="notification-btn-dot"></span>
        </button>
      </div>
      
      {isMenuOpen && (
        <div 
          className="notification-menu" 
          ref={notificationMenuRef}
          onMouseLeave={handleMouseLeave}
        >
          <h3>Notifications</h3>
          <div className="notification-list">
            <div className="notification-item">
              <div className="notification-icon new">
                <img src={iconsImgs.bell} alt="notification" />
              </div>
              <div className="notification-info">
                <p>Your loan application has been approved.</p>
                <span>2 minutes ago</span>
              </div>
            </div>
            <div className="notification-item">
              <div className="notification-icon">
                <img src={iconsImgs.bell} alt="notification" />
              </div>
              <div className="notification-info">
                <p>Reminder: Payment due in 3 days.</p>
                <span>2 hours ago</span>
              </div>
            </div>
            <div className="notification-item">
              <div className="notification-icon">
                <img src={iconsImgs.bell} alt="notification" />
              </div>
              <div className="notification-info">
                <p>New feature: Bill splitting now available.</p>
                <span>Yesterday</span>
              </div>
            </div>
          </div>
          <button className="view-all-btn">View All</button>
        </div>
      )}
    </div>
  );
};

export default ContentTop;
