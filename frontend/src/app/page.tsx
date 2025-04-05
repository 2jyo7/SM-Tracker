import AppLists from "@/components/DashBoard";
import HomePage from "@/components/HomePage";
import React from "react";

export default function Home() {
  return (
    <div className="relative bg-gray-50 min-h-screen ">
      {/* Content area shifted right by sidebar width */}
      <div className="ml-64 p-6">
        <HomePage />
        <AppLists />
      </div>
    </div>
  );
}
