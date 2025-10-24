import ClientHeader from '@/components/client/layout/ClientHeader';
import ClientFooter from '@/components/client/layout/ClientFooter';


export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bgLight">
      <ClientHeader />
      <main className="flex-1">
        {children}
      </main>
      <ClientFooter />
    </div>
  );
}