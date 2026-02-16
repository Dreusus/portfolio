import { SVGProps } from 'react';

interface IPhoneMockupProps extends SVGProps<SVGSVGElement> {
  src?: string;
}

export const IPhoneMockup = ({ src, className, ...props }: IPhoneMockupProps) => {
  return (
    <svg
      viewBox="0 0 433 882"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Outer frame with gradient */}
      <defs>
        <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a3a3c" />
          <stop offset="50%" stopColor="#1c1c1e" />
          <stop offset="100%" stopColor="#2c2c2e" />
        </linearGradient>
        <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(147, 177, 139, 0.1)" />
          <stop offset="100%" stopColor="rgba(246, 232, 210, 0.1)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Shadow */}
      <ellipse cx="216.5" cy="870" rx="150" ry="12" fill="rgba(0,0,0,0.15)" />

      {/* Outer frame */}
      <path
        d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
        fill="url(#frameGradient)"
      />

      {/* Left buttons */}
      <path
        d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z"
        fill="#2c2c2e"
      />
      <path
        d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z"
        fill="#2c2c2e"
      />
      <path
        d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z"
        fill="#2c2c2e"
      />

      {/* Right button */}
      <path
        d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z"
        fill="#2c2c2e"
      />

      {/* Inner frame */}
      <path
        d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
        fill="#262626"
      />

      {/* Screen area with glow */}
      <rect
        x="21.25"
        y="19.25"
        width="389.5"
        height="843.5"
        rx="55.75"
        ry="55.75"
        fill="#000"
        filter="url(#glow)"
      />

      {/* Image */}
      {src && (
        <image
          href={src}
          x="21.25"
          y="19.25"
          width="389.5"
          height="843.5"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#screenClip)"
        />
      )}

      {/* Dynamic Island */}
      <path
        d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z"
        fill="#000"
      />

      {/* Screen glow overlay */}
      <rect
        x="21.25"
        y="19.25"
        width="389.5"
        height="843.5"
        rx="55.75"
        ry="55.75"
        fill="url(#screenGlow)"
        opacity="0.3"
        clipPath="url(#screenClip)"
      />

      <defs>
        <clipPath id="screenClip">
          <rect
            x="21.25"
            y="19.25"
            width="389.5"
            height="843.5"
            rx="55.75"
            ry="55.75"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
