import React, { useState } from 'react';
import { Search, MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { DALLAS_ZIP_CODES, BUSINESS_INFO } from '../data/servicesData';

interface ZipCheckerProps {
  onSelectZip: (zip: string) => void;
}

export const ZipChecker: React.FC<ZipCheckerProps> = ({ onSelectZip }) => {
  const [zipInput, setZipInput] = useState('75220');
  const [searchResult, setSearchResult] = useState<{
    zip: string;
    area: string;
    dispatchTime: string;
    coverage: boolean;
  } | null>({
    zip: '75220',
    ...DALLAS_ZIP_CODES['75220'],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (DALLAS_ZIP_CODES[cleanZip]) {
      setSearchResult({
        zip: cleanZip,
        ...DALLAS_ZIP_CODES[cleanZip],
      });
    } else {
      // General DFW area fallback
      if (cleanZip.startsWith('75') && cleanZip.length === 5) {
        setSearchResult({
          zip: cleanZip,
          area: 'Greater Dallas / Fort Worth Metroplex',
          dispatchTime: '35 - 55 mins',
          coverage: true,
        });
      } else {
        setSearchResult({
          zip: cleanZip,
          area: 'Outside Core DFW Rapid Coverage',
          dispatchTime: 'Call for special commercial dispatch',
          coverage: false,
        });
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F2B5C] mb-1">
        <MapPin className="w-4 h-4 text-[#E31B23]" />
        Dallas Dispatch Time Checker
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">
        Check Rapid Arrival Window for Your ZIP
      </h3>
      <p className="text-xs text-slate-600 mb-4">
        Our headquarters at <span className="font-semibold text-slate-800">3450 Webb Chapel Ext</span> allows rapid highway access to Loop 12, I-35E, and Dallas North Tollway.
      </p>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={5}
            value={zipInput}
            onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 5-digit ZIP (e.g. 75220)"
            className="w-full pl-3.5 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F2B5C] font-mono"
          />
        </div>
        <button
          type="submit"
          className="bg-[#0F2B5C] hover:bg-[#1A3E7B] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Check Status</span>
        </button>
      </form>

      {searchResult && (
        <div
          className={`p-3.5 rounded-xl border text-xs ${
            searchResult.coverage
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              : 'bg-amber-50/70 border-amber-200 text-amber-950'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-bold flex items-center gap-1.5 text-sm">
                {searchResult.coverage ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                )}
                <span>ZIP {searchResult.zip}: {searchResult.area}</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-700">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Estimated Tech Response: <strong className="font-mono">{searchResult.dispatchTime}</strong></span>
              </div>
            </div>

            {searchResult.coverage && (
              <button
                type="button"
                onClick={() => onSelectZip(searchResult.zip)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold px-3 py-1.5 rounded-md transition-colors shrink-0 cursor-pointer"
              >
                Use in Form
              </button>
            )}
          </div>
        </div>
      )}

      {/* Popular Dallas ZIPs Quick Chips */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
        <span className="text-[11px] text-slate-600 font-medium mr-1">Frequent Zones:</span>
        {['75220', '75225', '75205', '75201', '75234', '75038'].map((zip) => (
          <button
            key={zip}
            type="button"
            onClick={() => {
              setZipInput(zip);
              setSearchResult({
                zip,
                ...DALLAS_ZIP_CODES[zip],
              });
            }}
            className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            {zip}
          </button>
        ))}
      </div>
    </div>
  );
};
