import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Sparkles, Building2, Home } from 'lucide-react';

interface QuoteEstimatorProps {
  onLockInQuote: (summary: string) => void;
}

export const QuoteEstimator: React.FC<QuoteEstimatorProps> = ({ onLockInQuote }) => {
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [systemType, setSystemType] = useState<'ac' | 'heating' | 'refrigeration' | 'ducts'>('ac');
  const [urgency, setUrgency] = useState<'routine' | 'same-day' | 'emergency'>('same-day');
  const [sqftOrTonnage, setSqftOrTonnage] = useState<number>(2200);

  // Dynamic estimate calculation based on HVAC pricing metrics
  const calculateEstimate = () => {
    let baseMin = 120;
    let baseMax = 320;

    if (propertyType === 'residential') {
      if (systemType === 'ac') {
        baseMin = sqftOrTonnage < 1800 ? 140 : sqftOrTonnage < 3000 ? 180 : 260;
        baseMax = sqftOrTonnage < 1800 ? 450 : sqftOrTonnage < 3000 ? 680 : 950;
      } else if (systemType === 'heating') {
        baseMin = 120;
        baseMax = 480;
      } else if (systemType === 'ducts') {
        baseMin = Math.round((sqftOrTonnage * 0.18));
        baseMax = Math.round((sqftOrTonnage * 0.32));
      } else {
        baseMin = 220;
        baseMax = 590;
      }
    } else {
      // Commercial refrigeration & HVAC
      baseMin = 280;
      baseMax = 890;
      if (systemType === 'refrigeration') {
        baseMin = 340;
        baseMax = 1100;
      }
    }

    if (urgency === 'emergency') {
      baseMin = Math.round(baseMin * 1.25);
      baseMax = Math.round(baseMax * 1.25);
    }

    return { min: baseMin, max: baseMax };
  };

  const estimate = calculateEstimate();

  const handleApplyToBooking = () => {
    const summary = `${propertyType.toUpperCase()} ${systemType.toUpperCase()} repair/service (${sqftOrTonnage} sq ft/tonnage, ${urgency} urgency) · Estimated: $${estimate.min}-$${estimate.max}`;
    onLockInQuote(summary);
  };

  return (
    <section id="calculator" className="py-8 sm:py-12 md:py-16 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <div className="text-xs font-bold tracking-wider uppercase text-[#E31B23] mb-1.5 sm:mb-2">
            Instant Cost Transparency
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Interactive HVAC &amp; Refrigeration Cost Estimator
          </h2>
          <p className="mt-2 sm:mt-3 text-base text-slate-600">
            Get an instant ballpark range for your repair or maintenance needs. No sales rep calls required to see transparent Dallas pricing.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12">
          {/* Controls Column */}
          <div className="p-6 sm:p-8 md:col-span-7 space-y-6">
            {/* Property Type Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Property Classification
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPropertyType('residential')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                    propertyType === 'residential'
                      ? 'bg-[#0F2B5C] text-white border-[#0F2B5C] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Residential Home</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyType('commercial')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                    propertyType === 'commercial'
                      ? 'bg-[#0F2B5C] text-white border-[#0F2B5C] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Commercial / Food</span>
                </button>
              </div>
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                2. Primary System Need
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'ac', label: 'Air Conditioning' },
                  { id: 'heating', label: 'Furnace & Heating' },
                  { id: 'refrigeration', label: 'Refrigeration / Cooler' },
                  { id: 'ducts', label: 'Air Quality & Ducts' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSystemType(s.id as any)}
                    className={`py-2.5 px-3 rounded-lg border font-medium text-left transition-colors cursor-pointer ${
                      systemType === s.id
                        ? 'bg-[#0F2B5C]/10 border-[#0F2B5C] text-[#0F2B5C] font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  3. Approximate Property Size
                </label>
                <span className="text-xs font-mono font-bold text-[#0F2B5C] tabular-nums">
                  {sqftOrTonnage.toLocaleString()} sq ft
                </span>
              </div>
              <input
                type="range"
                min="800"
                max="6000"
                step="100"
                value={sqftOrTonnage}
                onChange={(e) => setSqftOrTonnage(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0F2B5C]"
              />
              <div className="flex justify-between text-[11px] text-slate-600 mt-1">
                <span>800 sq ft</span>
                <span>2,500 sq ft</span>
                <span>6,000+ sq ft</span>
              </div>
            </div>

            {/* Urgency Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                4. Urgency &amp; Scheduling
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'routine', label: 'Standard', desc: 'Next 2-3 Days' },
                  { id: 'same-day', label: 'Priority', desc: 'Today within 4h' },
                  { id: 'emergency', label: '24/7 Urgent', desc: '< 60 mins' },
                ].map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setUrgency(u.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      urgency === u.id
                        ? u.id === 'emergency'
                          ? 'bg-[#E31B23]/10 border-[#E31B23] text-[#E31B23] font-bold'
                          : 'bg-[#0F2B5C]/10 border-[#0F2B5C] text-[#0F2B5C] font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs font-bold">{u.label}</div>
                    <div className="text-[10px] text-slate-600">{u.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Calculation Card */}
          <div className="bg-[#0F2B5C] text-white p-6 sm:p-8 md:col-span-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-cyan-300">
                Estimated Service Range
              </span>

              <div className="mt-4">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums">
                  ${estimate.min} – ${estimate.max}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Typical diagnostic &amp; standard repair investment range
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Computerized multi-point diagnosis included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Exact written quote prior to any repair</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Diagnostic fee credited toward approved repairs</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={handleApplyToBooking}
                className="w-full bg-[#E31B23] hover:bg-[#C5131A] text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
              >
                <span>Lock In This Estimate &amp; Book</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-center text-[11px] text-slate-300 mt-2 font-medium">
                No credit card required. Fast local dispatch.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
