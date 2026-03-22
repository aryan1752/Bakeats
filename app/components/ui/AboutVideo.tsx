export default function AboutVideo() {
  return (
    <section className="relative w-full min-h-[50vh] md:min-h-[80vh] overflow-hidden">

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-contain md:object-cover"
      >
        <source
          src="https://res.cloudinary.com/ddtifclgr/video/upload/f_auto,q_auto/v1774078666/WhatsApp_Video_2026-03-21_at_1.06.35_PM_cfuknw.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

    </section>
  );
}