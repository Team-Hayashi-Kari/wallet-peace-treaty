// vite.config.ts
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { defaultConfig, getColorModeScript } from "@yamada-ui/react"
import { tanstackRouter } from '@tanstack/router-plugin/vite'

function injectScript(): Plugin {
  return {
    name: "vite-plugin-inject-scripts",
    transformIndexHtml(html) {
      const content = getColorModeScript({
        initialColorMode: defaultConfig.initialColorMode,
      })

      return html.replace("<body>", `<body><script>${content}</script>`)
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
		injectScript(),
	],
  optimizeDeps: {
    force: true,
	exclude: ['node_modules/.cache/storybook']
  },
	resolve: {
		alias: {
			'@components': '/src/components',
			'@theme': '/src/theme',
		}
	},
	server: {
		watch: {
			usePolling: true,
			interval: 1000
		}
	}
})