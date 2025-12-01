import { builder } from '@builder.io/react';
import { BuilderComponent } from '@builder.io/react';

// Use the env var name you already have in Netlify
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || process.env.BUILDER_PUBLIC_API_KEY!);

export default async function Page() {
  const content = await builder
    .get('page', {
      url: '/',
      options: { noTraverse: true },
    })
    .promise();

  return <BuilderComponent model="page" content={content} />;
}