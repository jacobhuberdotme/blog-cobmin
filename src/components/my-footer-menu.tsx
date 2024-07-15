// src/components/my-footer.tsx
import * as React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function MyFooter() {
  return (
    <footer className="bg-background py-6 mt-auto w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Home
          </Link>
          <Link href="/my-collections" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              My Collections
          </Link>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Blog
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              About
          </Link>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <a
            href="https://x.com/cobmin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <FaXTwitter size={20} />
          </a>
          <a
            href="https://github.com/cobmin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <FaGithub size={20} />
          </a>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} cobmin.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
