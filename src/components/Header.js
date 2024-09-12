"use client";
import { useAuth } from "@/context/auth";

import Link from "next/link";

function Header() {
  const auth = useAuth();

  return (
    <header className="flex items-center justify-between bg-beige p-4 sticky top-0 z-50 shadow-md">
      <h1 className="text-3xl font-bold text-white">Plant DB</h1>
      {auth.token ? (
        <Link
          href="/"
          onClick={auth.logout}
          className="text-black bg-green-300 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Logout
        </Link>
      ) : (
        <Link
          href="/"
          className="text-black bg-green-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Login
        </Link>
      )}
    </header>
  );
}
export default Header;
