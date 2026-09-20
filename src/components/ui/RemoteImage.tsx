import Image, { type ImageProps } from 'next/image';
import { canOptimizeImage } from '@/lib/images';

type RemoteImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  src?: string | null;
  alt: string;
};

/**
 * Thin wrapper around next/image for WordPress media.
 * - renders nothing for an empty src (next/image throws on empty strings)
 * - skips the optimizer for hosts that are not allow-listed / local dev hosts
 * Lazy loading is the default; pass `priority` only for the real LCP image.
 */
export function RemoteImage({ src, alt, ...rest }: RemoteImageProps) {
  if (!src) return null;

  return <Image src={src} alt={alt} unoptimized={!canOptimizeImage(src)} {...rest} />;
}
