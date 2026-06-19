import "server-only";

import { fetchSanityDirect } from "@lib/sanity/direct-fetch";
import { cache } from "react";
import { z } from "zod";

/** Portable-text block shape (permissive — Sanity rich text). */
const portableTextBlock = z.object({ _type: z.string() }).passthrough();

const searchPageSchema = z
  .object({
    title: z.string().optional(),
    description: z.array(portableTextBlock).optional(),
  })
  .passthrough();

export type SearchPageContent = {
  title: string | null;
  description: z.infer<typeof portableTextBlock>[] | null;
};

/**
 * Fetches the organisationEventSearch page content from Sanity.
 * Sanity doc id: 97e4a372-709f-43cb-9d8e-bb7811b8b807
 */
const QUERY = `*[_type == "pages" && _id == "97e4a372-709f-43cb-9d8e-bb7811b8b807"][0]{
  title,
  description
}`;

export const getSearchPageContent = cache(async (): Promise<SearchPageContent | null> => {
  const result = await fetchSanityDirect(QUERY, undefined, ["organisationEventSearch"]);
  if (result.isErr()) return null;
  const parsed = searchPageSchema.safeParse(result.value);
  if (!parsed.success) return null;
  return {
    title: parsed.data.title ?? null,
    description: parsed.data.description ?? null,
  };
});
