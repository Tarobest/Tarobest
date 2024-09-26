import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
<% if(useI18n) import './i18n'; %>;
import "./app.css";
import Taro from "@tarojs/taro";

if (process.env.NODE_ENV !== "production" && process.env.TARO_APP_SERVER) {
	const oldTaroNavigateTo = Taro.navigateTo;
	const oldTaroReLaunch = Taro.reLaunch;

	Taro.navigateTo = async (options: Taro.navigateTo.Option) => {
		try {
			await Taro.request({
				url: "http://localhost:3132/?url=" + options.url
			});
		} catch (error) {
			console.log(error);
		}
		return oldTaroNavigateTo(options);
	};

	Taro.reLaunch = async (options: Taro.reLaunch.Option) => {
		try {
			await Taro.request({
				url: "http://localhost:3132/?url=" + options.url
			});
		} catch (error) {
			console.log(error);
		}
		return oldTaroReLaunch(options);
	};
}

function App({ children }: PropsWithChildren<any>) {
	useLaunch(() => {
		console.log("App launched.");
	});

	// children 是将要会渲染的页面
	return children;
}

export default App;
