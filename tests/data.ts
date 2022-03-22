/**
 * 用于存放数据
 * 1、测试环境数据
 * 2、单用例参数化的测试数据
 * 3、全局变量存储测试依赖数据
 */

import { v4 as uuidv4 } from "uuid";

// 全局依赖数据
// 管理用户账号信息
export const ironMan: any = {
  authorization: "平台管理员登录用的token",
  tenantAuthorization: "平台管理员登录用的token",
};
// 租户用户信息
export const spiderMan: any = {
  id: "alex",
  password: "gyt150520",
  authorization: "租户用户的token",
};

// 测试环境
export const service = "http://192.168.123.9";
export const adminPassword = "dEtlZWxBZG1pbg==";
export const port = "30707";
export const baseURL = `${service}:${port}`;

// 测试数据
export const repoName = uuidv4();
export const installerName = "hello-tkeel";
export const installerVersion = "0.3.0";
export const pluginId = "hello-tkeel";
export const entityId = uuidv4();
export const entityType = "device";

// keel 模块测试数据
export const keel = {
  password: ["Y2hhbmdlbWU=", "Y2hhbmdlbWU="],
  repoName: [repoName, "tkeel-io"],
};
