'use client';

import dynamic from 'next/dynamic';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import { useMDXComponents } from '@/mdx-components';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

const MDXRemote = dynamic(() => import('next-mdx-remote').then(mod => mod.MDXRemote), { ssr: false });

interface BlogPostProps {
  mdxContent: MDXRemoteSerializeResult;
  data: {
    title: string;
    date: string;
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
          <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4">
            <Image
              src={data.images}
              alt={data.title}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
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
