import { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { DetailedHTMLProps, AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

const CustomH1 = (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <h1 className="text-4xl font-bold mb-4" {...props}>{props.children}</h1>
);

const CustomH2 = (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <h2 className="text-3xl font-semibold mb-3" {...props}>{props.children}</h2>
);

const CustomP = (props: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) => (
  <p className="mb-4" {...props}>{props.children}</p>
);

const CustomA = (props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => (
  <Link href={props.href || '#'} className="text-blue-600 hover:underline" {...props}>
      {props.children}
  </Link>
);

const CustomUL = (props: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
  <ul className="list-disc list-inside mb-4" {...props}>{props.children}</ul>
);

const CustomOL = (props: DetailedHTMLProps<HTMLAttributes<HTMLOListElement>, HTMLOListElement>) => (
  <ol className="list-decimal list-inside mb-4" {...props}>{props.children}</ol>
);

export const CustomMDXComponents: MDXComponents = {
  h1: CustomH1,
  h2: CustomH2,
  p: CustomP,
  a: CustomA,
  ul: CustomUL,
  ol: CustomOL,
};
