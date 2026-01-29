'use client'

import { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'

export default function BudgetsPage() {
  const budgets = useQuery(api.budgets.getBudget)
  const addBudget = useMutation(api.budgets.addBudget)
  
  const [budget, setBudget] = useState(0)
  const [selected_provider, setSelectedProvider] = useState("")

  return (
    <div>
      <h1>Budget Settings</h1>
      
      <input 
        type="number" 
        placeholder="Monthly Budget (PHP)" 
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value) || 0)}
      />
      
      <input 
        type="text" 
        placeholder="Electricity Provider" 
        value={selected_provider}
        onChange={(e) => setSelectedProvider(e.target.value)}
      />

      <button onClick={() => addBudget({
        budget,
        selected_provider,
        calculated_kWh_per_appliance: {},  // Fill this
        monthly_total_kWh: 0,
        estimated_bill: 0,
        rate_used: 0,
        time_stamps: [],
      })}>
        Set Budget
      </button>

      {budgets?.map((b: { _id: any; budget: number; selected_provider: string }) => (
        <div key={b._id}>
            Budget: PHP {b.budget} - {b.selected_provider}
        </div>
        ))}

    </div>
  )
}
