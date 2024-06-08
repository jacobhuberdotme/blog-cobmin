import type { MDXComponents } from 'mdx/types';
import CustomImage from '@/components/CustomImage';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-semibold mb-3">{children}</h2>,
    h3: ({ children }) => <h2 className="text-2xl font-semibold mb-2">{children}</h2>,
    h4: ({ children }) => <h2 className="text-2xl font-semibold mb-1">{children}</h2>,
    p: ({ children }) => <p className="mb-4">{children}</p>,
    a: (props) => <Link href={props.href || '#'} className="text-blue-600 hover:underline" {...props} />,
    ul: ({ children }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
    img: (props) => (
      <CustomImage
        src={props.src!} // Ensure that src is not undefined
        alt={props.alt!} // Ensure that alt is not undefined
        width={props.width || 800} // Set a default width
        height={props.height || 600} // Set a default height
        {...props}
      />
    ),
    ...components,
  };
}
