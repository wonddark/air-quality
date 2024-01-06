import CountryItem from "@app/app/@countries/CountryItem";

export default async function CountriesList() {
  const { data } = await fetch(`${process.env.BASE_PATH}/countries`).then(
    (res) => res.json()
  );
  return (
    <ul className="h-[calc(100vh_-_68px_-_3rem)] overflow-auto mr-3">
      {data.map((item: { country: string; cities: string[] }) => (
        <CountryItem item={item} key={item.country} />
      ))}
    </ul>
  );
}
