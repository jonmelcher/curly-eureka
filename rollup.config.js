import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/js/app.js',
    dest: 'build/js/app.min.js',
    format: 'iife',
    moduleName: 'blockjs',
    sourceMap: 'inline',
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ]
};
