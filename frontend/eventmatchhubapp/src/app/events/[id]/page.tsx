"use client"
import { useParams } from "next/navigation";

export default function EventDetailsPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Event Details for ID: {id}</h1>
      {/* Fetch and render event details using the ID */}
    </div>
  );
}
