import ContentTop from "../components/ContentTop/ContentTop";
import FinancialAdviceContent from "./PageContents/FinancialAdviceContent";
import './PageStyles/PageStyle.css';

const FinancialAdvicePage = () => {
  return (
    <div className='main-content'>
      <ContentTop />
      <FinancialAdviceContent />
    </div>
  )
}

export default FinancialAdvicePage 