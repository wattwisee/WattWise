import React, { useState, useMemo, useEffect } from 'react';
import '../styles/app.css';
import { useRouter } from 'next/navigation';
import { useClerk, UserButton } from '@clerk/nextjs';
import ApplianceManager from './ApplianceManager';
import { Zap, TrendingUp, DollarSign, Calendar, LogOut } from 'lucide-react';

interface Appliance {
  _id?: string;
  id?: string;
  name: string;
  type?: string;
  watts: number;
  hoursPerDay: number;
  daysPerWeek?: number;
  usage: number;
  cost: number;
}

interface DashboardProps {
  appliances: Appliance[];
  onAddAppliance: (appliance: any) => void;
  onRemoveAppliance: (id: string) => void;
  onClearAppliances: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  appliances, 
  onAddAppliance, 
  onRemoveAppliance, 
  onClearAppliances 
}) => {
  const router = useRouter();
  const { signOut, user } = useClerk();
  const [budget, setBudget] = useState(200);
  const [showBudgetWarning, setShowBudgetWarning] = useState(false);

  // Calculate stats DYNAMICALLY from appliances
  const stats = useMemo(() => {
    const totalUsage = appliances.reduce((sum: number, a: Appliance) => sum + (a.usage || 0), 0);
    const currentCost = appliances.reduce((sum: number, a: Appliance) => sum + (a.cost || 0), 0);
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
    const baseUsage = appliances.reduce((sum: number, a: Appliance) => sum + (a.watts * (a.hoursPerDay || 0)), 0) / 1000;
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
    signOut();
    router.push('/');
  };

  return (
    <div className="dashboard-page">
      {/* Budget Warning Modal */}
      {showBudgetWarning && (
        <div className="budget-warning-modal">
          <div className="warning-content">
            <div className="warning-icon">
              <AlertTriangle size={48} />
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
              <Zap size={24} style={{ color: 'var(--primary-green)' }} />
              <span style={{ color: 'var(--primary-green)' }}>WattWise</span>
            </div>
            <div className="header-actions">
              <div className="user-info">
                <UserButton />
                <div className="user-details">
                  <span className="user-name" style={{ color: 'var(--text-dark)' }}>{user?.firstName || 'User'}</span>
                  <span className="user-email" style={{ color: 'var(--text-gray)' }}>{user?.primaryEmailAddress?.emailAddress || ''}</span>
                </div>
              </div>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm" style={{ 
                borderColor: 'var(--primary-green)', 
                color: 'var(--primary-green)' 
              }}>
                <LogOut size={16} />
                <span style={{ marginLeft: '8px' }}>Logout</span>
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
                  }}><TrendingUp size={20} /></div>
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
                  }}><DollarSign size={20} /></div>
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
                  }}><TrendingUp size={20} /></div>
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
                  }}><Calendar size={20} /></div>
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

          {/* Appliance Manager Section */}
          <section className="dashboard-section">
            <ApplianceManager 
              appliances={appliances}
              onAddAppliance={onAddAppliance}
              onRemoveAppliance={onRemoveAppliance}
              onClearAllAppliances={onClearAppliances}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

// Add AlertTriangle import
import { AlertTriangle } from 'lucide-react';

export default Dashboard;
