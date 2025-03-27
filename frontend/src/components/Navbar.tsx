'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className={`bg-orange-700 text-white p-6 min-h-screen w-64 fixed transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-64'} md:translate-x-0`}> 
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">SM-Tracker</h1>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="mb-4"><Link href="#" className="block p-2 hover:bg-orange-800 rounded">Dashboard</Link></li>
            <li className="mb-4"><Link href="#" className="block p-2 hover:bg-orange-800 rounded">Usage</Link></li>
            <li className="mb-4"><Link href="#" className="block p-2 hover:bg-orange-800 rounded">Settings</Link></li>
            <li className="mb-4"><Link href="#" className="block p-2 hover:bg-orange-800 rounded">Pricing</Link></li>
            <li className="mb-4"><Link href="#" className="block p-2 hover:bg-orange-800 rounded">Enterprise</Link></li>
            <Link href={"/authForm"}>  <button className="block bg-orange-600 text-white hover:bg-orange-700 px-4 py-2 rounded">SignUp/Login</button></Link> 

          </ul>
        </nav>
      </aside>
      
      {/* Content Area */}
      <div className="flex-1 md:ml-64">
        {/* Navbar */}
        <nav className=" p-4 text-orange-600 flex justify-between ">
          <button className="md:hidden" onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>
        <Link href={"/"} > <h1 className="text-xl font-bold">Dashboard</h1></Link>
       <Link href={"/authForm"}>  <button className="hidden md:block bg-orange-600 text-white hover:bg-orange-700 px-4 py-2 rounded">SignUp/Login</button></Link> 
        </nav>
        
       
      </div>
    </div>
  );
}
