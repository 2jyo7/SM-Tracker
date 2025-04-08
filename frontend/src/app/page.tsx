import AppLists from "@/components/DashBoard";
import HeroSec from "@/components/HeroSec";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <HeroSec />
      <AppLists />
    </div>
  );
}
