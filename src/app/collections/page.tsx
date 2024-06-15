import fs from 'fs';
import path from 'path';

interface Collection {
  name: string;
}

async function getCollections() {
  const dataDir = path.join(process.cwd(), 'public/data');
  const files = await fs.promises.readdir(dataDir);
  const collections = files
    .filter(file => file.endsWith('.json'))
    .map(file => ({ name: file.replace('.json', '') }));
  return collections;
}

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-4xl font-bold mb-8">Collections</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <li key={collection.name}>
            <a href={`/collections/${collection.name}`}>
              <div className="block p-4 border rounded-lg shadow hover:bg-gray-100 transition">
                {collection.name}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
