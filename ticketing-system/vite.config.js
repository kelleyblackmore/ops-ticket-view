import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_API_PROXY_TARGET
  const isGitHubPages = env.GITHUB_PAGES === 'true' || mode === 'gh-pages'
  return {
    plugins: [react()],
    // for GitHub Pages project site under /<repo>/
    base: isGitHubPages ? '/ops-ticket-view/' : '/',
    server: proxyTarget
      ? {
          proxy: {
            '/api': {
              target: proxyTarget,
              changeOrigin: true,
              secure: false,
              // optional: remove /api prefix if backend does not expect it
              // rewrite: (path) => path.replace(/^\/api/, ''),
            },
          },
        }
      : undefined,
  }
})
