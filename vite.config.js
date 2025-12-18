import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({
      tsconfigPath: resolve(__dirname, 'tsconfig.json'),
      insertTypesEntry: true,
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: {
        components: resolve(__dirname, './components/index.tsx'),
        srcl: resolve(__dirname, './index.tsx'),
      },
      types: ['mjs', 'es', 'cjs'],
      name: 'srcl',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'],
    },
  },
});
