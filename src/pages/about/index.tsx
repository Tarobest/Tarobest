
import { useLoad } from "@tarojs/taro";
import "virtual:uno.css"
import "./index.scss";



export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  
  return (
   <div className="container"> 
         <text>欢迎访问我们的网站</text>
         <button className="btn btn-primary">Click Me</button>
         <a className="m-1">Hello</a>
       </div>
  );
}
