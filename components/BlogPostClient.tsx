'use client';

import { BuilderComponent } from '@builder.io/react';
import type { BuilderContent } from '@builder.io/sdk';

interface BlogPostClientProps {
  content: BuilderContent | null;
}

export default function BlogPostClient({ content }: BlogPostClientProps) {
  if (!content) {
    return null;
  }

  return <BuilderComponent model="blog-post" content={content} />;
}

