import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/Homepage';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopkeeperDashboard from './pages/ShopkeeperDashboard';
import SupplierDashboard from './pages/SupplierDashboard';
// Shopkeeper Pages
import ManageInventory from './pages/shopkeeperpages/ManageInventory';
import ViewOrders from './pages/shopkeeperpages/ViewOrders';
import AddSupplier from './pages/shopkeeperpages/AddSupplier';
import History from './pages/shopkeeperpages/History';
import Reminders from './pages/shopkeeperpages/Reminders';
import ExpenseReport from './pages/shopkeeperpages/ExpenseReport';


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        <Header />
        <main className="flex-grow">
          <Routes>
            
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shopkeeper/dashboard" element={<ShopkeeperDashboard />} />
            <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
            
            {/* Shopkeeper Routes */}
            <Route path="/shopkeeper/inventory" element={<ManageInventory />} />
            <Route path="/shopkeeper/orders" element={<ViewOrders />} />
            <Route path="/shopkeeper/suppliers" element={<AddSupplier />} />
            <Route path="/shopkeeper/history" element={<History />} />
            <Route path="/shopkeeper/reminders" element={<Reminders />} />
            <Route path="/shopkeeper/expenses" element={<ExpenseReport />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
