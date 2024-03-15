import { truncateSync } from "fs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";


const protectedRoutes = "/dashboard";
const authRoutes = "/log";
export function middleware(request: NextRequest) {
//   const currentUser = request.cookies?.get("connect.sid")?.value;
// // when the user wanna get in dashboard but dont have the cookie
// // or the one is expired, the page would redirect to login page
//   if (
//     request.nextUrl.pathname.startsWith(protectedRoutes) &&
//     (!currentUser)
//   ) {
//     request.cookies.delete("currentUser");
//     const response = NextResponse.redirect(new URL(`${request.nextUrl.locale === "en" ? "en":""}/log`, request.url));
//     response.cookies.delete("currentUser");
//     return response;
//   }
// //when the user wanna go back to the login page but the cookie has
// //been caught, the page will automatically get into the dashboard
//   else if ((request.nextUrl.pathname.startsWith(authRoutes)) 
//      && (currentUser)) {
//     return NextResponse.redirect(new URL(`${request.nextUrl.locale === "en" ? "en":""}/dashboard`, request.url));
//   }
//    else 
   return NextResponse.next();
}
export const config = {
    matcher: ['/:path*'],
}