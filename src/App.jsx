import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Orders from './pages/orders/Orders';
import Review from './pages/Review/Review';

// Category Pages
import AddCategory from './pages/category/AddCategory/AddCategory';
import CategoryList from './pages/category/AddCategory/CategoryList';
import GetCategory from './pages/category/AddCategory/GetCategory';
import ViewCategory from './pages/category/ViewCategory/ViewCategory';
import DashCompo from "./pages/DashCompo";
import Addbook from "./pages/Book/Addbook/Addbook";
import Viewbook from "./pages/Book/ViewBook/Viewbook";
import AuthorInfo from "./pages/AuthorInfo";
import Smtp from "./components/Smtp";

// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Login />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            <Route path="/dashboard" element={<DashCompo />} />
            <Route path="/AddCategory" element={<AddCategory />} />
            <Route path="/CategoryList" element={<CategoryList />} />
            <Route path="/GetCategory" element={<GetCategory />} />
            <Route path="/ViewCategory" element={<ViewCategory />} />
            <Route path="/Addbook" element={<Addbook />} />
            <Route path="/Viewbook" element={<Viewbook />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Review" element={<Review />} />
            <Route path="/AuthorInfo" element={<AuthorInfo />} />
            <Route path="/smtp-settings" element={<Smtp />} />
          </Route>

          {/* Redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
