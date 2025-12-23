"use client";

import { ProfileResponse } from "../api/auth/types";
import { useEffect, useState } from "react";
import { getProfile } from "../api/auth/authAPI";

export function Greeting() {
  const [userName, setUserName] = useState<ProfileResponse | null>(null);

  useEffect(() => {
    try {
      const fetchProfile = async () => {
        const res = await getProfile();
        setUserName(res.data);
      };
      fetchProfile();
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  }, []);
  return (
    <div className="mb-8 pt-24">
      <h1 className="text-4xl font-extrabold text-foreground mb-2">
        Hello, {userName?.user.full_name || "User"}
      </h1>
      <p className="text-muted-foreground">Manage and track all your events</p>
    </div>
  );
}
