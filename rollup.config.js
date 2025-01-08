import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import litcss from 'rollup-plugin-lit-css';

export default {
  input: 'components/chat-component.js',
  output: {
    file: 'bundle.js',
    format: 'es'
  },
  plugins: [
    resolve(),
    litcss({
      include: '**/*.css'
    }),
    terser(),
    serve({
      open: true,
      contentBase: '',
      host: 'localhost',
      port: 10001,
    }),
    livereload('')
  ]
};