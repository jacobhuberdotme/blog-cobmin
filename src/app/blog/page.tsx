import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogPosts from '@/components/BlogPosts';

interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  image: string;
  tags: string[];
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
