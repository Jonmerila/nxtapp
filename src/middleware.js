import { NextResponse } from "next/server";
import { verifyJWT } from "./utils/helpers/authHelpers";

const unsafeMethods = ["POST", "PUT", "DELETE"];

export async function middleware(req) {
  console.log("Middleware is running", req.url);
  const url = new URL(req.url);
  console.log("URRL", url.href);
  if (
    unsafeMethods.includes(req.method) ||
    url.pathname.includes("api/users")
  ) {
    console.log("VERIFY");
    try {
      const bearer = req.headers.get("Authorization") || "";
      const token = bearer.split(" ")?.[1];
      console.log(token);
      if (!token) {
        throw new Error("no token submitted");
      }

      const jwtPayload = await verifyJWT(token);

      const headers = new Headers(req.headers);
      headers.set("userId", JSON.stringify(jwtPayload.userId));

      return NextResponse.next({ headers: headers });
    } catch (e) {
      console.log("CATCH", e);
      return NextResponse.json(
        {
          error: "Unauthorized request",
        },
        { status: 401 }
      );
    }
  }
}

export const config = {
  matcher: ["/plants/", "/api/plants/"],
};
