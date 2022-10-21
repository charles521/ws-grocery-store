module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        'libraryName': 'hl-deco-comp',
        style: (name) => {
          return `${name}/style.css`
        }
      }
    ]
  ]
}
