import React from 'react';

interface AIOrbProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  state?: 'idle' | 'hover' | 'thinking' | 'response' | 'listening';
  className?: string;
  showOrbitalRing?: boolean;
}

export const AIOrb: React.FC<AIOrbProps> = ({
  size = 'md',
  state = 'idle',
  className = '',
  showOrbitalRing = true
}) => {
  const sizeMap = {
    sm: {
      container: 'w-6 h-6',
      core: 'w-3 h-3',
      glow: '-inset-1',
      ring: '-inset-1.5',
      spark: 'w-1 h-1'
    },
    md: {
      container: 'w-10 h-10',
      core: 'w-5 h-5',
      glow: '-inset-2',
      ring: '-inset-2.5',
      spark: 'w-1.5 h-1.5'
    },
    lg: {
      container: 'w-16 h-16',
      core: 'w-8 h-8',
      glow: '-inset-3',
      ring: '-inset-4',
      spark: 'w-2 h-2'
    },
    xl: {
      container: 'w-24 h-24',
      core: 'w-12 h-12',
      glow: '-inset-4',
      ring: '-inset-6',
      spark: 'w-2.5 h-2.5'
    }
  };

  const currentSize = sizeMap[size];
  const isThinking = state === 'thinking';
  const isHovered = state === 'hover';
  const isResponse = state === 'response';
  const isListening = state === 'listening';

  return (
    <div
      className={`relative aspect-square rounded-full flex items-center justify-center select-none shrink-0 ${currentSize.container} ${className}`}
      aria-label="Sukhvant AI Energy Core"
    >
      {/* Layer 1: Dynamic Chromatic Aura Glow (Circular Radial Gradient) */}
      <div
        className={`absolute ${currentSize.glow} rounded-full transition-all duration-700 pointer-events-none ${
          isThinking
            ? 'opacity-90 blur-md scale-125 animate-pulse'
            : isHovered
            ? 'opacity-85 blur-md scale-115'
            : isResponse
            ? 'opacity-100 blur-lg scale-130'
            : 'opacity-70 blur-sm'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(0,217,255,0.45) 0%, rgba(139,92,246,0.4) 40%, rgba(217,70,239,0.3) 70%, rgba(0,255,102,0.2) 100%)'
        }}
      />

      {/* Layer 2: Reactive Acoustic Rings for Listening State */}
      {isListening && (
        <>
          <div className="absolute -inset-2 rounded-full border border-cyan-400/60 animate-ping pointer-events-none" />
          <div className="absolute -inset-3.5 rounded-full border border-purple-500/40 animate-ping [animation-delay:200ms] pointer-events-none" />
        </>
      )}

      {/* Layer 3: Circular Orbital Ring Track (Strictly Circular - NO borderImage) */}
      {showOrbitalRing && (
        <div
          className={`absolute ${currentSize.ring} rounded-full border border-white/20 pointer-events-none ${
            isThinking ? 'border-cyan-400/60 animate-spin [animation-duration:2.5s]' : 'opacity-40 ai-orbital-drift'
          }`}
        >
          {/* Orbiting Chromatic Energy Spark */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px_#00D9FF] ${currentSize.spark} ${
              isThinking ? 'scale-125' : 'opacity-80'
            }`}
          />
        </div>
      )}

      {/* Layer 4: Chromatic Bezel Shell (Circular Outer Gradient Border) */}
      <div className="relative w-full h-full rounded-full p-[1.5px] bg-gradient-to-br from-[#00FF66] via-[#00D9FF] via-[#8B5CF6] to-[#D946EF] shadow-[0_0_12px_rgba(0,217,255,0.35)] flex items-center justify-center overflow-hidden">
        {/* Layer 5: Dark Obsidian Circular Chamber */}
        <div className="w-full h-full rounded-full bg-[#050505] p-1 flex items-center justify-center overflow-hidden relative">
          
          {/* Layer 6: Swirling Multi-Color Conic Nebula Energy */}
          <div
            className={`absolute inset-0 rounded-full opacity-90 transition-transform ${
              isThinking ? 'animate-spin [animation-duration:2s]' : 'ai-nebula-spin'
            }`}
            style={{
              background: 'conic-gradient(from 180deg at 50% 50%, #00FF66 0deg, #00D9FF 72deg, #5865FF 144deg, #8B5CF6 216deg, #D946EF 288deg, #00FF66 360deg)',
              filter: 'blur(2.5px)'
            }}
          />

          {/* Layer 7: Internal Contrast Softening Mask */}
          <div className="absolute inset-0.5 rounded-full bg-[#060606]/30 backdrop-blur-[0.5px]" />

          {/* Layer 8: Intelligent Power Core (Bright Luminous Gradient Center) */}
          <div
            className={`relative rounded-full transition-all duration-300 flex items-center justify-center ${currentSize.core} ${
              isThinking
                ? 'scale-125 animate-pulse'
                : isHovered
                ? 'scale-115'
                : 'ai-core-breath'
            }`}
            style={{
              background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #E0F2FE 25%, #38BDF8 50%, #818CF8 75%, #A855F7 95%)',
              boxShadow: isHovered
                ? '0 0 14px #00D9FF, 0 0 22px #8B5CF6, inset 0 0 6px #FFFFFF'
                : '0 0 10px rgba(0,217,255,0.85), 0 0 18px rgba(139,92,246,0.65), inset 0 0 4px #FFFFFF'
            }}
          >
            {/* Luminous Specular Reflection Point */}
            <div className="w-1 h-1 rounded-full bg-white shadow-[0_0_5px_#FFFFFF]" />
          </div>

        </div>
      </div>
    </div>
  );
};
