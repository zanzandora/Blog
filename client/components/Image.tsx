import { IKImage } from 'imagekitio-react';
import React from 'react';

interface ImageProps {
  path: string;
  w: number;
  h: number;
  className?: string;
  alt?: string;
}
const Image: React.FC<ImageProps> = ({ path, w, h, className, alt }) => {
  return (
    <div>
      <IKImage
        urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
        path={path}
        alt={alt}
        className={className}
        loading='lazy'
        lqip={{ active: true, quality: 20 }}
        transformation={[{ width: w, height: h }]}
      />
    </div>
  );
};

export default Image;
