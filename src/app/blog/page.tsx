import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export default function BlogPage() {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/data'));
  const posts = files.map((file) => ({
    slug: file.replace(/\.mdx$/, ''),
    title: file.replace(/\.mdx$/, ''), // Or fetch title from frontmatter
  }));

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
