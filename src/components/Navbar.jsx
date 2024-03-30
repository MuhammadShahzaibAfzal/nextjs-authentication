import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-gray-100 flex justify-between items-center px-10 py-4">
      <Link href="/" className="font-bold text-xl">
        Next Auth
      </Link>
      <div className="flex gap-x-10">
        <Link href="/" className="text-sm">
          Home
        </Link>
        <Link href="/about" className="text-sm">
          About Project
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
