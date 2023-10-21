import { defineConfig ,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// svg插件
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
import { viteMockServe } from 'vite-plugin-mock'
export default defineConfig(({ command,mode })=>{
  //获取各个环境下的变量
  let env = loadEnv(mode,process.cwd())
  return {
    plugins: [vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve',
      }),



  ],
    resolve:{
      alias:{
        '@':path.resolve('./src') //配置src文件夹别名
        }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // 代理跨域
    server: {
      proxy:{
        [env.VITE_APP_BASE_API]:{
          // 获取服务器的地址
          target: env.VITE_SERVE,
          // 需要代理
          changeOrigin: true,
          // 路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  }
})
