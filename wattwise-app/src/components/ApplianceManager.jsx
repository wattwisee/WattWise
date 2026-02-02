import React, { useState, useEffect, useCallback } from 'react';

const ApplianceManager = ({ appliances = [], onAddAppliance, onRemoveAppliance, onClearAllAppliances }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [customAppliance, setCustomAppliance] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState(0);
  const [daysPerWeek, setDaysPerWeek] = useState(7);
  
  // Appliance Categories
  const applianceCategories = [
    'Air Conditioner',
    'Electric Fan',
    'Refrigerator',
    'Television',
    'Rice Cooker',
    'Electric Kettle',
    'Microwave Oven',
    'Washing Machine',
    'Clothes Iron',
    'Water Heater / Shower',
    'Laptop / Desktop Computer',
    'Lighting (Bulbs / LEDS)',
    'Mobile Phone Charger',
    'Electric Stove / Induction Cooker',
    'Other'
  ];

  // Specific Types for each Category
  const applianceTypes = {
    'Air Conditioner': [
      'Split Type Inverter 1.0HP',
      'Split Type Inverter 1.5HP',
      'Split Type Inverter 2.0HP',
      'Window Type 1.0HP',
      'Window Type 1.5HP',
      'Window Type 2.0HP',
      'Tower Type',
      'Portable AC'
    ],
    'Electric Fan': [
      'Standing Fan',
      'Table Fan',
      'Wall Fan',
      'Ceiling Fan',
      'Exhaust Fan',
      'Tower Fan'
    ],
    'Refrigerator': [
      'Single Door 5-7 cu.ft.',
      'Two Door 8-12 cu.ft.',
      'Side-by-Side 15-20 cu.ft.',
      'French Door 20+ cu.ft.',
      'Mini Refrigerator',
      'Inverter Type',
      'Non-Inverter Type'
    ],
    'Television': [
      'LED TV 32"',
      'LED TV 42"',
      'LED TV 50"',
      'Smart TV 55"',
      'OLED TV 65"',
      'CRT TV (Old)',
      'Plasma TV'
    ],
    'Rice Cooker': [
      'Standard 1.0L',
      'Standard 1.8L',
      'Fuzzy Logic 1.8L',
      'Induction Heating 1.8L',
      'Multi-cooker'
    ],
    'Electric Kettle': [
      '1.0L Electric Kettle',
      '1.5L Electric Kettle',
      '1.7L Electric Kettle',
      'Stainless Steel',
      'Glass Type',
      'Temperature Control'
    ],
    'Microwave Oven': [
      'Solo 20L',
      'Solo 23L',
      'Grill 25L',
      'Convection 28L',
      'Inverter Type',
      'Built-in Type'
    ],
    'Washing Machine': [
      'Top Load Automatic 6kg',
      'Top Load Automatic 8kg',
      'Front Load 7kg',
      'Front Load 10kg',
      'Twin Tub 8kg',
      'Semi-Automatic'
    ],
    'Clothes Iron': [
      'Dry Iron 1000W',
      'Steam Iron 1200W',
      'Steam Iron 1500W',
      'Travel Iron',
      'Garment Steamer'
    ],
    'Water Heater / Shower': [
      'Storage 15L',
      'Storage 30L',
      'Instant 3.5kW',
      'Instant 4.5kW',
      'Solar Water Heater',
      'Point-of-Use'
    ],
    'Laptop / Desktop Computer': [
      'Laptop Basic',
      'Laptop Gaming',
      'Desktop CPU Only',
      'Desktop with Monitor',
      'Gaming PC',
      'Workstation',
      'All-in-One PC'
    ],
    'Lighting (Bulbs / LEDS)': [
      'LED Bulb 9W',
      'LED Bulb 12W',
      'LED Bulb 18W',
      'LED Tube 20W',
      'LED Panel 30W',
      'Fluorescent 20W',
      'Incandescent 60W'
    ],
    'Mobile Phone Charger': [
      'Standard 5W',
      'Fast Charger 18W',
      'Fast Charger 33W',
      'Wireless Charger 10W',
      'Car Charger',
      'Power Bank'
    ],
    'Electric Stove / Induction Cooker': [
      'Single Burner 1200W',
      'Double Burner 1800W',
      'Induction Cooker 1800W',
      'Induction Cooker 2200W',
      'Glass Top Stove',
      'Portable Hot Plate'
    ],
    'Other': ['Custom Appliance']
  };

  const generateAiAnalysis = useCallback(() => {
    console.log('Generating AI analysis for appliances:', appliances);
  }, [appliances]);

  useEffect(() => {
    if (appliances.length > 0) {
      generateAiAnalysis();
    }
  }, [generateAiAnalysis, appliances]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let applianceName, applianceSpecificType;
    
    if (selectedCategory === 'Other') {
      applianceName = customAppliance;
      applianceSpecificType = 'Custom';
    } else {
      applianceName = selectedCategory;
      applianceSpecificType = selectedType || 'Standard';
    }
    
    if (!applianceName.trim()) return;
    
    // Calculate watts based on appliance type
    const getWattsForAppliance = (category, type) => {
      const cat = category.toLowerCase();
      const typ = type.toLowerCase();
      
      // Air Conditioner
      if (cat.includes('air conditioner')) {
        if (typ.includes('1.0hp')) return 750;
        if (typ.includes('1.5hp')) return 1100;
        if (typ.includes('2.0hp')) return 1500;
        return 1000;
      }
      
      // Electric Fan
      if (cat.includes('fan')) return 75;
      
      // Refrigerator
      if (cat.includes('refrigerator')) {
        if (typ.includes('inverter')) return 100;
        return 150;
      }
      
      // Television
      if (cat.includes('television')) {
        if (typ.includes('32')) return 40;
        if (typ.includes('42')) return 60;
        if (typ.includes('50')) return 100;
        if (typ.includes('55')) return 120;
        if (typ.includes('65')) return 150;
        return 80;
      }
      
      // Rice Cooker
      if (cat.includes('rice')) return 700;
      
      // Electric Kettle
      if (cat.includes('kettle')) return 1800;
      
      // Microwave
      if (cat.includes('microwave')) return 1200;
      
      // Washing Machine
      if (cat.includes('washing')) return 500;
      
      // Iron
      if (cat.includes('iron')) return 1200;
      
      // Water Heater
      if (cat.includes('water heater')) return 3000;
      
      // Computer
      if (cat.includes('computer') || cat.includes('laptop')) {
        if (typ.includes('gaming')) return 300;
        return 150;
      }
      
      // Lighting
      if (cat.includes('lighting')) {
        if (typ.includes('led')) return parseInt(typ.match(/\d+/)?.[0] || 12);
        if (typ.includes('fluorescent')) return 20;
        return 60;
      }
      
      // Charger
      if (cat.includes('charger')) {
        if (typ.includes('fast')) return parseInt(typ.match(/\d+/)?.[0] || 18);
        return 5;
      }
      
      // Stove
      if (cat.includes('stove') || cat.includes('induction')) {
        return parseInt(typ.match(/\d+/)?.[0] || 1200);
      }
      
      return 500; // Default
    };

    const watts = getWattsForAppliance(selectedCategory, selectedType);
    
    // Calculate usage in kWh: (watts * hours * days) / 1000
    const weeklyHours = hoursPerDay * daysPerWeek;
    const usage = Math.round((watts * weeklyHours) / 1000);
    
    // Calculate cost at $0.15 per kWh
    const cost = (usage * 0.15).toFixed(2);
    
    const newAppliance = {
      id: Date.now(),
      name: applianceName,
      category: selectedCategory,
      type: selectedType || 'Standard',
      watts: watts,
      hoursPerDay: hoursPerDay,
      daysPerWeek: daysPerWeek,
      usage: usage,
      cost: parseFloat(cost),
      color: getRandomColor(),
      icon: getApplianceIcon(selectedCategory)
    };
    
    onAddAppliance(newAppliance);
    setSelectedCategory('');
    setSelectedType('');
    setCustomAppliance('');
    setHoursPerDay(0);
    setDaysPerWeek(7);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all appliances?')) {
      onClearAllAppliances();
    }
  };

  const getApplianceIcon = (category) => {
    if (!category) return '🔌';
    
    const catLower = category.toLowerCase();
    
    if (catLower.includes('air conditioner')) return '❄️';
    if (catLower.includes('fan')) return '🌀';
    if (catLower.includes('refrigerator')) return '🧊';
    if (catLower.includes('television')) return '📺';
    if (catLower.includes('rice')) return '🍚';
    if (catLower.includes('kettle')) return '♨️';
    if (catLower.includes('microwave')) return '🔥';
    if (catLower.includes('washing')) return '👕';
    if (catLower.includes('iron')) return '🧺';
    if (catLower.includes('water heater') || catLower.includes('shower')) return '🚿';
    if (catLower.includes('computer') || catLower.includes('laptop')) return '💻';
    if (catLower.includes('lighting') || catLower.includes('bulb')) return '💡';
    if (catLower.includes('charger')) return '🔋';
    if (catLower.includes('stove') || catLower.includes('cooker')) return '🍳';
    return '🔌';
  };

  const getRandomColor = () => {
    const colors = ['#509971', '#3b534a', '#a4b494', '#ffed8c', '#342530'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Transform existing appliances to match the format this component expects
  const transformedAppliances = appliances.map(app => ({
    id: app.id,
    name: app.name || app.type || 'Unknown',
    category: app.category || app.type || 'General',
    type: app.specificType || app.type || 'Standard',
    hoursPerDay: app.hoursPerDay || 0,
    daysPerWeek: app.daysPerWeek || 7,
    ...app
  }));

  return (
    <div className="appliance-manager">
      <div className="manager-header">
        <h2 className="section-title">⚡ Appliance Manager</h2>
        <p className="section-subtext">Track and manage your energy-consuming appliances with specific types</p>
      </div>

      <div className="manager-grid">
        {/* Left Column - Add Appliance Form */}
        <div className="manager-form-section card">
          <div className="form-header">
            <h3><span className="icon">📱</span> Add New Appliance</h3>
            <p className="form-subtext">Select category and specific type for accurate calculations</p>
          </div>
          
          <form onSubmit={handleSubmit} className="add-appliance-form">
            {/* Category Selection */}
            <div className="form-group">
              <label htmlFor="appliance-category" className="form-label">
                <span className="icon">🏷️</span> Appliance Category
              </label>
              <div className="select-container">
                <select
                  id="appliance-category"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedType(''); // Reset type when category changes
                  }}
                  className="form-select"
                  required
                >
                  <option value="">-- Select category --</option>
                  {applianceCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="select-arrow">▼</div>
              </div>
            </div>
            
            {/* Type Selection (only show if category is selected and not "Other") */}
            {selectedCategory && selectedCategory !== 'Other' && applianceTypes[selectedCategory] && (
              <div className="form-group">
                <label htmlFor="appliance-type" className="form-label">
                  <span className="icon">🔧</span> Specific Type / Model
                </label>
                <div className="select-container">
                  <select
                    id="appliance-type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="form-select"
                    required
                  >
                    <option value="">-- Select specific type --</option>
                    {applianceTypes[selectedCategory].map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="select-arrow">▼</div>
                </div>
                <p className="form-hint">
                  Select the specific model for accurate power consumption
                </p>
              </div>
            )}
            
            {/* Custom Appliance Input (only for "Other" category) */}
            {selectedCategory === 'Other' && (
              <div className="form-group">
                <label htmlFor="custom-appliance" className="form-label">
                  <span className="icon">✏️</span> Custom Appliance Name
                </label>
                <input
                  id="custom-appliance"
                  type="text"
                  value={customAppliance}
                  onChange={(e) => setCustomAppliance(e.target.value)}
                  className="form-input"
                  placeholder="Enter custom appliance name"
                  required
                />
              </div>
            )}
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="hours-per-day" className="form-label">
                  <span className="icon">⏰</span> Hours per Day
                </label>
                <div className="input-group">
                  <input
                    id="hours-per-day"
                    type="number"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(Number(e.target.value))}
                    className="form-input"
                    min="0"
                    max="24"
                    step="0.5"
                    required
                  />
                  <span className="input-unit">hrs/day</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="24"
                  step="0.5"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(Number(e.target.value))}
                  className="slider"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="days-per-week" className="form-label">
                  <span className="icon">📅</span> Days per Week
                </label>
                <div className="input-group">
                  <input
                    id="days-per-week"
                    type="number"
                    value={daysPerWeek}
                    onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                    className="form-input"
                    min="1"
                    max="7"
                    required
                  />
                  <span className="input-unit">days/week</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  step="1"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                  className="slider"
                />
              </div>
            </div>
            
            <div className="form-preview">
              <div className="preview-card">
                <h4>Appliance Preview:</h4>
                <p>
                  <strong>Category:</strong> {selectedCategory || 'Not selected'}
                </p>
                {selectedType && (
                  <p>
                    <strong>Type:</strong> {selectedType}
                  </p>
                )}
                <p>
                  <strong>Usage:</strong> {hoursPerDay} hrs/day × {daysPerWeek} days/week
                </p>
                <p className="preview-total">
                  Estimated weekly consumption: <strong>
                    {selectedCategory ? 'Calculating...' : 'Select category'}
                  </strong>
                </p>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn-primary"
              disabled={!selectedCategory || (selectedCategory !== 'Other' && !selectedType)}
            >
              <span className="icon">➕</span> Add Appliance
            </button>
          </form>
          
          {transformedAppliances.length > 0 && (
            <div className="form-footer">
              <button 
                onClick={handleClearAll} 
                className="btn-danger"
              >
                <span className="icon">🗑️</span> Clear All Appliances
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Appliance List */}
        <div className="manager-list-section card">
          <div className="list-header">
            <h3><span className="icon">📋</span> Your Appliances</h3>
            <div className="appliance-count">
              <span className="count-badge">{transformedAppliances.length}</span>
              {transformedAppliances.length === 1 ? 'appliance' : 'appliances'}
            </div>
          </div>
          
          {transformedAppliances.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📺</div>
              <h4>No appliances yet</h4>
              <p>Add your first appliance to start tracking energy usage!</p>
            </div>
          ) : (
            <>
              <div className="appliance-list">
                {transformedAppliances.map((appliance) => (
                  <div key={appliance.id} className="appliance-item">
                    <div className="appliance-icon">
                      {getApplianceIcon(appliance.category)}
                    </div>
                    <div className="appliance-info">
                      <h4>{appliance.name}</h4>
                      <p className="appliance-subtext">
                        <span className="appliance-category">{appliance.category}</span>
                        {appliance.type && appliance.type !== 'Standard' && (
                          <> • <span className="appliance-type">{appliance.type}</span></>
                        )}
                      </p>
                      <div className="appliance-details">
                        <span className="detail-tag">
                          <span className="icon-small">⏱️</span> {appliance.hoursPerDay} hrs/day
                        </span>
                        <span className="detail-tag">
                          <span className="icon-small">📆</span> {appliance.daysPerWeek} days/week
                        </span>
                        <span className="detail-tag">
                          <span className="icon-small">⚡</span> {appliance.watts}W
                        </span>
                        <span className="detail-tag highlight">
                          <span className="icon-small">∑</span> {appliance.usage} kWh/month
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onRemoveAppliance(appliance.id)}
                      className="btn-remove"
                      title="Remove appliance"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="stats-summary">
                <h4><span className="icon">📊</span> Energy Usage Summary</h4>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-value">
                      {Number(transformedAppliances.reduce((total, app) => total + (Number(app.usage) || 0), 0)).toFixed(1)}
                    </div>
                    <div className="stat-label">Total kWh/month</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">
                      ${Number(transformedAppliances.reduce((total, app) => total + (Number(app.cost) || 0), 0)).toFixed(2)}
                    </div>
                    <div className="stat-label">Monthly Cost</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">
                      {transformedAppliances.length}
                    </div>
                    <div className="stat-label">Appliances</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplianceManager;