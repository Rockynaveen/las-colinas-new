import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

export interface VideoScene {
  id: string;
  name: string;
  src: string;
  poster: string;
}

export const SCENES: VideoScene[] = [
  {
    id: 'video-2',
    name: 'Las Colinas Video',
    src: '/videos/video 2.mp4',
    poster: '/images/templete 1.webp'
  }
];

interface VideoContextType {
  activeSceneIndex: number;
  setActiveSceneIndex: (index: number) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  activeScene: VideoScene;
  hasVideoError: boolean;
  setHasVideoError: (hasError: boolean) => void;
  isVideoLoaded: boolean;
  setIsVideoLoaded: (isLoaded: boolean) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeScene = SCENES[activeSceneIndex];

  const lastSrcRef = useRef('');

  // 1. Handle sound toggling in isolation without loading/playing
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // 2. Handle scene source changes and initial loading
  useEffect(() => {
    if (videoRef.current) {
      // If the source URL actually changed, load the new source
      if (lastSrcRef.current !== activeScene.src) {
        lastSrcRef.current = activeScene.src;
        videoRef.current.src = activeScene.src;
        videoRef.current.poster = activeScene.poster || '/images/templete 1.webp';
        setHasVideoError(false);
        setIsVideoLoaded(false);
        videoRef.current.load();
      }

      // Call play only if the video is currently paused
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {
          if (videoRef.current?.error) {
            setHasVideoError(true);
            setIsVideoLoaded(false);
          }
        });
      }
    }
  }, [activeScene.src]);

  return (
    <VideoContext.Provider
      value={{
        activeSceneIndex,
        setActiveSceneIndex,
        isMuted,
        setIsMuted,
        videoRef,
        activeScene,
        hasVideoError,
        setHasVideoError,
        isVideoLoaded,
        setIsVideoLoaded
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

