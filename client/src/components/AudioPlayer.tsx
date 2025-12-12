import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState, forwardRef } from "react";

interface AudioPlayerProps {
  src: string;
  onTimeUpdate?: (currentTime: number) => void;
  className?: string;
}

export const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(function AudioPlayer({ src, onTimeUpdate, className }, ref) {
  const internalAudioRef = useRef<HTMLAudioElement>(null);
  // Properly handle the forwarded ref
  const audioRef = ref ? (ref as any) : internalAudioRef;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      if (onTimeUpdate) onTimeUpdate(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", onEnded);
    };
  }, [onTimeUpdate]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      audioRef.current.muted = newMutedState;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={cn("w-full bg-black/40 backdrop-blur-md border border-primary/20 rounded-xl p-6 shadow-[0_0_30px_-10px_rgba(0,243,255,0.3)]", className)}>
      <audio ref={audioRef} src={src} />
      
      {/* Progress Bar */}
      <div className="mb-6 group">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-primary/60 mt-2 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary/60 hover:text-primary hover:bg-primary/10 transition-all"
            onClick={() => {
              if (audioRef.current) audioRef.current.currentTime = 0;
            }}
          >
            <SkipBack className="w-5 h-5" />
          </Button>

          <Button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,243,255,0.5)] flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-primary/60 hover:text-primary hover:bg-primary/10 transition-all"
            onClick={() => {
              if (audioRef.current) audioRef.current.currentTime = duration;
            }}
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3 w-32">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="text-primary/60 hover:text-primary hover:bg-primary/10"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
});
