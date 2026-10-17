import React from 'react';
import { Star, CheckCircle2, MessageSquare, Quote } from 'lucide-react';
import { REVIEWS_LIST } from '../data/servicesData';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-8 sm:py-12 md:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-bold tracking-wider uppercase text-[#E31B23] mb-1.5 sm:mb-2">
              Verified Dallas Client Experiences
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              Trusted by 1,400+ Homeowners &amp; Commercial Kitchens
            </h2>
            <p className="mt-2 sm:mt-3 text-base text-slate-600">
              Read uncensored feedback from Dallas residents and local business leaders who rely on Meridian for high-stakes climate control.
            </p>
          </div>

          {/* Aggregate Rating Scoreboard (Clean typography, no hallucinated cockpit) */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs shrink-0 flex items-center gap-4">
            <div className="text-3xl font-extrabold font-mono text-slate-900">4.9</div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Over 1,420 Verified Reviews</div>
            </div>
          </div>
        </div>

        {/* 4 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS_LIST.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between relative group hover:border-slate-300 transition-colors"
            >
              <div>
                {/* Header with stars and service unboxed metadata */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {rev.date}
                  </div>
                </div>

                {/* Service Completed Text */}
                <div className="text-xs font-semibold text-[#0F2B5C] mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{rev.serviceDone}</span>
                </div>

                {/* Review Quote Body */}
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author Footer (Unboxed clean metadata) */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-900">{rev.name}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <span>{rev.type}</span>
                    <span aria-hidden="true">·</span>
                    <span>{rev.location}</span>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                  Verified Client
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
