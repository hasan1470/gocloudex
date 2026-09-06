import ClientHeader from "@/components/client/layout/ClientHeader";
import ClientFooter from "@/components/client/layout/ClientFooter";
import ChatWidget from "@/components/ChatWidget";
import RouteScrollReset from "@/components/RouteScrollReset";
import PageMotion from "@/components/marketing/PageMotion";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="gc-client-shell min-h-screen flex flex-col bg-bgLight">
      <RouteScrollReset />
      <PageMotion />
      <ChatWidget />
      <ClientHeader />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <ClientFooter />
    </div>
  );
}
