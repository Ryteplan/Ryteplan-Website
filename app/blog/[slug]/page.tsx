import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../../components/builder";

// Replace with your Public API Key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Fetch all blog posts from Builder.io
  const posts = await builder.getAll('blog-post', {
    fields: 'data.slug',
    options: { noTargeting: true },
  });

  return posts.map((post) => ({
    slug: post.data?.slug || '',
  }));
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  
  const content = await builder
    .get("blog-post", {
      url: `/blog/${params.slug}`,
    })
    .toPromise();

  // Verify the content slug matches what we requested
  // Builder.io may return fallback content if no exact match exists
  const isMatch = content?.data?.slug === params.slug;

  return (
    <>
      <RenderBuilderContent 
        content={isMatch ? content : null} 
        model="blog-post" 
      />
    </>
  );
}