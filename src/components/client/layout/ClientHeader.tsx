'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Cloud, 
  Menu, 
  X, 
  ChevronDown,
  User,
  Mail,
  Sparkles
} from 'lucide-react';
import { mainNavigation, NavigationItem } from '@/data/navigation';
import MegaMenu from './MegaMenu';

export default function ClientHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const handleMegaMenuToggle = (menuName: string) => {
    setActiveMegaMenu(activeMegaMenu === menuName ? null : menuName);
  };

  const handleMegaMenuClose = () => {
    setActiveMegaMenu(null);
  };

  const getActiveMegaMenuData = () => {
    if (!activeMegaMenu) return null;
    const navItem = mainNavigation.find(item => item.name === activeMegaMenu);
    return navItem?.megaMenuData || null;
  };

  return (
    <>
      <header className="bg-bgLight/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex w-full items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Cloud className="h-10 w-10 text-primary group-hover:text-primary-dark transition-colors" />
                <Sparkles className="h-4 w-4 text-accent absolute -top-1 -right-1" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary heading-style">GoCloudEx</span>
                <span className="text-sm text-textLight -mt-1 text-style">Cloud Solutions</span>
              </div>
            </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {mainNavigation.map((item: NavigationItem) => {
                const isActive = pathname === item.href;
                const hasMegaMenu = item.hasMegaMenu;
                const isMegaMenuOpen = activeMegaMenu === item.name;
                
                return (
                  <div key={item.name} className="relative">
                    {hasMegaMenu ? (
                      <button
                        onClick={() => handleMegaMenuToggle(item.name)}
                        className={`flex items-center space-x-1 text-sm font-medium transition-all duration-200 px-3 py-2 rounded-lg text-style ${
                          isActive || isMegaMenuOpen
                            ? 'text-primary bg-primary/10 border border-primary/20' 
                            : 'text-textLight hover:text-hoverHeadingLight hover:bg-input'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          isMegaMenuOpen ? 'rotate-180' : ''
                        }`} />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-1 text-sm font-medium transition-all duration-200 px-3 py-2 rounded-lg text-style ${
                          isActive 
                            ? 'text-primary bg-primary/10 border border-primary/20' 
                            : 'text-textLight hover:text-hoverHeadingLight hover:bg-input'
                        }`}
                      >
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Admin Login Button */}
            <div className="hidden lg:flex">

              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-bgLight bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5 text-style"
              >
                <Mail className="h-4 w-4" />
                <span>Contact</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-primary-dark hover:text-white transition-colors bg-primary"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-border py-4 bg-bgLight/95 backdrop-blur-md">
              <div className="flex flex-col space-y-2">
                {mainNavigation.map((item: NavigationItem) => {
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 text-base font-medium rounded-lg transition-all text-style ${
                        isActive
                          ? 'text-primary bg-primary/10 border border-primary/20'
                          : 'text-textLight hover:text-hoverHeadingLight hover:bg-input'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
                <Link
                  href="/contact"
                  className="flex items-center space-x-3 px-4 py-3 text-base font-medium text-textLight hover:text-hoverHeadingLight hover:bg-input rounded-lg transition-colors mt-4 border-t border-border pt-4 text-style"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Mail className="h-5 w-5" />
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Generic Mega Menu */}
      <MegaMenu 
        isOpen={!!activeMegaMenu} 
        onClose={handleMegaMenuClose}
        menuData={getActiveMegaMenuData()}
      />
    </>
  );
}