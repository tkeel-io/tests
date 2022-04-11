/**
 * 运行用例初始化相关的工作，包括
 * 1、初始化请求模块
 * 2、登录被测系统
 * 3、存储token
 */

import {adminPassword, baseURL, ironMan, spiderMan} from "../tests/data";

const st = require("supertest");
export const request = st(baseURL);

/**
 * 登录平台
 */
it("login", (done) => {
  request
    .get(`/apis/rudder/v1/oauth2/admin?password=${adminPassword}`)
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      let authorization = `${result.token_type} ${result.access_token}`;
      ironMan["authorization"] = authorization;
      done();
    });
});

/**
 * 租户登录平台
 */
it("tenantLogin", (done) => {
    request
        .get(`/apis/security/v1/oauth/${spiderMan.id}/token?grant_type=password&username=${spiderMan.username}&password=${spiderMan.password}`)
        .expect(200)
        .then((res: any) => {
            console.log("login return ");
            let result = JSON.parse(res.text).data;
            spiderMan.authorization = `${result.token_type} ${result.access_token}`;
            done();
        });
});
