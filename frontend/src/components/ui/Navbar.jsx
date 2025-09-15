import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-xl font-bold text-green-600">MyApp</div>

      {/* Links (hidden on small screens) */}
      <div className="hidden md:flex space-x-6">
        <a href="#" className="text-gray-700 hover:text-green-600">Home</a>
        <a href="#" className="text-gray-700 hover:text-green-600">About</a>
        <a href="#" className="text-gray-700 hover:text-green-600">Services</a>
        <a href="#" className="text-gray-700 hover:text-green-600">Contact</a>
      </div>

      {/* Actions / Buttons */}
      <div className="flex items-center space-x-4">
        <Button>Sign In</Button>

        {/* Dropdown for profile/menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
