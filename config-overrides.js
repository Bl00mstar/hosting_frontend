const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    ['@assets']: path.resolve(__dirname, './src/assets'),
    ['@views']: path.resolve(__dirname, './src/views'),
    ['@components']: path.resolve(__dirname, './src/components'),
    ['@hooks']: path.resolve(__dirname, './src/hooks'),

    // ['@pages']: path.resolve(__dirname, './src/pages'),

    ['@media']: path.resolve(__dirname, './src/utils/media'),
    ['@theme']: path.resolve(__dirname, './src/utils/theme'),
    ['@styles']: path.resolve(__dirname, './src/utils/styles'),
    // ['@views']: path.resolve(__dirname, './src/components/views'),
    ['@layout']: path.resolve(__dirname, './src/layout'),
    ['@store']: path.resolve(__dirname, './src/store'),

    ['@utils']: path.resolve(__dirname, './src/utils'),
    ['@containers']: path.resolve(__dirname, './src/components/containers'),
  })
);
