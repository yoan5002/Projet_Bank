import { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { personsImgs } from '../../utils/images';
import { navigationLinks } from '../../data/data';
import "./Sidebar.css";
import { SidebarContext } from '../../context/sidebarContext';
import { useUser } from '../../context/UserContext';

const Sidebar = () => {
  const location = useLocation();
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);
  const { user, loading } = useUser();

  useEffect(() => {
    setSidebarClass(isSidebarOpen ? 'sidebar-change' : '');
  }, [isSidebarOpen]);

  const getPathFromTitle = (title) => {
    if (title === "Home") return "/";
    return `/${title.toLowerCase().replace(/\s+/g, '-')}`;
  };

  // Ne pas afficher tant que l'utilisateur n'est pas encore chargé
  if (loading) return null;

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={personsImgs.image1} alt="profile image" />
        </div>
        <span className="info-name">{user?.name || "Utilisateur"}</span>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {navigationLinks.map((navigationLink) => {
            const path = getPathFromTitle(navigationLink.title);
            return (
              <li className="nav-item" key={navigationLink.id}>
                <Link
                  to={path}
                  className={`nav-link ${location.pathname === path ? 'active' : ''}`}
                >
                  <img src={navigationLink.image} className="nav-link-icon" alt={navigationLink.title} />
                  <span className="nav-link-text">{navigationLink.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
