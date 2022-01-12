/**
 * 用于存放数据
 * 1、测试环境数据
 * 2、单用例参数化的测试数据
 * 3、全局变量存储测试依赖数据
 */

import { v4 as uuidv4 } from "uuid";

// 测试环境
export const service = "http://192.168.123.9";
export const adminPassword = "Y2hhbmdlbWU=";
export const port = "30707";
export const baseURL = `${service}:${port}`;

// 测试数据
export const repoName = uuidv4();
export const installerName = "hello-tkeel";
export const installerVersion = "0.3.0";
export const pluginId = "hello-tkeel";
export const entityId = uuidv4();
export const entityType = "device";

// 存储临时依赖数据
export const ironMan: any = {
  authorization: "平台管理员登录用的token",
};

// keel 模块测试数据
export const keel = {
  password: ["Y2hhbmdlbWU=", "Y2hhbmdlbWU="],
  repoName: [repoName, "tkeel-io"],
};
