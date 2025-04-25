import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsGridFill } from 'react-icons/bs';
import { iconsImgs } from '../../utils/images';
import './Sidebar.css';

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState(window.location.pathname);

    const handleLinkClick = (link) => {
        setActiveLink(link);
    }

    const links = [
        { id: 1, icon: iconsImgs.dashboard, title: "Dashboard", link: "/" },
        { id: 2, icon: iconsImgs.payment, title: "Transactions", link: "/transactions" },
        { id: 3, icon: iconsImgs.subscription, title: "Subscriptions", link: "/subscriptions" },
        { id: 4, icon: iconsImgs.loan, title: "Loans", link: "/loans" },
        { id: 5, icon: iconsImgs.report, title: "Reports", link: "/reports" },
        { id: 6, icon: iconsImgs.saving, title: "Savings", link: "/savings" },
        { id: 7, icon: iconsImgs.wallet, title: "Financial Advice", link: "/financial-advice" },
        { id: 8, icon: iconsImgs.user, title: "Account", link: "/account" },
        { id: 9, icon: iconsImgs.settings, title: "Settings", link: "/settings" }
    ];

    return (
        <div className="sidebar">
            <div className="user-info">
                <div className="info-img bg-eerie-black">
                    <img src={ iconsImgs.user } alt="user profile" />
                </div>
                <span className="info-name">anas_bank</span>
            </div>

            <nav className="navigation">
                <ul className="nav-list">
                    {
                        links.map((navItem) => {
                            return (
                                <li className="nav-item" key={ navItem.id }>
                                    <Link 
                                        to={ navItem.link } 
                                        className={ activeLink === navItem.link ? 'nav-link active' : 'nav-link' }
                                        onClick={ () => handleLinkClick(navItem.link) }
                                    >
                                        <img src={ navItem.icon } className="nav-link-icon" alt={ navItem.title } />
                                        <span className="nav-link-text">{ navItem.title }</span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>

            <div className="logout-btn">
                <img src={ iconsImgs.logout } alt="" />
                <span>Logout</span>
            </div>
        </div>
    )
}

export default Sidebar; 