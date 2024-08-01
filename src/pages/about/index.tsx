import { useLoad } from "@tarojs/taro";

import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    // <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">

    <body className="bg-gray-100">
    <header className="p-8 bg-white shadow-lg">
      <h1 className="text-3xl font-bold">我的网站</h1>
    </header>

    <main className="p-8">
      <section className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">欢迎</h2>
        <p className="text-gray-800 text-lg">
          这是使用 Tailwind CSS 创建的简单页面。Tailwind 是一种功能类优先的 CSS 框架，用于快速 UI 开发。
        </p>
      </section>

      <section className="max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">了解更多</h2>
        <p className="text-gray-800 text-lg">
          如果你对 Tailwind CSS 感兴趣，可以访问他们的<a href="https://tailwindcss.com"
                                                        className="text-blue-500 hover:underline">官方网站</a>了解更多信息。
        </p>
      </section>
    </main>

    <footer className="p-8 bg-gray-100 text-center">
      <p className="text-gray-600">ls © 2024</p>
    </footer>
    </body>
    // </link>
  );
}
