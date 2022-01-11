import axios from "axios";
import { adminPassword, baseURL, repoName } from "./env";

describe("keel v0.3.0", () => {
  const instance = axios.create({
    baseURL: baseURL,
  });

  beforeAll(async () => {
    /**
     * 平台管理员登陆
     */
    let res = await instance.request({
      url: "/apis/rudder/v1/oauth2/admin",
      method: "get",
      params: {
        password: adminPassword,
      },
    });

    expect(res.status).toBe(200);
    let result = res.data.data;
    let authorization = `${result.token_type} ${result.access_token}`;
    instance.defaults.headers.common["Authorization"] = authorization;
    instance.defaults.headers.common["Content-Type"] = "application/json";
    instance.defaults.headers.post["testdata"] = "any word";
  });

  test("add repo", async () => {
    let res = await instance.request({
      url: `/apis/rudder/v1/repos/${repoName}`,
      method: "post",
      data: "https://tkeel-io.github.io/helm-charts",
    });
    expect(res.status).toBe(200);
  });

  test("get repo info", async () => {
    let res = await instance.request({
      url: `/apis/rudder/v1/repos`,
      method: "get",
    });
    expect(res.status).toBe(200);
  });
});
