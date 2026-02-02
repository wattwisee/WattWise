export const appliances = [
  { 
    id: 1, 
    name: "Air Conditioner", 
    usage: 325, 
    cost: 48.75, 
    percentage: 38, 
    icon: "snowflake",
    color: "#00a86b" 
  },
  { 
    id: 2, 
    name: "Refrigerator", 
    usage: 180, 
    cost: 27.00, 
    percentage: 21, 
    icon: "temperature-low",
    color: "#3a86ff" 
  },
  { 
    id: 3, 
    name: "Television", 
    usage: 95, 
    cost: 14.25, 
    percentage: 11, 
    icon: "tv",
    color: "#ff6b6b" 
  },
  { 
    id: 4, 
    name: "Washing Machine", 
    usage: 120, 
    cost: 18.00, 
    percentage: 14, 
    icon: "tshirt",
    color: "#ffd166" 
  },
  { 
    id: 5, 
    name: "Lighting", 
    usage: 135, 
    cost: 20.25, 
    percentage: 16, 
    icon: "lightbulb",
    color: "#9d4edd" 
  }
];

export const dashboardStats = {
  totalUsage: 855,
  currentCost: 128.25,
  predictedTotal: 941,
  daysRemaining: 5,
  ratePerKwh: 0.150,
  predictedCost: 141.15,
  budget: 150
};

export const dailyData = {
  labels: Array.from({length: 30}, (_, i) => `Jan ${i+1}`),
  actual: [65, 59, 80, 81, 56, 55, 70, 75, 72, 68, 60, 65, 70, 78, 82, 85, 88, 90, 87, 83, 80, 78, 75, 72, 68, 65, 70, 75, 78, 80],
  predicted: [60, 62, 75, 78, 60, 58, 72, 78, 75, 70, 65, 68, 72, 80, 85, 88, 90, 92, 90, 85, 82, 80, 78, 75, 72, 68, 72, 78, 82, 85]
};