import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./auth/login";
import Signup from "./auth/signup";

import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar shows only when logged in */}
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
