'use client'

import { useQuery, useMutation } from 'convex/react'
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
  const addApplianceMutation = useMutation(api.appliances.addAppliance)
  const deleteApplianceMutation = useMutation(api.appliances.deleteAppliance)
  const clearAllAppliancesMutation = useMutation(api.appliances.clearAllAppliances)

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

  const handleAddAppliance = async (appliance: any) => {
    console.log('Add appliance:', appliance)
    try {
      await addApplianceMutation({
        name: appliance.name,
        wattage: appliance.watts,
        hoursPerDay: appliance.hoursPerDay,
        type_of_appliance: appliance.type || appliance.category,
        quantity: 1,
      })
      console.log('Appliance saved to Convex!')
    } catch (error) {
      console.error('Failed to save appliance:', error)
    }
  }

  const handleRemoveAppliance = async (id: string) => {
    console.log('Remove appliance:', id)
    try {
      await deleteApplianceMutation({ id: id as any })
    } catch (error) {
      console.error('Failed to remove appliance:', error)
    }
  }

  const handleClearAppliances = async () => {
    console.log('Clear all appliances')
    if (window.confirm('Are you sure you want to remove all appliances?')) {
      try {
        await clearAllAppliancesMutation()
      } catch (error) {
        console.error('Failed to clear appliances:', error)
      }
    }
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
