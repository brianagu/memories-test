'use client';

import { useEffect, useState } from 'react';
import type { MediaAsset } from '@/lib/media';
import { shuffleAndAssignVariants, type ShuffledAsset } from '@/lib/shuffle';
import { MediaBlock } from './MediaBlock';
import { GridOverlay } from './GridOverlay';

interface GalleryProps {
  assets: MediaAsset[];
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

export function Gallery({ assets }: GalleryProps) {
  const [shuffled, setShuffled] = useState<ShuffledAsset[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1014px)');

  useEffect(() => {
    // Only shuffle on client after mount to avoid hydration mismatch
    setShuffled(shuffleAndAssignVariants(assets));
    setMounted(true);

    // Listen for keyboard shortcut to toggle grid (Ctrl+G / Cmd+G)
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
        e.preventDefault();
        setShowGrid((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [assets]);

  if (!mounted) {
    const spacingClass = isMobile ? 'space-y-[100px]' : 'space-y-[200px]';
    return (
      <div className={spacingClass}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-96 animate-pulse bg-white/5 rounded-lg" />
        ))}
      </div>
    );
  }

  if (shuffled.length === 0) {
    return (
      <div className="py-20 text-center text-white/50">
        No media assets found. Add images or videos to <code>public/media/</code> folder.
      </div>
    );
  }

  const spacingClass = isMobile ? 'space-y-[100px]' : 'space-y-[200px]';

  return (
    <>
      {showGrid && <GridOverlay />}

      <div className={spacingClass}>
        {shuffled.map((asset, index) => (
          <MediaBlock key={`${asset.src}-${index}`} asset={asset} />
        ))}
      </div>

      {/* Grid toggle hint */}
      <div className="fixed bottom-4 right-4 text-xs text-white/40 pointer-events-none">
        Press Cmd+G to toggle grid
      </div>
    </>
  );
}
