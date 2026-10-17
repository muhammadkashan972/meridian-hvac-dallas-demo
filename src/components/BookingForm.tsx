import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Home,
  Shield,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES_LIST } from '../data/servicesData';
import { BookingFormData } from '../types';
import { ZipChecker } from './ZipChecker';

interface BookingFormProps {
  preselectedServiceId?: string;
  prefilledNotes?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  preselectedServiceId,
  prefilledNotes,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    serviceId: preselectedServiceId || 'ac-repair-installation',
    propertyType: 'residential',
    preferredDate: '',
    preferredTime: 'Morning (8:00 AM - 12:00 PM)',
    isEmergency: false,
    notes: prefilledNotes || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    confirmationCode: string;
    submittedAt: string;
    details: BookingFormData;
  } | null>(null);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Sync props if changed
  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (prefilledNotes) {
      setFormData((prev) => ({
        ...prev,
        notes: prev.notes ? `${prev.notes}\n${prefilledNotes}` : prefilledNotes,
      }));
    }
  }, [prefilledNotes]);

  // Set default date to tomorrow in YYYY-MM-DD format
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setFormData((prev) => ({ ...prev, preferredDate: `${yyyy}-${mm}-${dd}` }));
  }, []);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errors.phone = 'Valid 10-digit phone number is required';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = 'Valid email address is required';
    }
    if (!formData.preferredDate) {
      errors.preferredDate = 'Please select a preferred service date';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const code = `MRD-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedData({
        confirmationCode: code,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        details: { ...formData },
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData((prev) => ({
      ...prev,
      fullName: '',
      phone: '',
      email: '',
      address: '',
      notes: '',
      isEmergency: false,
    }));
  };

  return (
    <section id="contact" className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="text-xs font-bold tracking-wider uppercase text-[#E31B23] mb-1.5 sm:mb-2">
            Seamless Dispatch &amp; Free In-Home Consultation
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Schedule Your Service or Emergency Dispatch
          </h2>
          <p className="mt-2 sm:mt-4 text-base text-slate-600 leading-relaxed">
            Book an appointment online with guaranteed on-time technician arrival. For urgent emergencies, your request is instantly routed to our 24/7 on-call patrol fleet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Business Location & Contact Card + Zip Checker */}
          <div className="lg:col-span-5 space-y-6">
            {/* Headquarters Card with Full Address Display */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-lg">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold mb-1 sm:mb-2">
                Dallas Headquarters &amp; Operations Center
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {BUSINESS_INFO.name}
              </h3>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E31B23] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-base">3450 Webb Chapel Ext</div>
                    <div className="text-slate-200">Dallas, TX 75220</div>
                    <div className="text-slate-400 text-xs mt-0.5">
                      (Northwest Dallas / Loop 12 / Webb Chapel Ext)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">24/7 Live Support Line</div>
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="text-cyan-300 hover:text-white font-mono font-bold text-base transition-colors"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Email Dispatch</div>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="hover:text-white transition-colors"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Operating Hours</div>
                    <div>{BUSINESS_INFO.operatingHours}</div>
                  </div>
                </div>
              </div>

              {/* External Maps Action */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs text-slate-400 font-mono">
                  {BUSINESS_INFO.license}
                </span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    BUSINESS_INFO.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] text-xs font-semibold text-cyan-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>Open 3450 Webb Chapel Ext in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Dallas Zip Checker Component */}
            <ZipChecker
              onSelectZip={(zip) => {
                setFormData((prev) => ({
                  ...prev,
                  address: prev.address ? `${prev.address}, Dallas, TX ${zip}` : `Dallas, TX ${zip}`,
                }));
              }}
            />
          </div>

          {/* Right Column: Interactive Appointment Booking Form or Confirmation State */}
          <div className="lg:col-span-7">
            {submittedData ? (
              /* Success Confirmation Card */
              <div className="bg-emerald-50/80 rounded-2xl p-8 border border-emerald-200 shadow-md">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="text-center max-w-md mx-auto">
                  <h3 className="text-2xl font-bold text-emerald-950">
                    Service Appointment Requested!
                  </h3>
                  <p className="text-sm text-emerald-800 mt-2">
                    Thank you, <strong className="text-emerald-950">{submittedData.details.fullName}</strong>. Your service dispatch ticket has been assigned.
                  </p>
                </div>

                <div className="mt-6 bg-white rounded-xl p-5 border border-emerald-200 space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-slate-500">Dispatch Reference:</span>
                    <span className="font-mono font-bold text-[#0F2B5C] text-sm">
                      #{submittedData.confirmationCode}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-slate-500">Scheduled Date:</span>
                    <span className="font-medium text-slate-900">
                      {submittedData.details.preferredDate} ({submittedData.details.preferredTime})
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-slate-500">Service Category:</span>
                    <span className="font-semibold text-slate-900">
                      {SERVICES_LIST.find((s) => s.id === submittedData.details.serviceId)?.title ||
                        submittedData.details.serviceId}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-slate-500">Contact Phone:</span>
                    <span className="font-mono text-slate-900">
                      {submittedData.details.phone}
                    </span>
                  </div>

                  {submittedData.details.isEmergency && (
                    <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#E31B23] shrink-0" />
                      <span>Priority 24/7 Emergency Dispatch Flagged: On-call tech notified.</span>
                    </div>
                  )}

                  <div className="pt-2 text-xs text-slate-500">
                    A confirmation SMS and email have been dispatched to your contact details. Our service coordinator will call you 30 minutes prior to arrival.
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="w-full sm:w-auto text-center bg-[#E31B23] hover:bg-[#C5131A] text-white text-xs font-semibold py-2.5 px-5 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Live Dispatch ({BUSINESS_INFO.phone})</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto text-center text-xs font-medium text-slate-600 hover:text-slate-900 py-2.5 px-4 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Book Another Appointment</span>
                  </button>
                </div>
              </div>
            ) : (
              /* The Working Booking Form */
              <form
                onSubmit={handleSubmit}
                className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">
                    Online Booking &amp; Quote Request
                  </h3>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Free Cancellation
                  </span>
                </div>

                {/* Property Type Radio */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Property Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border cursor-pointer transition-colors text-xs font-semibold ${
                        formData.propertyType === 'residential'
                          ? 'bg-white border-[#0F2B5C] text-[#0F2B5C] shadow-xs'
                          : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="propertyType"
                        value="residential"
                        checked={formData.propertyType === 'residential'}
                        onChange={() => setFormData({ ...formData, propertyType: 'residential' })}
                        className="sr-only"
                      />
                      <Home className="w-3.5 h-3.5" />
                      <span>Residential Home</span>
                    </label>

                    <label
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border cursor-pointer transition-colors text-xs font-semibold ${
                        formData.propertyType === 'commercial'
                          ? 'bg-white border-[#0F2B5C] text-[#0F2B5C] shadow-xs'
                          : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="propertyType"
                        value="commercial"
                        checked={formData.propertyType === 'commercial'}
                        onChange={() => setFormData({ ...formData, propertyType: 'commercial' })}
                        className="sr-only"
                      />
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Commercial / Restaurant</span>
                    </label>
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Michael Henderson"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full min-h-[48px] px-3.5 py-3 text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2B5C]"
                    />
                    {formErrors.fullName && (
                      <p className="text-red-600 text-xs mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(214) 555-0192"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full min-h-[48px] px-3.5 py-3 text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2B5C] font-mono"
                    />
                    {formErrors.phone && (
                      <p className="text-red-600 text-xs mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Email & Street Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="michael@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full min-h-[48px] px-3.5 py-3 text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2B5C]"
                    />
                    {formErrors.email && (
                      <p className="text-red-600 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Dallas Address / ZIP
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3450 Webb Chapel Ext or 75220"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full min-h-[48px] px-3.5 py-3 text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2B5C]"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Service Needed *
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full min-h-[48px] px-3.5 py-3 text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2B5C]"
                  >
                    {SERVICES_LIST.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} ({s.category})
                      </option>
                    ))}
                    <option value="seasonal-tuneup">Seasonal Preventive Maintenance Tune-up</option>
                  </select>
                </div>

                {/* Preferred Date & Time Window */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full min-h-[48px] px-3.5 py-3 text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2B5C] font-mono"
                    />
                    {formErrors.preferredDate && (
                      <p className="text-red-600 text-xs mt-1">{formErrors.preferredDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Preferred Time Window
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full min-h-[48px] px-3.5 py-3 text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2B5C]"
                    >
                      <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                      <option value="Evening (4:00 PM - 8:00 PM)">Evening (4:00 PM - 8:00 PM)</option>
                      <option value="Immediate 24/7 Dispatch">Immediate 24/7 Emergency Dispatch</option>
                    </select>
                  </div>
                </div>

                {/* Emergency Urgent Checkbox */}
                <div className="bg-red-50/70 p-3.5 sm:p-4 rounded-xl border border-red-200">
                  <label className="flex items-start gap-3 cursor-pointer min-h-[48px] py-1">
                    <input
                      type="checkbox"
                      checked={formData.isEmergency}
                      onChange={(e) => setFormData({ ...formData, isEmergency: e.target.checked })}
                      className="mt-1 h-5 w-5 text-[#E31B23] rounded focus:ring-red-400 border-gray-300 shrink-0 cursor-pointer"
                    />
                    <div>
                      <span className="text-sm font-bold text-red-950 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-[#E31B23] shrink-0" />
                        This is an active emergency (No cooling in extreme heat, heating out, or refrigeration failure)
                      </span>
                      <span className="text-xs text-red-800 block mt-0.5">
                        Flags this request directly to our on-call Dallas emergency dispatcher for immediate call-back.
                      </span>
                    </div>
                  </label>
                </div>

                {/* Problem Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Problem Description / System Details (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe any symptoms: e.g. AC blowing warm air, ice on copper pipes, breaker clicking, or walk-in cooler temperature at 45°F..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full min-h-[88px] px-3.5 py-3 text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2B5C]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[52px] bg-[#0F2B5C] hover:bg-[#E31B23] active:scale-98 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-base disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span>Routing to Dispatcher...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Confirm Appointment Request</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-2">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    No Upfront Card Needed
                  </span>
                  <span>·</span>
                  <span>Free Cancellation</span>
                  <span>·</span>
                  <span>100% Upfront Pricing</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
