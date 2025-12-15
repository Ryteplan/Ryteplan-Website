import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: Promise<{ page: string[] }>;
}

export async function generateStaticParams() {
  // Fetch all pages from Builder.io
  const pages = await builder.getAll('page', {
    fields: 'data.url',
    options: { noTargeting: true },
  });

  return pages.map((page) => ({
    page: page.data?.url?.split('/').filter(Boolean) || [],
  }));
}

export default async function CatchAllPage(props: PageProps) {
  const params = await props.params;
  const urlPath = "/" + (params?.page?.join("/") || "");
  
  const content = await builder
    .get("page", {
      userAttributes: {
        urlPath,
      },
    })
    .toPromise();

  // Verify the content URL matches the requested URL exactly
  const contentUrl = content?.data?.url;
  const isExactMatch = contentUrl === urlPath || contentUrl === `${urlPath}/`;

  return <RenderBuilderContent content={isExactMatch ? content : null} model="page" />;
}