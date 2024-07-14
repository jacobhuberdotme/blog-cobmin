import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation'; // Use next/navigation for not found handling
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const ClientCollectionPost = dynamic(() => import('@/components/ClientCollectionPost'), { ssr: false });

interface Params {
  slug: string;
}

interface Frontmatter {
  title: string;
  description: string;
  image: string;
  blockchain?: string;
  marketplace?: string;
  links?: { title: string; url: string }[];
}

async function getCollection(slug: string) {
  const filePath = path.join(process.cwd(), 'src/data/collections', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, 'utf8');
  const { content, data: frontmatter } = matter(source);

  const { serialize } = await import('next-mdx-remote/serialize');
  const mdxSource = await serialize(content);

  return { frontmatter: frontmatter as Frontmatter, mdxSource };
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/data/collections'));
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const collection = await getCollection(params.slug);
  if (!collection) {
    notFound(); // Use next/navigation notFound to handle 404
  }

  const { frontmatter } = collection;

  return {
    metadataBase: new URL('https://cobmin.com'),  // Replace with your actual website URL
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      images: [
        {
          url: frontmatter.image,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [frontmatter.image],
    },
  };
}

interface PageProps {
  params: Params;
}

export default async function Page({ params }: PageProps) {
  const collection = await getCollection(params.slug);
  if (!collection) {
    notFound(); // Use next/navigation notFound to handle 404
  }

  const { frontmatter, mdxSource } = collection;

  return <ClientCollectionPost mdxContent={mdxSource} frontmatter={frontmatter} />;
}
