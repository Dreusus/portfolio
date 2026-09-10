// next/image needs the Next.js image optimizer route (/_next/image), which
// does not exist outside a Next server — the real component renders a broken
// img in every preview and in every design built with this DS. This shim keeps
// the same call signature and renders a plain <img>, falling back to a neutral
// placeholder when the file isn't served (the app's own /public assets are not
// part of the design-system bundle).
import { useState } from 'react';
import type { CSSProperties } from 'react';

const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
      <rect width="320" height="320" fill="#e5efe6"/>
      <circle cx="160" cy="128" r="52" fill="#93b18b"/>
      <path d="M40 320c0-66 54-104 120-104s120 38 120 104z" fill="#93b18b"/>
    </svg>`
  );

interface ShimImageProps {
  src?: string | { src?: string };
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  placeholder?: string;
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
  unoptimized?: boolean;
  onLoad?: () => void;
  [key: string]: unknown;
}

const Image = ({
  src,
  alt = '',
  width,
  height,
  className,
  style,
  fill,
  // Next-only knobs with no meaning for a plain <img>.
  priority: _priority,
  quality: _quality,
  sizes: _sizes,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  unoptimized: _unoptimized,
  loading,
  ...rest
}: ShimImageProps) => {
  const resolved = typeof src === 'string' ? src : src?.src;
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed || !resolved ? PLACEHOLDER : resolved}
      alt={alt}
      width={width as number | undefined}
      height={height as number | undefined}
      className={className}
      loading={loading}
      style={fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...style } : style}
      onError={() => setFailed(true)}
      {...(rest as Record<string, unknown>)}
    />
  );
};

export default Image;
