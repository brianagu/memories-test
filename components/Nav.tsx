'use client';

import { SITE_CONFIG } from '@/config/site';
import { useOverlay } from '@/components/OverlayContext';

export function Nav() {
  const { isOpen, toggle } = useOverlay();

  const navStyle = {
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    color: '#ffffff',
  };

  return (
    <nav className="sticky top-0 z-50 w-full">
      <div className="content-grid pt-[24px]" style={navStyle}>
        {/* Brian Aguilar - columns 1-4 */}
        <div style={{ gridColumn: '1 / 5' }}>
          {SITE_CONFIG.nav.name}
        </div>

        {/* In Progress, 2016 – + additional detail when overlay open - columns 5-8 */}
        <div style={{ gridColumn: '5 / 9', position: 'relative' }}>
          <div>{SITE_CONFIG.nav.tagline}</div>
          {isOpen && (
            <div className="overlay-text" style={{ position: 'absolute', top: '100%', marginTop: '18px' }}>
              <p style={{ margin: 0, marginBottom: '18px', lineHeight: '1.6' }}>
                In Progress, 2016 –<br /><br />
                Inspired by the randomness of memory recall, this collection of moments captured since 2016 is presented as spontaneous snapshots of nostalgia. Each visit is a wholly unique display of composition and order.<br /><br />
              </p>
              <a
                href="https://instagram.com/brianagu"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                {SITE_CONFIG.nav.handle}
              </a>
            </div>
          )}
        </div>

        {/* Toggle "More detail" / "Show less" - columns 9-12 */}
        <div
          style={{
            gridColumn: '9 / 13',
            textAlign: 'right',
          }}
        >
          <button
            type="button"
            onClick={toggle}
            className="nav-link"
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              padding: 0,
            }}
          >
            {isOpen ? 'close' : 'About'}
          </button>
        </div>
      </div>
    </nav>
  );
}
