const useRoutePath = require('../supports/use-route-path');
const {api_prefix} = require('./config');

const test = require('./apis/test');

/**
 * 接口路由表
 */
const routes_list = [
  {
    method: 'get',
    path: '/test',
    action: test,
  }
];

const router = useRoutePath(api_prefix, routes_list);

module.exports = router;