import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="border-b-4 flex p-8">
      <div>
        <Link href="/">
          <p className="text-4xl font-bold">SPORTS</p>
        </Link>
      </div>

      <nav className="w-full flex items-center ml-10">
        <ul className="w-full flex justify-around">
          <Link href="/activities">
            <li>Mes activités</li>
          </Link>
          <Link href="/pages/stats">
            <li>Mes stats</li>
          </Link>

          <Link href="/login"> Sign in</Link>
        </ul>
      </nav>
    </div>
  );
}
