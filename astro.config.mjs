// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://stapego.github.io',
  output: 'server', // Включаем SSR режим
  adapter: node({
    mode: 'standalone' // или 'middleware' в зависимости от ваших нужд
  }),
  integrations: [preact()],
});