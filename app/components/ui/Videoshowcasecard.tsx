"use client";

interface VideoCardProps {
  videoUrl: string;
  channelName: string;
  description: string;
}

function extractVideoId(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
    return parsed.searchParams.get("v") || url;
  } catch {
    return url;
  }
}

export default function VideoShowcaseCard({ videoUrl, channelName, description }: VideoCardProps) {
  const videoId = extractVideoId(videoUrl);
  const youtubeLink = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className="w-full bg-black py-5 md:py-10 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl md:text-5xl">Featured by popular YouTubers</h2>
          <p className="mt-3 text-sm text-neutral-400 sm:text-base md:mt-4 md:text-xl">
            See what the best YouTubers are saying about bakeats.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 rounded-[20px] bg-[linear-gradient(135deg,#5B5CEB_0%,#A8B6FF_100%)] p-4 shadow-[0_22px_70px_rgba(91,92,235,0.38)] sm:rounded-[24px] sm:p-6 md:flex-row md:items-center md:gap-10 md:p-9">
          <a
            href={youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full overflow-hidden rounded-2xl md:w-[460px] md:min-w-[460px]"
          >
            <img
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="h-auto w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-[72px] items-center justify-center rounded-xl bg-[#FF0000] shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden>
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            </div>
          </a>

          <p className="text-xl leading-[1.35] text-white/95 sm:text-2xl md:text-[48px] md:leading-[1.22]">
           <span className="font-semibold">{channelName}</span> {description}
          </p>
        </div>
      </div>
    </section>
  );
}
