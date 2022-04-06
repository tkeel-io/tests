import { request } from "../../src/init";
import { spiderMan } from "../data";
import {subscribe, subscribeInfo} from "./subscribe_data";
import {subscribeRouters} from "./router_data";
import {getResponseData} from "../../src/utils"

let sedSubID

/**
 * 创建订阅
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
            subscribe.id = result.id;
            expect(result.endpoint).toBeDefined();
            subscribe.endpoint = result.endpoint;
            expect(result.title).toBe(subscribeInfo.creation.title);
            subscribe.title = result.title
            expect(result.description).toBe(subscribeInfo.creation.description);
            subscribe.description = result.description
            expect(result.is_default).toBeDefined();
            subscribe.is_default = result.is_default;
            done();
        });

    // 创建第二个供可删除使用的订阅
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
            sedSubID = result.id
            request.delete(subscribeRouters.delete.url.replace(":id", sedSubID))
                .set("authorization", spiderMan.authorization)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    let result = getResponseData(res.text)
                    sedSubID = result.id
                    expect(result.is_default).toBe(false);
                    done();
                });
        });
});

/**
 * 更新订阅
 */
it("update subscribe", (done) => {
    request.patch(subscribeRouters.update.url.replace(":id", subscribe.id))
        .send({
            title: subscribeInfo.updated.title,
            description: subscribeInfo.updated.description
        })
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.id).toBe(subscribe.id);
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
    request.get(subscribeRouters.get.url.replace(":id", subscribe.id))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err, res) => {
            let result = getResponseData(res.text)
            expect(result.id).toBe(subscribe.id);
            expect(result.endpoint).toBe(subscribe.endpoint);
            expect(result.title).toBe(subscribe.title);
            expect(result.description).toBe(subscribe.description);
            expect(result.is_default).toBe(subscribe.is_default);
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
            expect(parseInt(result.total)).toBeDefined();
            expect(parseInt(result.page_num)).toBe(subscribeInfo.listWithPagination.response.page_num);
            expect(parseInt(result.page_size)).toBe(subscribeInfo.listWithPagination.response.page_size);
            done();
        });
});



/**
 * 通过实体id增加订阅的实体
 */
it("add subscribe entities by entity ids", (done) => {
    request
        .post(subscribeRouters.subscribeByIDs.url.replace(":id", subscribe.id))
        .set("authorization", spiderMan.authorization)
        .send(subscribeInfo.subscribeByIDs.request)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.id).toBe(subscribe.id);
            expect(result.status).toBe(subscribeInfo.subscribeByIDs.response.status);
            done();
        });
});

/**
 * 通过实体组增加订阅的实体
 */
it("add subscribe entities by groups", (done) => {
    request.post(subscribeRouters.subscribeByGroup.url.replace(":id", subscribe.id))
        .set("authorization", spiderMan.authorization)
        .send(subscribeInfo.subscribeByGroup.request)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.id).toBe(subscribe.id);
            expect(result.status).toBe(subscribeInfo.subscribeByGroup.response.status);
            done();
        });
});

/**
 * 通过模型增加订阅的实体
 */
it("add subscribe entities by models", (done) => {
    request.post(subscribeRouters.subscribeByModels.url.replace(":id", subscribe.id))
        .set("authorization", spiderMan.authorization)
        .send(subscribeInfo.subscribeByModel.request)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.id).toBe(subscribe.id);
            expect(result.status).toBe(subscribeInfo.subscribeByModel.response.status);
            done();
        });
});

/**
 * 通过实体 id 删除订阅的实体
 */
it("delete subscribe entities by entity ids", (done) => {
    console.log("add subscribe entities by entity ids");
    request.post(subscribeRouters.unsubscribeEntities.url.replace(":id", subscribe.id))
        .set("authorization", spiderMan.authorization)
        .send(subscribeInfo.unsubscribeByIDs.request)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.id).toBe(subscribe.id);
            expect(result.status).toBe(subscribeInfo.unsubscribeByIDs.response.status);
            done();
        });
});

/**
 * 设备直接订阅
 */
it("subscribe by devices", (done) => {
    request.post(subscribeRouters.subscribeByDevices.url.replace(":id", subscribeInfo.SubscribeByDevice.request.id))
        .set("authorization", spiderMan.authorization)
        .send({subscribe_ids: subscribeInfo.subscribeByDevices.request})
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.status).toBe(subscribeInfo.subscribeByDevices.response.status);
            done();
        });
});

/**
 * 获取订阅的实体列表
 */
it("get subscribe entity list", (done) => {
    request.post(subscribeRouters.listSubscribeEntities.url.replace(":id", subscribe.id))
        .set("authorization", spiderMan.authorization)
        .send({
            page_num: 1,
            page_size:10
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
 * 移动订阅
 */
it("change subscribe", (done) => {
    subscribeInfo.changeSubscribe.request.target_id = sedSubID
    request.put(subscribeRouters.changeSubscribe.url.replace(":id", subscribe.id))
        .set("authorization", spiderMan.authorization)
        .send(subscribeInfo.changeSubscribe.request)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.status).toBe(subscribeInfo.changeSubscribe.response.status);
            done();
        });
});

/**
 * 删除订阅endpoint
 */
it("delete subscribe", (done) => {
    request.delete(subscribeRouters.delete.url.replace(":id", subscribe.id))
        .set("authorization", spiderMan.authorization)
        .expect(500)
        .end((err, res) => {
            if (err) return done(err);
            let result = JSON.parse(res.text);
            expect(result.msg).toBe("默认订阅无法被修改");
            done();
        });

    // 删除第二个可删除的订阅
    request.delete(subscribeRouters.delete.url.replace(":id", sedSubID))
        .set("authorization", spiderMan.authorization)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            let result = getResponseData(res.text)
            expect(result.id).toBe(sedSubID);
            done();
        });
});
