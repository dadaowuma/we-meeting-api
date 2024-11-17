const {port, allowOrigin, websocket_on, static_path, static_prefix} = require('./config');
const logger = require('../3rdlibs/log4js');

const router = require('./routes');

const createApp = require('../supports/create-app');

const middle_wares = [
  async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    logger.info(`${ctx.method} ${ctx.url} - ${rt}`);
  },
  async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  },
  /**
   * 应用路由相关配置
   * @see https://www.npmjs.com/package/@koa/router
   */
  router.routes(),
  router.allowedMethods()
];

/**
 * 创建APP
 */
const {start} = createApp({
  port: port,
  websocket_on: websocket_on,
  allowOrigin: allowOrigin,
  static_path: static_path,
  static_prefix: static_prefix
}, middle_wares);

/**
 * 启动APP
 */
start();