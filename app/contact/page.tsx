"use client";

import { Phone, MapPin, Clock, Compass, Sparkles } from "lucide-react";

export default function Contact() {
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-[#071728] text-gray-800 dark:text-gray-100 py-12 px-4 md:px-8 mt-10 flex flex-col justify-start items-center">
      <div className="max-w-xl w-full bg-white dark:bg-[#0d2036] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden p-6 md:p-10 flex flex-col justify-between relative">
        <div className="absolute inset-0 bg-[#F5BE18]/5 rounded-full filter blur-3xl z-0" />
        
        <div className="relative z-10 flex flex-col gap-6">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 bg-[#F5BE18]/10 dark:bg-[#F5BE18]/20 text-[#0D2847] dark:text-[#F5BE18] px-3.5 py-1.5 rounded-full text-xs font-bold mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>KVI Learning center locator</span>
            </span>
            <h1 className="text-2xl font-black text-[#0D2847] dark:text-white">Admissions Head Office</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
              Connect with our Hari Nagar office for batch timings, fee structures, and course seats reservations.
            </p>
          </div>

          {/* Directory Box */}
          <div className="bg-gray-50 dark:bg-[#091a2e] border border-gray-150 dark:border-gray-800 p-6 rounded-xl flex flex-col gap-5 text-xs shadow-inner">
            
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-[#F5BE18] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#0D2847] dark:text-white block uppercase tracking-wide text-[10px] mb-1">Center Address</span>
                <span className="leading-relaxed text-gray-600 dark:text-gray-300">
                  I-49A, above Dabra Medical Center, Hari Nagar, Jaitpur Badarpur, New Delhi 110044
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-[#F5BE18] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#0D2847] dark:text-white block uppercase tracking-wide text-[10px] mb-1">Helpline Contacts</span>
                <div className="flex flex-col gap-1 text-gray-600 dark:text-gray-300 font-bold">
                  <a href="tel:7011731649" className="hover:text-[#00A5EC] hover:underline">7011731649</a>
                  <a href="tel:8585575250" className="hover:text-[#00A5EC] hover:underline">8585575250</a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-[#F5BE18] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#0D2847] dark:text-white block uppercase tracking-wide text-[10px] mb-1">Office Hours</span>
                <span className="text-gray-600 dark:text-gray-300">
                  08:00 AM - 08:00 PM (Monday - Sunday)
                </span>
              </div>
            </div>
            
          </div>

          {/* Action Directions Button */}
          <a
            href="https://maps.google.com/?q=I-49A,above+Dabra+Medical+Center,Hari+Nagar,Jaitpur+Badarpur,New+Delhi+110044"
            target="_blank"
            rel="noreferrer"
            className="w-full bg-[#0D2847] hover:bg-[#0D2847]/90 text-white font-bold py-3 rounded-lg text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
          >
            <Compass className="h-4 w-4" />
            <span>Open in Google Maps</span>
          </a>
        </div>

        <div className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-6 relative z-10 text-center text-xs text-gray-400 dark:text-gray-500">
          <span className="text-[#F5BE18] italic font-bold">"Where Concepts Become Clear"</span>
        </div>
      </div>
    </div>
  );
}
