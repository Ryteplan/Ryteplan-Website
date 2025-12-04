'use client';

import { BuilderComponent, builder } from '@builder.io/react';
import '../../components/registry';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default function CatchAllPage() {
  return (
    <BuilderComponent 
      model="page"
      apiKey={process.env.NEXT_PUBLIC_BUILDER_API_KEY!}
    />
  );
}