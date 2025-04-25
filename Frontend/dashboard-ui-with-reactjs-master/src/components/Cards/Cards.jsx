import { iconsImgs } from "../../utils/images";
import "./Cards.css";
import { Link, useNavigate } from "react-router-dom";

const Cards = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/account");
  };

  return (
    <div className="grid-one-item grid-common grid-c1" onClick={handleClick}>
        <div className="grid-c-title">
            <h3 className="grid-c-title-text">Cards</h3>
            <Link to="/account" className="grid-c-title-icon">
                <img src={ iconsImgs.plus } />
            </Link>
        </div>
        <div className="grid-c1-content">
            <p>Balance</p>
            <div className="lg-value">$ 22,000</div>
            <div className="card-wrapper">
                <span className="card-pin-hidden">**** **** **** </span>
                <span>1234</span>
            </div>
            <div className="card-logo-wrapper">
                <div>
                    <p className="text text-silver-v1 expiry-text">Expires</p>
                    <p className="text text-sm text-white">12/22</p>
                </div>
                <div className="card-logo">
                    <div className="logo-shape1"></div>
                    <div className="logo-shape2"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cards
