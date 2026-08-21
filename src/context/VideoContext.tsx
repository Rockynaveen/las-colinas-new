import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

export interface VideoScene {
  id: string;
  name: string;
  src: string;
  poster: string;
}

export const SCENES: VideoScene[] = [
  {
    id: 'resort',
    name: 'Luxury Resort',
    src: 'https://www.pexels.com/download/video/29936032/',
    poster: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85'
  },
  {
    id: 'hospitality',
    name: 'Premier Estate',
    src: 'https://vjs.zencdn.net/v/oceans.mp4',
    poster: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=85'
  }
];

interface VideoContextType {
  activeSceneIndex: number;
  setActiveSceneIndex: (index: number) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  activeScene: VideoScene;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
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
        if (activeScene.poster) {
          videoRef.current.poster = activeScene.poster;
        }
        videoRef.current.load();
      }

      // Call play only if the video is currently paused
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {
          // Silent catch for browser autoplay restrictions
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
        activeScene
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
