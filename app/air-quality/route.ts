import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams;
  const res = await fetch(
    `https://api.api-ninjas.com/v1/airquality?${search}`,
    {
      headers: { "x-api-key": "GxI7yOw5B4k4XHaSGvQA8Q==8dO15cx0MjSAkxAd" },
    }
  );
  const data = await res.json();
  return NextResponse.json(data);
}
