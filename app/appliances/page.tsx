'use client'

import { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { applianceList } from '../../lib/appliances'

export default function AppliancesPage() {

  const appliances = useQuery(api.appliances.getUserAppliances)
  
  const addAppliance = useMutation(api.appliances.addAppliance)
  const deleteAppliance = useMutation(api.appliances.deleteAppliance)
  

  const [name, setName] = useState("")
  const [wattage, setWattage] = useState(0)
  const [type_of_appliance, setTypeOfAppliance] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [hoursPerDay, setHoursPerDay] = useState(0)

  
  return (
    <div>
      {/* Text boxes */}
      <input 
        type="text" 
        placeholder="Appliance name" 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Wattage" 
        value={wattage}
        onChange={(e) => setWattage(Number(e.target.value) || 0)}

      />
      <select
        value={type_of_appliance}
        onChange={(e) => setTypeOfAppliance(e.target.value)}
      >
        <option value="">Select an appliance</option>
        {applianceList.map((appliance) => (
          <option key={appliance} value={appliance}>
            {appliance}
          </option>
        ))}
      </select>
      <input 
        type="number" 
        placeholder="Quantity" 
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value) || 0)}
      />
      <input 
        type="number" 
        placeholder="Hours per day" 
        value={hoursPerDay}
        onChange={(e) => setHoursPerDay(Number(e.target.value) || 0)}
      />
      
      {/* Button */}
      <button onClick={() => addAppliance({ 
        name, 
        wattage,
        hoursPerDay,
        type_of_appliance,
        quantity,
      })}>
        Add Appliance
      </button>

      {/* List */}
      {appliances?.map((app) => (
        <div key={app._id}>
          <span>{app.name} - {app.wattage}W</span>
          <button onClick={() => deleteAppliance({ id: app._id })}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
