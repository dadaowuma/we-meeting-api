const {port} = require('./config');

const router = require('./routes');

const createApp = require('../supports/create-app');

const middle_wares = [
  async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
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
}, middle_wares);

/**
 * 启动APP
 */
start();