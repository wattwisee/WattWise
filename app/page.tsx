'use client'

import { Authenticated, Unauthenticated } from 'convex/react'
import { SignInButton, UserButton } from '@clerk/nextjs'
import SyncUser from '../components/SyncUser'
import AppliancesPage from './appliances/page'
import BudgetsPage from './budgets/page'

export default function Home() {
  return (
    <>
      <Authenticated>
        <UserButton />
        <SyncUser />
        <Content />
        <AppliancesPage />
        <BudgetsPage />
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
    </>
  )
}

function Content() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">WattWise</h1>
      <p className="text-lg text-gray-600">
        Welcome to your electricity usage dashboard!
      </p>
      <p className="mt-4 text-sm text-gray-500">
        Add appliances to start tracking your power consumption.
      </p>
    </main>

  )
}


