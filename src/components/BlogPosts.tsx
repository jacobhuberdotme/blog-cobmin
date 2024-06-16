// src/components/BlogPosts.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';

interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  image: string;
  tags: string[];
}

interface BlogPostsProps {
  posts: Post[];
}

const BlogPosts: React.FC<BlogPostsProps> = ({ posts }) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    if (posts) {
      setFilteredPosts(posts);
    }
  }, [posts]);

  useEffect(() => {
    if (selectedTag) {
      setFilteredPosts(posts.filter(post => post.tags.includes(selectedTag)));
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedTag, posts]);

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  if (!posts) {
    return <div>Loading...</div>;
  }

  const uniqueTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <ToggleGroup type="single" value={selectedTag || ''} onValueChange={handleTagClick}>
          {uniqueTags.map((tag) => (
            <ToggleGroupItem
              key={tag}
              value={tag}
            >
              {tag}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      {filteredPosts.length > 0 && (
        <div className="mb-8">
          <Link href={`/blog/${filteredPosts[0].slug}`} className="block">
            <Card className="h-full flex flex-col justify-between">
              {filteredPosts[0].image && (
                <div className="relative w-full h-48 rounded-t-xl overflow-hidden mb-2">
                  <Image
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-xl"
                    priority
                  />
                </div>
              )}
              <CardHeader className="p-4 flex-shrink-0">
                <CardTitle className="text-3xl">{filteredPosts[0].title}</CardTitle>
                <CardDescription>{new Date(filteredPosts[0].date).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {filteredPosts[0].tags.map(tag => (
                    <Badge key={tag} variant="default" className="pointer-events-none">{tag}</Badge>
                  ))}
                </div>
                <p className="text-sm line-clamp-4" style={{ WebkitLineClamp: '4' }}>{filteredPosts[0].summary}</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}
      <ul className="space-y-4">
        {filteredPosts.slice(1).map((post) => (
          <li key={post.slug} className="flex">
            <Link href={`/blog/${post.slug}`} className="block w-full">
              <Card className="h-full flex flex-row">
                {post.image && (
                  <div className="relative w-1/3 h-full rounded-l-xl overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="rounded-l-xl"
                    />
                  </div>
                )}
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <CardHeader className="p-2 flex-shrink-0">
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription>{new Date(post.date).toLocaleDateString()}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="default" className="pointer-events-none">{tag}</Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="p-2 pt-0 flex-grow">
                    <p className="text-sm">{post.summary}</p>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPosts;
