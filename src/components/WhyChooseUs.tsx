import React from 'react';
import { ShieldCheck, Clock, DollarSign, Award, ThumbsUp, Wrench, CheckCircle2, XCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

interface WhyChooseUsProps {
  onScheduleClick: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onScheduleClick }) => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Licensed & Insured Technicians',
      subtitle: 'TDLR #TACLA88392C · $2M Commercial Liability',
      description:
        'Every Meridian technician has passed extensive background checks, drug screenings, and ongoing factory training from Trane, Carrier, and Lennox. We do not dispatch subcontractors.',
      highlights: ['State of Texas licensed master contractor', 'Strict background checks & drug tests', 'Annual factory certification renewals'],
    },
    {
      icon: Clock,
      title: 'Fast 24/7 Emergency Response',
      subtitle: 'Average Dallas county dispatch under 45 minutes',
      description:
        'When your walk-in cooler alarms at 2:00 AM or your residential AC quits during a 105°F heat advisory, our live dispatchers answer immediately. Fully equipped vans arrive ready to fix.',
      highlights: ['365-day emergency coverage', 'Real-time GPS truck routing', 'Fully stocked OEM repair parts on-board'],
    },
    {
      icon: DollarSign,
      title: 'Upfront Pricing & Guaranteed Work',
      subtitle: 'Flat-rate transparent quotes before work begins',
      description:
        'You will never encounter surprise hourly overages or hidden dispatch charges. We diagnose the issue, explain your options clearly, give you a fixed quote, and stand behind our work 100%.',
      highlights: ['100% money-back guarantee', '10-year equipment warranty options', 'Zero diagnostic fee with approved repair'],
    },
  ];

  const quickBadges = [
    { label: 'TDLR Licensed', desc: '#TACLA88392C' },
    { label: '24/7 Rapid Dispatch', desc: '< 45 min arrival' },
    { label: 'Flat-Rate Quotes', desc: 'No surprise fees' },
    { label: '100% Guarantee', desc: 'Money-back warranty' },
  ];

  const comparisonRows = [
    {
      feature: 'Technician Qualifications',
      meridian: 'Licensed Master Technicians (TDLR Certified)',
      others: 'Often unlicensed apprentices or third-party contractors',
    },
    {
      feature: 'Pricing Transparency',
      meridian: 'Fixed flat-rate pricing upfront before wrenching',
      others: 'Open-ended hourly billing with surprise trip fees',
    },
    {
      feature: 'Emergency Availability',
      meridian: 'True 24/7/365 live operator dispatch',
      others: 'Voicemail with next-business-day call backs',
    },
    {
      feature: 'Commercial Refrigeration',
      meridian: 'Certified walk-in cooler & freezer specialists',
      others: 'Limited to standard residential AC units only',
    },
    {
      feature: 'Property Protection',
      meridian: 'Shoe booties, floor runners & complete work cleanup',
      others: 'Messy workspaces left for the homeowner to clean',
    },
  ];

  return (
    <section id="why-us" className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="text-xs font-bold tracking-wider uppercase text-[#E31B23] mb-1.5 sm:mb-2">
            The Dallas Benchmark for Quality
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Why Dallas Homeowners &amp; Businesses Trust Meridian
          </h2>
          <p className="mt-2 sm:mt-4 text-base text-slate-600 leading-relaxed">
            Heating and refrigeration failures require rapid, authoritative engineering—not guesswork. We have built our reputation in Dallas on absolute transparency and unmatched craftsmanship.
          </p>

          {/* Compact Feature Badges with Icons (Requested by User) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-6">
            {quickBadges.map((b, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-left flex items-center gap-2.5 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0F2B5C] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">{b.label}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200/90 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0F2B5C] text-white flex items-center justify-center mb-4 sm:mb-5 shadow-sm">
                    <Icon className="w-6 h-6 text-cyan-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono text-[#E31B23] font-semibold mt-1 mb-3">
                    {pillar.subtitle}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 sm:mb-5">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 space-y-2">
                  {pillar.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table / Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-8 md:p-10 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider text-cyan-300 font-semibold">
                Clear Standards
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                The Meridian Standard vs. Typical Contractors
              </h3>
            </div>
            <div className="text-xs text-slate-400">
              Audited against Texas TDLR &amp; industry metrics
            </div>
          </div>

          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-3 sm:px-4 font-semibold">Service Expectation</th>
                  <th className="py-3 px-3 sm:px-4 font-bold text-white bg-slate-800/60 rounded-t-lg">
                    Meridian HVAC &amp; Refrigeration
                  </th>
                  <th className="py-3 px-3 sm:px-4 font-semibold">Other Dallas Contractors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm">
                {comparisonRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 sm:px-4 font-medium text-slate-300">{row.feature}</td>
                    <td className="py-3 px-3 sm:px-4 font-semibold text-emerald-300 bg-slate-800/40">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{row.meridian}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-slate-400">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{row.others}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-xs text-slate-300 text-center sm:text-left">
              Need immediate service or a second opinion on a competitor&apos;s quote?
            </div>
            <button
              onClick={onScheduleClick}
              className="w-full sm:w-auto min-h-[48px] bg-[#E31B23] hover:bg-[#C5131A] text-white text-xs sm:text-sm font-semibold py-2.5 px-6 rounded-xl transition-colors cursor-pointer flex items-center justify-center"
            >
              Get Free Second Opinion
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
