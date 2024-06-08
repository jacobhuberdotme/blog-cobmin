import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import BlogPost from '@/components/BlogPost';

interface Frontmatter {
  title: string;
  date: string;
  summary: string;
  images: string;
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/data'));
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ''),
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'src/data', `${params.slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');

  const { content, data: frontmatter } = matter(source);
  const mdxSource: MDXRemoteSerializeResult = await serialize(content, {
    scope: frontmatter,
  });

  return <BlogPost mdxContent={mdxSource} data={frontmatter as Frontmatter} />;
}
