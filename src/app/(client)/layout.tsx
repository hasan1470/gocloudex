import ClientHeader from "@/components/client/layout/ClientHeader";
import ClientFooter from "@/components/client/layout/ClientFooter";
import ChatWidget from "@/components/ChatWidget";
import RouteScrollReset from "@/components/RouteScrollReset";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bgLight">
      <RouteScrollReset />
      <ChatWidget />
      <ClientHeader />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <ClientFooter />
    </div>
  );
}
