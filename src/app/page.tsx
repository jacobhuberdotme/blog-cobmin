import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Personal Site</h1>
      <p className="mb-8 text-center">
        Hi, I&apos;m Jacob. I&apos;m a passionate software engineer who enjoys exploring new technologies and sharing my experiences.
      </p>
      <div className="flex space-x-4">
        <Link href="/about">
          <Button>About Me</Button>
        </Link>
        {/* <Link href="/projects">
          <Button>Projects</Button>
        </Link>
        <Link href="/blog">
          <Button>Blog</Button>
        </Link> */}
      </div>
    </main>
  );
}
