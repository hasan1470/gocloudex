import AdminSidebar from '@/components/admin/layout/AdminSidebar';
import AdminHeader from '@/components/admin/layout/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-input">
      <AdminSidebar />
      <div className="flex-1 flex flex-col lg:ml-0">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8 admin-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}