import {request} from "../../src/init";
import {ironMan, spiderMan} from "../data";
import {getResponseData} from "../../src/utils";
import {ruleRouters} from "./router_data";
import {data, rule, target} from "./data";

it("register plugin", (done) => {
    request.get("/apis/rudder/v1/tm/plugins/register?id=rule-manager")
        .set("Authorization", ironMan.authorization)
        .expect(200)
        .end((err, res) => {
            if (err) {
                done(err);
            } else {
                const data = getResponseData(res);
                expect(data).toBeTruthy();
                done();
            }
        });
});

it("plugin enable", (done) => {
    request.post(`/apis/rudder/v1/plugins/${spiderMan.id}/tenants`)
        .set("authorization", spiderMan.authorization)
        .send()
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
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
        })
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.name).toBeDefined();
            expect(result.name).toEqual(rule.name);
            expect(result.desc).toBeDefined();
            expect(result.name).toEqual(rule.desc);
            expect(result.type).toBeDefined();
            rule.type = result.type
            expect(result.id).toBeDefined();
            rule.id = result.id;
            expect(result.createdAt).toBeDefined();
            rule.createdAt = result.createdAt;
            expect(result.updatedAt).toBeDefined();
            rule.updatedAt = result.updatedAt;
            done();
        });
});

it("update rule", (done) => {
    request.put(ruleRouters.update.url.replace(":id", rule.id))
        .set("authorization", spiderMan.authorization)
        .send(data.updateRuleInfo.request)
        .expect(200)
        .end((res,err) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
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
            expect(result.createdAt).toBeDefined();
            rule.createdAt = result.createdAt;
            expect(result.updatedAt).toBeDefined();
            rule.updatedAt = result.updatedAt;
            done();
        })
})

it("list rule", (done) => {
    request.get(pagination(ruleRouters["list/query"].url))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.total).toBeDefined();
            expect(result.data).toBeDefined();
            done();
        });
});

it("get rule", (done) => {
    request.get(ruleRouters.get.url.replace(":id", rule.id))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.name).toBeDefined();
            expect(result.name).toEqual(rule.name);
            expect(result.desc).toBeDefined();
            expect(result.name).toEqual(rule.desc);
            expect(result.type).toBeDefined();
            rule.type = result.type
            expect(result.id).toBeDefined();
            rule.id = result.id;
            expect(result.createdAt).toBeDefined();
            rule.createdAt = result.createdAt;
            expect(result.updatedAt).toBeDefined();
            rule.updatedAt = result.updatedAt;
            done();
        });
});

it("ruleStatusSwitch", (done) => {
    request.put(ruleRouters.ruleStatusSwitch.url.replace(":id", rule.id))
        .set("authorization", spiderMan.authorization)
        .send({
            status: 1
        })
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.status).toBeDefined();
            expect(result.status).toEqual(1);
            rule.status = 1
            done();
        });
});

it("delete rule", (done) => {
    request.delete(ruleRouters.delete.url.replace(":id", rule.id))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.name).toBeDefined();
            expect(result.name).toEqual(rule.name);
            expect(result.desc).toBeDefined();
            expect(result.name).toEqual(rule.desc);
            expect(result.type).toBeDefined();
            rule.type = result.type
            expect(result.id).toBeDefined();
            rule.id = result.id;
            expect(result.createdAt).toBeDefined();
            rule.createdAt = result.createdAt;
            expect(result.updatedAt).toBeDefined();
            rule.updatedAt = result.updatedAt;
            done();
        });
});

it("add devices to rule", (done)=> {
    request.post(ruleRouters.addDevicesToRule.url.replace(":ruleId", rule.id))
        .set("authorization", spiderMan.authorization)
        .send(data.addDevicesToRule.request)
        .expect(200)
        .end((req, err) => {
            if (err) return done(err);
        })
})

it("list rule devices", (done) => {
    request.get(pagination(ruleRouters.ruleDevicesList.url.replace(":ruleId", rule.id)))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.total).toBeDefined();
            expect(result.data).toBeDefined();
            done();
        });
})

it("removeDevicesFromRule", (done) => {
    request.delete(ruleRouters.removeDevicesFromRule.url.replace(":ruleId", rule.id))
        .set("authorization", spiderMan.authorization)
        .send(data.removeDevicesFromRule.request)
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
        });
})

it(" create rule target", (done) => {
    request.post(ruleRouters.createRuleTarget.url.replace(":ruleId", rule.id))
        .set("authorization", spiderMan.authorization)
        .send(data.createRuleTarget.request)
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.id).toBeDefined();
            target.id = result.id;
            expect(result.type).toBeDefined();
            target.type = result.type;
            expect(result.host).toBeDefined();
            target.host = result.host;
            expect(result.value).toBeDefined();
            target.value = result.value;
            expect(result.ext).toBeDefined();
            target.ext = result.ext;
            done();
        });
})

it("update rule target", (done) => {
    request.put(ruleRouters.updateRuleTarget.url.replace(":ruleId", rule.id).replace(":targetId", target.id))
        .set("authorization", spiderMan.authorization)
        .send(data.updateRuleTarget.request)
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.id).toBeDefined();
            target.id = result.id;
            expect(result.type).toBeDefined();
            target.type = result.type;
            expect(result.host).toBeDefined();
            target.host = result.host;
            expect(result.value).toBeDefined();
            target.value = result.value;
            expect(result.ext).toBeDefined();
            target.ext = result.ext;
            done();
        });
})

it("testConnectionToKafka", (done) => {
    request.get(ruleRouters.testConnectionToKafka.url.replace(":ruleId", rule.id))
        .set("authorization", spiderMan.authorization)
        .send(data.testConnectionToKafka.request)
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
        });
})

it("list rule target", (done)=> {
    request.get(pagination(ruleRouters.ListRuleTarget.url.replace(":ruleId", rule.id)))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.total).toBeDefined();
            expect(result.data).toBeDefined();
            done();
        });
})

it("delete rule target", (done) => {
    request.delete(ruleRouters.deleteRuleTarget.url.replace(":ruleId", rule.id).replace(":targetId", target.id))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
        });
})

it("err subscribe", (done) => {
    request.post(ruleRouters.errSubscribe.url.replace(":ruleId", rule.id))
        .set("authorization", spiderMan.authorization)
        .send(data.errSubscribe.request)
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
        });
})

it("change err subscribe", (done) => {
    request.put(ruleRouters.changeErrSubscribe.url.replace(":ruleId", rule.id))
        .set("authorization", spiderMan.authorization)
        .send(data.changeErrSubscribe.request)
        .expect(200)
        .end((res, err) => {
            if (err) return done(err);
            done();
        });
})

it("err unsubscribe", (done) => {
    request.delete(ruleRouters.errUnsubscribe.url.replace(":ruleId", rule.id))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((res, err) => {
            if (err) return done(err)
            done();
        })
})

function pagination(url:string) :string {
    return `${url}?page_num=1&page_size=20`;
}
