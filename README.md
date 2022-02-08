# Tkeel 测试

## 安装

依赖

- npm
- node.js

```bash
git clone git@github.com:tkeel-io/tests.git
cd tests
npm install
```

## 运行测试

```bash
// 运行所有用例 npm run test

// 运行模块用例
npm run test /tests/<模块名：core>
```

## 编写用例

### 用例模版

```typescript

// 导入 request 用于 http 请求 
import { request } from "../../src/init";

// 导入 ironMan 用于存储全局的测试依赖数据
import { ironMan } from "../data";

/**
 * 添加平台仓库
 */
it("add rope", (done) => {
  request
    .post(`/apis/rudder/v1/repos/${keel.repoName[0]}`) // post 类型请求，只需传入path
    .set("authorization", ironMan.authorization) // 将 key：value 字段添加到 header 上
    .send("https://tkeel-io.github.io/helm-charts") // body ，josn / 结构体类型，也支持string
    .expect(200) // 最基本的断言，仅仅判断 status_code
    .then((res) => {
      // 在回调中做更多的断言
      let result = JSON.parse(res.text); // 接口的返回值
      expect(result.code).toBe(200); // 断言接口 code 字段 == 200

      // 在回调中绑定数据到全局变量 ironMan, 其他用例中使用 ironMan.test 调用
      ironMan["code"] = 200;
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
    .expect(ironMan.code, done); // 在断言中使用 add repo 里绑定到 ironMan 的数据
});
```

### 用例组织

用例文件以 .case.ts 结尾，安装 以上模块编写用例。在 index.test.ts 文件中导入用例，框架会安装用例导入的顺序执行。
