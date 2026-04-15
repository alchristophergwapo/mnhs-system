export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:${process.env.NEXT_PUBLIC_PORT || 3000}`
    : process.env.NEXT_PUBLIC_BASE_URL || "/";

// Global headers configuration
export const globalHeaders: Record<string, string> = {};
