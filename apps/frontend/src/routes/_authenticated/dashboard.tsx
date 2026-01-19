import { createFileRoute } from '@tanstack/react-router'
import { UnderConstruction } from '@/components/UnderConstruction'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return  <UnderConstruction />
}

