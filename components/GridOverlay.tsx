'use client';

/**
 * GridOverlay - Visual debug layer showing the 12-column responsive grid
 * Reuses the same .content-grid class as real content, guaranteeing perfect alignment
 */
export function GridOverlay() {
  return (
    <div className="grid-overlay">
      <div className="content-grid h-screen sticky top-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="bg-blue-500 opacity-20 pointer-events-none"
          />
        ))}
      </div>
    </div>
  );
}
