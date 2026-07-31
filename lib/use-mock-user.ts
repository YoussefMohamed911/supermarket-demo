"use client";

import { useEffect, useState } from "react";
import { getMockUser, subscribeToAuthUpdates, type MockUser } from "@/lib/auth-store";

export function useMockUser(): MockUser | null {
  const [user, setUser] = useState<MockUser | null>(() => getMockUser());

  useEffect(() => {
    const refresh = () => setUser(getMockUser());
    return subscribeToAuthUpdates(refresh);
  }, []);

  return user;
}
