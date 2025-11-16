import type { SVGProps } from 'react';

export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <title>Sentiment Insights Logo</title>
    <path d="M12 4.5c-2.3 0-4.42.9-6 2.36.73 2.12 2.2 3.88 4.51 4.92" />
    <path d="M12 19.5c2.3 0 4.42-.9 6-2.36-.73-2.12-2.2-3.88-4.51-4.92" />
    <path d="M17.5 12c0 2.2-1.2 4-3 4" />
    <path d="M6.5 12c0-2.2 1.2-4 3-4" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);
