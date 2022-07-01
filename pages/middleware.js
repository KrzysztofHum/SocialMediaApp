import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // const { pathname, origin } = req.nextUrl;

  if (req.nextUrl.pathname.startsWith("/")) {
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    if (!session) return NextResponse.redirect(new URL("/home", req.url));
  }
}

// middleware.ts

// export async function middleware(req) {
//   if (req.nextUrl.pathname === "/") {
//     const session = await getToken({
//       req,
//       secret: process.env.JWT_SECRET,
//       secureCookie: process.env.NODE_ENV === "production",
//     });
//     if (!session) {
//       const url = req.nextUrl.clone();
//       url.pathname = "/home";
//       return NextResponse.rewrite(url);
//     }
//   }
// }
