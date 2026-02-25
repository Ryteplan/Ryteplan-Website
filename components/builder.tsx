// components/builder.tsx
"use client";
import { ComponentProps, useEffect, useState } from "react";
import { builder } from "@builder.io/sdk";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import '@builder.io/widgets'

// Replace with your Public API Key 
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

type BuilderPageProps = ComponentProps<typeof BuilderComponent>;

export function RenderBuilderContent(props: BuilderPageProps) {
  const [mounted, setMounted] = useState(false);
  const isPreviewing = useIsPreviewing();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Defer BuilderComponent render until after hydration to avoid rich text
  // dangerouslySetInnerHTML server/client mismatch in Builder.io SDK
  const shouldRenderContent = props.content || isPreviewing;
  if (shouldRenderContent && mounted) {
    return <BuilderComponent {...props} />;
  }

  if (shouldRenderContent && !mounted) {
    // Placeholder during SSR and initial hydration - must match server/client
    return <div style={{ minHeight: "100vh" }} />;
  }

  // Show 404 when no content is found
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <h1 style={{ fontSize: '4rem', margin: 0, color: '#111' }}>404</h1>
      <p style={{ fontSize: '1.25rem', color: '#666' }}>Page not found</p>
    </div>
  );
}