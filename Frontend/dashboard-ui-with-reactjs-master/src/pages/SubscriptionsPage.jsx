import ContentTop from "../components/ContentTop/ContentTop";
import SubscriptionsContent from "./PageContents/SubscriptionsContent";
import './PageStyles/PageStyle.css';

const SubscriptionsPage = () => {
  return (
    <div className='main-content'>
      <ContentTop />
      <SubscriptionsContent />
    </div>
  )
}

export default SubscriptionsPage 