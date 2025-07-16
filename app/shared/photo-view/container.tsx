'use client';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import React from 'react';

type GlobalPhotoViewProps = {
  image: string;
  render?: () => React.ReactElement;
  speed?: (open: number) => number;
  easing?: (type: number) => string;
};

export default function GlobalPhotoView({
  image,
  render,
  speed = () => 300,
  easing,
}: GlobalPhotoViewProps) {
  return (
    <PhotoProvider
      speed={speed}
      easing={easing}
    >
      <PhotoView src={image}>
        {render && render()}
      </PhotoView>
    </PhotoProvider>
  );
}
