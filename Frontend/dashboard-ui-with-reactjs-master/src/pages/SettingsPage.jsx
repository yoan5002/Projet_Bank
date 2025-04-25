import ContentTop from "../components/ContentTop/ContentTop";
import SettingsContent from "./PageContents/SettingsContent";
import './PageStyles/PageStyle.css';

const SettingsPage = () => {
  return (
    <div className='main-content'>
      <ContentTop />
      <SettingsContent />
    </div>
  )
}

export default SettingsPage 