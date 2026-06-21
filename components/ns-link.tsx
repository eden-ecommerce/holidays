import Link from "next/link";
import type { ComponentProps } from "react";

type NsLinkProps = ComponentProps<typeof Link>;

/** Internal navigation — pass the path relative to basePath, e.g. `/retreats`. */
export function NsLink(props: NsLinkProps) {
  return <Link {...props} />;
}
