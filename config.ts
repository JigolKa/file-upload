export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://file-upload-one.vercel.app"
    : "http://localhost:3000";
