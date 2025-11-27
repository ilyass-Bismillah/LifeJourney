"use client";
import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import  Link  from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/modeToggle";
import MobileSideBar from "./mobileSideBar";

const Header = () => {
  const { user } = useUser();
  if (!user) return null;
  return (
   <header className="flex items-center justify-between py-5 w-full">
    <h1 className="font-medium md:block hidden">Welcom back 👋, {user?.fullName}</h1>
    <MobileSideBar/>
    <div className="flex items-center gap-x-2">
      <Link href="/">
      <Button variant={"ghost"}>
        <ArrowLeft className="text-muted-foreground h-5 w-5 mr-2"/>
        <span className="md:block hidden">Back to HomePage</span>
      </Button>
      </Link>
      <ModeToggle/>
      <UserButton afterSignOutUrl="/"/>
    </div>
   </header>
  )
};

export default Header;
