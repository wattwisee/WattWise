'use client'

import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Dashboard from '@/src/components/Dashboard'

export default function DashboardPage() {
  const { isSignedIn } = useUser()
  const router = useRouter()
  const appliancesQuery = useQuery(api.appliances.getUserAppliances)
  const budgets = useQuery(api.budgets.getBudget)

  // Transform Convex appliances to Dashboard format
  const transformedAppliances = (appliancesQuery || []).map((a: any) => ({
    _id: a._id,
    id: a._id,
    name: a.name,
    type: a.type_of_appliance || a.type,
    watts: a.wattage || a.watts || 0,
    hoursPerDay: a.hoursPerDay,
    daysPerWeek: 7,
    usage: Math.round(((a.wattage || a.watts || 0) * a.hoursPerDay * 7) / 1000),
    cost: Math.round(((a.wattage || a.watts || 0) * a.hoursPerDay * 7 * 0.15) * 100) / 100
  }))

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/')
    }
  }, [isSignedIn, router])

  if (!isSignedIn) {
    return null
  }

  const handleAddAppliance = (appliance: any) => {
    console.log('Add appliance:', appliance)
  }

  const handleRemoveAppliance = (id: string) => {
    console.log('Remove appliance:', id)
  }

  const handleClearAppliances = () => {
    console.log('Clear all appliances')
  }

  return (
    <Dashboard
      appliances={transformedAppliances}
      onAddAppliance={handleAddAppliance}
      onRemoveAppliance={handleRemoveAppliance}
      onClearAppliances={handleClearAppliances}
    />
  )
}
