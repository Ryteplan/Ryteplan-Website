import { builder } from "@builder.io/sdk";
import { cache } from "react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export interface BuilderSettings {
  siteName?: string;
  title?: string;
  description?: string;
  ogImage?: string;
  favicon?: string;
  [key: string]: any;
}

/**
 * Fetches site-wide settings from Builder.io
 * Uses the "settings" model by default, or you can specify a custom model name
 * Uses React cache for request-level memoization
 */
export const getBuilderSettings = cache(
  async (modelName: string = "settings"): Promise<BuilderSettings | null> => {
    try {
      const settings = await builder
        .get(modelName, {
          options: {
            noTargeting: true,
          },
        })
        .toPromise();

      return settings?.data || null;
    } catch (error) {
      console.error("Error fetching Builder.io settings:", error);
      return null;
    }
  }
);
