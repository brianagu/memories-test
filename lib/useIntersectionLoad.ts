import { useEffect, useRef, useState } from 'react';

/**
 * Hook to lazy-load media elements using Intersection Observer API
 * Triggers loading when element is within rootMargin of viewport
 *
 * @param threshold - Intersection threshold (0-1). Default: 0.1
 * @param rootMargin - Distance from viewport to trigger load. Default: '500px' (500px before entering viewport)
 * @returns { ref, isVisible } - Pass ref to container, use isVisible to conditionally render media
 */
export function useIntersectionLoad(threshold = 0.1, rootMargin = '500px') {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve after loading to avoid re-triggering
          observer.unobserve(entry.target);
        }
      },
      { rootMargin, threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
