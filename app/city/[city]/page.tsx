import SearchCtrl from "@app/app/SearchCtrl";

export function generateMetadata({ params: { city } }: Readonly<Props>) {
  return {
    title: `AQI for for ${city
      .split("%20")
      .map((item) => item[0].toUpperCase() + item.substring(1))
      .join(" ")}`,
  };
}

async function getAQIForCity(city: string) {
  const res = await fetch(`${process.env.API_AQI_BASE_URL}?city=${city}`, {
    headers: { "x-api-key": `${process.env.API_KEY}` },
  });
  return await res.json();
}

function aqiColor(value: number) {
  if (value < 51) {
    return "bg-green-700 text-gray-50";
  } else if (value < 101) {
    return "bg-yellow-500 text-gray-800";
  } else if (value < 151) {
    return "bg-orange-600 text-gray-50";
  } else if (value < 201) {
    return "bg-red-500 text-gray-50";
  } else if (value < 301) {
    return "bg-fuchsia-500 text-gray-800";
  } else {
    return "bg-yellow-950 text-gray-50";
  }
}

type Props = {
  params: { city: string };
};

export default async function CityAirQuality({
  params: { city },
}: Readonly<Props>) {
  const data = await getAQIForCity(city);

  return (
    <>
      <div className="w-10/12 mx-auto h-10 mb-7">
        <SearchCtrl />
      </div>
      <h2 className="text-3xl mb-3">
        Air Quality for{" "}
        <span className="uppercase font-semibold">
          {city.replace(/(%20)+/gm, " ")}
        </span>
      </h2>
      <div className="border-2 rounded-lg">
        <div className="grid grid-cols-[45%_40%_15%] bg-sky-500 text-slate-100 font-semibold p-2 rounded-t-lg text-xl">
          <div className="text-left">Parameter</div>
          <div className="text-right">Concentration</div>
          <div className="text-right">AQI</div>
        </div>
        {Object.entries<{ concentration: number; aqi: number }>(data).map(
          (item) => (
            <div
              key={item[0]}
              className={
                "grid grid-cols-[45%_40%_15%] px-3 py-1 odd:bg-slate-100" +
                ` last:font-semibold last:text-lg${
                  item[0] !== "overall_aqi"
                    ? ""
                    : ` ${aqiColor(item[1] as unknown as number)}`
                }`
              }
            >
              <div>{item[0]}</div>
              {item[0] !== "overall_aqi" ? (
                <>
                  <div className="text-right">{item[1].concentration}</div>
                  <div className="text-right">{item[1].aqi}</div>
                </>
              ) : (
                <div className="col-span-2 text-right">
                  {item[1] as unknown as number}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
}
