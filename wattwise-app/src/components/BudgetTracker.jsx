import React, { useState } from 'react';
import '../styles/App.css';

const BudgetTracker = ({ budget, onUpdateBudget }) => {
  const [budgetInput, setBudgetInput] = useState(budget);
  const progress = Math.min(100, Math.round((128.25 / budget) * 100));

  const handleUpdate = () => {
    if (budgetInput && budgetInput > 0) {
      onUpdateBudget(budgetInput);
    }
  };

  return (
    <div className="card">
      <h3 className="card-title">Budget Tracker</h3>
      <p className="card-subtext">Set a monthly budget to track your spending</p>
      
      <div style={{ margin: '25px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>Budget Progress</span>
          <span><span style={{ fontWeight: '600' }}>{progress}</span>% used</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <span>$0</span>
          <span style={{ fontWeight: '600' }}>${budget}</span>
        </div>
      </div>

      <h4 style={{ margin: '25px 0 15px' }}>Set Monthly Budget</h4>
      <div style={{ display: 'flex', gap: '15px' }}>
        <input 
          type="number" 
          className="budget-input" 
          value={budgetInput}
          onChange={(e) => setBudgetInput(parseInt(e.target.value) || 0)}
          placeholder="Enter budget amount"
        />
        <button className="btn btn-primary" onClick={handleUpdate}>
          Update
        </button>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h4>End of Month Prediction</h4>
        <div style={{ margin: '20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Current Month Usage</span>
            <span style={{ fontWeight: '600' }}>855 kWh</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Predicted Total</span>
            <span style={{ fontWeight: '600', color: 'var(--primary-green)' }}>941 kWh</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>+ Expected</span>
            <span style={{ fontWeight: '600', color: 'var(--accent-red)' }}>+86.0 kWh</span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Rate per kWh</span>
            <span>$0.150</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Current Cost</span>
            <span>${128.25}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Predicted Cost</span>
            <span style={{ fontWeight: '600' }}>${141.15}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Difference</span>
            <span style={{ color: 'var(--accent-red)', fontWeight: '600' }}>+$12.90</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;