import { adminPassword, baseURL, ironMan, spiderMan } from "../data";
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

it("get rule", (done) => {
    request.get(ruleRouters.get.url.replace(":id", rule.id))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.name).toBeDefined();
            expect(result.name).toEqual(rule.name);
            expect(result.desc).toBeDefined();
            expect(result.desc).toEqual(rule.desc);
            expect(result.type).toBeDefined();
            rule.type = result.type
            expect(result.id).toBeDefined();
            rule.id = result.id;
            expect(result.created_at).toBeDefined();
            rule.createdAt = result.created_at;
            expect(result.updated_at).toBeDefined();
            rule.updatedAt = result.updated_at;
            console.log(result)
            done();
        });
});


it("update rule", (done) => {
    request.put(ruleRouters.update.url.replace(":id", rule.id))
        .set("authorization", spiderMan.authorization)
        .send(data.updateRuleInfo.request)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            console.log(result)
            expect(result.name).toBeDefined();
            expect(result.name).toEqual(data.updateRuleInfo.request.name);
            rule.name = result.name
            expect(result.desc).toBeDefined();
            expect(result.desc).toEqual(data.updateRuleInfo.request.desc);
            rule.desc = result.desc
            expect(result.type).toBeDefined();
            rule.type = result.type
            expect(result.id).toBeDefined();
            rule.id = result.id;
            expect(result.created_at).toBeDefined();
            rule.createdAt = result.created_at;
            expect(result.updated_at).toBeDefined();
            rule.updatedAt = result.updated_at;
            done();
        })
})


it("delete rule", (done) => {
    request.delete(ruleRouters.delete.url.replace(":id", rule.id))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            console.log(result)
            done();
        });
});

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
    return `${url}?page_num=1&page_size=2&type=0`;
}