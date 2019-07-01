
const plugins = ['@babel/plugin-syntax-async-generators'];

if (['production', 'prod'].includes(process.env.NODE_ENV)) {
    plugins.push('transform-remove-console');
}
module.exports = {
    presets: [
        ['@vue/app', {
            'useBuiltIns': 'entry',
            polyfills: ['es6.promise', 'es6.object.assign', 'es5.array', 'es6.array']
        }], [
            '@babel/preset-env', {
                'useBuiltIns': 'entry',
                'targets': {
                    'browsers': ['ie <= 8', 'safari <= 9', 'ios <= 9']
                },
                'modules': 'umd'
            }
        ]
    ],

    plugins: plugins
};
