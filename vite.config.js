import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // <-- Pastikan baris ini ada

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- Dan baris ini terdaftar di sini
  ],
});
