'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useMDXComponents } from '@/mdx-components';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

const MDXRemote = dynamic(() => import('next-mdx-remote').then(mod => mod.MDXRemote), { ssr: false });

interface CollectionPostProps {
  mdxContent: MDXRemoteSerializeResult;
  frontmatter: {
    title: string;
    description: string;
    image: string;
    blockchain?: string;
    marketplace?: string;
    links?: { title: string; url: string }[];
  };
}

export default function ClientCollectionPost({ mdxContent, frontmatter }: CollectionPostProps) {
  const components = useMDXComponents({});

  return (
    <article className="prose lg:prose-xl mx-auto my-8">
      <header className="mb-8">
        {frontmatter.image && (
          <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4">
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-2">{frontmatter.title}</h1>
        <p className="text-gray-600">{frontmatter.description}</p>
        {frontmatter.blockchain && (
          <p className="text-lg mt-4">Chain: {frontmatter.blockchain}</p>
        )}
        {frontmatter.marketplace && (
          <p className="text-lg mt-4">
            Marketplace: <a href={frontmatter.marketplace} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{frontmatter.marketplace}</a>
          </p>
        )}
        {frontmatter.links && (
          <ul className="mt-4">
            {frontmatter.links.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{link.title}</a>
              </li>
            ))}
          </ul>
        )}
      </header>
      <section>
        <MDXRemote {...mdxContent} components={components} />
      </section>
    </article>
  );
}
