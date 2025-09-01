import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            if (id.includes("@mui") || id.includes("antd") || id.includes("chakra-ui")) {
              return "ui-vendor";
            }
            if (id.includes("chart") || id.includes("d3") || id.includes("recharts")) {
              return "chart-vendor";
            }
            if (id.includes("lodash") || id.includes("moment") || id.includes("date-fns")) {
              return "utils-vendor";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
