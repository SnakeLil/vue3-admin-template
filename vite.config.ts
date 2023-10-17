import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// svg插件
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
import { viteMockServe } from 'vite-plugin-mock'
export default defineConfig(({ command })=>{
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
  }
})
