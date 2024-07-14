import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import CollectionPosts from '@/components/CollectionPosts';
import { Metadata } from 'next';

interface Collection {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  position: number;
}

export async function generateMetadata(): Promise<Metadata> {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/data/collections'));

  const collections: Collection[] = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const filePath = path.join(process.cwd(), 'src/data/collections', file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug.replace(/-/g, ' '),
      description: data.description || '',
      image: data.image || '',
      tags: data.tags || [],
      position: data.position || 100, // Default to 0 if position is not specified
    };
  }).sort((a, b) => a.position - b.position); // Sort collections by position

  return {
    title: 'My NFT Collections',
    description: 'All Cobmin\'s NFT collections',
  };
}

export default function CollectionsPage() {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/data/collections'));

  const collections: Collection[] = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const filePath = path.join(process.cwd(), 'src/data/collections', file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug.replace(/-/g, ' '),
      description: data.description || '',
      image: data.image || '',
      tags: data.tags || [],
      position: data.position || 0,
    };
  }).sort((a, b) => a.position - b.position);

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-4xl font-bold mb-8">My NFT Collections</h1>
      <CollectionPosts collections={collections} />
    </div>
  );
}
