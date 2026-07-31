"use client";

// NOTE: This is a cosmetic mock for prototyping only — there is no real
// authentication, password check, or backend here. Anyone can "log in"
// with any input. Replace with real auth (e.g. Supabase Auth) before launch.

const STORAGE_KEY = "mb_mock_user";
const UPDATE_EVENT = "mb-auth-updated";

export type MockUser = {
  name: string;
};

export function getMockUser(): MockUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MockUser) : null;
  } catch {
    return null;
  }
}

export function mockLogin() {
  const user: MockUser = { name: "مستخدم تجريبي" };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function mockLogout() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function subscribeToAuthUpdates(callback: () => void) {
  window.addEventListener(UPDATE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(UPDATE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
