"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Tag,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  Cloud,
  MessageCircle,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderOpen },
  { name: "Categories", href: "/admin/categories", icon: Tag },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Chats", href: "/admin/chats", icon: MessageCircle },
  { name: "Emails", href: "/admin/emails", icon: Mail },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (!sidebarOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [sidebarOpen]);

  const handleLogout = async () => {
    localStorage.removeItem("adminToken");
    redirect("/adminlogin");
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-bgDark/80 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        data-open={sidebarOpen}
        className={`
        gc-admin-sidebar fixed inset-y-0 left-0 z-50 w-64 bg-bgDark transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-b-gray-700 border-border">
          <Link href="/admin" className="flex items-center space-x-3 group">
            <div className="relative">
              <Cloud className="h-8 w-8 text-primary group-hover:text-primary-dark transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="gc-admin-wordmark font-semibold text-headingDark heading-style">
                GoCloudEx
              </span>
              <span className="text-xs text-textDark text-style">
                Admin Panel
              </span>
            </div>
          </Link>

          <button
            aria-label="Close admin navigation"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-textDark hover:text-hoverTextDark hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          id="admin-navigation"
          aria-label="Admin navigation"
          className="mt-8 px-4 space-y-2"
        >
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors text-style
                  ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-textDark hover:text-hoverTextDark hover:bg-white/10"
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            className="
            flex items-center space-x-3 w-full px-3 py-3 text-sm font-medium text-textDark 
            hover:text-hoverTextDark hover:bg-white/10 rounded-lg transition-colors text-style
          "
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          aria-label="Open admin navigation"
          aria-expanded={sidebarOpen}
          aria-controls="admin-navigation"
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md bg-bgDark text-headingDark border border-border"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </>
  );
}
