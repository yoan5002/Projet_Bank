import ContentTop from "../components/ContentTop/ContentTop";
import LoansContent from "./PageContents/LoansContent";
import './PageStyles/PageStyle.css';

const LoansPage = () => {
  return (
    <div className='main-content'>
      <ContentTop />
      <LoansContent />
    </div>
  )
}

export default LoansPage 