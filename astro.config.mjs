import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://astroship.web3templates.com",
  integrations: [mdx(), sitemap(), icon()],
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: parseInt(process.env.PORT) || 4321
  },
  vite: {
    server: {
      allowedHosts: process.env.ALLOWED_HOSTS?.split(',') || [
        'app.knl.app',
        'localhost'
      ]
    },
    plugins: [tailwindcss()],
  },
});
