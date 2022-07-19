import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  if (req.nextUrl.pathname === "/admin") {
    const session: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!session) {
      const { origin } = req.nextUrl.clone();

      return NextResponse.rewrite(`${origin}/auth/login`);
    }
  }

  if (req.nextUrl.pathname === "/auth/login") {
    const session: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (session) {
      const { origin } = req.nextUrl.clone();

      return NextResponse.redirect(`${origin}`);
    }
  }
}
