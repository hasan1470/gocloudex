'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MegaMenuData } from '@/data/navigation';
import { ArrowRight, X } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuData: MegaMenuData | null;
}

export default function MegaMenu({ isOpen, onClose, menuData }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !menuData) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-bgDark/50 backdrop-blur-sm z-40 lg:pt-20" />
      
      {/* Mega Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 mt-1 left-0 right-0 bg-bgLight border-b border-border shadow-2xl z-50 lg:top-20 lg:mx-auto lg:max-w-7xl lg:rounded-2xl lg:border"
      >
        {/* Header */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div>
                <h2 className="text-2xl font-bold text-headingLight heading-style">
                  {menuData.title}
                </h2>
                <p className="text-textLight mt-1 text-style">
                  {menuData.description}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-textLight hover:text-headingLight hover:bg-input rounded-lg transition-colors lg:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {menuData.columns.map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-6">
                <h3 className="text-lg font-semibold text-headingLight heading-style">
                  {column.title}
                </h3>
                <div className="space-y-4">
                  {column.items.slice(0, 4).map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={itemIndex}
                        href={item.link}
                        onClick={onClose}
                        className={`group flex items-start space-x-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                          item.featured 
                            ? 'border-primary/20 bg-primary/5 hover:bg-primary/10' 
                            : 'border-border hover:bg-input'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                          item.featured 
                            ? 'bg-primary text-bgLight' 
                            : 'bg-input text-primary'
                        }`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={`font-semibold text-style ${
                              item.featured 
                                ? 'text-primary' 
                                : 'text-headingLight'
                            }`}>
                              {item.title}
                            </h4>
                            <ArrowRight className="h-4 w-4 text-textLight group-hover:text-primary flex-shrink-0 mt-1 ml-2 transition-colors" />
                          </div>
                          <p className="text-textLight text-sm mt-1 line-clamp-2 text-style">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer with View All Link */}
          {menuData.viewAll && (
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex justify-center">
                <Link
                  href={menuData.viewAll.link}
                  onClick={onClose}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-bgLight rounded-lg hover:bg-primary-dark transition-all duration-200 transform hover:-translate-y-0.5 text-style"
                >
                  <span>{menuData.viewAll.text}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}