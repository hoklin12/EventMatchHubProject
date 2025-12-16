// src/app/api/auth/signup/route.ts

import { NextRequest } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
const API_PREFIX = "/api/v1/auth";  // Matches your BACKEND_API_URL

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userType } = body;

    const endpoint = userType === "organizer" ? "/organizerRegister" : "/participantRegister";

    const backendResponse = await fetch(`${BACKEND_URL}${API_PREFIX}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json().catch(() => ({}));

    if (!backendResponse.ok) {
      return new Response(
        JSON.stringify({ message: data.message || "Registration failed" }),
        { status: backendResponse.status }
      );
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(
      JSON.stringify({ message: "Backend unreachable" }),
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204 });
}