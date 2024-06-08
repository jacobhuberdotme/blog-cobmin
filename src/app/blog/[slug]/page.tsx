import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';

interface Frontmatter {
  title: string;
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
  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: { parseFrontmatter: true },
  });

  return (
    <div>
      <h1>{frontmatter.title}</h1>
      {content}
    </div>
  );
}
