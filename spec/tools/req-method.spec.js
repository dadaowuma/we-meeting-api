const isValidRequestMethod = require('../../src/tools/is-valid-request-method');

describe('测试请求方法是否合法', function(){
  it("判断方法值是否合法", function(){
    expect(isValidRequestMethod(1)).toBe(false);

    expect(isValidRequestMethod('get')).toBe(true);

    expect(isValidRequestMethod('POST')).toBe(true);

    expect(isValidRequestMethod('post')).toBe(true);
  });
});