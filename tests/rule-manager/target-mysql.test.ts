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
 * verfy target mysql
 */
it("verify mysql", (done) => {
    request
        .post(`/apis/rule-manager/v1/verify/mysql`)
        .set("authorization", spiderMan.authorization)
        .send({
            urls: "10.10.28.2:3306",
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
            console.log(sink);
            mysql_request.sink_id = `${result.id}`
            done();
        });
});

/**
 * verfy target mysql failed
 */
it("verify mysql failed", (done) => {
    request
        .post(`/apis/rule-manager/v1/verify/mysql`)
        .set("authorization", spiderMan.authorization)
        .send({
            urls: "10.96.166.237:3306",
            meta: {
                user: "root1",
                password: "a3fks=ixmeb82a",
                db_name: "testverify"
            }
        })
        .expect(200)
        .then((res: any) => {
            console.log("verify mysql failed return ");
            let result = JSON.parse(res.text);
            console.log(result);
            done();
        });
});



/**
 * mysql table list
 */
it("mysql table list", (done) => {
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
 * mysql  map
 */
it("mysql map", (done) => {
    request
        .get(`/apis/rule-manager/v1/sink/:id/maps?table_name=:table_name`.replace(":id", sink.id).replace(":table_name", "lz_rule1"))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .then((res: any) => {
            console.log("mysql map ");
            let result = JSON.parse(res.text).data;
            console.log(result)
            done();
        });
});

/**
 * mysql  map error
 */
it("mysql map", (done) => {
    request
        .get(`/apis/rule-manager/v1/sink/:id/maps?table_name=:table_name`.replace(":id", sink.id).replace(":table_name", "lz_rul1"))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .then((res: any) => {
            console.log("mysql map error ");
            let result = JSON.parse(res.text).data;
            console.log(result)
            done();
        });
});

export const mysql_rule = {
    name: "mysql-rule",
    desc: "testmysql",
    type: 2,
    id: "",
    status: 0,
    createdAt: 0,
    updatedAt: 0,
    model_id: "iotd-1c6384c3-d11e-40d9-aeca-5c7371d23ceb",
    model_name: "lz-m1"
}
/**
 * create_mysql rule
 */
it("create rule", (done) => {
    request.post(ruleRouters.create.url)
        .set("authorization", spiderMan.authorization)
        .send({
            name: mysql_rule.name,
            desc: mysql_rule.desc,
            type: mysql_rule.type,
            model_id: mysql_rule.model_id,
            model_name: mysql_rule.model_name
        })
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            console.log(result)
            expect(result.name).toBeDefined();
            expect(result.name).toEqual(mysql_rule.name);
            expect(result.desc).toBeDefined();
            expect(result.desc).toEqual(mysql_rule.desc);
            expect(result.type).toBeDefined();
            mysql_rule.type = result.type
            expect(result.id).toBeDefined();
            mysql_rule.id = result.id;
            done();
        });
});

export const mysql_request = {
    sink_type: "mysql",
    sink_id: "id",
    table_name: "lz_rule1",
    fields: [{ t_field: { name: "abcd", type: "float" }, m_field: { name: "abc", type: "float" } }]
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
    request.post(ruleRouters.createRuleTarget.url.replace(":ruleId", mysql_rule.id))
        .set("authorization", spiderMan.authorization)
        .send(mysql_request)
        .expect(200)
        .end((err, res) => {
            console.log(err)
            if (err) return done(err);
            let result = getResponseData(res.text)
            console.log(result)
            target.id = result.id
            console.log(ruleRouters.createRuleTarget.url.replace(":ruleId", mysql_rule.id))
            done();
        });
})

/**
 * update mysql rule target map
 */
export const update_table_map = {
    target_id: "",
    table_name: "lz_rule1",
    fields: [{ t_field: { name: "abcd", type: "float" }, m_field: { name: "abc", type: "float" } }]
}


it("update mysql rule target map", (done) => {
    update_table_map.target_id = target.id
    request.put(ruleRouters.updateTablemap.url.replace(":Id", mysql_request.sink_id))
        .set("authorization", spiderMan.authorization)
        .send(update_table_map)
        .expect(200)
        .end((err, res) => {
            console.log(err)
            if (err) return done(err);
            let result = getResponseData(res.text)
            console.log(res.text)
            console.log(ruleRouters.updateTablemap.url.replace(":Id", mysql_request.sink_id))
            done();
        });
})

it("list rule target", (done) => {
    request.get(ruleRouters.createRuleTarget.url.replace(":ruleId", mysql_rule.id))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err, res) => {
            console.log(err)
            if (err) return done(err);
            let result = getResponseData(res.text)
            console.log(result)
            console.log(ruleRouters.createRuleTarget.url.replace(":ruleId", mysql_rule.id))
            done();
        });
})

it("delete rule target", (done) => {
    console.log(ruleRouters.deleteRuleTarget.url.replace(":ruleId", mysql_rule.id).replace(":targetId", target.id))
    request.delete(ruleRouters.deleteRuleTarget.url.replace(":ruleId", mysql_rule.id).replace(":targetId", target.id))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            console.log(result)
            done();
        });
})

it("list rule target", (done) => {
    request.get(ruleRouters.createRuleTarget.url.replace(":ruleId", mysql_rule.id))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err, res) => {
            console.log(err)
            if (err) return done(err);
            let result = getResponseData(res.text)
            console.log(result)
            console.log(ruleRouters.createRuleTarget.url.replace(":ruleId", mysql_rule.id))
            done();
        });
})


it("delete rule", (done) => {
    request.delete(ruleRouters.delete.url.replace(":id", mysql_rule.id))
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