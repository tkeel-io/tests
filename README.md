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
npm run test /tests/keel
```

## 用例组织

框架会自行在 `tests` 目录查找文件名包含 `test` 的文件,按照文件名 和 `it` 顺序自上而下执行。
组织用例需要自行解决模块之间和模块内部用例的依赖问题。

## todo

- 模块外用例依赖
- 用例执行顺序
