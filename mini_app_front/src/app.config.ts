export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/appointment/index',
    'pages/mine/appointment/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/mine/appointment/index',
        text: '预约'
      }
    ]
  }
})
