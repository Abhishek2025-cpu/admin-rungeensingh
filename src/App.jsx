import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
// import AddInventory from './pages/AddInventory';
// import InventoryList from './pages/InventoryList';
// import Orders from './pages/Orders';
import PurchaseHistory from './pages/Purchase history/PurchaseHistory';

// Category Pages
// import AddCategory from './pages/category/AddCategory';
// import ViewCategory from './pages/category/ViewCategory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />}>
          {/* <Route path="add-inventory" element={<AddInventory />} />
          <Route path="inventory-list" element={<InventoryList />} />
          <Route path="purchase-history" element={<Orders />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
