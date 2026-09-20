import type { AnchorHTMLAttributes } from 'react';

// Document navigation remains reliable in the hosted Worker build and without JS.
// Vinext's current production RSC prefetch chunk fails before client navigation.
export default function SiteLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} />;
}
