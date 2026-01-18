import { createFileRoute } from '@tanstack/react-router'
import { Home } from '@/view/pages/Home'

export const Route = createFileRoute('/_home/')({
  component: Home,
})
