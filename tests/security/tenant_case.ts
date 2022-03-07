import { request } from "../../src/init";
import { ironMan, keel } from "../data";
import {securityRouters} from "./router_data";
import {genUUID, TenantData} from "./tenant_data";
import {getResponseData} from "../../src/utils";


export const caseName :string = "tenant test case"

/**
 * 创建租户
 */
test("creat tenant", (done) => {
    request
        .post(securityRouters.CreateTenant.path)
        .send({
            title: `test_tenant_${genUUID().slice(0, 8)}`,
            remark: "any word",
            admin: {
                username: TenantData.admin.username,
                password: TenantData.admin.password,
            },
        })
        .set("authorization", ironMan.authorization)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            TenantData.tenant_id = result.tenant_id
            TenantData.title = result.tenant_title
            done();
        });
});

/**
 * 租户列表
 */
test("list tenant", (done) => {
    request
        .get(securityRouters.ListTenant.path)
        .set("authorization", ironMan.authorization)
        .expect(200, done);
});


