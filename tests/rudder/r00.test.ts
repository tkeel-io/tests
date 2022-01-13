import { request } from "../../src/init";
import { ironMan, keel } from "../data";

/**
 * 添加平台仓库
 */
it("add rope", (done) => {
  request
    .post(`/apis/rudder/v1/repos/${keel.repoName[0]}`)
    .set("authorization", ironMan.authorization)
    .send("https://tkeel-io.github.io/helm-charts")
    .expect(200) // 最基本的断言，仅仅判断 status_code
    .then((res) => {
      // 在回调中做更多的断言
      let result = JSON.parse(res.text);
      expect(result.code).toBe(200);

      // 在回调中绑定数据到全局变量 ironMan, 其他用例中使用 ironMan.test 调用
      // 注意：需要保证用例的执行顺序
      ironMan["test"] = "any word";
      done();
    });
});

/**
 * 获取仓库信息
 */
it("get repo info", (done) => {
  request
    .get(`/apis/rudder/v1/repos`)
    .set("authorization", ironMan.authorization)
    .expect(200, done);
});
