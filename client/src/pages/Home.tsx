import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { AudioPlayer } from "@/components/AudioPlayer";
import { LyricsDisplay } from "@/components/LyricsDisplay";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, Heart, Music2, Play, Share2, Instagram, Twitter, Youtube, Music } from "lucide-react";
import { useState, useRef } from "react";
import type { AudioPlayerRef } from "@/components/AudioPlayer";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

// Lyrics data with timestamps based on transcription
const lyricsData = [
  { time: 0, text: "(Instrumental Intro)" },
  { time: 13.7, text: "Ah-ah-ah-ah-ah-ah-ah force" },
  { time: 15.7, text: "Someone who wants me" },
  { time: 19.2, text: "Oh-oh-oh" },
  { time: 20.7, text: "Someone who wants me too" },
  { time: 23.3, text: "Christmas lights on lambo skin" },
  { time: 26.3, text: "Music loud" },
  { time: 28.4, text: "The floor alive" },
  { time: 30.4, text: "Glass and glitter" },
  { time: 32.4, text: "Champagne air" },
  { time: 34.4, text: "Then your eyes found mine" },
  { time: 37.0, text: "Dopamine and heartbeat fast" },
  { time: 39.8, text: "You came close, I felt the heat" },
  { time: 43.0, text: "No words, just heat" },
  { time: 45.7, text: "Chemistry beneath our feet" },
  { time: 47.7, text: "Showroom lights across the crowd" },
  { time: 49.7, text: "Dancing like we're not alone" },
  { time: 53.2, text: "Bass was shaking through our feet" },
  { time: 55.2, text: "Heartbeat running with the beat" },
  { time: 57.2, text: "Closer, closer, pulling in" },
  { time: 59.2, text: "Yeah, I feel it within" },
  { time: 63.2, text: "Yeah, I feel it within" },
  { time: 66.2, text: "Ah-ah-ah-ah-ah-ah-ah-ah" },
  { time: 68.2, text: "I want someone who wants me" },
  { time: 70.2, text: "Someone who stays with me" },
  { time: 72.2, text: "Someone beside me" },
  { time: 74.2, text: "Someone who sees me" },
  { time: 76.2, text: "Someone who feels me" },
  { time: 78.2, text: "Someone who needs me" },
  { time: 80.2, text: "You want someone who wants you" },
  { time: 85.2, text: "I want someone who wants me too" },
  { time: 120.2, text: "More people came, the night grew wild" },
  { time: 122.2, text: "Lights and laughter" },
  { time: 124.2, text: "Strangers smiled" },
  { time: 126.2, text: "Then I saw you laughing near" },
  { time: 128.2, text: "With someone else too close, too clear" },
  { time: 132.2, text: "Adrenaline went cold and sharp" },
  { time: 134.2, text: "Serotonin fading thin" },
  { time: 136.2, text: "I stay still inside the crowd" },
  { time: 138.2, text: "And you would turn around" },
  { time: 140.2, text: "Showroom lights across the crowd" },
  { time: 142.2, text: "Dancing like we're not alone" },
  { time: 144.2, text: "Bass and heartbeat, feel it in" },
  { time: 146.2, text: "Yeah, I feel it within" },
  { time: 153.2, text: "Ah-ah-ah-ah-ah-ah-ah-ah" },
  { time: 155.2, text: "I want someone who wants me" },
  { time: 157.2, text: "Someone who stays with me" },
  { time: 159.2, text: "Someone beside me" },
  { time: 161.2, text: "Someone who sees me" },
  { time: 163.2, text: "Someone who feels me" },
  { time: 165.2, text: "Someone who needs me" },
  { time: 167.2, text: "Someone who wants you" },
  { time: 171.2, text: "I want someone who wants me too" },
  { time: 173.2, text: "Later on, the night grew thin" },
  { time: 177.2, text: "Cold outside, December wind" },
  { time: 181.2, text: "You came walking through the crowd" },
  { time: 185.2, text: "Eyes on mine, the room grew loud" },
  { time: 188.2, text: "Oxytocin rushing in" },
  { time: 192.2, text: "Warm and close beneath my skin" },
  { time: 195.2, text: "Heartbeat rising in the lights" },
  { time: 199.2, text: "You were back and it felt right" },
  { time: 202.2, text: "I want someone who wants me" },
  { time: 205.2, text: "Stay here, let me breathe" },
  { time: 209.2, text: "Right here, close beside me" },
  { time: 213.2, text: "Heartbeat's falling perfectly" },
  { time: 216.2, text: "You got close and I felt something" },
  { time: 220.2, text: "Don't let go, no more running" },
  { time: 224.2, text: "If you want someone who wants you" },
  { time: 230.2, text: "I want someone who wants me too" },
  { time: 233.2, text: "Want me too, need me too" },
  { time: 236.2, text: "(Outro)" },
];

