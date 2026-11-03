import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("kvi_session");

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ loggedIn: false, user: null });
    }

    let user = null;
    try {
      user = JSON.parse(decodeURIComponent(sessionCookie.value));
    } catch {
      try {
        user = JSON.parse(sessionCookie.value);
      } catch {
        return NextResponse.json({ loggedIn: false, user: null });
      }
    }
    return NextResponse.json({ loggedIn: true, user });
  } catch (error) {
    return NextResponse.json({ loggedIn: false, user: null });
  }
}
