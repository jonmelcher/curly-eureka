import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import istanbul from 'rollup-plugin-istanbul';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export default {
    entry: 'src/js/app.js',
    plugins: [
        babel(babelrc()),
        istanbul({
            exclude: [ 'test/**/*', 'node_modules/**/*' ]
        })
    ],
    external: external,
    targets: [
        {
          dest: pkg['main'],
          format: 'umd',
          moduleName: 'blokjs',
          sourceMap: true
        },
        {
          dest: pkg['jsnext:main'],
          format: 'es',
          sourceMap: true
        }
    ]
};
