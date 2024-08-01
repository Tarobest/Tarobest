export default defineAppConfig({
  entryPagePath: "pages/home/index",
  pages: ["pages/home/index", "pages/about/index"],
  window: {
    backgroundTextStyle: "dark",
    backgroundColor: "#808080",
    enablePullDownRefresh: true,
    navigationBarBackgroundColor: "#173F3F",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#173F3F",
    selectedColor: "#808080",
    list: [
      {
        pagePath: "pages/home/index",
        text: "Home",
        iconPath: "./asset/icon/homeTab.png",
        selectedIconPath: "./asset/icon/homeTabSelect.png",
      },
      {
        pagePath: "pages/about/index",
        text: "About",
        iconPath: "./asset/icon/about.png",
        selectedIconPath: "./asset/icon/aboutSelect.png",
      },
    ],
  },
});
