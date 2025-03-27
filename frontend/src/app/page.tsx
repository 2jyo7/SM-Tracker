import AppLists from "@/components/DashBoard";
import HomePage from "@/components/HomePage";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* Right Side Content */}
      <div className="md:ml-64 justify-center items-center h-screen md:w-[calc(100%-16rem)] ">
        <HomePage />
        <AppLists />
      </div>
    </div>
  );
}
