import ContentTop from "../components/ContentTop/ContentTop";
import TransactionsContent from "./PageContents/TransactionsContent";
import './PageStyles/PageStyle.css';

const TransactionsPage = () => {
  return (
    <div className='main-content'>
      <ContentTop />
      <TransactionsContent />
    </div>
  )
}

export default TransactionsPage 