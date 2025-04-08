"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Navbar */}
      <nav className="md:hidden bg-white px-4 py-3 shadow-md flex justify-between items-center fixed top-0 left-0 w-full z-50">
        <button onClick={() => setIsOpen(true)}>
          <Menu size={28} className="text-orange-700" />
        </button>
        <h1 className="text-lg font-semibold text-orange-700">SM-Tracker</h1>
        <Link href="/authForm">
          <button className="bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded text-white text-sm">
            Login
          </button>
        </Link>
      </nav>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-orange-700 text-white p-6 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">SM-Tracker</h1>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <ul className="space-y-4">
          <li>
            <Link href="#" className="block p-2 hover:bg-orange-800 rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="#" className="block p-2 hover:bg-orange-800 rounded">
              Usage
            </Link>
          </li>
          <li>
            <Link href="#" className="block p-2 hover:bg-orange-800 rounded">
              Settings
            </Link>
          </li>
          <li>
            <Link href="#" className="block p-2 hover:bg-orange-800 rounded">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="#" className="block p-2 hover:bg-orange-800 rounded">
              Enterprise
            </Link>
          </li>
          <li>
            <Link href="/authForm">
              <button className="w-full bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-white">
                SignUp/Login
              </button>
            </Link>
          </li>
        </ul>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col justify-center fixed top-0 left-0 h-screen w-64 bg-orange-700 text-white p-6 z-40">
        <h1 className="text-2xl font-bold mb-6 text-center">SM-Tracker</h1>
        <ul className="space-y-4">
          <li>
            <Link
              href="/dashboard"
              className="block p-2 hover:bg-orange-800 rounded text-center"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block p-2 hover:bg-orange-800 rounded text-center"
            >
              Usage
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block p-2 hover:bg-orange-800 rounded text-center"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block p-2 hover:bg-orange-800 rounded text-center"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block p-2 hover:bg-orange-800 rounded text-center"
            >
              Enterprise
            </Link>
          </li>
          <li>
            <Link href="/authForm">
              <button className="w-full bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-white mt-4">
                SignUp/Login
              </button>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}