const reviewContent = `
# Song Review: "Someone Who Wants Me"

## Overview
This is a personal and resonant track inspired by the Christmas party at a Lamborghini showroom. The song tells the story of an encounter with someone who sparked genuine connection. The production style is unmistakably influenced by Avicii's signature approach: atmospheric, progressive, and emotionally layered.

## Lyrical Analysis

### Narrative Structure
The song follows a three-act emotional arc.

**Act One: Initial Connection** - The opening establishes the scene with vivid sensory details: Christmas lights reflecting off a Lamborghini, champagne in the air, and the moment your eyes met the girl's. The lyrics effectively use biochemical language ("dopamine," "oxytocin," "serotonin") to convey the physiological rush of attraction and connection.

**Act Two: The Conflict** - The middle section introduces the emotional turning point. You see the girl with someone else, and the lyrics capture that gut-wrenching moment of hope deflating. The shift from "dopamine and heartbeat fast" to "adrenaline went cold and sharp" is particularly effective.

**Act Three: Resolution and Longing** - The final act brings the girl back into focus as the night winds down. There's a return of warmth and connection, but the song ends with the central question: mutual desire and commitment.

## Production & Musical Elements

### Avicii Influence
The production successfully captures the Avicii aesthetic:
- **Progressive structure**: The song builds gradually, layering elements as the narrative unfolds
- **Atmospheric pads**: Synth textures create an immersive, dreamy quality
- **Vocal treatment**: The vocals are processed with reverb and delay, creating a sense of intimacy
- **Bass and rhythm**: The track uses a steady, hypnotic beat that anchors the emotional journey

### Sonic Landscape
The production choices enhance the storytelling. The "showroom lights" and "bass shaking through our feet" aren't just lyrics—they're reflected in the sonic design. The track feels cinematic, like you're watching the scene unfold rather than just hearing about it.
`;

