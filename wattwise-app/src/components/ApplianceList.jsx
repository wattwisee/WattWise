import React from 'react';
import '../styles/App.css';

const ApplianceList = ({ appliances, onAddAppliance, onClearAppliances }) => {
  const getIcon = (iconName) => {
    const icons = {
      'snowflake': 'fas fa-snowflake',
      'temperature-low': 'fas fa-temperature-low',
      'tv': 'fas fa-tv',
      'tshirt': 'fas fa-tshirt',
      'lightbulb': 'fas fa-lightbulb'
    };
    return icons[iconName] || 'fas fa-plug';
  };

  return (
    <div className="card">
      <h3 className="card-title">Appliance Breakdown</h3>
      
      <div className="appliance-list">
        {appliances.map(appliance => (
          <div key={appliance.id} className="appliance-item">
            <div className="appliance-info">
              <div className="appliance-icon" style={{ backgroundColor: `${appliance.color}20` }}>
                <i className={getIcon(appliance.icon)} style={{ color: appliance.color }}></i>
              </div>
              <div>
                <div className="appliance-name">{appliance.name}</div>
                <div style={{ color: 'var(--text-gray)', fontSize: '14px' }}>
                  {appliance.percentage}% of total usage
                </div>
              </div>
            </div>
            <div className="appliance-usage">
              <div className="usage-value">{appliance.usage} kWh</div>
              <div className="usage-percent">${appliance.cost} this month</div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
        <button className="btn btn-secondary" onClick={onClearAppliances} style={{ flex: 1 }}>
          <i className="fas fa-trash-alt"></i> Clear All
        </button>
        <button className="btn btn-primary" onClick={onAddAppliance} style={{ flex: 1 }}>
          <i className="fas fa-plus"></i> Add Appliance
        </button>
      </div>
    </div>
  );
};

export default ApplianceList;