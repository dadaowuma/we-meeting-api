const path = require('path');

/**
 * 以下相关的注释皆以域名 http://www.wemeeting.com 为 示例进行说明
 */
module.exports = {
  /**
   * 服务器监听的端口
   */
  port: 3000,

  /**
   * api路由前缀
   * 此处为c，表示client单词首字母，意为客户端，加上此前缀，意为该前缀接口面向客户端
   * 例如：
   * 如果您的api地址为 /test，添加此前缀后，将会被补充为 /c/test，客户端需要访问 http://www.wemeeting.com/c/test
   * 如果您的api地址为 /user/info，添加此前缀后，将会被补充为 /c/user/info，客户端需要访问 http://www.wemeeting.com/c/user/info
   */
  api_prefix: '/c',

  /**
   * 是否开启websocket
   * 可选值： true|false
   */
  websocket_on: true,

  /**
   * 静态文件目录
   * 静态文件保存的文件夹
   */
  static_path: [path.join(__dirname, '../../static/'),],
  /**
   * 客户端访问服务器静态文件时的路径名
   * 例如：
   * 假设配置项 static_path 对应的目录下有一个文件为 abc.mp4
   * 如果配置项 static_prefix 为空，        则可以通过 http://www.wemeeting.com/abc.mp4         进行访问
   * 如果配置项 static_prefix 为 /upload ， 则可以通过 http://www.wemeeting.com/upload/abc.mp4  进行访问
   */
  static_prefix: '/upload',

  /**
   * 跨域配置
   * 配置格式1，仅支持特定origin跨域：'http://localhost:5173'
   * 配置格式2，支持多个origin跨域：  ['http://localhost:5173', 'http://127.0.0.1:3453']
   */
  allowOrigin: ['http://localhost:5173']
};