import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="text-center pt-36 flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Personal Blog</h1>
      <p className="mb-8">
        Hi, I&apos;m Jacob. I&apos;m a passionate software engineer who enjoys exploring new technologies and sharing my experiences.
      </p>
      <div className="flex space-x-4">
        <Link href="/blog">
          <Button className="w-28">Blog</Button>
        </Link>
        <Link href="/about">
          <Button className="w-28">About Me</Button>
        </Link>
        {/* <Link href="/projects">
          <Button>Projects</Button>
        </Link> */}
      </div>
    </main>
  );
}
