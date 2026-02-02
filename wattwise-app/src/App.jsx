import React, { useState } from 'react';
import './styles/app.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

function App() {
  // Shared appliance state that both Dashboard and ApplianceManager will use
  const [appliances, setAppliances] = useState([
    { 
      id: 1, 
      name: 'Air Conditioner', 
      kwh: 1.5, 
      hoursPerDay: 8,
      usage: 325, // kWh per month
      cost: 48.75,
      percentage: 38,
      color: '#00a86b'
    },
    { 
      id: 2, 
      name: 'Refrigerator', 
      kwh: 0.8, 
      hoursPerDay: 24,
      usage: 180,
      cost: 27.00,
      percentage: 21,
      color: '#3a86ff'
    },
    { 
      id: 3, 
      name: 'Television', 
      kwh: 0.12, 
      hoursPerDay: 4,
      usage: 95,
      cost: 14.25,
      percentage: 11,
      color: '#9d4edd'
    },
    { 
      id: 4, 
      name: 'Washing Machine', 
      kwh: 0.5, 
      hoursPerDay: 1,
      usage: 120,
      cost: 18.00,
      percentage: 14,
      color: '#ff6b6b'
    },
    { 
      id: 5, 
      name: 'Lighting', 
      kwh: 0.6, 
      hoursPerDay: 6,
      usage: 135,
      cost: 20.25,
      percentage: 16,
      color: '#ffd166'
    }
  ]);

  // Function to add appliance (will be passed to ApplianceManager)
  const addAppliance = (newAppliance) => {
    const id = Date.now();
    const kwh = parseFloat(newAppliance.kwh);
    const hoursPerDay = 4; // default
    const usage = kwh * hoursPerDay * 30; // Monthly usage
    const cost = usage * 0.15; // $0.15 per kWh
    const totalUsage = appliances.reduce((sum, a) => sum + a.usage, 0) + usage;
    
    // Calculate new percentage for all appliances
    const updatedAppliances = [...appliances];
    updatedAppliances.forEach(app => {
      app.percentage = Math.round((app.usage / (totalUsage + usage)) * 100);
    });
    
    const newApplianceWithStats = {
      ...newAppliance,
      id,
      kwh,
      hoursPerDay,
      usage,
      cost: cost.toFixed(2),
      percentage: Math.round((usage / (totalUsage + usage)) * 100),
      color: ['#00a86b', '#3a86ff', '#9d4edd', '#ff6b6b', '#ffd166', '#FF9800', '#9C27B0'][appliances.length % 7]
    };
    
    setAppliances([...updatedAppliances, newApplianceWithStats]);
  };

  // Function to remove appliance
  const removeAppliance = (id) => {
    const updatedAppliances = appliances.filter(appliance => appliance.id !== id);
    
    // Recalculate percentages
    const totalUsage = updatedAppliances.reduce((sum, a) => sum + a.usage, 0);
    updatedAppliances.forEach(app => {
      app.percentage = Math.round((app.usage / totalUsage) * 100);
    });
    
    setAppliances(updatedAppliances);
  };

  // Function to clear all appliances
  const clearAppliances = () => {
    setAppliances([]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <Dashboard 
            appliances={appliances}
            onAddAppliance={addAppliance}
            onRemoveAppliance={removeAppliance}
            onClearAppliances={clearAppliances}
          />
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;