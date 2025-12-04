'use client';
import { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import { useParams, usePathname } from "next/navigation";

// Put your API key here
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found
export default function BlogPostPage() {
  const pathname = usePathname();
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // get the page content from Builder
  useEffect(() => {
    async function fetchContent() {
      if (!pathname) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const content = await builder
          .get("blog-post", {
            url: pathname
          })
          .toPromise();

        setContent(content);
        setNotFound(!content);

        // if the page title is found, 
        // set the document title (only on client side)
        if (content?.data?.title) {
          document.title = content.data.title;
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, [pathname]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }
  
  // If no page is found, return 
  // a 404 page from your code.
  if (notFound && !isPreviewingInBuilder) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-lg text-red-600">404 - Blog post not found</div>
        <div className="text-sm text-gray-500">
          Path searched: <code className="bg-gray-100 px-2 py-1 rounded">{pathname}</code>
        </div>
      </div>
    );
  }

  // return the page when found
  return (
    <>
      {/* Render the Builder page */}
      <BuilderComponent model="blog-post" content={content || undefined} />
    </>
  );
}