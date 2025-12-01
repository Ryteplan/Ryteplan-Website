import { builder } from '@builder.io/react';
import { BuilderComponent } from '@builder.io/react';

// Initialize Builder
const apiKey = process.env.BUILDER_PUBLIC_API_KEY;

if (!apiKey) {
  throw new Error('Builder.io API key is missing. Please set NEXT_PUBLIC_BUILDER_API_KEY or BUILDER_PUBLIC_API_KEY in your environment variables.');
}

builder.init(apiKey);

export default async function Page() {
  try {
    const content = await builder
      .get('page', {
        url: '/',
      })
      .promise();

    // If no content is found, show a message
    if (!content) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>No content found</h1>
          <p>Create a page in Builder.io with URL path "/" to see content here.</p>
        </div>
      );
    }

    return <BuilderComponent model="page" content={content} />;
  } catch (error) {
    console.error('Error fetching Builder.io content:', error);
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Error loading content</h1>
        <p>Check the build logs for details.</p>
      </div>
    );
  }
}