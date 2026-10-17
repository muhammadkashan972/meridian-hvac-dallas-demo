import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { QuoteEstimator } from './components/QuoteEstimator';
import { Reviews } from './components/Reviews';
import { BookingForm } from './components/BookingForm';
import { EmergencyModal } from './components/EmergencyModal';
import { Footer } from './components/Footer';
import { ServiceItem } from './types';
import { SERVICES_LIST, BUSINESS_INFO } from './data/servicesData';
import { Phone, ArrowUp } from 'lucide-react';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [preselectedBookingServiceId, setPreselectedBookingServiceId] = useState<string>('ac-repair-installation');
  const [prefilledBookingNotes, setPrefilledBookingNotes] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForBooking = (serviceId: string) => {
    setPreselectedBookingServiceId(serviceId);
    scrollToSection('contact');
  };

  const handleLockInQuote = (summary: string) => {
    setPrefilledBookingNotes(summary);
    scrollToSection('contact');
  };

  const handleOpenEmergencyModal = () => {
    setEmergencyModalOpen(true);
  };

  const handleCloseEmergencyModal = () => {
    setEmergencyModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#E31B23]/20 selection:text-[#0F2B5C]">
      {/* Top Navigation */}
      <Navbar
        onOpenEmergencyModal={handleOpenEmergencyModal}
        onNavigateToBooking={() => scrollToSection('contact')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onRequestQuote={() => scrollToSection('calculator')}
          onScheduleService={() => scrollToSection('contact')}
          onOpenEmergencyModal={handleOpenEmergencyModal}
        />

        {/* 2. Key Services Grid (4 Column Cards) */}
        <ServicesGrid
          onSelectServiceForBooking={handleSelectServiceForBooking}
          onOpenServiceModal={(service) => setSelectedService(service)}
        />

        {/* 3. Why Choose Us Section */}
        <WhyChooseUs
          onScheduleClick={() => scrollToSection('contact')}
        />

        {/* 4. Interactive HVAC & Refrigeration Cost Estimator */}
        <QuoteEstimator
          onLockInQuote={handleLockInQuote}
        />

        {/* 5. Customer Reviews & Social Proof */}
        <Reviews />

        {/* 6. Appointment Booking & Contact Section (With 3450 Webb Chapel Ext address) */}
        <BookingForm
          preselectedServiceId={preselectedBookingServiceId}
          prefilledNotes={prefilledBookingNotes}
        />
      </main>

      {/* Footer */}
      <Footer
        onSelectService={handleSelectServiceForBooking}
        onOpenEmergencyModal={handleOpenEmergencyModal}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={(srvId) => {
          handleSelectServiceForBooking(srvId);
        }}
      />

      {/* Emergency Call & Dispatch Support Modal */}
      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={handleCloseEmergencyModal}
        onQuickBookEmergency={() => {
          setPreselectedBookingServiceId('emergency-hvac');
          scrollToSection('contact');
        }}
      />

      {/* Mobile Sticky Quick Emergency Bar (Complies with touch target rules and <15% mobile sticky height budget) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#091a38]/95 backdrop-blur-md px-4 py-2 border-t border-slate-800 shadow-xl flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] text-slate-300 font-medium">Dallas 24/7 Dispatch:</span>
          <span className="text-xs sm:text-sm font-mono font-bold text-white">{BUSINESS_INFO.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollToSection('contact')}
            className="min-h-[48px] text-xs font-semibold text-slate-200 hover:text-white bg-white/10 active:bg-white/20 px-3.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center"
          >
            Book
          </button>
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="min-h-[48px] bg-[#E31B23] hover:bg-[#C5131A] active:scale-95 text-white text-xs sm:text-sm font-bold px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-md whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            <span>Call 24/7</span>
          </a>
        </div>
      </div>
    </div>
  );
}
