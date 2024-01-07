"use client";
import { useState } from "react";
import CountryItem from "@app/app/@countries/CountryItem";

type Props = Readonly<{
  data: { country: string; cities: string[] }[];
}>;

function CitySelect({ data }: Props) {
  const [showList, setShowList] = useState(false);
  const toggleShowList = () => {
    setShowList((prevState) => !prevState);
  };

  return (
    <>
      <button
        onClick={toggleShowList}
        className="lg:hidden py-2.5 px-4 bg-sky-500 text-white rounded-md shadow-gray-50"
      >
        Select a city
      </button>
      {showList && (
        <div className="relative">
          <div className="absolute top-0 z-10 left-0 right-0 shadow-md shadow-gray-200 py-2.5 px-2 rounded-md bg-white border">
            <ul className="h-80 overflow-auto">
              {data.map((item: { country: string; cities: string[] }) => (
                <CountryItem
                  item={item}
                  key={item.country}
                  onClick={toggleShowList}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default CitySelect;
