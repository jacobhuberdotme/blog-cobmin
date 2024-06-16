'use client';

import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface BlogPostProps {
  mdxContent: any; // Adjust as needed for proper type
  data: {
    title: string;
    date: string;
    summary: string;
    images: string;
    tags?: string[];
  };
}

const BlogPost: React.FC<BlogPostProps> = ({ mdxContent, data }) => {
  const tags = data.tags || []; // Provide a default value if tags are undefined

  return (
    <article className="prose mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-600">{new Date(data.date).toLocaleDateString()}</p>
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
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <Badge key={tag} variant="default" className="pointer-events-none">
            {tag}
          </Badge>
        ))}
      </div>
      <MDXRemote {...mdxContent} />
    </article>
  );
};

export default BlogPost;
