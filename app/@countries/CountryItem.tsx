"use client";

import Link from "next/link";
import { useState } from "react";

export default function CountryItem({
  item,
}: Readonly<{ item: { country: string; cities: string[] } }>) {
  const [showCities, setShowCities] = useState(false);

  const generateCities = () => {
    setShowCities((prevState) => !prevState);
  };

  const btnClass =
    "py-1.5 px-2.5 text-left hover:bg-sky-50 w-full rounded-md" +
    (showCities ? " bg-sky-50" : "");
  const citiesListClass = "ml-2.5" + (!showCities ? " hidden" : "");

  return (
    <div>
      <button onClick={generateCities} className={btnClass}>
        <span className="font-semibold text-lg">{item.country}</span>
      </button>
      <ul className={citiesListClass}>
        {item.cities.map((token) => (
          <li key={token} className="py-0.5 px-1 city-item">
            <Link
              href={`/city/${token.toLowerCase()}`}
              className="hover:brightness-110 hover:underline"
            >
              {token}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
