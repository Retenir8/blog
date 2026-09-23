import type { AnchorHTMLAttributes } from 'react';

// Preserve document navigation and no-JavaScript access during the hosting migration.
export default function SiteLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} />;
}
