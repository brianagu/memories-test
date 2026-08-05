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
      <div className="content-grid py-4" style={navStyle}>
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
          {SITE_CONFIG.nav.handle}
        </div>
      </div>
    </nav>
  );
}
