import React from 'react';
import Spinner from './ui/spinner';

export default function SVGLoader({ fileName }: { fileName: string }) {
  const SvgComponent = React.lazy(
    () => import(`@/app/components/icons/${fileName}`)
  );

  return (
    <React.Suspense fallback={<Spinner />}>
      <SvgComponent />
    </React.Suspense>
  );
}
