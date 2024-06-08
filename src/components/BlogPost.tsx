import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import dynamic from 'next/dynamic';

const ClientBlogPost = dynamic(() => import('@/components/ClientBlogPost'), { ssr: false });

interface BlogPostProps {
  mdxContent: MDXRemoteSerializeResult;
  data: { 
    title: string;
    date: string;
    summary: string;
    images: string;
  };
}

export default function BlogPost({ mdxContent, data }: BlogPostProps) {
  return <ClientBlogPost mdxContent={mdxContent} data={data} />;
}
