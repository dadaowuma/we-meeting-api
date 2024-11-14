/**
 * 判断一个接口请求的method是否合法
 * @param {string} method 
 * @returns {boolean}
 */
module.exports = function isValidRequestMethod(method){
  if(!method){
    return false;
  }

  const st = new Set(['get', 'post']);

  if(st.has((method + '').toLowerCase())){
    return true;
  }

  return false;
}