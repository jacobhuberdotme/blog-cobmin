// src/components/ClientBlogPost.tsx

'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useMDXComponents } from '@/mdx-components';
import { format, parseISO } from 'date-fns';

interface BlogPostProps {
  mdxContent: MDXRemoteSerializeResult;
  data: { 
    title: string;
    date: string; // Ensure this is a string
    summary: string;
    images: string;
  };
}

export default function ClientBlogPost({ mdxContent, data }: BlogPostProps) {
  const components = useMDXComponents({});
  const formattedDate = format(parseISO(data.date), 'MMMM d, yyyy');

  return (
    <article className="prose lg:prose-xl mx-auto my-8">
      <header className="mb-8">
        {data.images && (
          <img
            src={data.images}
            alt={data.title}
            className="w-full h-auto rounded-lg mb-4"
          />
        )}
        <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
        <p className="text-gray-600">Created: {formattedDate}</p>
        {data.summary && <p className="text-lg mt-4">tldr: {data.summary}</p>}
      </header>
      <section>
        <MDXRemote {...mdxContent} components={components} />
      </section>
    </article>
  );
}
