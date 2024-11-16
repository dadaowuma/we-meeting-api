module.exports = {
  /**
   * 服务器监听的端口
   */
  port: 3000,

  /**
   * api路由前缀
   * 此处为c，表示client单词首字母，意为客户端，加上此前缀，意为该前缀接口面向客户端
   * 例如：
   * 如果您的api地址为 /test，添加此前缀后，将会被补充为 /c/test，客户端需要访问 http://example:3000/c/test
   * 如果您的api地址为 /user/info，添加此前缀后，将会被补充为 /c/user/info，客户端需要访问 http://example:3000/c/user/info
   */
  api_prefix: '/c',

  /**
   * 是否开启websocket
   * 可选值： true|false
   */
  websocket_on: true,

  /**
   * 跨域配置
   * 配置格式1，仅支持特定origin跨域：'http://localhost:5173'
   * 配置格式2，支持多个origin跨域：  ['http://localhost:5173', 'http://127.0.0.1:3453']
   */
  allowOrigin: ['http://localhost:5173']
};