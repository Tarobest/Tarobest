import axios from 'axios';

// 创建一个 Axios 实例
const instance = axios.create({
  baseURL: '你的API基础URL',
  timeout: 1000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    console.log('开始请求');
    // 可以在这里显示 loading 状态
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    console.log('请求成功');
    // 可以在这里隐藏 loading 状态
    return response;
  },
  error => {
    // 对响应错误做点什么
    console.error('请求失败:', error);
    // 可以在这里处理错误状态
    return Promise.reject(error);
  }
);

// 请求函数
const request = (options) => {
  return new Promise((resolve, reject) => {
    instance(options)
      .then(response => {
        // 请求成功处理
        console.log('请求成功:', response.data);
        resolve(response.data);
      })
      .catch(error => {
        // 请求失败处理
        if (error.response) {
          // 请求已发出，服务器响应了状态码 2xx 之外的其他状态
          console.error('服务器拒绝了请求:', error.response.data);
          reject(error.response.data);
        } else if (error.request) {
          // 请求已经发出，但没有收到响应
          console.error('没有收到响应:', error.request);
          reject(error.request);
        } else {
          // 发生了触发请求错误的问题
          console.error('触发请求错误:', error.message);
          reject(error.message);
        }
      });
  });
};
export default request;


//使用requeest，用以下格式调用他
// request({
//   method: 'get',
//   url: '/some-url'
// }).then(data => {
//   // 处理数据
//   console.log(data);
// }).catch(error => {
//   // 处理错误
//   console.error(error);
// });
