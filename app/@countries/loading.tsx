export default function Loading() {
  return (
    <>
      <p>Loading countries</p>
      <ul className="flex flex-col gap-1">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <li key={item} className="h-10 animate-pulse bg-slate-200" />
        ))}
      </ul>
    </>
  );
}
