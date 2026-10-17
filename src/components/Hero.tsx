import React from 'react';
import { ShieldCheck, Clock, Award, Star, ArrowRight, Calendar, CheckCircle2, MapPin, Wrench } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

interface HeroProps {
  onRequestQuote: () => void;
  onScheduleService: () => void;
  onOpenEmergencyModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onRequestQuote,
  onScheduleService,
  onOpenEmergencyModal,
}) => {
  return (
    <section id="home" className="relative bg-[#0F2B5C] text-white py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background Subtle Geometric Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Dallas Location & Availability Bar (Responsive unboxed text) */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-300 mb-3 sm:mb-4">
              <span className="flex items-center gap-1 text-cyan-300">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>3450 Webb Chapel Ext, Dallas, TX</span>
              </span>
              <span aria-hidden="true" className="text-slate-500 hidden xs:inline">·</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                Available 24/7
              </span>
            </div>

            {/* Catchy High-Converting Headline (Responsive from 320px screens up) */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight sm:leading-[1.18] text-balance mb-4">
              Dallas’s Premier Heating, Cooling &amp; Refrigeration Experts
            </h1>

            {/* Subheadline (Responsive text-base on mobile, text-lg on desktop) */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal mb-6 sm:mb-8">
              HVAC Solutions You Can Trust — Available 24/7 for Emergency Repairs and Maintenance.
              From residential AC repair and furnace maintenance to commercial refrigeration systems across Dallas, our licensed technicians provide fast, guaranteed comfort.
            </p>

            {/* Full-Width Mobile CTA Buttons ('Request Quote', 'Call 24/7') */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <button
                onClick={onRequestQuote}
                className="w-full sm:w-auto min-h-[48px] bg-[#E31B23] hover:bg-[#C5131A] active:scale-98 text-white font-bold text-base px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <span>Request Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full sm:w-auto min-h-[48px] bg-white/10 hover:bg-white/20 active:bg-white/25 text-white border border-white/20 font-bold text-base px-6 py-3.5 rounded-xl backdrop-blur-xs transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <Clock className="w-4 h-4 text-cyan-300" />
                <span>Call 24/7: {BUSINESS_INFO.phone}</span>
              </a>
            </div>

            {/* Quick Guarantees (Clean unboxed line) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Upfront Flat-Rate Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>TDLR Certified Technicians</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Satisfaction Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Fleet/Work Grid Layout */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900/80 group">
              {/* Primary Real Photo of Fleet & Master Tech */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden bg-slate-800">
                <img
                  src="/src/assets/images/hero_hvac_technician_fleet_1792230620326.jpg"
                  alt="Meridian HVAC technician in clean navy uniform standing with service van in Dallas"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091a38] via-transparent to-transparent opacity-80" />

                {/* Overlay Card on Bottom Right */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#091a38]/90 backdrop-blur-md p-3.5 rounded-xl border border-white/15 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-[#E31B23]" />
                      Dallas Metro Rapid Dispatch Fleet
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Fully stocked mobile vans with OEM Trane & Carrier parts
                    </div>
                  </div>
                  <button
                    onClick={onOpenEmergencyModal}
                    className="text-xs font-bold text-[#E31B23] bg-white hover:bg-slate-100 px-3 py-1.5 rounded-md transition-colors shrink-0 cursor-pointer"
                  >
                    Need Help?
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Trust Verification Badge */}
            <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#E31B23]/20 border border-[#E31B23]/40 flex items-center justify-center text-[#E31B23]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">TDLR Licensed &amp; Fully Insured</div>
                  <div className="text-[11px] text-slate-300 font-mono">TACLA88392C · $2M Commercial Liability</div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-amber-400 justify-end">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-[11px] text-slate-300 font-medium">4.9/5 (1,420+ Reviews)</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI / Trust Strip Placed in a Full-Width Row Below Hero Split (as required by frontend design guidelines) */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              &lt; 45 Mins
            </div>
            <div className="text-sm font-semibold text-slate-200">24/7 Rapid Response</div>
            <div className="text-xs text-slate-400">Dallas County emergency dispatch</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              15+ Years
            </div>
            <div className="text-sm font-semibold text-slate-200">Local DFW Experience</div>
            <div className="text-xs text-slate-400">Serving Dallas, Highland Park & Plano</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              100% Upfront
            </div>
            <div className="text-sm font-semibold text-slate-200">Transparent Pricing</div>
            <div className="text-xs text-slate-400">No hidden fees, ever</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              10-Yr Parts
            </div>
            <div className="text-sm font-semibold text-slate-200">Equipment Warranties</div>
            <div className="text-xs text-slate-400">Backed by factory certifications</div>
          </div>
        </div>
      </div>
    </section>
  );
};
