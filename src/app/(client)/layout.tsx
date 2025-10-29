'use client';

import ClientHeader from '@/components/client/layout/ClientHeader';
import ClientFooter from '@/components/client/layout/ClientFooter';
import ChatWidget from '@/components/ChatWidget';


export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bgLight">
      <ChatWidget />
      <ClientHeader />  
      <main className="flex-1">
        {children}
      </main>
      <ClientFooter />
    </div>
  );
}