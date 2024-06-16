import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogPosts from '@/components/BlogPosts';
import { Metadata } from 'next';

interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  image: string;
  tags: string[];
}

export async function generateMetadata(): Promise<Metadata> {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/data'));
  
  const posts: Post[] = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const filePath = path.join(process.cwd(), 'src/data', file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug,
      title: data.title || slug.replace(/-/g, ' '),
      date: data.date || '',
      summary: data.summary || '',
      image: data.images || '',
      tags: data.tags || [],
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const latestPost = posts[0];

  return {
    metadataBase: new URL('https://cobmin.com'),  // Replace with your actual website URL
    title: 'Blog Posts',
    description: 'Latest blog posts from Cobmin',
    openGraph: {
      title: latestPost ? latestPost.title : 'Blog Posts',
      description: latestPost ? latestPost.summary : 'Latest blog posts from Cobmin',
      images: [
        {
          url: latestPost ? latestPost.image : 'default-image-url',  // Replace 'default-image-url' with your default image URL
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: latestPost ? latestPost.title : 'Blog Posts',
      description: latestPost ? latestPost.summary : 'Latest blog posts from Cobmin',
      images: [latestPost ? latestPost.image : 'default-image-url'],  // Replace 'default-image-url' with your default image URL
    },
  };
}

export default function BlogPage() {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/data'));

  const posts: Post[] = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const filePath = path.join(process.cwd(), 'src/data', file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug.replace(/-/g, ' '),
      date: data.date || '',
      summary: data.summary || '',
      image: data.images || '',
      tags: data.tags || [],
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <BlogPosts posts={posts} />
    </div>
  );
}
