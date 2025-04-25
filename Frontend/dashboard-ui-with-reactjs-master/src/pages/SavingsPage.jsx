import ContentTop from "../components/ContentTop/ContentTop";
import SavingsContent from "./PageContents/SavingsContent";
import './PageStyles/PageStyle.css';

const SavingsPage = () => {
  return (
    <div className='main-content'>
      <ContentTop />
      <SavingsContent />
    </div>
  )
}

export default SavingsPage 