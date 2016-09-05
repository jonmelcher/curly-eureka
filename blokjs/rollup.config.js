import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';

export default {
    entry: 'src/js/app.js',
    dest: 'build/js/app.min.js',
    format: 'iife',
    sourceMap: 'inline',
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        eslint({
            exclude: [
                'src/css/**',
                'src/html/**'
            ]
        })
    ]
};
