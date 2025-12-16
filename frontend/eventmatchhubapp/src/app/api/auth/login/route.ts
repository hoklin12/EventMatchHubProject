// // Proxy POST /api/auth/login → your backend /auth/login (or whatever path)

// import { NextRequest } from "next/server";

// // Change this to your backend base URL
// const BACKEND_URL = "http://localhost:8000"; // or http://localhost:8000 for FastAPI

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     const backendResponse = await fetch(`${BACKEND_URL}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await backendResponse.json();

//     if (!backendResponse.ok) {
//       return new Response(JSON.stringify({ message: data.message || "Login failed" }), {
//         status: backendResponse.status,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     // Forward the backend response (including token, user data)
//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: "Internal server error" }), {
//       status: 500,
//     });
//   }
// }

// // Optional: Handle preflight OPTIONS request (for CORS safety, though not needed when proxying)
// export async function OPTIONS() {
//   return new Response(null, {
//     status: 200,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type",
//     },
//   });
// }

// src/app/api/auth/login/route.ts
import { NextRequest } from "next/server";

const BACKEND_URL = "http://localhost:5000";
const API_PREFIX = "/api/v1/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const backendResponse = await fetch(`${BACKEND_URL}${API_PREFIX}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    let data;
    try {
      data = await backendResponse.json();
    } catch {
      data = { message: "Invalid response from server" };
    }

    if (!backendResponse.ok) {
      return new Response(
        JSON.stringify({ message: data.message || "Login failed" }),
        { status: backendResponse.status }
      );
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Login proxy error:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 200 });
}