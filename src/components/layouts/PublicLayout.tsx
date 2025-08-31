import { ReactNode } from "react";
import PublicHeader from "@/components/PublicHeader";
import Footer from "@/components/Footer";

interface PublicLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PublicLayout({
  children,
  className = "",
}: PublicLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className} flex flex-col`}>
      <PublicHeader />

      <main className='flex-1'>{children}</main>

      <Footer />
    </div>
  );
}
