"use client";

import { Phone, MapPin, Clock, Compass, Sparkles, Navigation } from "lucide-react";

export default function ContactClient() {
  return (
    <div className="w-full min-h-screen bg-[#071728] text-gray-100 py-12 px-4 md:px-8 mt-6 flex flex-col justify-start items-center">
      <div className="max-w-2xl w-full bg-[#0d2036] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden p-6 md:p-10 flex flex-col justify-between relative">
        <div className="absolute inset-0 bg-[#F5BE18]/5 rounded-full filter blur-3xl z-0" />
        
        <div className="relative z-10 flex flex-col gap-6">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 bg-[#F5BE18]/20 text-[#F5BE18] px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow">
              <Sparkles className="h-3.5 w-3.5" />
              <span>KVI Learning Center Locator</span>
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white">Admissions & Counseling Head Office</h1>
            <p className="text-xs text-gray-300 mt-2 leading-relaxed font-semibold">
              Connect with our Hari Nagar office for batch timings, fee structures, scholarship test registration, and seat bookings in Jaitpur & Badarpur.
            </p>
          </div>

          {/* Directory Box */}
          <div className="bg-[#091a2e] border border-gray-800 p-6 rounded-2xl flex flex-col gap-5 text-xs shadow-inner">
            
            <div className="flex items-start gap-3.5">
              <MapPin className="h-6 w-6 text-[#F5BE18] shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-white block uppercase tracking-wider text-[10px] mb-1 text-[#00A5EC]">Primary Center Address</span>
                <p className="leading-relaxed text-gray-200 font-bold text-sm">
                  I-49A, Above Dabra Medical Center, Hari Nagar, Jaitpur Badarpur, New Delhi 110044
                </p>
                <p className="text-[11px] text-amber-400 font-medium mt-1">
                  Landmarks: Near Hari Nagar Bus Stand, Jaitpur Extension Road, Badarpur Border, New Delhi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Phone className="h-6 w-6 text-[#F5BE18] shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-white block uppercase tracking-wider text-[10px] mb-1 text-[#00A5EC]">Helpline Contacts</span>
                <div className="flex flex-wrap gap-4 text-gray-200 font-black text-sm mt-1">
                  <a href="tel:7011731649" className="hover:text-[#00A5EC] underline transition flex items-center gap-1">
                    📞 7011731649
                  </a>
                  <a href="tel:8585575250" className="hover:text-[#00A5EC] underline transition flex items-center gap-1">
                    📞 8585575250
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Clock className="h-6 w-6 text-[#F5BE18] shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-white block uppercase tracking-wider text-[10px] mb-1 text-[#00A5EC]">Counseling Hours</span>
                <span className="text-gray-200 font-bold text-xs">
                  08:00 AM - 08:00 PM (Open All 7 Days Monday - Sunday)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Navigation className="h-6 w-6 text-[#F5BE18] shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-white block uppercase tracking-wider text-[10px] mb-1 text-[#00A5EC]">Serviced Neighborhoods</span>
                <p className="text-xs text-gray-300 font-semibold leading-relaxed">
                  Hari Nagar Part 1 & 2, Jaitpur Extension, Ekta Vihar, Badarpur Border, Mithapur, Meethapur, Ali Village, NTPC Township & Sarita Vihar.
                </p>
              </div>
            </div>
            
          </div>

          {/* Action Directions Button */}
          <a
            href="https://maps.google.com/?q=I-49A,above+Dabra+Medical+Center,Hari+Nagar,Jaitpur+Badarpur,New+Delhi+110044"
            target="_blank"
            rel="noreferrer"
            className="w-full bg-[#00A5EC] hover:bg-[#00A5EC]/90 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-lg"
          >
            <Compass className="h-4 w-4" />
            <span>Open Location in Google Maps</span>
          </a>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-6 relative z-10 text-center text-xs text-gray-400">
          <span className="text-[#F5BE18] italic font-black text-sm">"Knowledge Venture Institute – Where Concepts Become Clear"</span>
        </div>
      </div>
    </div>
  );
}
