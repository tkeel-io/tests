import { request } from "../../src/init";
import { ironMan, keel } from "../data";
import { baseURL, subscribeInfo, tenantInfo } from "./subscribe_data";
//const st = require("supertest");
//export const request = st(baseURL);


/**
 * 租户登录平台
 */
it("login", (done) => {
    console.log(
        "login:",
        `/apis/security/v1/oauth/${tenantInfo.tenant_id}/token?grant_type=password&username=admin&password=123456`
    );
    request
        .get(
            `/apis/security/v1/oauth/${tenantInfo.tenant_id}/token?grant_type=password&username=admin&password=123456`
        )
        .expect(200)
        .then((res: any) => {
            console.log("login return ");
            let result = JSON.parse(res.text).data;
            let authorization = `${result.token_type} ${result.access_token}`;
            tenantInfo["tenantAuthorization"] = authorization;
            ironMan["tenantAuthorization"] = authorization;
            console.log("get tenants token ", authorization);
            done();
        });
});



/**
 * 创建订阅endpoint
 */
it("create subscribe", (done) => {
    console.log("create subscribe");
    console.log(ironMan.tenantAuthorization)
    request
        .post("/apis/core-broker/v1/subscribe")
        .send({
            name: "sub-abc",
            description: "test sub"
        })
        .set("authorization", ironMan.tenantAuthorization)
        .expect(200)
        .then((res) => {
            let result = JSON.parse(res.text)
            console.log(result)
            let subscribe_id = `${result.data.id}`
            console.log(subscribe_id)
            subscribeInfo.subscribe_id = subscribe_id
            done();
        });
});

/**
 * 更新订阅endpoint
 */
it("update subscribe", (done) => {
    console.log("update subscribe");
    console.log("sub id:", `${subscribeInfo.subscribe_id}`)
    request
        .put(`/apis/core-broker/v1/subscribe/${subscribeInfo.subscribe_id}`)
        .send({
            name: "update test",
            description: "update test description"
        })
        .set("authorization", ironMan.tenantAuthorization)
        .expect(200)
        .then((res) => {
            let result = JSON.parse(res.text)
            console.log(result)
            done();
        });
});

/**
 * 删除订阅endpoint
 */
it("delete subscribe", (done) => {
    console.log("delete subscribe");
    console.log("sub id:", `${subscribeInfo.subscribe_id}`)
    request
        .delete(`/apis/core-broker/v1/subscribe/${subscribeInfo.subscribe_id}`)
        .set("authorization", ironMan.tenantAuthorization)
        .expect(200)
        .then((res) => {
            let result = JSON.parse(res.text)
            console.log(result)
            done();
        });
});

/**
 * 获取订阅endpoint信息
 */
it("get subscribe", (done) => {
    console.log("get subscribe");
    console.log("sub id:", `${subscribeInfo.subscribe_id}`)
    request
        .get(`/apis/core-broker/v1/subscribe/${subscribeInfo.subscribe_id}`)
        .set("authorization", ironMan.tenantAuthorization)
        .expect(200)
        .then((res) => {
            let result = JSON.parse(res.text)
            console.log(result)
            done();
        });
});

/**
 * 获取订阅endpoint列表
 */
it("get subscribe", (done) => {
    console.log("get subscribe");
    request
        .post(`/apis/core-broker/v1/subscribe/list`)
        .send({
            page: {
                limit: 10,
                offset: 1,
            }
        })
        .set("authorization", ironMan.tenantAuthorization)
        .expect(200)
        .then((res) => {
            let result = JSON.parse(res.text)
            console.log(result)
            done();
        });
});



/**
 * 通过实体id增加订阅的实体
 */
it("add subscribe entities by entity ids", (done) => {
    console.log("add subscribe entities by entity ids");
    request
        .post(`/apis/core-broker/v1/subscribe/${subscribeInfo.subscribe_id}/entities`)
        .send({
            entities: ["iotd-1", "iotd-2"]
        })
        .set("authorization", ironMan.tenantAuthorization)
        .expect(200)
        .then((res) => {
            let result = JSON.parse(res.text)
            console.log(result)
            done();
        });
});

/**
 * 通过实体组增加订阅的实体
 */
it("add subscribe entities by groups", (done) => {
    console.log("add subscribe entities by groups");
    request
        .post(`/apis/core-broker/v1/subscribe/${subscribeInfo.subscribe_id}/groups`)
        .send({
            groups: ["group-1", "group-2"]
        })
        .set("authorization", ironMan.tenantAuthorization)
        .expect(200)
        .then((res) => {
            let result = JSON.parse(res.text)
            console.log(result)
            done();
        });
});

/**
 * 通过模型增加订阅的实体
 */
it("add subscribe entities by models", (done) => {
    console.log("add subscribe entities by models");
    request
        .post(`/apis/core-broker/v1/subscribe/${subscribeInfo.subscribe_id}/models`)
        .send({
            models: ["model-1", "model-2"]
        })
        .set("authorization", ironMan.tenantAuthorization)
        .expect(200)
        .then((res) => {
            let result = JSON.parse(res.text)
            console.log(result)
            done();
        });
});

/**
 * 通过实体id删除订阅的实体
 */
it("delete subscribe entities by entity ids", (done) => {
    console.log("add subscribe entities by entity ids");
    request
        .post(`/apis/core-broker/v1/subscribe/${subscribeInfo.subscribe_id}/entities/delete`)
        .send({
            entities: ["iotd-1", "iotd-2"]
        })
        .set("authorization", ironMan.tenantAuthorization)
        .expect(200)
        .then((res) => {
            let result = JSON.parse(res.text)
            console.log(result)
            done();
        });
});

/**
 * 获取订阅的实体列表
 */
it("get subscribe entity list", (done) => {
    console.log("get subscribe entity list");
    request
        .post(`/apis/core-broker/v1/subscribe/${subscribeInfo.subscribe_id}/entities/list`)
        .send({
            page: {
                limit: 10,
                offset: 0,
            }
        })
        .set("authorization", ironMan.tenantAuthorization)
        .expect(200)
        .then((res) => {
            let result = JSON.parse(res.text)
            console.log(result)
            done();
        });
});