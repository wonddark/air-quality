import CountryItem from "@app/app/@countries/CountryItem";

export default async function CountriesList() {
  const res = await fetch(`${process.env.API_COUNTRIES_URL}`);
  const { data } = await res.json();

  return (
    <ul className="h-[calc(100vh_-_68px_-_3rem)] overflow-auto mr-3">
      {data.map((item: { country: string; cities: string[] }) => (
        <CountryItem item={item} key={item.country} />
      ))}
    </ul>
  );
}
