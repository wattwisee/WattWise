import React, { useState, useMemo, useEffect } from 'react';
import '../styles/app.css';
import { useNavigate } from 'react-router-dom';
import ApplianceManager from './ApplianceManager.jsx';

const Dashboard = ({ appliances, onAddAppliance, onRemoveAppliance, onClearAppliances }) => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(200);
  const [showBudgetWarning, setShowBudgetWarning] = useState(false);

  // Calculate stats DYNAMICALLY from appliances
  const stats = useMemo(() => {
    const totalUsage = appliances.reduce((sum, a) => sum + a.usage, 0);
    const currentCost = appliances.reduce((sum, a) => sum + parseFloat(a.cost), 0);
    const predictedTotal = Math.round(totalUsage * 1.1); // 10% increase prediction
    const daysRemaining = 5;
    
    return {
      totalUsage,
      currentCost: currentCost.toFixed(2),
      predictedTotal,
      daysRemaining
    };
  }, [appliances]);

  // Check budget warning
  useEffect(() => {
    const spentPercentage = (parseFloat(stats.currentCost) / budget) * 100;
    if (spentPercentage > 80) {
      setShowBudgetWarning(true);
    } else {
      setShowBudgetWarning(false);
    }
  }, [stats.currentCost, budget]);

  // Generate daily usage data based on appliances
  const dailyUsage = useMemo(() => {
    // Calculate total daily usage in kWh: (watts * hours) / 1000
    const baseUsage = appliances.reduce((sum, a) => sum + (a.watts * a.hoursPerDay), 0) / 1000;
    const days = ['Jan 1', 'Jan 3', 'Jan 5', 'Jan 7', 'Jan 9', 'Jan 11', 'Jan 13', 'Jan 15', 
                 'Jan 17', 'Jan 19', 'Jan 21', 'Jan 23', 'Jan 25', 'Jan 27', 'Jan 29', 'Jan 31'];
    
    return days.map((day, index) => {
      const variation = 0.8 + (Math.random() * 0.4);
      const actual = Math.round(baseUsage * variation);
      const predicted = Math.round(baseUsage * (0.9 + (Math.random() * 0.2)));
      
      return { day, actual, predicted };
    });
  }, [appliances]);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSetBudget = () => {
    alert(`Budget set to $${budget}`);
  };

  return (
    <div className="dashboard-page">
      {/* Budget Warning Modal */}
      {showBudgetWarning && (
        <div className="budget-warning-modal">
          <div className="warning-content">
            <div className="warning-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Budget Alert!</h3>
            <p>You've spent ${stats.currentCost} of your ${budget} budget ({Math.round((parseFloat(stats.currentCost) / budget) * 100)}%)</p>
            <p>You're approaching your monthly budget limit.</p>
            <button onClick={() => setShowBudgetWarning(false)} className="btn btn-primary">
              Acknowledge
            </button>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <i className="fas fa-bolt" style={{ color: 'var(--primary-green)' }}></i>
              <span style={{ color: 'var(--primary-green)' }}>WattWise</span>
            </div>
            <div className="header-actions">
              <div className="user-info">
                <div className="user-avatar" style={{ backgroundColor: 'var(--primary-green)' }}>
                  <i className="fas fa-user" style={{ color: 'white' }}></i>
                </div>
                <div className="user-details">
                  <span className="user-name" style={{ color: 'var(--text-dark)' }}>John Doe</span>
                  <span className="user-email" style={{ color: 'var(--text-gray)' }}>john@example.com</span>
                </div>
              </div>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm" style={{ 
                borderColor: 'var(--primary-green)', 
                color: 'var(--primary-green)' 
              }}>
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content - Scrollable */}
      <main className="dashboard-main dashboard-scroll">
        <div className="container">
          {/* Main Stats Section */}
          <section className="dashboard-section" style={{ 
            backgroundColor: 'var(--card-light)',
            borderColor: 'var(--border-light)'
          }}>
            <h1 className="section-title-main" style={{ color: 'var(--text-dark)' }}>Energy Dashboard</h1>
            
            <div className="main-stats-grid">
              {/* Total Usage Card */}
              <div className="stat-card" style={{ 
                backgroundColor: 'white',
                borderColor: 'rgba(0, 168, 107, 0.1)'
              }}>
                <div className="stat-header">
                  <h3 className="stat-title" style={{ color: 'var(--text-gray)' }}>Total Usage</h3>
                  <div className="stat-icon" style={{ 
                    background: 'linear-gradient(135deg, var(--primary-green), #00d084)',
                    color: 'white'
                  }}>⚡</div>
                </div>
                <div className="stat-value" style={{ color: 'var(--text-dark)' }}>{stats.totalUsage} kWh</div>
                <div className="stat-subtext" style={{ color: 'var(--text-gray)' }}>This month (Calculated)</div>
                <div className="progress-bar" style={{ backgroundColor: 'var(--border-light)' }}>
                  <div className="progress-fill" style={{ 
                    width: `${Math.min((stats.totalUsage / 1000) * 100, 100)}%`,
                    background: 'linear-gradient(90deg, var(--primary-green), #00d084)'
                  }}></div>
                </div>
                <div className="progress-labels">
                  <span style={{ color: 'var(--text-gray)' }}>0 kWh</span>
                  <span style={{ color: 'var(--text-gray)' }}>{Math.round((stats.totalUsage / 1000) * 100)}%</span>
                  <span style={{ color: 'var(--text-gray)' }}>1000 kWh</span>
                </div>
              </div>

              {/* Current Cost Card */}
              <div className="stat-card" style={{ 
                backgroundColor: 'white',
                borderColor: 'rgba(0, 168, 107, 0.1)'
              }}>
                <div className="stat-header">
                  <h3 className="stat-title" style={{ color: 'var(--text-gray)' }}>Current Cost</h3>
                  <div className="stat-icon" style={{ 
                    background: 'linear-gradient(135deg, var(--primary-green), #00d084)',
                    color: 'white'
                  }}>💰</div>
                </div>
                <div className="stat-value" style={{ color: 'var(--text-dark)' }}>${stats.currentCost}</div>
                <div className="stat-subtext" style={{ color: 'var(--text-gray)' }}>Based on usage</div>
                <div className="progress-bar" style={{ backgroundColor: 'var(--border-light)' }}>
                  <div className="progress-fill" style={{ 
                    width: `${Math.min((parseFloat(stats.currentCost) / 200) * 100, 100)}%`,
                    background: 'linear-gradient(90deg, var(--primary-green), #00d084)'
                  }}></div>
                </div>
                <div className="progress-labels">
                  <span style={{ color: 'var(--text-gray)' }}>$0</span>
                  <span style={{ color: 'var(--text-gray)' }}>{Math.round((parseFloat(stats.currentCost) / 200) * 100)}%</span>
                  <span style={{ color: 'var(--text-gray)' }}>$200</span>
                </div>
              </div>

              {/* Predicted Total Card */}
              <div className="stat-card" style={{ 
                backgroundColor: 'white',
                borderColor: 'rgba(0, 168, 107, 0.1)'
              }}>
                <div className="stat-header">
                  <h3 className="stat-title" style={{ color: 'var(--text-gray)' }}>Predicted Total</h3>
                  <div className="stat-icon" style={{ 
                    background: 'linear-gradient(135deg, var(--primary-green), #00d084)',
                    color: 'white'
                  }}>📈</div>
                </div>
                <div className="stat-value" style={{ color: 'var(--text-dark)' }}>{stats.predictedTotal} kWh</div>
                <div className="stat-subtext" style={{ color: 'var(--text-gray)' }}>End of month forecast</div>
                <div className="progress-bar" style={{ backgroundColor: 'var(--border-light)' }}>
                  <div className="progress-fill" style={{ 
                    width: `${Math.min((stats.predictedTotal / 1000) * 100, 100)}%`,
                    background: 'linear-gradient(90deg, var(--primary-green), #00d084)'
                  }}></div>
                </div>
                <div className="progress-labels">
                  <span style={{ color: 'var(--text-gray)' }}>0 kWh</span>
                  <span style={{ color: 'var(--text-gray)' }}>{Math.round((stats.predictedTotal / 1000) * 100)}%</span>
                  <span style={{ color: 'var(--text-gray)' }}>1000 kWh</span>
                </div>
              </div>

              {/* Days Remaining Card */}
              <div className="stat-card" style={{ 
                backgroundColor: 'white',
                borderColor: 'rgba(0, 168, 107, 0.1)'
              }}>
                <div className="stat-header">
                  <h3 className="stat-title" style={{ color: 'var(--text-gray)' }}>Days Remaining</h3>
                  <div className="stat-icon" style={{ 
                    background: 'linear-gradient(135deg, var(--primary-green), #00d084)',
                    color: 'white'
                  }}>📅</div>
                </div>
                <div className="stat-value" style={{ color: 'var(--text-dark)' }}>{stats.daysRemaining}</div>
                <div className="stat-subtext" style={{ color: 'var(--text-gray)' }}>Until end of month</div>
                <div className="progress-bar" style={{ backgroundColor: 'var(--border-light)' }}>
                  <div className="progress-fill" style={{ 
                    width: '83.9%',
                    background: 'linear-gradient(90deg, var(--primary-green), #00d084)'
                  }}></div>
                </div>
                <div className="progress-labels">
                  <span style={{ color: 'var(--text-gray)' }}>Start</span>
                  <span style={{ color: 'var(--text-gray)' }}>83.9%</span>
                  <span style={{ color: 'var(--text-gray)' }}>End</span>
                </div>
              </div>
            </div>
          </section>

          {/* NEW: Energy Usage Graph Section */}
          <section className="dashboard-section" style={{ 
            backgroundColor: 'var(--card-light)',
            borderColor: 'var(--border-light)'
          }}>
            <h2 className="section-title" style={{ color: 'var(--text-dark)' }}>Energy Usage Trend</h2>
            <p className="section-subtitle" style={{ color: 'var(--text-gray)' }}>Weekly consumption pattern</p>
            
            <div className="energy-graph-container" style={{ 
              backgroundColor: 'white',
              borderColor: 'var(--border-light)'
            }}>
              <div className="graph-header">
                <div className="graph-legend">
                  <div className="legend-item">
                    <div className="legend-color usage" style={{ backgroundColor: 'var(--primary-green)' }}></div>
                    <span style={{ color: 'var(--text-gray)' }}>Daily Usage (kWh)</span>
                  </div>
                </div>
              </div>
              
              <div className="graph-wrapper">
                <div className="graph-y-axis">
                  <div className="y-label" style={{ color: 'var(--text-gray)' }}>40 kWh</div>
                  <div className="y-label" style={{ color: 'var(--text-gray)' }}>30 kWh</div>
                  <div className="y-label" style={{ color: 'var(--text-gray)' }}>20 kWh</div>
                  <div className="y-label" style={{ color: 'var(--text-gray)' }}>10 kWh</div>
                  <div className="y-label" style={{ color: 'var(--text-gray)' }}>0 kWh</div>
                </div>
                
                <div className="graph-area">
                  <div className="graph-grid">
                    {/* Horizontal grid lines */}
                    <div className="grid-line" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}></div>
                    <div className="grid-line" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}></div>
                    <div className="grid-line" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}></div>
                    <div className="grid-line" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}></div>
                    <div className="grid-line" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}></div>
                    
                    {/* Data line */}
                    <svg className="graph-line" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path 
                      d={dailyUsage.reduce((path, day, i) => {
                      const x = i * (100 / (dailyUsage.length - 1));
                     const y = 40 - day.actual;
                      return path + (i === 0 ? `M ${x},${y}` : ` L ${x},${y}`);
                      }, '')}
                       fill="none"
                         stroke="var(--primary-green)"
                         strokeWidth="3"
                           />
                        {/* Data points */}
                        {dailyUsage.map((day, i) => (
                          <circle 
                            key={i}
                            cx={i * (100 / (dailyUsage.length - 1))} 
                            cy={40 - day.actual}
                            r="3" 
                            fill="var(--primary-green)"
                          />
                        ))}
                      </svg>
                  </div>
                  
                  <div className="graph-x-axis" style={{ borderTopColor: 'var(--border-light)' }}>
                    {dailyUsage.map((day, i) => (
                      <div key={i} className="x-label" style={{ color: 'var(--text-gray)' }}>{day.day}</div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="graph-stats" style={{ borderTopColor: 'var(--border-light)' }}>
                <div className="graph-stat">
                  <div className="stat-label" style={{ color: 'var(--text-gray)' }}>Peak Usage</div>
                  <div className="stat-value" style={{ color: 'var(--primary-green)' }}>
                    {Math.max(...dailyUsage.map(d => d.actual))} kWh
                  </div>
                </div>
                <div className="graph-stat">
                  <div className="stat-label" style={{ color: 'var(--text-gray)' }}>Average Daily</div>
                  <div className="stat-value" style={{ color: 'var(--primary-green)' }}>
                    {Math.round(dailyUsage.reduce((sum, d) => sum + d.actual, 0) / dailyUsage.length)} kWh
                  </div>
                </div>
                <div className="graph-stat">
                  <div className="stat-label" style={{ color: 'var(--text-gray)' }}>Total This Period</div>
                  <div className="stat-value" style={{ color: 'var(--primary-green)' }}>
                    {dailyUsage.reduce((sum, d) => sum + d.actual, 0)} kWh
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* IMPROVED: End of Month Prediction - Box Design */}
          <section className="dashboard-section" style={{ 
            backgroundColor: 'var(--card-light)',
            borderColor: 'var(--border-light)'
          }}>
            <h2 className="section-title" style={{ color: 'var(--text-dark)' }}>End of Month Prediction</h2>
            <p className="section-subtitle" style={{ color: 'var(--text-gray)' }}>Based on current usage patterns</p>
            
            <div className="prediction-box" style={{ 
              background: 'linear-gradient(135deg, var(--light-bg), #e2e8f0)',
              borderColor: 'var(--border-light)'
            }}>
              <div className="prediction-header" style={{ 
                backgroundColor: 'white',
                borderBottomColor: 'var(--border-light)'
              }}>
                <div className="prediction-icon" style={{ 
                  background: 'linear-gradient(135deg, var(--primary-green), #00d084)'
                }}>
                  <i className="fas fa-crystal-ball" style={{ color: 'white' }}></i>
                </div>
                <div className="prediction-title">
                  <h3 style={{ color: 'var(--text-dark)' }}>Monthly Forecast</h3>
                  <p style={{ color: 'var(--text-gray)' }}>Updated in real-time based on your appliances</p>
                </div>
              </div>
              
              <div className="prediction-content">
                <div className="prediction-row">
                  <div className="prediction-item-box" style={{ 
                    backgroundColor: 'white',
                    borderColor: 'var(--border-light)'
                  }}>
                    <div className="prediction-label" style={{ color: 'var(--text-gray)' }}>Current Month Usage</div>
                    <div className="prediction-value-large" style={{ color: 'var(--text-dark)' }}>{stats.totalUsage} kWh</div>
                    <div className="prediction-subtext" style={{ color: 'var(--text-gray)' }}>Actual consumption</div>
                  </div>
                  
                  <div className="prediction-arrow">
                    <i className="fas fa-arrow-right" style={{ color: 'var(--text-gray)' }}></i>
                  </div>
                  
                  <div className="prediction-item-box highlight" style={{ 
                    background: 'linear-gradient(135deg, var(--primary-green), #00d084)'
                  }}>
                    <div className="prediction-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Predicted Total</div>
                    <div className="prediction-value-large" style={{ color: 'white' }}>{stats.predictedTotal} kWh</div>
                    <div className="prediction-change positive" style={{ 
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white'
                    }}>
                      <i className="fas fa-arrow-up"></i>
                      +{stats.predictedTotal - stats.totalUsage} kWh expected
                    </div>
                  </div>
                </div>
                
                <div className="prediction-divider" style={{ backgroundColor: 'var(--border-light)' }}></div>
                
                <div className="prediction-details">
                  <div className="detail-item" style={{ 
                    backgroundColor: 'white',
                    borderColor: 'var(--border-light)'
                  }}>
                    <div className="detail-icon" style={{ 
                      backgroundColor: 'var(--light-bg)',
                      color: 'var(--primary-green)'
                    }}>
                      <i className="fas fa-money-bill-wave"></i>
                    </div>
                    <div className="detail-content">
                      <div className="detail-label" style={{ color: 'var(--text-gray)' }}>Current Cost</div>
                      <div className="detail-value" style={{ color: 'var(--text-dark)' }}>${stats.currentCost}</div>
                    </div>
                  </div>
                  
                  <div className="detail-item" style={{ 
                    backgroundColor: 'white',
                    borderColor: 'var(--border-light)'
                  }}>
                    <div className="detail-icon" style={{ 
                      backgroundColor: 'var(--light-bg)',
                      color: 'var(--primary-green)'
                    }}>
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div className="detail-content">
                      <div className="detail-label" style={{ color: 'var(--text-gray)' }}>Predicted Cost</div>
                      <div className="detail-value" style={{ color: 'var(--text-dark)' }}>${(parseFloat(stats.currentCost) * 1.1).toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div className="detail-item" style={{ 
                    backgroundColor: 'white',
                    borderColor: 'var(--border-light)'
                  }}>
                    <div className="detail-icon" style={{ 
                      backgroundColor: 'var(--light-bg)',
                      color: 'var(--primary-green)'
                    }}>
                      <i className="fas fa-balance-scale"></i>
                    </div>
                    <div className="detail-content">
                      <div className="detail-label" style={{ color: 'var(--text-gray)' }}>Difference</div>
                      <div className="detail-value positive" style={{ color: 'var(--primary-green)' }}>
                        +${(parseFloat(stats.currentCost) * 0.1).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="detail-item" style={{ 
                    backgroundColor: 'white',
                    borderColor: 'var(--border-light)'
                  }}>
                    <div className="detail-icon" style={{ 
                      backgroundColor: 'var(--light-bg)',
                      color: 'var(--primary-green)'
                    }}>
                      <i className="fas fa-bolt"></i>
                    </div>
                    <div className="detail-content">
                      <div className="detail-label" style={{ color: 'var(--text-gray)' }}>Rate per kWh</div>
                      <div className="detail-value" style={{ color: 'var(--text-dark)' }}>$0.150</div>
                    </div>
                  </div>
                </div>
                
                <div className="prediction-note" style={{ 
                  backgroundColor: 'rgba(0, 168, 107, 0.1)',
                  color: 'var(--primary-green)'
                }}>
                  <i className="fas fa-info-circle"></i>
                  <span>Based on your {appliances.length} appliances and usage patterns</span>
                </div>
              </div>
            </div>
          </section>

          {/* IMPROVED: Budget Tracker with Warning System */}
          <section className="dashboard-section budget-section" style={{ 
            background: 'linear-gradient(135deg, var(--primary-blue), #5a9cff)',
            border: 'none'
          }}>
            <div className="budget-header">
              <div className="budget-title-content">
                <h2 className="section-title budget-title" style={{ color: 'white' }}>$ Budget Tracker</h2>
                <p className="budget-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Set a monthly budget to track your spending</p>
              </div>
              {showBudgetWarning && (
                <div className="budget-warning-badge" style={{ 
                  background: 'linear-gradient(135deg, var(--accent-red), #ff5252)',
                  color: 'white'
                }}>
                  <i className="fas fa-exclamation-circle"></i>
                  <span>Approaching Limit!</span>
                </div>
              )}
            </div>
            
            <div className="budget-content">
              <div className="budget-input-group">
                <div className="budget-input-wrapper">
                  <div className="currency-symbol" style={{ color: 'var(--text-gray)' }}>$</div>
                  <input
                    type="number"
                    className="budget-input"
                    placeholder="Enter monthly budget"
                    value={budget}
                    onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
                    min="0"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      color: '#333'
                    }}
                  />
                </div>
                <button onClick={handleSetBudget} className="btn btn-primary" style={{ 
                  backgroundColor: 'white',
                  color: 'var(--primary-blue)'
                }}>
                  <i className="fas fa-check"></i> Set Budget
                </button>
              </div>
              
              <div className="budget-display" style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}>
                <div className="budget-stats">
                  <div className="budget-stat">
                    <div className="budget-stat-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Current Spending</div>
                    <div className="budget-stat-value" style={{ color: 'white' }}>${stats.currentCost}</div>
                  </div>
                  <div className="budget-stat">
                    <div className="budget-stat-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Remaining</div>
                    <div className={`budget-stat-value ${(budget - parseFloat(stats.currentCost)) < 50 ? 'warning' : ''}`} 
                         style={{ 
                           color: (budget - parseFloat(stats.currentCost)) < 50 ? 'var(--accent-red)' : 'white'
                         }}>
                      ${(budget - parseFloat(stats.currentCost)).toFixed(2)}
                    </div>
                  </div>
                  <div className="budget-stat">
                    <div className="budget-stat-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Budget</div>
                    <div className="budget-stat-value" style={{ color: 'white' }}>${budget}</div>
                  </div>
                </div>
                
                <div className="budget-progress-container">
                  <div className="progress-bar budget-progress" style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                  }}>
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${Math.min((parseFloat(stats.currentCost) / budget) * 100, 100)}%`,
                        background: (parseFloat(stats.currentCost) / budget) > 0.8 ? 
                          'linear-gradient(90deg, var(--accent-red), #ff5252)' : 
                          'linear-gradient(90deg, white, #f0f0f0)'
                      }}
                    ></div>
                  </div>
                  <div className="progress-markers">
                    <div className="marker" style={{ left: '80%' }}>
                      <div className="marker-line" style={{ backgroundColor: 'var(--accent-red)' }}></div>
                      <div className="marker-label" style={{ color: 'var(--accent-red)' }}>Warning (80%)</div>
                    </div>
                  </div>
                </div>
                
                <div className="progress-labels">
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>$0</span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>${stats.currentCost}</span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>${budget}</span>
                </div>
                
                <div className="budget-tip" style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }}>
                  <i className="fas fa-lightbulb"></i>
                  {parseFloat(stats.currentCost) > budget ? (
                    <span>You've exceeded your budget! Consider reducing appliance usage.</span>
                  ) : (parseFloat(stats.currentCost) / budget) > 0.8 ? (
                    <span>You're approaching your budget limit. Monitor your usage carefully.</span>
                  ) : (
                    <span>You're within budget. Keep up the good energy management!</span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Daily Usage Overview */}
<section className="dashboard-section">
  <h2 className="section-title">Daily Usage Overview</h2>
  <p className="section-subtitle">Electricity consumption for the past 30 days</p>
  
  <div className="chart-container">
    <div className="chart-header">
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color actual"></div>
          <span>Actual Usage</span>
        </div>
        <div className="legend-item">
          <div className="legend-color predicted"></div>
          <span>Predicted</span>
        </div>
      </div>
    </div>
    
    <div className="chart-grid">
      {/* Chart bars */}
      <div className="chart-bars-container">
        <div className="chart-bars">
          {dailyUsage.map((day, index) => (
            <div key={index} className="bar-group">
              <div 
                className="bar actual-bar" 
                style={{ height: `${day.actual * 2}px` }}
                title={`Actual: ${day.actual} kWh`}
              ></div>
              <div 
                className="bar predicted-bar" 
                style={{ height: `${day.predicted * 2}px` }}
                title={`Predicted: ${day.predicted} kWh`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

{/* Appliance Breakdown */}
{appliances.length > 0 && (
  <section className="dashboard-section">
    <h2 className="section-title">Appliance Breakdown</h2>
    <p className="section-subtitle">Monthly breakdown</p>
    
    <div className="appliance-content">
      {/* Pie Chart Visualization */}
      <div className="appliance-pie">
        <div className="pie-chart">
          <div className="pie-chart-visual">
            <div className="pie-segment" style={{
              background: `conic-gradient(${appliances.map((app, i) => `${app.color} ${i === 0 ? '0%' : appliances.slice(0, i).reduce((sum, a) => sum + a.percentage, 0) + '%'} ${appliances.slice(0, i + 1).reduce((sum, a) => sum + a.percentage, 0)}%`).join(', ')})`
            }}></div>
          </div>
          <div className="pie-legend">
            {appliances.map((appliance) => (
              <div key={appliance.id} className="pie-legend-item">
                <div 
                  className="pie-color" 
                  style={{ backgroundColor: appliance.color }}
                ></div>
                <span>{appliance.name}</span>
                <span>{appliance.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Appliance Table */}
      <div className="appliance-table-container">
        <table className="appliance-table">
          <thead>
            <tr>
              <th>Appliance</th>
              <th>Usage</th>
              <th>Cost</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {appliances.map((appliance) => (
              <tr key={appliance.id}>
                <td>
                  <div className="appliance-name">
                    <div 
                      className="appliance-color" 
                      style={{ backgroundColor: appliance.color }}
                    ></div>
                    {appliance.name}
                  </div>
                </td>
                <td>{appliance.usage} kWh</td>
                <td>${appliance.cost} this month</td>
                <td>
                  <div className="percentage-bar">
                    <div 
                      className="percentage-fill"
                      style={{ 
                        width: `${appliance.percentage}%`,
                        backgroundColor: appliance.color
                      }}
                    ></div>
                    <span>{appliance.percentage}%</span>
                  </div>
                </td>
              </tr>
            ))}
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td><strong>{stats.totalUsage} kWh</strong></td>
              <td><strong>${stats.currentCost}</strong></td>
              <td><strong>100%</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
)}

{/* Appliance Manager Section */}
<section className="dashboard-section">
  <ApplianceManager 
  appliances={appliances}
  onAddAppliance={onAddAppliance}
  onRemoveAppliance={onRemoveAppliance}
  onClearAllAppliances={onClearAppliances} // CHANGED PROP NAME
/>
</section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;