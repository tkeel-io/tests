import { adminPassword, baseURL, ironMan, spiderMan } from "../../tests/data";
import { ruleRouters } from "./router_data";
import { data, rule, target } from "./data";
import { getResponseData } from "../../src/utils";
const st = require("supertest");
export const request = st(baseURL);


// 租户用户信息
export const sink: any = {
    id: "a4778aPO",
};

/**
 * 租户登录平台
 */
it("tenantLogin", (done) => {
    request
        .get(`/apis/security/v1/oauth/${spiderMan.id}/token?grant_type=password&username=${spiderMan.username}&password=${spiderMan.password}`)
        .expect(200)
        .then((res: any) => {
            console.log("login return ");
            let result = JSON.parse(res.text).data;
            spiderMan.authorization = `${result.token_type} ${result.access_token}`;
            console.log(spiderMan)
            done();
        });
});

it("create rule", (done) => {
    request.post(ruleRouters.create.url)
        .set("authorization", spiderMan.authorization)
        .send({
            name: rule.name,
            desc: rule.desc,
            type: rule.type,
            model_id: rule.model_id,
            model_name: rule.model_name
        })
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            console.log(result)
            expect(result.name).toBeDefined();
            expect(result.name).toEqual(rule.name);
            expect(result.desc).toBeDefined();
            expect(result.desc).toEqual(rule.desc);
            expect(result.type).toBeDefined();
            rule.type = result.type
            expect(result.id).toBeDefined();
            rule.id = result.id;
            done();
        });
});


/**
 * verfy target mysql
 */
it("verify mysql", (done) => {
    request
        .post(`/apis/rule-manager/v1/verify/mysql`)
        .set("authorization", spiderMan.authorization)
        .send({
            urls: "10.96.166.237:3306",
            meta: {
                user: "root",
                password: "a3fks=ixmeb82a",
                db_name: "testverify"
            }
        })
        .expect(200)
        .then((res: any) => {
            console.log("verify mysql return ");
            let result = JSON.parse(res.text).data;
            console.log(result);
            sink.id = `${result.id}`;
            data.createRuleTarget.mysqlrequest.sink_id = `${result.id}`
            console.log(sink);
            done();
        });
});


it(" create rule target", (done) => {
    request.post(ruleRouters.createRuleTarget.url.replace(":ruleId", rule.id))
        .set("authorization", spiderMan.authorization)
        .send(data.createRuleTarget.mysqlrequest)
        .expect(200)
        .end((err, res) => {
            console.log(err)
            if (err) return done(err);
            let result = getResponseData(res.text)
            console.log(res.text)
            done();
        });
})

/*

it("list rule", (done) => {
    request.get(pagination(ruleRouters["list/query"].url))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            console.log(result)
            expect(result.total).toBeDefined();
            expect(result.data).toBeDefined();
            done();
        });
});

function pagination(url: string): string {
    return `${url}?page_num=1&page_size=20&type=0`;
}
*/