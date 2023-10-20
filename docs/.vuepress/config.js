module.exports = {
  title: 'ws-grocery-store', // 设置网站标题
  description: '自主搭建的移动端ui组件库', //描述
  base: '/',
  dest: './docs/.vuepress/dist', // 设置输出目录
  port: 1234, //端口
  themeConfig: {
    //主题配置
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '组件',
        link: '/comps/',
      }
    ],
    // 为以下路由添加侧边栏
    sidebarDepth: 2,
    sidebar: [
      {
        title: '介绍',
        collapsable: false,
        children: ['/w/']
      }
    ],
  },
};
