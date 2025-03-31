import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/VoR/', // リポジトリ名に基づいたベースパスを設定
  build: {
    outDir: 'docs' // GitHub Pagesのデフォルトディレクトリ
  }
})
