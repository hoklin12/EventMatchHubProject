// /app/api/events/[id]/route.ts
import { NextResponse } from "next/server";
import type { EventPreviewData } from "@/lib/types/event-preview";

// Temporary in-memory store
const mockEvents: Record<string, EventPreviewData> = {};

// GET event by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const event = mockEvents[params.id];

  if (!event) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }

  return NextResponse.json(event);
}

// POST create new event
export async function POST(req: Request) {
  const body = await req.json();

  // Generate dynamic ID
  const id = "evt_" + Date.now();

  const newEvent: EventPreviewData = { id, ...body };

  // Save in memory
  mockEvents[id] = newEvent;

  return NextResponse.json(newEvent, { status: 201 });
}
