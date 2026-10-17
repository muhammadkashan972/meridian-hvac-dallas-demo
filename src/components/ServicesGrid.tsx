import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Info, Snowflake, Flame, Shield, Wrench } from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import { ServiceItem } from '../types';

interface ServicesGridProps {
  onSelectServiceForBooking: (serviceId: string) => void;
  onOpenServiceModal: (service: ServiceItem) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  onSelectServiceForBooking,
  onOpenServiceModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Cooling' | 'Heating' | 'Refrigeration' | 'Emergency'>('All');

  const filteredServices = activeCategory === 'All'
    ? SERVICES_LIST
    : SERVICES_LIST.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-8 sm:py-12 md:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            {/* Section Category as quiet unboxed text */}
            <div className="text-xs font-bold tracking-wider uppercase text-[#E31B23] mb-1.5 sm:mb-2">
              Engineered Precision &amp; Certified Care
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              Primary Heating, Cooling &amp; Refrigeration Services
            </h2>
            <p className="mt-2 sm:mt-3 text-base text-slate-600 leading-relaxed">
              Every job is performed by licensed technicians using calibrated digital diagnostic instruments, factory OEM replacement parts, and guaranteed workmanship.
            </p>
          </div>

          {/* Interactive Filter Control (Touch-Friendly Segmented Control) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl overflow-x-auto shrink-0 w-full md:w-auto pb-2 md:pb-1">
            {(['All', 'Cooling', 'Heating', 'Refrigeration', 'Emergency'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`min-h-[40px] px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#0F2B5C] text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid: Single-Column Stacked on Mobile (`grid-cols-1`), transitioning to multi-column on desktop (`md:grid-cols-2 lg:grid-cols-4`) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Service Photography Header */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white font-medium">
                  <span className="bg-[#0F2B5C]/85 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-semibold text-white">
                    {service.category}
                  </span>
                  <span className="text-slate-200 font-mono text-xs">
                    {service.responseSpeed}
                  </span>
                </div>
              </div>

              {/* Service Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#0F2B5C] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0F2B5C] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Touch-Friendly Action Buttons with min-h-[48px] */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch gap-2.5">
                  <button
                    onClick={() => onOpenServiceModal(service)}
                    className="min-h-[48px] flex-1 py-2.5 px-3 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>View Specs</span>
                    <Info className="w-4 h-4 text-slate-500" />
                  </button>

                  <button
                    onClick={() => onSelectServiceForBooking(service.id)}
                    className="min-h-[48px] flex-1 py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#0F2B5C] hover:bg-[#E31B23] rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Callout Banner */}
        <div className="mt-12 bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0F2B5C]/10 text-[#0F2B5C] flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                100% Satisfaction &amp; No-Surprise Price Guarantee
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                If our technician arrives and finds that a repair is not what was quoted, we present the exact fixed price before turning a single wrench. Zero hidden dispatch surprises.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectServiceForBooking('all-services')}
            className="shrink-0 bg-[#E31B23] hover:bg-[#C5131A] text-white text-xs font-semibold py-2.5 px-5 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Schedule a Diagnostic
          </button>
        </div>
      </div>
    </section>
  );
};
