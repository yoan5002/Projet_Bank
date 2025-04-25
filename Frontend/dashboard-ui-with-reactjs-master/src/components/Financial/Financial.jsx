import { iconsImgs } from "../../utils/images"
import { Link, useNavigate } from "react-router-dom";

const Financial = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/financial-advice");
  };

  return (
    <div className="subgrid-two-item grid-common grid-c8" onClick={handleClick}>
        <div className="grid-c-title">
            <h3 className="grid-c-title-text">Financial Advice</h3>
            <Link to="/financial-advice" className="grid-c-title-icon">
                <img src={ iconsImgs.plus } />
            </Link>
        </div>
        <div className="grid-c8-content">
            <p className="text text-silver-v1">Ipsum dolor sit amet consectetur, adipisicing elit.
                Iste, vitae.....</p>
        </div>
    </div>
  )
}

export default Financial
