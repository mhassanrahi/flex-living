import { ReactNode } from "react";
import AdminHeader from "@/components/AdminHeader";

interface AdminLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function AdminLayout({
  children,
  className = "",
}: AdminLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <AdminHeader />

      <main className='flex-1'>{children}</main>
    </div>
  );
}
