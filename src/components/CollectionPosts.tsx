'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';

interface Collection {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

interface CollectionPostsProps {
  collections: Collection[];
}

const CollectionPosts: React.FC<CollectionPostsProps> = ({ collections }) => {
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    if (collections) {
      setFilteredCollections(collections);
    }
  }, [collections]);

  useEffect(() => {
    if (selectedTag) {
      setFilteredCollections(collections.filter(collection => collection.tags.includes(selectedTag)));
    } else {
      setFilteredCollections(collections);
    }
  }, [selectedTag, collections]);

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  if (!collections) {
    return <div>Loading...</div>;
  }

  const uniqueTags = Array.from(new Set(collections.flatMap(collection => collection.tags)));

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
      {filteredCollections.length > 0 && (
        <div className="mb-4">
          <Link href={`/my-collections/${filteredCollections[0].slug}`} className="block">
            <Card className="h-full flex flex-col justify-between">
              {filteredCollections[0].image && (
                <div className="relative w-full h-48 rounded-t-xl overflow-hidden mb-2">
                  <Image
                    src={filteredCollections[0].image}
                    alt={filteredCollections[0].title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-xl"
                    priority
                  />
                </div>
              )}
              <CardHeader className="p-4 flex-shrink-0">
                <CardTitle className="text-3xl">{filteredCollections[0].title}</CardTitle>
                <CardDescription>{filteredCollections[0].description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {filteredCollections[0].tags.map(tag => (
                    <Badge key={tag} variant="default" className="pointer-events-none">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}
      <ul className="space-y-4">
        {filteredCollections.slice(1).map((collection) => (
          <li key={collection.slug} className="flex flex-col sm:flex-row">
            <Link href={`/my-collections/${collection.slug}`} className="block w-full">
              <Card className="h-full flex flex-col sm:flex-row">
                {collection.image && (
                  <div className="relative w-full sm:w-1/3 h-48 sm:h-full rounded-t-xl sm:rounded-tl-xl sm:rounded-tr-none overflow-hidden">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="rounded-t-xl sm:rounded-l-xl sm:rounded-r-none"
                    />
                  </div>
                )}
                <div className="p-4 flex flex-col justify-between w-full sm:w-2/3">
                  <CardHeader className="p-2 flex-shrink-0">
                    <CardTitle className="text-xl">{collection.title}</CardTitle>
                    <CardDescription>{collection.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {collection.tags.map(tag => (
                        <Badge key={tag} variant="default" className="pointer-events-none">{tag}</Badge>
                      ))}
                    </div>
                  </CardHeader>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionPosts;
