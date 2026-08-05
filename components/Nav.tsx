import { SITE_CONFIG } from '@/config/site';

export function Nav() {
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

        {/* In Progress, 2016 - - columns 5-8 */}
        <div style={{ gridColumn: '5 / 9' }}>
          {SITE_CONFIG.nav.tagline}
        </div>

        {/* @brianagu - columns 9-12 */}
        <div
          style={{
            gridColumn: '9 / 13',
            textAlign: 'right',
          }}
        >
          <a
            href="https://instagram.com/brianagu"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
            style={{
              color: '#ffffff',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            {SITE_CONFIG.nav.handle}
          </a>
        </div>
      </div>
    </nav>
  );
}
