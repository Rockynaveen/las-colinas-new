import React from 'react';
import { Volume2, VolumeX, Film } from 'lucide-react';
import { useVideo, SCENES } from '../context/VideoContext';

export const VideoBackground: React.FC = () => {
  const {
    activeSceneIndex,
    setActiveSceneIndex,
    isMuted,
    setIsMuted,
    videoRef
  } = useVideo();

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <div className="hero-video-container">
      {/* Cinematic HTML5 Background Video is rendered globally at the root level */}

      {/* Subtle Dark Navy Tint Overlay */}
      <div className="hero-subtle-overlay" />

      {/* Interactive Controls Bar */}
      <div className="video-controls-bar">
        {/* Scene Selector */}
        <div className="video-scene-selector">
          <Film size={13} style={{ color: 'var(--color-gold-light)' }} />
          {SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              type="button"
              onClick={() => setActiveSceneIndex(idx)}
              className={`video-scene-pill ${activeSceneIndex === idx ? 'active' : ''}`}
            >
              {scene.name}
            </button>
          ))}
        </div>

        {/* Audio Sound Toggle */}
        <button
          type="button"
          onClick={toggleSound}
          className="video-sound-btn"
          aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          <span>{isMuted ? 'Sound' : 'Muted'}</span>
        </button>
      </div>
    </div>
  );
};
