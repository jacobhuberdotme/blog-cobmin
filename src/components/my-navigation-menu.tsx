// src/components/my-navigation-menu.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ui/mode-toggle";
import Image from "next/image";

export default function MyNavigationMenu() {
  return (
    <NavigationMenu className="flex justify-between items-center w-full p-4 bg-background">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/profile.png"
            width={40}
            height={40}
            alt="Picture of the author"
            className="rounded-full"
          />
        </Link>
      </div>
      <NavigationMenuList className="flex items-center space-x-2">
        <NavigationMenuItem>
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Blog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
