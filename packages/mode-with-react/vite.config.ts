import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import pkg from './package.json';

export default defineConfig({
  build: {
    lib: {
      entry: './lib/index.ts',
      name: pkg.name,
      formats: ['es'],
      fileName: pkg.name
    },
    outDir: 'build',
    rollupOptions:{
      external: ['react', 'react-dom'],
    }
  },
  plugins: [
    dts(),
    // viteExternalsPlugin({
    //   react: 'react'
    // })
  ]
})
