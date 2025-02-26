import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="border-b-4 flex p-8">
      <div>
        <Link href="/">
          <p className="text-4xl font-bold">SPORTS</p>
        </Link>
      </div>

      <nav className="w-full flex items-center ml-10">
        <ul className="w-full flex justify-around">
          <Link href="/p/profile">
            <li>Mon profil</li>
          </Link>
          <Link href="/p/activities">
            <li>Mes activités</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
