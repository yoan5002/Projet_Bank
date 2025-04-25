import ContentTop from "../components/ContentTop/ContentTop";
import AccountContent from "./PageContents/AccountContent";
import './PageStyles/PageStyle.css';

const AccountPage = () => {
  return (
    <div className='main-content'>
      <ContentTop />
      <AccountContent />
    </div>
  )
}

export default AccountPage 