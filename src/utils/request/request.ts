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
    return response.data;
  },
  error => {
    // 对响应错误做点什么
    if (error.response) {
      // 根据返回的HTTP状态码做不同的处理
      switch (error.response.status) {
        case 401:
          // token过期或未授权
          console.error('Unauthorized! Token may have expired.');
          // 这里可以添加跳转到登录页面的逻辑
          break;
        case 403:
          console.error('Forbidden! You do not have permission to perform this action.');
          // 这里可以添加一些权限不足的处理逻辑
          break;
        case 404:
          console.error('Not Found! The requested resource was not found.');
          // 这里可以添加一些资源未找到的处理逻辑
          break;
        // 其他状态码相应处理
        default:
          console.error(`[Error]: ${error.response.status} - ${error.response.statusText}`);
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('No response received:', error.request);
    } else {
      // 发送请求时出了点问题
      console.error('Error setting up request:', error.message);
    }
    // 可以在这里对所有的响应错误统一处理
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
        console.log("失败",error);
        reject(error);
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
