"use client";

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useMDXComponents } from '../mdx-components';

interface BlogPostProps {
  mdxSource: MDXRemoteSerializeResult;
  data: { title: string };
}

export default function BlogPost({ mdxSource, data }: BlogPostProps) {
  const components = useMDXComponents({});
  return (
    <div>
      <h1>{data.title}</h1>
      <MDXRemote {...mdxSource} components={components} />
    </div>
  );
}
