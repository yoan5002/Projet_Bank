import ContentTop from "../components/ContentTop/ContentTop";
import ReportsContent from "./PageContents/ReportsContent";
import './PageStyles/PageStyle.css';

const ReportsPage = () => {
  return (
    <div className='main-content'>
      <ContentTop />
      <ReportsContent />
    </div>
  )
}

export default ReportsPage 