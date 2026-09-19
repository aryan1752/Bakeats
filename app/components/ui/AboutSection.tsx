export default function AboutSection() {
  return (
    <div className="min-h-[70vh] bg-[#071728] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 text-white border-b border-gray-800">
      <div className="w-full max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-sky-900/40 to-sky-800/40 border border-sky-500/30 rounded-full shadow-lg">
          <svg 
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F5BE18]" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sky-300 font-bold text-xs sm:text-sm uppercase tracking-wider">
            About Knowledge Venture Institute (KVI)
          </span>
        </div>

        {/* Main Heading with fluid scaling */}
        <h1 
          className="font-black text-white leading-snug sm:leading-tight px-2 sm:px-4"
          style={{
            fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)'
          }}
        >
          At <span className="text-[#F5BE18]">Knowledge Venture Institute</span>, every student discovers their path to academic excellence with expert faculty, interactive doubt resolution, and proven board exam success in Hari Nagar, Jaitpur & Badarpur.
        </h1>

        <p className="text-sm md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
          Located above Dabra Medical Center, Hari Nagar, Jaitpur Badarpur, New Delhi 110044, KVI is dedicated to delivering 100% conceptual clarity for Class 6th-10th Foundations, Class 11th-12th Commerce (Accounts, Economics, B.ST), and Class 11th-12th Humanities (Arts).
        </p>
      </div>
    </div>
  );
}