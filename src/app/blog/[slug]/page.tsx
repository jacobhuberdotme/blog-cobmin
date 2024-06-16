import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import ClientBlogPost from '@/components/ClientBlogPost';

interface Frontmatter {
  title: string;
  date: string; // Ensure this is a string
  summary: string;
  images: string;
  tags: string[];
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/data'));
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'src/data', `${params.slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter } = matter(source);

  return {
    title: frontmatter.title,
    description: frontmatter.summary,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.summary,
      images: [
        {
          url: frontmatter.images, // Ensure this is an absolute URL
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.summary,
      images: [frontmatter.images], // Ensure this is an absolute URL
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'src/data', `${params.slug}.mdx`);
  
  let source;
  try {
    source = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return <p>Error loading blog post.</p>;
  }

  let content, frontmatter;
  try {
    const parsedMatter = matter(source);
    content = parsedMatter.content;
    frontmatter = parsedMatter.data;
  } catch (error) {
    console.error(`Error parsing front matter of file ${filePath}:`, error);
    return <p>Error parsing blog post content.</p>;
  }

  const mdxSource: MDXRemoteSerializeResult = await serialize(content, {
    scope: frontmatter,
  });

  return <ClientBlogPost mdxContent={mdxSource} data={frontmatter as Frontmatter} />;
}
