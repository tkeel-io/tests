import { adminPassword, baseURL, ironMan, spiderMan } from "../../tests/data";
import { ruleRouters } from "./router_data";
import { data } from "./data";
import { getResponseData } from "../../src/utils";
const st = require("supertest");
export const request = st(baseURL);


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

/**
 * verfy target clickhouse
 */
it("verify clickhouse", (done) => {
    request
        .post(`/apis/rule-manager/v1/verify/clickhouse`)
        .set("authorization", spiderMan.authorization)
        .send({
            urls: "clickhouse-my-ck:8123",
            meta: {
                user: "default",
                password: "C1ickh0use",
                db_name: "testverify"
            }
        })
        .expect(200)
        .then((res: any) => {
            console.log("verify clickhouse return ");
            let result = JSON.parse(res.text).data;
            console.log(result);
            sink.id = `${result.id}`;
            ck_request.sink_id = `${result.id}`
            console.log(sink);
            done();
        });
});

/**
 * verfy target clickhouse failed
 */
it("verify clickhouse failed", (done) => {
    request
        .post(`/apis/rule-manager/v1/verify/clickhouse`)
        .set("authorization", spiderMan.authorization)
        .send({
            urls: "10.96.182.68dd:8123",
            meta: {
                user: "default22",
                password: "C1ickh0use",
                db_name: "testverify"
            }
        })
        .expect(200)
        .then((res: any) => {
            console.log("verify clickhouse failed return ");
            let result = JSON.parse(res.text);
            console.log(result);
            done();
        });
});

/**
 * clickhouse table list
 */
it("clickhouse table list", (done) => {
    request
        .get(`/apis/rule-manager/v1/sink/:id/tables`.replace(":id", sink.id))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .then((res: any) => {
            console.log("mysql table list ");
            let result = JSON.parse(res.text).data;
            console.log(result)
            done();
        });
});

/**
 * clickhouse  map
 */
it("clickhouse map", (done) => {
    request
        .get(`/apis/rule-manager/v1/sink/:id/maps?table_name=:table_name`.replace(":id", sink.id).replace(":table_name", "event_data"))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .then((res: any) => {
            console.log("clickhouse map ");
            let result = JSON.parse(res.text).data;
            console.log(result)
            done();
        });
});

export const ck_rule = {
    name: "ck-rule",
    desc: "testck",
    type: 2,
    id: "",
    status: 0,
    createdAt: 0,
    updatedAt: 0,
    model_id: "iotd-096843a2-6e60-415d-b782-bb6383a58b16",
    model_name: "rule-test"
}
/**
 * create_mysql rule
 */
it("create rule", (done) => {
    request.post(ruleRouters.create.url)
        .set("authorization", spiderMan.authorization)
        .send({
            name: ck_rule.name,
            desc: ck_rule.desc,
            type: ck_rule.type,
            model_id: ck_rule.model_id,
            model_name: ck_rule.model_name
        })
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            console.log(result)
            expect(result.name).toBeDefined();
            expect(result.name).toEqual(ck_rule.name);
            expect(result.desc).toBeDefined();
            expect(result.desc).toEqual(ck_rule.desc);
            expect(result.type).toBeDefined();
            ck_rule.type = result.type
            expect(result.id).toBeDefined();
            ck_rule.id = result.id;
            done();
        });
});

export const ck_request = {
    sink_type: "clickhouse",
    sink_id: "id",
    table_name: "event_data",
    fields: [{ t_field: { name: "abc", type: "float" }, m_field: { name: "abc", type: "float" } }]
}

export const target = {
    id: "",
    type: 0,
    host: "",
    value: "",
    ext: ""
}

/**
 * create_mysql rule target
 */
it(" create rule target", (done) => {
    request.post(ruleRouters.createRuleTarget.url.replace(":ruleId", ck_rule.id))
        .set("authorization", spiderMan.authorization)
        .send(ck_request)
        .expect(200)
        .end((err, res) => {
            console.log(err)
            if (err) return done(err);
            let result = getResponseData(res.text)
            console.log(res.text)
            target.id = result.id
            console.log(ruleRouters.createRuleTarget.url.replace(":ruleId", ck_rule.id))
            done();
        });
})

/**
 * update clickhouse rule target map
 */


export const update_table_map = {
    target_id: "",
    table_name: "event_data",
    fields: [{ t_field: { name: "abc1", type: "int" }, m_field: { name: "abc1", type: "int" } }]
}

it("update clickhouse rule target map", (done) => {
    update_table_map.target_id = target.id
    console.log(ruleRouters.updateTablemap.url.replace(":Id", ck_request.sink_id))
    request.put(ruleRouters.updateTablemap.url.replace(":Id", ck_request.sink_id))
        .set("authorization", spiderMan.authorization)
        .send(update_table_map)
        .expect(200)
        .end((err, res) => {
            console.log(err)
            if (err) return done(err);
            let result = getResponseData(res.text)
            console.log(res.text)
            target.id = result.id
            console.log(ruleRouters.createRuleTarget.url.replace(":ruleId", ck_rule.id))
            done();
        });
})


it("list rule target", (done) => {
    request.get(ruleRouters.createRuleTarget.url.replace(":ruleId", ck_rule.id))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err, res) => {
            console.log(err)
            if (err) return done(err);
            let result = getResponseData(res.text)
            console.log(res.text)
            console.log(ruleRouters.createRuleTarget.url.replace(":ruleId", ck_rule.id))
            done();
        });
})



it("delete rule", (done) => {
    request.delete(ruleRouters.delete.url.replace(":id", ck_rule.id))
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