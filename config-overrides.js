const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    ['@media']: path.resolve(__dirname, './src/components/layout/media'),
    ['@theme']: path.resolve(__dirname, './src/components/layout/theme'),
    ['@styles']: path.resolve(__dirname, './src/components/layout/styles'),
    ['@views']: path.resolve(__dirname, './src/components/views'),
    ['@layout']: path.resolve(__dirname, './src/components/layout/MainLayout'),
    ['@store']: path.resolve(__dirname, './src/store'),
    ['@assets']: path.resolve(__dirname, './src/components/assets'),
  })
);
