import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, Download, Maximize, Minimize, Pause, Play, Share2, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface VideoPlayerProps {
  videoUrl: string;
  audioUrl: string;
  className?: string;
  onShare?: () => void;
  autoplay?: boolean;
  audioRef?: React.RefObject<HTMLAudioElement | null>;
}

export function VideoPlayer({ videoUrl, audioUrl, className, onShare, autoplay = false, audioRef: externalAudioRef }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const internalAudioRef = useRef<HTMLAudioElement>(null);
  // Use external audio ref if provided, otherwise create internal one
  const audioRef = externalAudioRef || internalAudioRef;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Sync video and audio playback
  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video || !audio) return;

    // When video plays, play audio
    const handleVideoPlay = () => {
      audio.play().catch((error) => {
        console.log("Audio autoplay blocked or failed:", error);
      });
      setIsPlaying(true);
    };

    // When video pauses, pause audio
    const handleVideoPause = () => {
      audio.pause();
      setIsPlaying(false);
    };

    // Keep audio and video in sync
    const handleTimeUpdate = () => {
      const timeDiff = Math.abs(video.currentTime - audio.currentTime);
      if (timeDiff > 0.3) {
        audio.currentTime = video.currentTime;
      }
      setCurrentTime(video.currentTime);
    };

    // When video ends, stop playback
    const handleVideoEnded = () => {
      video.pause();
      audio.pause();
      setIsPlaying(false);
    };

    // When audio ends, stop playback
    const handleAudioEnded = () => {
      video.pause();
      audio.pause();
      setIsPlaying(false);
    };

    // Get duration from audio
    const handleAudioLoadedMetadata = () => {
      setDuration(audio.duration);
      console.log("Audio loaded, duration:", audio.duration);
    };

    // Handle audio errors
    const handleAudioError = () => {
      console.error("Audio error:", audio.error);
    };

    video.addEventListener("play", handleVideoPlay);
    video.addEventListener("pause", handleVideoPause);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleVideoEnded);
    audio.addEventListener("ended", handleAudioEnded);
    audio.addEventListener("loadedmetadata", handleAudioLoadedMetadata);
    audio.addEventListener("error", handleAudioError);

    return () => {
      video.removeEventListener("play", handleVideoPlay);
      video.removeEventListener("pause", handleVideoPause);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleVideoEnded);
      audio.removeEventListener("ended", handleAudioEnded);
      audio.removeEventListener("loadedmetadata", handleAudioLoadedMetadata);
      audio.removeEventListener("error", handleAudioError);
    };
  }, []);

  // Update audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle autoplay
  useEffect(() => {
    if (autoplay && videoRef.current) {
      const video = videoRef.current;
      
      video.play().catch((error) => {
        console.log("Video autoplay blocked:", error);
      });
      setIsPlaying(true);
    }
  }, [autoplay]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    
    if (!video || !audio) return;

    if (isPlaying) {
      video.pause();
      // Only pause audio if it's internal, not shared
      if (!externalAudioRef) {
        audio.pause();
      }
    } else {
      const videoPromise = video.play();
      
      // Only play audio if it's internal, not shared
      if (!externalAudioRef) {
        const audioPromise = audio.play();
        Promise.all([videoPromise, audioPromise]).catch((error) => {
          console.error("Playback error:", error);
        });
      } else {
        videoPromise.catch((error) => {
          console.error("Video playback error:", error);
        });
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current && audioRef.current) {
      videoRef.current.currentTime = newTime;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;

    try {
      if (!isFullscreen) {
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if ((container as any).webkitRequestFullscreen) {
          await (container as any).webkitRequestFullscreen();
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        } else if ((document as any).webkitFullscreenElement) {
          await (document as any).webkitExitFullscreen();
        }
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "w-full space-y-4",
        className,
        isFullscreen && "fixed inset-0 z-50 bg-black space-y-0 rounded-none flex flex-col"
      )}
    >
      {!externalAudioRef && <audio ref={internalAudioRef} src={audioUrl} crossOrigin="anonymous" preload="auto" />}
      
      {/* Video Container */}
      <div 
        className={cn(
          "relative overflow-hidden shadow-[0_0_50px_-10px_rgba(0,243,255,0.2)] border border-primary/20 bg-black group",
          isFullscreen ? "w-full h-full rounded-none flex-1" : "rounded-xl aspect-[9/16]"
        )}
      >
          <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        autoPlay
        onLoadedData={() => {
          console.log("Video loaded successfully");
          setIsVideoLoaded(true);
          setVideoError(null);
        }}
        onError={(e) => {
          console.error("Video error:", e);
          const video = e.currentTarget;
          setVideoError(`Video failed to load: ${video.error?.message || 'Unknown error'}`);
        }}
        onCanPlay={() => console.log("Video can play")}
      />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,243,255,0.5)] flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-current" />
            ) : (
              <Play className="w-7 h-7 fill-current ml-1" />
            )}
          </Button>
        </div>

        {/* Loading State */}
        {!isVideoLoaded && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-center space-y-2">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-white/60 text-sm">Loading video...</p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-center space-y-2 p-4">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
              <p className="text-white text-sm">Video Error</p>
              <p className="text-white/60 text-xs max-w-xs">{videoError}</p>
              <Button onClick={() => window.location.reload()} variant="outline" size="sm" className="mt-2">
                Reload Page
              </Button>
            </div>
          </div>
        )}

        {/* Time Display */}
        <div className="absolute bottom-4 left-4 text-xs text-white/60 font-mono bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className={cn("space-y-2", isFullscreen && "px-4")}>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>

      {/* Controls */}
      <div 
        className={cn(
          "flex items-center justify-between gap-4 bg-black/40 backdrop-blur-md border border-primary/20 p-4",
          isFullscreen ? "rounded-none" : "rounded-xl"
        )}
      >
        <div className="flex items-center gap-3 flex-1">
          <Button
            onClick={togglePlay}
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            size="sm"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
          </Button>

          <div className="flex items-center gap-2 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-primary/60 hover:text-primary hover:bg-primary/10 transition-all"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={toggleFullscreen}
            variant="outline"
            size="sm"
            className="border-primary/30 text-primary hover:bg-primary/10 transition-all"
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4" />
            ) : (
              <Maximize className="w-4 h-4" />
            )}
          </Button>
          <Button
            onClick={onShare}
            variant="outline"
            size="sm"
            className="border-primary/30 text-primary hover:bg-primary/10 transition-all"
          >
            <Share2 className="w-4 h-4 mr-1" /> Share
          </Button>
        </div>
      </div>

      {/* Info */}
      {!isFullscreen && (
        <div className="text-center text-sm text-white/50 pt-2">
          Full song experience • 5:44 duration • {duration > 0 ? "Audio loaded" : "Loading audio..."}
        </div>
      )}
    </div>
  );
}
