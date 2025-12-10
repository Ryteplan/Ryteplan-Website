import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: Promise<{ page: string[] }>;
}

export default async function CatchAllPage(props: PageProps) {
  const params = await props.params;
  const content = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + (params?.page?.join("/") || ""),
      },
    })
    .toPromise();

  return <RenderBuilderContent content={content} model="page" />;
}