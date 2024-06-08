import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Image from 'next/image';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  image: string;
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
      date: data.date,
      summary: data.summary || '',
      image: data.images || '',
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      {posts.length > 0 && (
        <div className="mb-8">
          <Link href={`/blog/${posts[0].slug}`} className="block">
            <Card className="h-full flex flex-col">
              {posts[0].image && (
                <div className="relative w-full h-64 rounded-t-xl overflow-hidden mb-2">
                  <Image
                    src={posts[0].image}
                    alt={posts[0].title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl"
                    priority
                  />
                </div>
              )}
              <CardHeader className="p-4">
                <CardTitle className="text-3xl line-clamp-2">{posts[0].title}</CardTitle>
                <CardDescription>{new Date(posts[0].date).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow p-4 pt-0">
                <p className="line-clamp-3">{posts[0].summary}</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.slice(1).map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="block">
              <Card className="h-full flex flex-col">
                {post.image && (
                  <div className="relative w-full h-40 rounded-t-xl overflow-hidden mb-2">
                    <Image
                      src={post.image}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-xl"
                    />
                  </div>
                )}
                <CardHeader className="p-4">
                  <CardTitle className="text-2xl line-clamp-2">{post.title}</CardTitle>
                  <CardDescription>{new Date(post.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-4 pt-0">
                  <p className="line-clamp-4">{post.summary}</p>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
