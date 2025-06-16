import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import StaffDashboard from './components/StaffDashboard';
import Profile from './components/Profile';
import StaffManagement from './components/StaffManagement';
import EquipmentManagement from './components/EquipmentManagement';
import BarcodeScanner from './components/BarcodeScanner';
import SummaryUpload from './components/SummaryUpload';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/staff-management" element={<StaffManagement />} />
        <Route path="/equipment-management" element={<EquipmentManagement />} />
        <Route path="/scan" element={<BarcodeScanner />} />
        <Route path="/upload-summary" element={<SummaryUpload />} />
      </Routes>
    </Router>
  );
}

export default App;