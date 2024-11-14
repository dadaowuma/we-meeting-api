/**
 * @see https://www.npmjs.com/package/@koa/router
 */
const Router = require('../3rdlibs/koa-router');
const apiRequestFormat = require('./api-req-format');
const apiResponseJson = require('./api-res-json');

const logger = require('../3rdlibs/log4js');

/**
 * 接口请求包装器
 * 此方法处理接口的每一个请求
 * 1. 接受请求，处理请求数据（参数处理，权限验证）
 * 2. 处理业务 
 * 3. 发出响应
 * @param {AsyncFunction} action - 一个业务操作方法，此方法接受客户端数据，返回处理结果 
 * @returns 
 */
function useApi(action){
  return async (ctx, next) => {
    logger.info('处理请求', ctx.req.url);
    const opts = await apiRequestFormat(ctx);

    // 处理业务
    const result = await action(opts);

    logger.info('响应数据::');
    // 请求结束
    apiResponseJson(ctx, result);
  }
}

/**
 * 将前缀补充到接口路由中
 * @param {string} prefix - 例如 /c
 * @param {string} path - 路径值，例如：/user/list
 * @returns 
 */
function usePrefix(prefix, path){
  if(!prefix){
    return path;
  }

  return `${prefix}${path}`;
}

/**
 * 注册接口路由
 * @param {string} prefix - api路由前缀 
 * @param {object[]} routes_list - 接口路由表 
 * @returns 
 */
module.exports = function useRoutePath(prefix, routes_list = []){
  const router = new Router();

  for(let i = 0, len = routes_list.length; i < len; i++){
    const item = routes_list[i];

    if(!item){
      throw new Error('非法接口地址，请检查路由配置');
    }

    if(!('method' in item && 'path' in item && 'action' in item)){
      throw new Error('非法接口配置项，请检查路由配置');
    }

    const method = item.method || 'get';
    const path = item.path;
    const action = item.action;

    if(typeof action !== 'function'){
      throw new Error('非法的接口操作，请检查路由配置');
    }

    const _path = usePrefix(prefix, path);

    router[method](_path, useApi(action))
  }

  return router;
};


