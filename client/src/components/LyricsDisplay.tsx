import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface LyricLine {
  time: number;
  text: string;
}

interface LyricsDisplayProps {
  currentTime: number;
  lyrics: LyricLine[];
  className?: string;
}

export function LyricsDisplay({ currentTime, lyrics, className }: LyricsDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLParagraphElement>(null);

  // Find the current active line index
  const activeIndex = lyrics.findIndex((line, index) => {
    const nextLine = lyrics[index + 1];
    return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
  });

  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeLine = activeLineRef.current;
      
      const containerHeight = container.clientHeight;
      const activeLineTop = activeLine.offsetTop;
      const activeLineHeight = activeLine.clientHeight;
      
      // Scroll to center the active line
      const scrollPosition = activeLineTop - (containerHeight / 2) + (activeLineHeight / 2);
      
      container.scrollTo({
        top: scrollPosition,
        behavior: "smooth"
      });
    }
  }, [activeIndex]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "h-[400px] overflow-y-auto scrollbar-hide mask-gradient-y py-32 text-center",
        className
      )}
    >
      <div className="space-y-8">
        {lyrics.map((line, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          
          return (
            <p
              key={index}
              ref={isActive ? activeLineRef : null}
              className={cn(
                "transition-all duration-500 ease-out font-display tracking-wide px-4",
                isActive 
                  ? "text-3xl md:text-4xl text-white font-bold scale-105 drop-shadow-[0_0_15px_rgba(0,243,255,0.6)]" 
                  : isPast
                    ? "text-lg md:text-xl text-white/20 blur-[1px]"
                    : "text-lg md:text-xl text-white/40"
              )}
            >
              {line.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}
