"use client";

import { MenuIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar5 = () => {
  // const [user,setuser] = useState(true)
  const features = [
    { title: "Feed", description: "See the Activity of others", href: "/feed" },
    { title: "Chatrooms", description: "Join Chatrooms which resembles your interest", href: "/chatrooms" },
    { title: "Code & Decode", description: "participate in exciting brain bowls to enhance your thinking capacity", href: "/code-decode" },
    { title: "Events", description: "showcase or promote various events to attract developers", href: "/events" },
    { title: "Project Collaboration", description: "Manage your Project with your teamates", href: "project-collaboration" },
    { title: "Pending Requests", description: "See your pending requests", href: "pending-requests" },
  ];

  // Fake user (replace with real auth)
  const user = {
    name: "Navkirat Singh",
    email: "kirat@example.com",
    avatar: "https://github.com/shadcn.png",
  };

  return (
    <section className="py-4 flex justify-center align-middle">
      <div className="container">
        <nav className="flex items-center justify-between ">
          {/* LOGO */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tighter">
              CollabriX
            </span>
          </a>

          {/* NAVIGATION MENU (Desktop) */}
          <NavigationMenu className="hidden lg:block ">
            <NavigationMenuList className="flex gap-4">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-gray-800 text-white">
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 p-3">
                    {features.map((feature, index) => (
                      <NavigationMenuLink
                        href={feature.href}
                        key={index}
                        className="rounded-md p-3 transition-colors hover:bg-muted/70"
                      >
                        <div key={feature.title}>
                          <p className="mb-1 font-semibold text-foreground">
                            {feature.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="bg-gray-800 text-white">
                  <Link to="/about">About us</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="bg-gray-800 text-white">
                  Resources
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="bg-gray-800 text-white">
                  <Link to="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* RIGHT SIDE (Auth / Avatar) */}
          <div className="hidden items-center gap-4 lg:flex">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/user">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={() => console.log("Logout")}>
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button className="bg-blue-800 hover:bg-blue-950">Sign in</Button>
                <Button className="bg-gray-700 hover:bg-gray-950">Start for free</Button>
              </>
            )}
          </div>

          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <a href="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold tracking-tighter">
                      CollabriX
                    </span>
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <Accordion type="single" collapsible className="mt-4 mb-2">
                  <AccordionItem value="solutions" className="border-none">
                    <AccordionTrigger className="text-base hover:no-underline">
                      Features
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid md:grid-cols-2">
                        {features.map((feature, index) => (
                          <a
                            href={feature.href}
                            key={index}
                            className="rounded-md p-3 transition-colors hover:bg-muted/70"
                          >
                            <div key={feature.title}>
                              <p className="mb-1 font-semibold text-foreground">
                                {feature.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex flex-col gap-6">
                  <a href="#" className="font-medium">Templates</a>
                  <a href="#" className="font-medium">Blog</a>
                  <a href="#" className="font-medium">Pricing</a>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  {user ? (
                    <Button onClick={() => console.log("Logout")}>Logout</Button>
                  ) : (
                    <>
                      <Button>Sign in</Button>
                      <Button>Start for free</Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default Navbar5;
