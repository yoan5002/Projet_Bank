import ContentTop from "../components/ContentTop/ContentTop";
import BudgetContent from "./PageContents/BudgetContent";
import './PageStyles/PageStyle.css';

const BudgetPage = () => {
  return (
    <div className='main-content'>
      <ContentTop />
      <BudgetContent />
    </div>
  )
}

export default BudgetPage 