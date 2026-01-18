import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { Sidebar } from '@/components/admin/Sidebar'
import { AdminHeader } from '@/components/admin/Header'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {

    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50/50 font-sans">      
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">        
      <AdminHeader />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="mx-auto max-w-7xl w-full">
             <Outlet />
          </div>
        </main>

      </div>
    </div>
  )
}