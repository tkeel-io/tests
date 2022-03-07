import {request} from "../../src/init";
import {securityRouters} from "./router_data";
import {genUUID, TenantData} from "./tenant_data";
import {ironMan, spiderMan} from "../data";
import {getResponseData} from "../../src/utils";

const localhost = "http://localhost"
/**
 * 获取用户token
 */
test("token", (done) => {
    let url = new URL(localhost);
    url.pathname = securityRouters.Token.path
    url.searchParams.append("grant_type", "password")
    url.searchParams.append("username", TenantData.admin.username)
    url.searchParams.append("password", TenantData.admin.password)
    let path = url.toString().replace(localhost,"").replace(":tenant_id",TenantData.tenant_id)
    request
        .get(path)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            spiderMan.authorization= result.access_token
            done();
        });
});