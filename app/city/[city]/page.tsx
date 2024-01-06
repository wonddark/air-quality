import SearchCtrl from "@app/app/SearchCtrl";

export async function generateStaticParams() {
  const res = await fetch(`https://countriesnow.space/api/v0.1/countries`);
  const data = await res.json();
  const cities = data.data
    .map((item: { cities: string[] }) => item.cities)
    .flat();
  return cities.map((city: string) => ({
    city: city.toLowerCase(),
  }));
}

export function generateMetadata({ params: { city } }: Readonly<Props>) {
  return {
    title: `AQI for for ${city}`,
  };
}

async function getAQIForCity(city: string) {
  const res = await fetch(
    `https://api.api-ninjas.com/v1/airquality?city=${city}`,
    {
      headers: { "x-api-key": "GxI7yOw5B4k4XHaSGvQA8Q==8dO15cx0MjSAkxAd" },
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
      <div className="w-10/12 mx-auto h-10">
        <SearchCtrl />
      </div>
      <h2 className="text-3xl mb-3">
        Air Quality for <span className="uppercase font-semibold">{city}</span>
      </h2>
      <div className="border-2 rounded-lg">
        <div className="grid grid-cols-[80%_10%_10%] bg-slate-500 text-slate-100 font-semibold p-3 rounded-t-lg text-xl">
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
