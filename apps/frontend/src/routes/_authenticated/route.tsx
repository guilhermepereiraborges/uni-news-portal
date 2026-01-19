import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { 
  SidebarInset, 
  SidebarProvider, 
  SidebarTrigger 
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-slate-50/50">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-slate-200 mx-2" />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-500">Admin</span>
              <span className="text-slate-300">/</span>
              <span className="font-medium text-slate-900">Dashboard</span>
            </div>
          </div>
        </header>
        <div className="flex-1 p-4 pt-0 md:p-8">
          <div className="mx-auto max-w-7xl w-full">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
