import './App.css';
import Sidebar from './layout/Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BudgetPage from './pages/BudgetPage';
import TransactionsPage from './pages/TransactionsPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import LoansPage from './pages/LoansPage';
import ReportsPage from './pages/ReportsPage';
import SavingsPage from './pages/SavingsPage';
import FinancialAdvicePage from './pages/FinancialAdvicePage';
import AccountPage from './pages/AccountPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <>
      <Router>
        <div className='app'>
          <Sidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/loans" element={<LoansPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/savings" element={<SavingsPage />} />
            <Route path="/financial-advice" element={<FinancialAdvicePage />} />
            <Route path="/settings" element={<SettingsPage />} />
           
            

          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
