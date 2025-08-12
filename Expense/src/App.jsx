import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/Homepage';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import ShopkeeperDashboard from './pages/ShopkeeperDashboard';
import SupplierDashboard from './pages/SupplierDashboard';
//route
import { Routes, Route } from 'react-router-dom'; 
import ProtectedRoute from './components/protectedRoute';
// Shopkeeper Pages
import ManageInventory from './pages/shopkeeperpages/ManageInventory';
import ViewOrders from './pages/shopkeeperpages/ViewOrders';
import AddSupplier from './pages/shopkeeperpages/AddSupplier';
import History from './pages/shopkeeperpages/History';
import Reminders from './pages/shopkeeperpages/Reminders';
import ExpenseReport from './pages/shopkeeperpages/ExpenseReport';
// import SupplierReply from './pages/shopkeeperpages/SupplierReply';
// Supplier Pages
import ReceivedOrders from './pages/supplierpages/ReceivedOrders';
import Historysup from './pages/supplierpages/Historysup'
import ChatWithShopkeepers from './pages/supplierpages/ChatWithShopkeepers';
import ManageProducts from './pages/supplierpages/ManageProducts';
import MonthlyExpense from './pages/supplierpages/MonthlyExpense';
import BillGeneration from './pages/supplierpages/BillGeneration';
import SupplierReminders from './pages/supplierpages/SupplierReminders';

function App() {
  return (
    
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
            <Route path="/shopkeeper/dashboard" element={ <ProtectedRoute role="shopkeeper"><ShopkeeperDashboard /> </ProtectedRoute>} />
            <Route path="/supplier/dashboard" element={ <ProtectedRoute role="shopkeeper"><SupplierDashboard /> </ProtectedRoute>} />

            {/* Shopkeeper Routes */}
            <Route path="/shopkeeper/inventory" element={<ManageInventory />} />
            <Route path="/shopkeeper/orders" element={<ViewOrders />} />
            <Route path="/shopkeeper/suppliers" element={<AddSupplier />} />
            <Route path="/shopkeeper/payments" element={<History />} />
            <Route path="/shopkeeper/reminders" element={<Reminders />} />
            <Route path="/shopkeeper/expenses" element={<ExpenseReport />} />
            {/* <Route path="/supplier-reply" element={<SupplierReply />} /> */}

            {/* Supplier Routes */}
            <Route path="/supplier/received-orders" element={<ReceivedOrders />} />
            <Route path="/supplier/history" element={<Historysup />} />
            <Route path="/supplier/chat" element={<ChatWithShopkeepers />} />
            <Route path="/supplier/products" element={<ManageProducts />} />
            <Route path="/supplier/monthly-expense" element={<MonthlyExpense />} />
            <Route path="/supplier/bill-generation" element={<BillGeneration />} />
            <Route path="/supplier/Reminders" element={<SupplierReminders />} />
          </Routes>
        </main>
        <Footer />
      </div>
    
  );
}

export default App;
