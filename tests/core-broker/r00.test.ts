import { baseURL, subscribeInfo } from "./subscribe_data";
const st = require("supertest");
export const request = st(baseURL);

/**
 * 创建订阅endpoint
 */
it("create subscribe", (done) => {
    console.log("create subscribe");
    request
        .post("/v1/subscribe")
        .send({
            name: "sub-abc",
            description: "test sub"
        })
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
        .put(`/v1/subscribe/${subscribeInfo.subscribe_id}`)
        .send({
            name: "update test",
            description: "update test description"
        })
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
        .delete(`/v1/subscribe/${subscribeInfo.subscribe_id}`)
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
        .get(`/v1/subscribe/${subscribeInfo.subscribe_id}`)
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
        .post(`/v1/subscribe/list`)
        .send({
            page: {
                limit: 10,
                offset: 1,
            }
        })
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
        .post(`/v1/subscribe/${subscribeInfo.subscribe_id}/entities`)
        .send({
            entities: ["iotd-1", "iotd-2"]
        })
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
        .post(`/v1/subscribe/${subscribeInfo.subscribe_id}/groups`)
        .send({
            groups: ["group-1", "group-2"]
        })
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
        .post(`/v1/subscribe/${subscribeInfo.subscribe_id}/models`)
        .send({
            models: ["model-1", "model-2"]
        })
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
        .post(`/v1/subscribe/${subscribeInfo.subscribe_id}/entities/delete`)
        .send({
            entities: ["iotd-1", "iotd-2"]
        })
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
        .post(`/v1/subscribe/${subscribeInfo.subscribe_id}/entities/list`)
        .send({
            page: {
                limit: 10,
                offset: 0,
            }
        })
        .expect(200)
        .then((res) => {
            let result = JSON.parse(res.text)
            console.log(result)
            done();
        });
});