import { request } from "../../src/init";
import { spiderMan } from "../data";
import {subscribe, subscribeInfo} from "./subscribe_data";
import {subscribeRouters} from "./router_data";
import {getResponseData} from "../../src/utils"

/**
 * 创建订阅 endpoint
 */
it("create subscribe", (done) => {
    request.post(subscribeRouters.create.url)
        .set("authorization", spiderMan.authorization)
        .send({
            title: subscribeInfo.creation.title,
            description: subscribeInfo.creation.description
        })
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.id).toBeDefined();
            subscribe.ID = result.id;
            expect(result.endpoint).toBeDefined();
            subscribe.endpoint = result.endpoint;
            expect(result.title).toBe(subscribeInfo.creation.title);
            subscribe.title = result.title
            expect(result.description).toBe(subscribeInfo.creation.description);
            subscribe.description = result.description
            done();
        });
});

/**
 * 更新订阅endpoint
 */
it("update subscribe", (done) => {
    request.patch(subscribeRouters.update.url.replace(":id", subscribe.ID))
        .send({
            title: subscribeInfo.updated.title,
            description: subscribeInfo.updated.description
        })
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.id).toBe(subscribe.ID);
            expect(result.endpoint).toBe(subscribe.endpoint);
            expect(result.title).toBe(subscribeInfo.updated.title);
            subscribe.title = result.title
            expect(result.description).toBe(subscribeInfo.updated.description);
            subscribe.description = result.description
            done();
        });
});

/**
 * 获取订阅endpoint信息
 */
it("get subscribe", (done) => {
    request.get(subscribeRouters.get.url.replace(":id", subscribe.ID))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err, res) => {
            let result = getResponseData(res.text)
            expect(result.id).toBe(subscribe.ID);
            expect(result.endpoint).toBe(subscribe.endpoint);
            expect(result.title).toBe(subscribe.title);
            expect(result.description).toBe(subscribe.description);
            done();
        });
});

/**
 * 获取订阅endpoint列表
 */
it("get subscribe list", (done) => {
    request.post(subscribeRouters.list.url)
        .set("authorization", spiderMan.authorization)
        .send(subscribeInfo.listWithPagination.page)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(parseInt(result.total)).toBe(subscribeInfo.listWithPagination.response.total);
            expect(parseInt(result.page_num)).toBe(subscribeInfo.listWithPagination.response.page_num);
            expect(parseInt(result.page_size)).toBe(subscribeInfo.listWithPagination.response.page_size);
            expect(parseInt(result.last_page)).toBe(subscribeInfo.listWithPagination.response.last_page);
            expect(result.data).toBe(subscribeInfo.listWithPagination.response.data);
            done();
        });
});



/**
 * 通过实体id增加订阅的实体
 */
it("add subscribe entities by entity ids", (done) => {
    request
        .post(subscribeRouters.subscribeByIDs.url.replace(":id", subscribe.ID))
        .set("authorization", spiderMan.authorization)
        .send(subscribeInfo.subscribeByIDs.request)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.id).toBe(subscribe.ID);
            expect(result.status).toBe(subscribeInfo.subscribeByIDs.response.status);
            done();
        });
});

/**
 * 通过实体组增加订阅的实体
 */
it("add subscribe entities by groups", (done) => {
    request.post(subscribeRouters.subscribeByGroup.url.replace(":id", subscribe.ID))
        .set("authorization", spiderMan.authorization)
        .send(subscribeInfo.subscribeByGroup.request)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.id).toBe(subscribe.ID);
            expect(result.status).toBe(subscribeInfo.subscribeByGroup.response.status);
            done();
        });
});

/**
 * 通过模型增加订阅的实体
 */
it("add subscribe entities by models", (done) => {
    request.post(subscribeRouters.subscribeByModels.url.replace(":id", subscribe.ID))
        .set("authorization", spiderMan.authorization)
        .send(subscribeInfo.subscribeByModel.request)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.id).toBe(subscribe.ID);
            expect(result.status).toBe(subscribeInfo.subscribeByModel.response.status);
            done();
        });
});

/**
 * 通过实体id删除订阅的实体
 */
it("delete subscribe entities by entity ids", (done) => {
    console.log("add subscribe entities by entity ids");
    request.post(subscribeRouters.unsubscribeEntities.url.replace(":id", subscribe.ID))
        .set("authorization", spiderMan.authorization)
        .send(subscribeInfo.unsubscribeByIDs.request)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.id).toBe(subscribe.ID);
            expect(result.status).toBe(subscribeInfo.unsubscribeByIDs.response.status);
            done();
        });
});

/**
 * 获取订阅的实体列表
 */
it("get subscribe entity list", (done) => {
    request.post(subscribeRouters.listSubscribeEntities.url.replace(":id", subscribe.ID))
        .set("authorization", spiderMan.authorization)
        .send({
            page_num: 0,
            page_size:0
        })
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.total).toBeDefined()
            expect(result.page_num).toBeDefined()
            expect(result.page_size).toBeDefined()
            expect(result.last_page).toBeDefined()
            expect(result.data).toBeDefined()
            done();
        });
});

/**
 * 删除订阅endpoint
 */
it("delete subscribe", (done) => {
    request.delete(subscribeRouters.delete.url.replace(":id", subscribe.ID))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.id).toBe(subscribe.ID);
            done();
        });
});
