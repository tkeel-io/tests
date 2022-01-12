import { ironMan, request, keel } from "../init.case";

test("creat teanat", (done) => {
  request
    .post(`/apis/security/v1/tenants`)
    .send({
      title: `test_tenant_${keel.repoName[0].slice(0, 4)}`,
      remark: "any word",
      admin: {
        username: `test_tenant_${keel.repoName[0].slice(0, 4)}`,
        password: "123456",
      },
    })
    .set("authorization", ironMan.authorization)
    .expect(200, done);
});

export const tenantCase  = `tenant 模块的测试用例`
