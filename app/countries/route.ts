import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`https://countriesnow.space/api/v0.1/countries`);
  const data = await res.json();

  return NextResponse.json(data);
}
