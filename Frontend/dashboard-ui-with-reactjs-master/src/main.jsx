import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { SidebarProvider } from './context/sidebarContext.jsx';
import { UserProvider } from './context/UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
  <SidebarProvider>
    <App />
  </SidebarProvider>
</UserProvider>

)
