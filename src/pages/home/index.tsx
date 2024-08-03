
import { useLoad } from "@tarojs/taro";
import "./index.scss";

export default function Index() {

  useLoad(() => {
    console.log("Page loaded.");
  });

  return (

    <div className="container">
      <header>
        <h1>欢迎访问我们的网站</h1>
      </header>

      <section>
        <h2>内容</h2>
        <p>这里是服务内容的介绍。根据屏幕宽度不同，这段文字的布局会有所变化。</p>
      </section>
      <footer>
        <p>&copy; ls</p>
      </footer>
    </div>

  );
}
