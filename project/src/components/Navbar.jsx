import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  BookOpen,
  TrendingUp,
  Globe,
  MessageCircle,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/characters', label: 'Characters', icon: Users },
    { path: '/lessons', label: 'Lessons', icon: BookOpen },
    { path: '/progress', label: 'Progress', icon: TrendingUp },
    { path: '/explore', label: 'Explore', icon: Globe },
    { path: '/feedback', label: 'Feedback', icon: MessageCircle },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 shadow-2xl backdrop-blur-xl border-b border-slate-700/50 bg-slate-900/95">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-4 group">
            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 shadow-xl shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110">
              <Sparkles className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
            </div>
            <span className="text-xl sm:text-3xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">Voicenar</span><span className="text-indigo-400 align-baseline">y</span>
            </span>
          </Link>

          {/* Desktop Navigation - Show on medium screens and up */}
          <div className="hidden md:flex space-x-1 lg:space-x-2 xl:space-x-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 xl:px-6 py-2 lg:py-2 xl:py-3 rounded-lg lg:rounded-xl xl:rounded-2xl font-semibold transition-all duration-300 text-xs lg:text-sm xl:text-base ${isActive(item.path)
                    ? 'text-slate-900 shadow-xl transform scale-105 bg-gradient-to-r from-blue-400 to-cyan-400 shadow-blue-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60 hover:shadow-lg hover:transform hover:scale-105 hover:shadow-blue-500/10'
                    }`}
                >
                  <Icon className="h-3 w-3 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button - Show on small screens only */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 sm:p-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-300"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>

        {/* Mobile Navigation - Only show when menu is open on small screens */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 sm:py-6 space-y-2 sm:space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 sm:space-x-4 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 ${isActive(item.path)
                    ? 'text-slate-900 shadow-xl bg-gradient-to-r from-blue-400 to-cyan-400 shadow-blue-500/25'
                    : 'text-slate-300 bg-slate-800/40 hover:bg-slate-800/60'
                    }`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-sm sm:text-base">{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}