export default function Home() {
  const [currentTime, setCurrentTime] = useState(0);
  const [shouldAutoplayVideo, setShouldAutoplayVideo] = useState(false);
  const audioPlayerRef = useRef<AudioPlayerRef>(null);
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Someone Who Wants Me - Soraya Perry',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        toast.error('Failed to share. Please try again.');
      }
    }
  };

  const handleVideoShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Someone Who Wants Me - Official Video',
          url: window.location.href + '#video',
        });
      } else {
        await navigator.clipboard.writeText(window.location.href + '#video');
        toast.success('Video link copied to clipboard!');
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        toast.error('Failed to share. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.jpg" 
            alt="Lamborghini Showroom" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/30 via-[#0a0e17]/60 to-[#0a0e17]" />
        </div>

        {/* Content */}
        <div className="relative z-10 container text-center space-y-8 animate-in fade-in zoom-in duration-1000">
          <div className="inline-block mb-4">
            <div className="w-64 h-64 md:w-80 md:h-80 mx-auto relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all duration-1000 animate-pulse" />
              <img 
                src="/images/album-art.jpg" 
                alt="Album Art" 
                className="w-full h-full object-cover rounded-2xl shadow-[0_0_50px_-10px_rgba(0,243,255,0.3)] border border-white/10 relative z-10 transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent drop-shadow-[0_0_30px_rgba(0,243,255,0.5)]">
              SOMEONE WHO<br />WANTS ME
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-light tracking-widest uppercase">
              Avicii Style • Original Mix
            </p>
            <p className="text-lg text-primary/80 font-light tracking-wide">
              by Soraya Perry
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 pt-8 flex-wrap">
            <Button 
              onClick={() => {
                document.getElementById('player')?.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                  audioPlayerRef.current?.play();
                }, 500);
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all hover:scale-105"
            >
              <Music2 className="mr-2 h-5 w-5" /> Listen Now
            </Button>
            <Button 
              onClick={() => {
                setShouldAutoplayVideo(true);
                setTimeout(() => {
                  document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              variant="outline" 
              className="border-primary/50 text-primary hover:bg-primary/10 text-lg px-8 py-6 rounded-full backdrop-blur-sm transition-all hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5" /> Watch Video
            </Button>
            <Button 
              variant="outline" 
              onClick={handleShare}
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full backdrop-blur-sm transition-all hover:scale-105"
            >
              <Share2 className="mr-2 h-5 w-5" /> Share
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/40">
          <ArrowDown className="w-8 h-8" />
        </div>
      </section>

      {/* Player & Lyrics Section */}
      <section id="player" className="relative py-24 px-4 min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0e17] to-[#0f1420]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-1/2 bg-primary/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-accent/5 blur-[100px] rounded-full" />
        </div>

        <div className="container max-w-4xl relative z-10 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              Immersive Experience
            </h2>
            <p className="text-white/60 max-w-lg mx-auto">
              Put on your headphones and let the music take you back to that night.
            </p>
          </div>

          <AudioPlayer
            ref={audioPlayerRef}
            src="https://files.manuscdn.com/user_upload_by_module/session_file/105909607/vPEzkZEPYxxPkuYB.mp3"
            onTimeUpdate={setCurrentTime}
            className="sticky top-8 z-50"
          />

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-transparent to-[#0f1420] z-10 pointer-events-none h-32" />
            <LyricsDisplay 
              currentTime={currentTime} 
              lyrics={lyricsData} 
              className="h-[60vh]"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0f1420] via-transparent to-transparent z-10 pointer-events-none h-32" />
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-24 px-4 bg-gradient-to-b from-[#0f1420] to-[#0a0e17] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-accent/5 blur-[100px] rounded-full" />
        </div>

        <div className="container max-w-4xl relative z-10 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              Official Video
            </h2>
            <p className="text-white/60 max-w-lg mx-auto">
              Experience the Lamborghini Christmas Party that inspired the song. Featuring original music by Soraya Perry, crafted exclusively for this Lamborghini visual experience.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <VideoPlayer
                videoUrl="https://files.manuscdn.com/user_upload_by_module/session_file/105909607/kfXoiyDaspzgzDRm.mp4"
                onShare={handleVideoShare}
                autoplay={shouldAutoplayVideo}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="py-24 px-4 bg-[#0a0e17] relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/crowd-atmosphere.jpg" 
            alt="Atmosphere" 
            className="w-full h-full object-cover opacity-10 mix-blend-overlay"
          />
        </div>

        <div className="container max-w-3xl relative z-10">
          <Card className="bg-black/40 backdrop-blur-xl border-white/10 p-8 md:p-12 shadow-2xl">
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:tracking-tight prose-p:text-white/80 prose-a:text-primary hover:prose-a:text-primary/80">
              <Streamdown>
                {reviewContent}
              </Streamdown>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <p className="font-bold text-white">Curated by Manus AI</p>
                  <p className="text-sm text-white/60">Music Analysis & Review</p>
                </div>
              </div>
              
              <Button variant="secondary" className="rounded-full" onClick={handleShare}>
                Share this Review
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Soraya Perry Discography Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#0a0e17] to-[#05070a] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-1/2 left-0 w-1/2 h-1/2 bg-accent/5 blur-[100px] rounded-full" />
        </div>

        <div className="container max-w-4xl relative z-10 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              More from Soraya Perry
            </h2>
            <p className="text-white/60 max-w-lg mx-auto">
              Explore more of Soraya Perry's music across all major streaming platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="https://open.spotify.com/album/71ar4v0WovJCL7Ab7Rswle?si=VqMLaZXHQG-VRWM7IPRZ1w" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="bg-black/40 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all p-6 cursor-pointer h-full">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">SOMEONE WHO WANTS ME</h3>
                  <p className="text-white/60 text-sm">Listen on Spotify</p>
                </div>
              </Card>
            </a>

            <a href="https://open.spotify.com/track/5wxZ90DttAIV64mZRTxRnA?si=21c0ff4eff9e49f1" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="bg-black/40 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all p-6 cursor-pointer h-full">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">WHEN YOU FEEL SOMETHING</h3>
                  <p className="text-white/60 text-sm">Listen on Spotify</p>
                </div>
              </Card>
            </a>

            <a href="https://open.spotify.com/track/47C4NblKQZURAwmZj84Tvg?si=9778a549e1c44565" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="bg-black/40 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all p-6 cursor-pointer h-full">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">YOU ARE VALUABLE (ALWAYS)</h3>
                  <p className="text-white/60 text-sm">Listen on Spotify</p>
                </div>
              </Card>
            </a>

            <a href="https://open.spotify.com/track/44jE2EPkUUbc5xEOHrAre0?si=a56c05ffd9a54862" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="bg-black/40 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all p-6 cursor-pointer h-full">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">YOU HAVE EVERYTHING YOU NEED</h3>
                  <p className="text-white/60 text-sm">Listen on Spotify</p>
                </div>
              </Card>
            </a>

            <a href="https://open.spotify.com/track/7LcvTsAw1UDLbPdLwxI9H7?si=52b7c55447c04ee8" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="bg-black/40 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all p-6 cursor-pointer h-full">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">DANCE CRAZY IN DUBAI</h3>
                  <p className="text-white/60 text-sm">Listen on Spotify</p>
                </div>
              </Card>
            </a>

            <a href="https://open.spotify.com/track/7LqmKVkHcb13sq5cJHVNOG?si=18ec24bcb81f4610" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="bg-black/40 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all p-6 cursor-pointer h-full">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">YOU SAID</h3>
                  <p className="text-white/60 text-sm">Listen on Spotify</p>
                </div>
              </Card>
            </a>

            <a href="https://open.spotify.com/track/6cDoBrcsirJNSfTWClmwBE?si=8715b59ef1b7401c" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="bg-black/40 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all p-6 cursor-pointer h-full">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">YOUR SAID CLUB MIX</h3>
                  <p className="text-white/60 text-sm">Listen on Spotify</p>
                </div>
              </Card>
            </a>

            <a href="https://open.spotify.com/track/3Lg5n5E0YhCBSDDoPL5In7?si=8e95a9f111d44a0a" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="bg-black/40 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all p-6 cursor-pointer h-full">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">THE WEEK BEFORE CHRISTMAS</h3>
                  <p className="text-white/60 text-sm">Listen on Spotify</p>
                </div>
              </Card>
            </a>
          </div>

          <div className="text-center pt-8">
            <a href="https://open.spotify.com/artist/0JP507OyWBlaEy1hyY4LOA?si=TcjPP3i2TfiM1DeFW7PzSw" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all hover:scale-105">
                <Music2 className="mr-2 h-5 w-5" /> Follow Soraya Perry on Spotify
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter & Footer */}
      <section className="py-16 bg-gradient-to-b from-[#05070a] to-black border-t border-primary/20">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">Stay Connected</h3>
            <p className="text-white/60">Subscribe to get updates on new releases and exclusive content from Soraya Perry</p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-primary/20 rounded-xl p-8 mb-12">
            <NewsletterForm />
            <p className="text-xs text-white/40 mt-4 text-center">Contact: <a href="mailto:sorayaperrymusic@gmail.com" className="text-primary hover:text-primary/80 transition-colors">sorayaperrymusic@gmail.com</a></p>
          </div>

          <div className="flex justify-center gap-6 mb-12">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors" title="Instagram">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors" title="TikTok">
              <Music className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors" title="Twitter">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors" title="YouTube">
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-white/40 text-sm bg-[#05070a] border-t border-white/10">
        <div className="container">
          <p>© 2025 Soraya Perry. All rights reserved.</p>
          <p className="mt-2 text-xs">Designed with Neon Nocturne Aesthetic</p>
        </div>
      </footer>
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const subscribe = trpc.newsletter.subscribe.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await subscribe.mutateAsync({ email });
      toast.success('Thanks for subscribing!');
      setEmail("");
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-3 bg-white/5 border border-primary/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary/60 focus:bg-white/10 transition-all"
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg disabled:opacity-50"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
    </form>
  );
}
