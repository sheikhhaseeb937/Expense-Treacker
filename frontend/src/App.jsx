import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Auth/Login.jsx';
import Signup from './pages/Auth/Signup.jsx';
import Home from './pages/Dashboard/Home.jsx';
import Income from './pages/Dashboard/Income.jsx';
import Expense from './pages/Dashboard/Expense.jsx';
import DashboardLayout from './components/dashboard/DashboardLayout.jsx';


// Root redirect component
const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          }
        />
        <Route
          path="/income"
          element={
            <DashboardLayout>
              <Income />
            </DashboardLayout>
          }
        />
        <Route
          path="/expense"
          element={
            <DashboardLayout>
              <Expense />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
