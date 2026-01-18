import { Outlet, createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/_home')({
  component: PublicLayout,
})

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen"> 
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}