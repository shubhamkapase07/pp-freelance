import React, { useState, useEffect, useRef } from 'react';

const VideoBackground = ({ 
  videos = [], 
  className = "", 
  blur = true, 
  autoSwitch = true,
  switchInterval = 100 // 10 seconds default
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const switchTimeoutRef = useRef(null);

  // Default videos if none provided
  const defaultVideos = [
    '/herobganimation.mp4',
    '/herobganimation.mp4' // You can replace this with your second video
  ];

  const videoList = videos.length > 0 ? videos : defaultVideos;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      
      // No auto-switching - video plays once only
    };

    const handleEnded = () => {
      // Video ends, start fade out effect
      console.log('Video playback completed');
      setIsFadingOut(true);
      
      // After fade animation completes, hide video completely
      setTimeout(() => {
        setIsVideoFinished(true);
      }, 5000); // Match the fade duration (5 seconds)
    };

    const handleError = () => {
      console.warn(`Failed to load video: ${videoList[currentVideoIndex]}`);
      // Try next video if available
      if (videoList.length > 1) {
        setCurrentVideoIndex((prev) => (prev + 1) % videoList.length);
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      clearTimeout(switchTimeoutRef.current);
    };
  }, [currentVideoIndex, videoList, autoSwitch, switchInterval]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset video when index changes
    video.load();
    video.play().catch((error) => {
      console.warn('Autoplay failed:', error);
    });
  }, [currentVideoIndex]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video - only show if not finished */}
      {!isVideoFinished && (
        <video
          ref={videoRef}
          className={`video-background ${blur ? 'blur-sm' : ''} transition-opacity duration-100000 ${
            isLoaded && !isFadingOut ? 'opacity-10' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop={false}
          playsInline
          preload="metadata"
          style={{
            filter: blur ? 'blur(1px) brightness(0.6) saturate(1.2)' : 'brightness(0.6) saturate(1.2)',
            transform: 'scale(1.05)' // Slight zoom to prevent edge artifacts
          }}
        >
          <source src={videoList[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Loading indicator */}
      {!isLoaded && !isVideoFinished && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default VideoBackground;
