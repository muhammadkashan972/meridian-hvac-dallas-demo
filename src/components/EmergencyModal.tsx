import React, { useState } from 'react';
import { Phone, PhoneCall, X, AlertTriangle, ShieldAlert, CheckCircle2, Clock, Zap } from 'lucide-react';
import { BUSINESS_INFO } from '../data/servicesData';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickBookEmergency: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  onQuickBookEmergency,
}) => {
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [quickPhone, setQuickPhone] = useState('');

  if (!isOpen) return null;

  const handleQuickCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPhone) return;
    setCallbackRequested(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-red-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Urgent Header */}
        <div className="bg-[#E31B23] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            aria-label="Close emergency modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-100">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            Active Dallas 24/7 Dispatch
          </div>
          <h3 className="text-2xl font-bold mt-1 text-white">
            Emergency HVAC &amp; Refrigeration Support
          </h3>
          <p className="text-xs text-red-100 mt-1">
            Immediate dispatch for heating failures, extreme summer cooling loss, or restaurant refrigeration emergencies.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Direct Dial Big Button */}
          <div className="text-center p-5 bg-red-50 rounded-xl border border-red-200">
            <div className="text-xs font-semibold text-red-900 mb-1">
              Dallas Metro Emergency Hotline (Direct Line)
            </div>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-[#E31B23] hover:bg-[#C5131A] text-white font-extrabold text-xl py-3.5 px-6 rounded-xl shadow-lg transition-transform active:scale-95 w-full"
            >
              <PhoneCall className="w-5 h-5 animate-bounce" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <div className="text-[11px] text-red-700 font-medium mt-2 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Live dispatcher on duty · Under 45 min average arrival</span>
            </div>
          </div>

          {/* Quick Safety Instructions */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-[#0F2B5C]" />
              While You Wait For The Technician:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex items-start gap-1.5">
                <span className="text-[#E31B23] font-bold">•</span>
                <span><strong>Frozen AC Coils:</strong> Turn thermostat from COOL to OFF, and fan to ON to begin thawing without burning out the compressor motor.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#E31B23] font-bold">•</span>
                <span><strong>Walk-in Coolers:</strong> Keep door firmly shut to preserve safe internal thermal envelope until our arrival.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#E31B23] font-bold">•</span>
                <span><strong>Gas/Burning Odors:</strong> Immediately shut off the gas supply lever, exit the building, and call us from outside.</span>
              </li>
            </ul>
          </div>

          {/* Quick Callback Request */}
          <div className="pt-2 border-t border-slate-100">
            {callbackRequested ? (
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dispatcher notified! We will ring {quickPhone} in less than 3 minutes.</span>
              </div>
            ) : (
              <form onSubmit={handleQuickCallback} className="flex gap-2">
                <input
                  type="tel"
                  required
                  placeholder="Enter phone for 3-min callback"
                  value={quickPhone}
                  onChange={(e) => setQuickPhone(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E31B23] font-mono"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Request Callback
                </button>
              </form>
            )}
          </div>

          {/* Alternative Online Booking Link */}
          <div className="flex items-center justify-between text-xs pt-2">
            <span className="text-slate-500">Not an emergency?</span>
            <button
              onClick={() => {
                onClose();
                onQuickBookEmergency();
              }}
              className="text-[#0F2B5C] font-semibold hover:underline cursor-pointer"
            >
              Open standard online booking →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
