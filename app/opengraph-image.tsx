import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#080808',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '55%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px',
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E8611A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
            <span
              style={{
                fontSize: '64px',
                fontWeight: 900,
                color: '#FFF3DC',
                marginLeft: '16px',
                letterSpacing: '0.05em',
              }}
            >
              SageStream
            </span>
          </div>
          <span
            style={{
              fontSize: '32px',
              color: 'rgba(255, 243, 220, 0.65)',
              marginBottom: '40px',
            }}
          >
            Where Every Arc Begins.
          </span>
          <span
            style={{
              fontSize: '20px',
              color: 'rgba(255, 243, 220, 0.40)',
            }}
          >
            Free to watch · 10,000+ titles
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '45%',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(232, 97, 26, 0.15) 0%, transparent 70%)',
              position: 'absolute',
            }}
          />
          <div style={{ display: 'flex', gap: '16px' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#E8611A',
                  transform: 'rotate(45deg)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
