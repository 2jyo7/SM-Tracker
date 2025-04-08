import Image from "next/image";
import React from "react";

const HeroSec = () => {
  return (
    <section className="">
      <div className="container mx-auto px-6 md:px-8 bg-gray-100 p-10">
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center items-center w-full p-2 ">
            <h2 className="text-2xl md:text-3xl py-2 text-center font-semibold">
              SM-Tracker
            </h2>
            <p className="text-gray-800/70 mx-4 px-8">
              For long , you have been worried about your kids overusing your
              phone and laptops. But not to worry,{" "}
              <span className="text-orange-500 font-semibold">SM-Tracker</span>{" "}
              is here to hep..!
            </p>
            <button className="py-2 px-4 mt-4 border bg-red-500 rounded-lg shadow-lg text-white">
              Get Started
            </button>
          </div>
          <div className="flex w-full justify-center items-center">
            <Image
              src={
                "https://plus.unsplash.com/premium_photo-1684179641331-e89c6320b6a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIxfHxzb2NpYWwlMjBuZXR3b3JrJTIwdHJhY2tpbmd8ZW58MHx8MHx8fDA%3D"
              }
              alt="hero-img"
              width={400}
              height={400}
              className="object-cover rounded-lg shadow-2xl shadow-orange-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSec;
