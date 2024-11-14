/**
 * 响应数据，返回json格式数据
 * @param {Context} ctx 
 * @param {object} data - 数据内容，键值对对象数据
 */
module.exports = function apiResponseJson(ctx, data){
  ctx.set('content-type', 'application/json; charset=utf-8');
  ctx.body = JSON.stringify(data);

  // ctx.body = JSON.stringify({
  //   code: 0,
  //   data: {
  //     name: 'jack',
  //     age: 18
  //   },
  //   message: 'success'
  // });
}