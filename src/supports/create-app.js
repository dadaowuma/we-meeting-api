const Koa = require('koa');

const cors = require('../3rdlibs/cors');

const websockify = require('../3rdlibs/koa-websocket');

const logger = require('../3rdlibs/log4js');

/**
 * 创建一个APP
 * @param {object} config 
 * @param {function[]} middle_wares 
 */
module.exports = function createApp(config, middle_wares){
  let app;
  const websocket_on = config.websocket_on === true; 

  if(websocket_on){
    logger.info('WebSocket已开启');

    app = websockify(new Koa());
  }else{
    logger.info('WebSocket未开启');

    app = new Koa();
  }
  
  /**
   * 配置跨域
   * @see https://www.npmjs.com/package/@koa/cors 
   */
  app.use(cors({
    origin(ctx) {
      const cur_origin = ctx.get('Origin');
      const allowOrigin  = config.allowOrigin;

      if(!allowOrigin){
        return null;
      }

      if(typeof allowOrigin === 'string'){
        return allowOrigin;  
      }

      if(Array.isArray(allowOrigin)){
        if(allowOrigin.indexOf(cur_origin) >= 0){
          return cur_origin;
        }else{
          return;
        }
      }

      return null;
    },
  }));

  // 监听 WebSocket 连接
  if(websocket_on){
    app.ws.use(async (ctx) => {
      logger.info('WebSocket已连接::URL', ctx.req.url);
    
      // 当接收到消息时
      ctx.websocket.on('message', (message) => {
        logger.info('WebSocket收到消息::URL', ctx.req.url);
        
        const result = message.toString('utf-8');
        
        logger.info('WebSocket客户端消息::data', result);

        let count = 1;
        setInterval(() => {
          // 定时发送消息给客户端
          ctx.websocket.send(JSON.stringify({
            count: count++,
            nm: "jck"
          }));
        }, 5000);
      });
    
      // 当连接关闭时
      ctx.websocket.on('close', () => {
        logger.info('WebSocket客户端断开连接');
      });
    
      // 当发生错误时
      ctx.websocket.on('error', (error) => {
        logger.error('WebSocket error:', error);
      });
    });

    // 监听 HTTP 请求（可选）
    app.use(async (ctx, next) => {
      if (ctx.websocket) {
        // 如果请求是 WebSocket 请求，koa-websocket 会处理它
        return;
      }

      await next();
    });
  }
  
  middle_wares && Array.isArray(middle_wares) && middle_wares.forEach((item) => {
    if(typeof item === 'function'){
      app.use(item);
    }
  });

  app.on('error', (err, ctx) => {
    logger.error('app error:', err);
  });

  return {
    start: () => {
      const port = config.port;
      app.listen(port);
      logger.info(`Server is running on ws://localhost:${port} and http://localhost:${port}`);
    },
    getApp: () => {
      return app;
    }
  };
}
