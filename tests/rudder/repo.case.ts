import { request } from "../../src/init";
// 导入全局测试数据
import { ironMan } from "../data";

// 导入rudder 模块测试数据
import { repoName } from "./rudder_date";

// 定义一个变量，导出到 index.test 文件
export const repoCase = "test for rudder";

/**
 * 添加平台仓库
 */
it("add rope", (done) => {
  request
    .post(`/apis/rudder/v1/repos/${repoName}`) // post 请求
    .set("authorization", ironMan.authorization) // 讲 k:v 字段添加到 header 上
    .send("https://tkeel-io.github.io/helm-charts")
    .expect(200) // 最基本的断言，仅仅判断 status_code
    .then((res) => {
      // 在回调中做更多的断言
      let result = JSON.parse(res.text);
      expect(result.code).toBe(200);
      // 在回调中绑定数据到全局变量 ironMan, 其他用例中使用 ironMan.test 调用
      ironMan["code"] = 200;
      done(); // 如果有 then 回调，则在回调中调用 done(),反正只需要在except 中传入done，参考以下用例
    });
});

/**
 * 获取仓库信息
 */
it("get repo info", (done) => {
  request
    .get(`/apis/rudder/v1/repos`)
    .set("authorization", ironMan.authorization)
    .expect(200, done); // 调用在add repo 中绑定的数据
});
