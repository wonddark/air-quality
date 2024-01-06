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
  const res = await fetch(
    `${process.env.API_AQI_BASE_URL}?city=${city}`,
    {
      headers: { "x-api-key": process.env.API_KEY },
    }
  );
  return await res.json();
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
        <div className="grid grid-cols-[60%_15%_15%] bg-sky-500 text-slate-100 font-semibold p-2 rounded-t-lg text-xl">
          <div className="text-left">Parameter</div>
          <div className="text-right">Concentration</div>
          <div className="text-right">AQI</div>
        </div>
        {Object.entries<{ concentration: number; aqi: number }>(data).map(
          (item) => (
            <div
              key={item[0]}
              className="grid grid-cols-[75%_15%_10%] px-3 py-1 odd:bg-slate-100 last:font-semibold last:text-lg"
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
