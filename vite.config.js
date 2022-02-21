import { resolve } from 'path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

function pathResolve(dir) {
  return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(params => {
  const { mode } = params
  // const { command, mode } = params
  const ENV = loadEnv(mode, process.cwd())
  // console.info(`--- running mode: ${mode}, -----command------: ${command}, ENV: ${JSON.stringify(ENV)} ---`)
  return {
    extensions: ['.js', '.ts', '.vue', '.json'],
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': pathResolve('src'),
        '@images': pathResolve('src/assets/images'),
      },
    },
    server: {
      port: ENV.VITE_APP_PORT,
      host: ENV.VITE_APP_HOST,
      proxy: {
        '/gateway': {
          target: ENV.VITE_APP_PROXY,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    build: {
      outDir: 'dist',
      sourcemap: false,

      // 生产环境去除 console debugger
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },

    // 预编译的依赖，节省冷启动时间
    optimizeDeps: {
      include: ['lodash', 'axios'],
    },

    css: {
      preprocessorOptions: {
        scss: {
        // additionalData: `$injectedColor: orange;`
          additionalData: '@import "@/assets/styles/globalInjectedData.scss";'
        }
      }
    }
  }
})
