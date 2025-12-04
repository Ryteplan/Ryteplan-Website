'use client';

import { BuilderComponent, builder } from '@builder.io/react';
import { usePathname } from 'next/navigation';
import '../components/registry';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || '');

export default function CatchAllPage() {
  const pathname = usePathname();
  
  return (
    <BuilderComponent 
      model="page"
    />
  );
}