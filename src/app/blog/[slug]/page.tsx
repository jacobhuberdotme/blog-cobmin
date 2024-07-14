import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dynamic from 'next/dynamic';
import ClientBlogPost from '@/components/ClientBlogPost';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Metadata } from 'next';

const MDXRemote = dynamic(() => import('next-mdx-remote').then(mod => mod.MDXRemote), { ssr: false });

interface Params {
  slug: string;
}

interface Frontmatter {
  title: string;
  date: string;
  summary: string;
  images: string;
  tags: string[];
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/data/blog'));
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const filePath = path.join(process.cwd(), 'src/data/blog', `${params.slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter } = matter(source);

  return {
    metadataBase: new URL('https://cobmin.com'),  // Replace with your actual website URL
    title: frontmatter.title,
    description: frontmatter.summary,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.summary,
      images: [
        {
          url: frontmatter.images,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.summary,
      images: [frontmatter.images],
    },
  };
}

interface PageProps {
  params: Params;
}

export default async function Page({ params }: PageProps) {
  const filePath = path.join(process.cwd(), 'src/data/blog', `${params.slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');

  const { content, data: frontmatter } = matter(source);

  const { serialize } = await import('next-mdx-remote/serialize');
  const mdxSource: MDXRemoteSerializeResult = await serialize(content, { scope: frontmatter });

  return <ClientBlogPost mdxContent={mdxSource} data={frontmatter as Frontmatter} />;
}
