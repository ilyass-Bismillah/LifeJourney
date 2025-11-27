"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/modeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Plus } from "lucide-react";
import { SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const NavLinks = [
  { label: "Home", href: "/" },
  { label: "Share your story", href: "/story" },
  { label: "Browse stories", href: "/stories" },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="py-5 fixed z-50 w-full bg-background">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <Image src="/script.png" alt="logo" width={50} height={50} />
          <h1 className="text-primary font-bold font-mono">LifeJourney</h1>
        </div>
        <div className="md:flex hidden items-center space-x-5">
          {NavLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm text-muted-foreground hover:text-primary transition-colors",
                pathname === href && "text-primary font-semibold"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-x-2">
          <ModeToggle />
          <SignedOut>
            <div className="md:block hidden">
              <SignUpButton mode="modal">
                <Button>Log In</Button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <Link href="/story">
              <Button>
                <Plus className="h-5 w-5" />
                <span className="md:block hidden">Create a story</span>
              </Button>
            </Link>
            <UserButton />
          </SignedIn>
          
          <Sheet>
            <SheetTrigger className="md:hidden block">
              <Menu className="w-8 h-8" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <div className="flex items-center font-serif font-bold">
                  <Image
                    src="/script.png"
                    alt="logo"
                    width={50}
                    height={50}
                    className=""
                  />
                  <h1 className="text-primary">LifeJourney</h1>
                </div>
                <div className="flex flex-col items-start gap-y-3 my-10">
                  {NavLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        "text-sm text-muted-foreground hover:text-primary transition-colors",
                        pathname === href && "text-primary font-semibold"
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button>Log In</Button>
                  </SignUpButton>
                </SignedOut>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
