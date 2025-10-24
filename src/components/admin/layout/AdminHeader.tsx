'use client';

import { Bell, Search, User, Settings } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="bg-bgLight shadow-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-textLight" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg leading-5 bg-bgLight placeholder-textLight focus:outline-none focus:placeholder-textDark focus:ring-1 focus:ring-ring focus:border-ring text-style"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-full text-textLight hover:text-hoverTextLight hover:bg-input focus:outline-none focus:ring-2 focus:ring-ring transition-colors">
            <Bell className="h-5 w-5" />
          </button>

          {/* Settings */}
          <button className="p-2 rounded-full text-textLight hover:text-hoverTextLight hover:bg-input focus:outline-none focus:ring-2 focus:ring-ring transition-colors">
            <Settings className="h-5 w-5" />
          </button>

          {/* User menu */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-bgLight" />
              </div>
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-headingLight heading-style">Admin User</div>
              <div className="text-xs text-textLight text-style">Administrator</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}