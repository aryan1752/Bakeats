export default function AboutSection() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-900/40 to-orange-800/40 border border-orange-700/50 rounded-full">
          <svg 
            className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg 
            className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-orange-300 font-medium text-sm sm:text-base">
            About Sheryians
          </span>
        </div>

        {/* Main Heading with clamp for fluid scaling */}
        <h1 
          className="font-light text-gray-400 leading-snug sm:leading-tight px-2 sm:px-4"
          style={{
            fontSize: 'clamp(1.875rem, 5vw, 4.5rem)'
          }}
        >
          At Sheryians, We Believe In Thinking Big. Our Mission Is To Lead The Forefront Of Innovation In IT Education By Building A Global Network Of Skilled Professionals.
        </h1>
      </div>
    </div>
  );
}