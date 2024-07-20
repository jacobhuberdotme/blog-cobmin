"use client";

import * as React from "react";
import { useState } from "react";
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
import ConnectButton from "./ConnectButton";

const menuItems = [
  { title: "Blog", href: "/blog" },
  { title: "My Collections", href: "/my-collections" },
  { title: "Taikonauts", href: "/taikonauts" },
  { title: "About", href: "/about" },
];

export default function MyNavigationMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <NavigationMenu className="flex justify-between items-center w-full p-4 bg-background">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/icon.jpg"
            width={40}
            height={40}
            alt="Picture of the author"
            className="rounded-full"
            priority
          />
        </Link>
      </div>
      <div className="flex items-center justify-end flex-1">
        <div className="hidden md:flex items-center space-x-2">
          <NavigationMenuList className="list-none flex items-center space-x-2">
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </div>
        <div className="flex md:hidden">
          <button
            onClick={handleToggleMenu}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-full bg-background rounded-md shadow-lg z-10">
              <NavigationMenuList className="flex flex-col space-y-1 p-2 list-none">
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center ml-4">
        <ConnectButton />
      </div>
      <div className="flex items-center ml-4">
        <ModeToggle />
      </div>
    </NavigationMenu>
  );
}
