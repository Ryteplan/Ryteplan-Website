import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../components/builder";

builder.init(process.env.BUILDER_PUBLIC_API_KEY!);

export default async function HomePage() {
  const content = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/",
      },
    })
    .toPromise();

  return <RenderBuilderContent content={content} model="page" />;
}