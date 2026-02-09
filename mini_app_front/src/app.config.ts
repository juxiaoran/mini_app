export default defineAppConfig({
  pages: [
    "pages/home/index",
    "pages/appointment/index",
    "pages/mine/appointment/index",
    "pages/login/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/home/index",
        text: "Home",
      },
      {
        pagePath: "pages/mine/appointment/index",
        text: "Appointment",
      },
    ],
  },
});
