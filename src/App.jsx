import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
// import AddInventory from './pages/AddInventory';
// import InventoryList from './pages/InventoryList';
import Orders from './pages/orders/Orders';
import Review from './pages/Review/Review';

// Category Pages
import AddCategory from './pages/category/AddCategory/AddCategory';
import ViewCategory from './pages/category/ViewCategory/ViewCategory';
import DashCompo from "./pages/DashCompo";
import Addbook from "./pages/Book/Addbook/Addbook";
import Viewbook from "./pages/Book/ViewBook/Viewbook";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="/" element={<Dashboard />}>
          {/* <Route path="add-inventory" element={<AddInventory />} /> */}
          {/* <Route path="inventory-list" element={<InventoryList />} /> */}
          <Route path="AddCategory" element={<AddCategory />} />
        <Route path="/DashCompo" element={<DashCompo />} />
          <Route path="ViewCategory" element={<ViewCategory />} />
          <Route path="Addbook" element={<Addbook/>} />
          <Route path="Viewbook" element={<Viewbook/>} />
          <Route path="Orders" element={<Orders />} />
          <Route path="Review" element={<Review />} />
          {/* <Route path="PurchaseHistory" element={<PurchaseHistory />} /> */}
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
