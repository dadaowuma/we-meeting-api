const Koa = require('koa');
// const logger = require('./log');

/**
 * 创建一个APP
 * @param {object} config 
 * @param {function[]} middle_wares 
 */
module.exports = function createApp(config, middle_wares){
  const app = new Koa();


  middle_wares && Array.isArray(middle_wares) && middle_wares.forEach((item) => {
    if(typeof item === 'function'){
      app.use(item);
    }
  });

  // app.use(async (ctx, next) => {
  //   ctx.logger = logger;
  // });


  app.on('error', (err, ctx) => {
    // log.error('server error', err, ctx)
    console.log('is error', err, ctx);
  });

  return {
    start: () => {
      app.listen(config.port);
      console.log(`应用已启动，请访问: localhost:${config.port}`);
    },
    getApp: () => {
      return app;
    }
  };
}
