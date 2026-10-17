import React from 'react';
import { Phone, Mail, MapPin, Shield, Clock, Flame, Snowflake } from 'lucide-react';
import { BUSINESS_INFO, SERVICES_LIST } from '../data/servicesData';

interface FooterProps {
  onSelectService: (serviceId: string) => void;
  onOpenEmergencyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectService, onOpenEmergencyModal }) => {
  return (
    <footer className="bg-[#091a38] text-slate-300 border-t border-slate-800">
      {/* Upper Footer CTA Strip */}
      <div className="bg-[#0F2B5C] py-8 border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-cyan-300 font-semibold mb-1">
              Need Same-Day Heating, AC or Cooler Service?
            </div>
            <h3 className="text-2xl font-bold">
              Call Dallas’s Premier Climate Specialists Today
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="bg-[#E31B23] hover:bg-[#C5131A] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <button
              onClick={onOpenEmergencyModal}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-5 rounded-xl border border-white/20 transition-all cursor-pointer"
            >
              24/7 Dispatch Details
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Tagline Column (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#E31B23] p-0.5 shadow-sm">
                <div className="w-full h-full bg-[#0F2B5C] rounded-[6px] flex items-center justify-center relative overflow-hidden">
                  <Snowflake className="w-3.5 h-3.5 text-cyan-300 absolute -top-0.5 -right-0.5" />
                  <Flame className="w-4 h-4 text-[#E31B23] absolute -bottom-0.5 -left-0.5" />
                  <span className="font-extrabold text-white text-sm font-mono relative z-10">M</span>
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Meridian HVAC &amp; Refrigeration
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              &ldquo;{BUSINESS_INFO.tagline}&rdquo;
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Providing precision residential and commercial heating, air conditioning, and refrigeration services across the Dallas-Fort Worth metroplex with transparent flat-rate pricing.
            </p>

            <div className="pt-2 text-xs text-slate-400 font-mono">
              <span className="text-emerald-400 font-bold">Texas TDLR Licensed:</span> {BUSINESS_INFO.license}
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">Free Cost Calculator</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Verified Customer Reviews</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Book Appointment</a>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Primary Services
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES_LIST.map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => onSelectService(srv.id)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Commercial Maintenance Contracts
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  24/7 Emergency Dispatch
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Physical Address */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Dallas Headquarters
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E31B23] shrink-0 mt-0.5" />
                <span className="text-slate-200">{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-white font-mono">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white">
                  {BUSINESS_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>24/7 Emergency Dispatch<br />Office: Mon-Sat 7am-7pm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dallas Service Area Footnote */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-400 space-y-4">
          <div>
            <span className="font-semibold text-slate-300">DFW Metro Rapid Coverage Area:</span>{' '}
            {BUSINESS_INFO.serviceArea}.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} Meridian HVAC &amp; Refrigeration. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Licensed, Bonded &amp; Insured</span>
              <span>·</span>
              <span>Privacy Policy</span>
              <span>·</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
