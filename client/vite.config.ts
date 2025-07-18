import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port:3001,
     https: {}
  },
  
  plugins: [react(),mkcert()],
   optimizeDeps: {
    include: [
      'date-fns',
      'date-fns/addDays',
      'date-fns/startOfDay',
      'date-fns/endOfMonth',
      'date-fns/startOfWeek',
      'date-fns/locale/en-US',
      'date-fns/_lib/format/longFormatters',
    ],
  },
})
