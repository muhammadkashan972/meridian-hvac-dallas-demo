import React, { useState, useEffect } from 'react';
import { Phone, PhoneCall, Menu, X, Shield, Clock, Flame, Snowflake } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

interface NavbarProps {
  onOpenEmergencyModal: () => void;
  onNavigateToBooking: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEmergencyModal, onNavigateToBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Quote Calculator', href: '#calculator' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact & Booking', href: '#contact' },
  ];

  return (
    <>
      {/* Top Notification Bar for Dallas 24/7 Dispatch */}
      <div className="bg-[#091a38] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <Clock className="w-3.5 h-3.5 text-[#E31B23]" />
              24/7 Emergency Dispatch Active
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">
              Serving Dallas, TX & Surrounding Metroplex
            </span>
            <span className="hidden lg:inline text-slate-500">|</span>
            <span className="hidden lg:inline text-slate-300 font-mono text-[11px]">
              {BUSINESS_INFO.license}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="text-slate-400">Headquarters: 3450 Webb Chapel Ext</span>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="text-white hover:text-red-400 transition-colors flex items-center gap-1 font-semibold"
            >
              <Phone className="w-3 h-3 text-[#E31B23]" />
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Navigation Bar (Strict 3-Zone Contract with Mobile-First Responsiveness) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#0F2B5C]/95 backdrop-blur-md shadow-md border-b border-slate-700/50'
            : 'bg-[#0F2B5C] border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6 lg:gap-8 px-3 sm:px-6 lg:px-8 py-3">
          {/* Zone 1: Brand Wordmark (Responsive logo and title, wraps smoothly without overflowing 320px) */}
          <a
            href="#home"
            className="flex items-center gap-2 sm:gap-2.5 text-white whitespace-nowrap shrink-0 group min-h-[48px]"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#E31B23] to-[#091a38] p-0.5 shadow-sm shrink-0">
              <div className="w-full h-full bg-[#0F2B5C] rounded-[7px] flex items-center justify-center relative overflow-hidden">
                <Snowflake className="w-3.5 h-3.5 text-cyan-300 absolute -top-0.5 -right-0.5 opacity-90" />
                <Flame className="w-4 h-4 text-[#E31B23] absolute -bottom-0.5 -left-0.5" />
                <span className="font-extrabold text-white text-sm sm:text-base font-mono relative z-10">M</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-lg lg:text-xl font-bold tracking-tight text-white group-hover:text-red-200 transition-colors">
                Meridian HVAC
                <span className="hidden xs:inline sm:inline"> &amp; Refrigeration</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-300 font-medium hidden sm:block">
                Heating · Cooling · Refrigeration
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop view, hidden on mobile) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E31B23] hover:after:w-full after:transition-all whitespace-nowrap shrink-0"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Prominent Red 'Call Now' CTA Button (min 48px height touch target) */}
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="min-h-[48px] bg-[#E31B23] hover:bg-[#C5131A] active:scale-95 text-white font-bold text-xs sm:text-sm px-3.5 sm:px-5 rounded-xl shadow-md transition-all whitespace-nowrap shrink-0 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[#0F2B5C]"
              aria-label="Call Now for HVAC & Refrigeration Service"
            >
              <PhoneCall className="w-4 h-4 shrink-0 animate-bounce" />
              <span>Call Now</span>
              <span className="hidden md:inline font-mono text-xs text-red-100 font-normal">
                {BUSINESS_INFO.phone}
              </span>
            </a>

            {/* Mobile Hamburger Button with 48px minimum touch target */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-h-[48px] min-w-[48px] p-2 text-slate-200 hover:text-white active:bg-white/10 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer (Collapsible with smooth touch-friendly items) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#091a38] border-t border-slate-800 px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center min-h-[48px] text-slate-200 hover:text-white hover:bg-white/5 active:bg-white/10 px-4 rounded-xl font-medium text-base transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <div className="pt-3 border-t border-slate-800 space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToBooking();
                }}
                className="w-full min-h-[48px] text-center bg-white/10 hover:bg-white/20 active:bg-white/25 text-white font-semibold px-4 rounded-xl text-base transition-colors flex items-center justify-center cursor-pointer"
              >
                Schedule Service Online
              </button>
              
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full min-h-[48px] text-center bg-[#E31B23] hover:bg-[#C5131A] active:scale-98 text-white font-bold px-4 rounded-xl text-base transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now: {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
