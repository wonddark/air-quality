export default function Loading() {
  return (
    <>
      <p>Loading countries</p>
      <ul className="grid grid-rows-1 lg:grid-rows-5 gap-1">
        {[0, 1, 2, 3, 4, 5].map((item) => {
          const className = `${
            item === 0 ? "" : "hidden lg:list-item "
          }h-10 animate-pulse bg-slate-200`;
          return <li key={item} className={className} />;
        })}
      </ul>
    </>
  );
}
