import type { ProjectItem } from '../data/portfolio';

export function ProjectArtwork({
  variant,
  title,
}: {
  variant: ProjectItem['artworkVariant'];
  title: string;
}) {
  if (variant === 'banking') {
    return (
      <div className="relative flex h-44 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-[#0C162D] to-slate-950 p-5">
        <svg
          viewBox="0 0 320 140"
          role="img"
          aria-label={`${title} architecture diagram`}
          className="h-full w-full max-w-[290px]"
        >
          <defs>
            <linearGradient id="bank-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* Java App Node */}
          <rect
            x="16"
            y="42"
            width="86"
            height="56"
            rx="8"
            fill="#111C33"
            stroke="#38BDF8"
            strokeOpacity="0.45"
          />
          <text x="59" y="66" textAnchor="middle" fill="#E2E8F0" fontSize="10" fontFamily="monospace">
            Java Core
          </text>
          <text x="59" y="82" textAnchor="middle" fill="#7DD3FC" fontSize="8.5" fontFamily="monospace">
            Ledger Logic
          </text>

          {/* Connection */}
          <line x1="102" y1="70" x2="136" y2="70" stroke="url(#bank-line)" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="119" cy="70" r="3" fill="#38BDF8" />

          {/* Transaction Bus */}
          <rect
            x="136"
            y="30"
            width="72"
            height="80"
            rx="8"
            fill="#0F172A"
            stroke="#64748B"
            strokeOpacity="0.5"
          />
          <text x="172" y="54" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="monospace">
            ACID TX
          </text>
          <rect x="148" y="64" width="48" height="10" rx="3" fill="#1E293B" />
          <rect x="148" y="80" width="48" height="10" rx="3" fill="#1E293B" />

          {/* Connection */}
          <line x1="208" y1="70" x2="236" y2="70" stroke="url(#bank-line)" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* MySQL Cylinder */}
          <rect
            x="236"
            y="42"
            width="68"
            height="56"
            rx="8"
            fill="#111C33"
            stroke="#2563EB"
            strokeOpacity="0.6"
          />
          <text x="270" y="66" textAnchor="middle" fill="#E2E8F0" fontSize="10" fontFamily="monospace">
            MySQL
          </text>
          <text x="270" y="82" textAnchor="middle" fill="#93C5FD" fontSize="8.5" fontFamily="monospace">
            Accounts DB
          </text>
        </svg>
      </div>
    );
  }

  if (variant === 'samba') {
    return (
      <div className="relative flex h-44 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-[#0E1729] to-slate-950 p-5">
        <svg
          viewBox="0 0 320 140"
          role="img"
          aria-label={`${title} network diagram`}
          className="h-full w-full max-w-[290px]"
        >
          {/* Ubuntu Server */}
          <rect
            x="18"
            y="34"
            width="98"
            height="72"
            rx="8"
            fill="#111C33"
            stroke="#38BDF8"
            strokeOpacity="0.45"
          />
          <text x="67" y="57" textAnchor="middle" fill="#E2E8F0" fontSize="10" fontFamily="monospace">
            Ubuntu Server
          </text>
          <text x="67" y="73" textAnchor="middle" fill="#7DD3FC" fontSize="8.5" fontFamily="monospace">
            smbd · smb.conf
          </text>
          <text x="67" y="89" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">
            Group ACLs
          </text>

          {/* Network branches */}
          <path d="M 116 70 L 160 70 L 185 38 L 210 38" fill="none" stroke="#38BDF8" strokeOpacity="0.55" strokeWidth="1.5" />
          <path d="M 160 70 L 185 102 L 210 102" fill="none" stroke="#6366F1" strokeOpacity="0.65" strokeWidth="1.5" />

          {/* Share 1 */}
          <rect
            x="210"
            y="20"
            width="94"
            height="38"
            rx="6"
            fill="#0F172A"
            stroke="#38BDF8"
            strokeOpacity="0.35"
          />
          <text x="257" y="38" textAnchor="middle" fill="#E2E8F0" fontSize="9" fontFamily="monospace">
            /srv/shared-a
          </text>
          <text x="257" y="50" textAnchor="middle" fill="#94A3B8" fontSize="7.5" fontFamily="monospace">
            @group_a (rw)
          </text>

          {/* Share 2 */}
          <rect
            x="210"
            y="82"
            width="94"
            height="38"
            rx="6"
            fill="#0F172A"
            stroke="#6366F1"
            strokeOpacity="0.45"
          />
          <text x="257" y="100" textAnchor="middle" fill="#E2E8F0" fontSize="9" fontFamily="monospace">
            /srv/restricted
          </text>
          <text x="257" y="112" textAnchor="middle" fill="#94A3B8" fontSize="7.5" fontFamily="monospace">
            @admin_grp (r/w)
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className="relative flex h-44 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-[#10152B] to-slate-950 p-5">
      <svg
        viewBox="0 0 320 140"
        role="img"
        aria-label={`${title} deep learning pipeline diagram`}
        className="h-full w-full max-w-[290px]"
      >
        {/* X-ray Frame */}
        <rect
          x="16"
          y="32"
          width="76"
          height="76"
          rx="8"
          fill="#0B1325"
          stroke="#38BDF8"
          strokeOpacity="0.45"
        />
        <rect x="26" y="42" width="56" height="42" rx="4" fill="#172542" />
        <path
          d="M36 63 Q44 50 54 63 T72 63"
          fill="none"
          stroke="#7DD3FC"
          strokeWidth="1.5"
          strokeOpacity="0.8"
        />
        <text x="54" y="99" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">
          Dental X-ray
        </text>

        <line x1="92" y1="70" x2="118" y2="70" stroke="#38BDF8" strokeOpacity="0.6" strokeWidth="1.5" />

        {/* Neural Network Layers */}
        <rect
          x="118"
          y="28"
          width="84"
          height="84"
          rx="8"
          fill="#111C33"
          stroke="#6366F1"
          strokeOpacity="0.55"
        />
        <circle cx="140" cy="48" r="4" fill="#38BDF8" />
        <circle cx="140" cy="70" r="4" fill="#38BDF8" />
        <circle cx="140" cy="92" r="4" fill="#38BDF8" />
        <circle cx="164" cy="58" r="4" fill="#818CF8" />
        <circle cx="164" cy="82" r="4" fill="#818CF8" />
        <circle cx="186" cy="70" r="4.5" fill="#60A5FA" />
        <line x1="144" y1="48" x2="160" y2="58" stroke="#64748B" strokeWidth="1" />
        <line x1="144" y1="70" x2="160" y2="58" stroke="#64748B" strokeWidth="1" />
        <line x1="144" y1="70" x2="160" y2="82" stroke="#64748B" strokeWidth="1" />
        <line x1="144" y1="92" x2="160" y2="82" stroke="#64748B" strokeWidth="1" />
        <line x1="168" y1="58" x2="181" y2="70" stroke="#93C5FD" strokeWidth="1" />
        <line x1="168" y1="82" x2="181" y2="70" stroke="#93C5FD" strokeWidth="1" />

        <line x1="202" y1="70" x2="226" y2="70" stroke="#818CF8" strokeOpacity="0.6" strokeWidth="1.5" />

        {/* Output Node */}
        <rect
          x="226"
          y="40"
          width="78"
          height="60"
          rx="8"
          fill="#0F172A"
          stroke="#38BDF8"
          strokeOpacity="0.45"
        />
        <text x="265" y="65" textAnchor="middle" fill="#E2E8F0" fontSize="9" fontFamily="monospace">
          Decision
        </text>
        <text x="265" y="80" textAnchor="middle" fill="#7DD3FC" fontSize="8" fontFamily="monospace">
          Support AI
        </text>
      </svg>
    </div>
  );
}
