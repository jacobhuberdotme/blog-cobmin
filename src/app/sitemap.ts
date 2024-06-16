import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cobmin.com';

  const staticPages: MetadataRoute.Sitemap = ['', 'about', 'blog'].map((path) => ({
    url: `${baseUrl}/${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: (path === '' ? 'yearly' : path === 'about' ? 'monthly' : 'weekly') as ChangeFrequency,
    priority: path === '' ? 1 : path === 'about' ? 0.8 : 0.5,
  }));

  const dynamicPages = getDynamicPages();

  return [...staticPages, ...dynamicPages];
}

function getDynamicPages(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cobmin.com';
  const dataDirectory = path.join(process.cwd(), 'src/data');
  const files = fs.readdirSync(dataDirectory);

  const posts = files.map((file) => {
    const filePath = path.join(dataDirectory, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      url: `${baseUrl}/blog/${file.replace(/\.mdx?$/, '')}`,
      lastModified: data.date,
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.5,
    };
  });

  return posts;
}
