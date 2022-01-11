import axios from "axios";
import { adminPassword, baseURL, repoName } from "./env";

describe("tenant v0.3.0", () => {
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
  });

  test.skip("creat teanat", async () => {
    let res = await instance.request({
      url: "/apis/security/v1/tenants",
      method: "post",
      data: {
        title: `test_tenant_${repoName.slice(0, 4)}`,
        remark: "any word",
        admin: {
          username: `test_tenant_${repoName.slice(0, 4)}`,
          password: "123456",
        },
      },
    });

    expect(res.status).toBe(200);
  });
});
