module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true,
      },
      'vant',
    ],
    ['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }], // `style: true` 会加载 less 文件
  ],
};
