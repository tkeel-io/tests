import {ironMan} from "../data";
import {subscriptionRouter} from "./router_data";
import {request} from "../../src/init";
import {subscriptionData, implicateID} from "./subscription_data";
import * as assert from "assert";

export const subscriptionTest = "test for core subscription";

const _nonce_url = "http://localhost"

/**
 * Create Subscription
 */
it("createSubscription", (done) => {
    let url = new URL(_nonce_url);
    url.pathname = subscriptionRouter.create.url
    url.searchParams.append("id", subscriptionData.create.parameters.id)
    url.searchParams.append("source", subscriptionData.create.parameters.source)
    url.searchParams.append("owner", subscriptionData.create.parameters.owner)
    let u = url.toString().replace(_nonce_url, "")
    request.post(u)
        .set("Content-Type", "application/json")
        .set("authorization", ironMan.authorization)
        .send(subscriptionData.create.request)
        .expect(200)
        .end((err, res) => {
            if (err) {
                console.log(res.text)
                done(err);
                return;
            }
            let body = JSON.parse(res.text);
            expect(body.id).toBe(subscriptionData.create.should_be.id);
            expect(body.source).toBe(subscriptionData.create.should_be.source);
            expect(body.owner).toBe(subscriptionData.create.should_be.owner);
            assert.equal(body.subscription, subscriptionData.create.should_be.subscription);
            subscriptionData.id = body.id;
            done();
        });
})

/**
 * Get Subscription
 */
it("getSubscription",  (done) => {
    let url = new URL(_nonce_url);
    url.pathname = subscriptionRouter.get.url
    url.searchParams.append("source", subscriptionData.get.parameters.source)
    url.searchParams.append("owner", subscriptionData.get.parameters.owner)
    let u = implicateID(url.toString().replace(_nonce_url, ""))
    request.get(u)
        .set("Content-Type", "application/json")
        .set("authorization", ironMan.authorization)
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) {
                done(err);
                return;
            }
            let body = JSON.parse(res.text)
            expect(body.id).toBe(subscriptionData.get.should_be.id);
            expect(body.owner).toBe(subscriptionData.get.should_be.owner);
            expect(body.source).toBe(subscriptionData.get.should_be.source);
            assert.equal(body.subscription, subscriptionData.get.should_be.subscription);
            done();
        });
});

/**
 * Update Subscription
 */
it("updateSubscription", (done) => {
    let url = new URL(_nonce_url);
    url.pathname = subscriptionRouter.update.url
    url.searchParams.append("source", subscriptionData.update.parameters.source)
    url.searchParams.append("owner", subscriptionData.update.parameters.owner)
    let u = implicateID(url.toString().replace(_nonce_url, ""))
    request.put(u)
        .set("Content-Type", "application/json")
        .set("authorization", ironMan.authorization)
        .send(subscriptionData.update.request)
        .expect(200)
        .end((err, res) => {
            if (err) {
                done(err);
                return;
            }
            let body = JSON.parse(res.text);
            expect(body.id).toBe(subscriptionData.update.should_be.id);
            expect(body.source).toBe(subscriptionData.update.should_be.source);
            expect(body.owner).toBe(subscriptionData.update.should_be.owner);
            done();
        });
})

/**
 * List Subscription
 */
it("listSubscription", (done) => {
    let url = new URL(_nonce_url);
    url.pathname = subscriptionRouter.list.url
    url.searchParams.append("source", subscriptionData.list.parameters.source)
    url.searchParams.append("owner", subscriptionData.list.parameters.owner)
    let u = url.toString().replace(_nonce_url, "")
    request.get(u)
        .set("Content-Type", "application/json")
        .set("authorization", ironMan.authorization)
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) {
                console.log(res.text)
                done(err);
                return;
            }
            let body = JSON.parse(res.text);
            expect(body.count).toBe(subscriptionData.list.should_be.count);
            expect(body.items.length).toBe(subscriptionData.list.should_be.count);
            expect(body.items[0].id).toBe(subscriptionData.list.should_be.items[0].id);
            expect(body.items[0].owner).toBe(subscriptionData.list.should_be.items[0].owner);
            expect(body.items[0].source).toBe(subscriptionData.list.should_be.items[0].source);
            expect(body.items[0].subscription.topic).toBe(subscriptionData.list.should_be.items[0].subscription.topic);
            expect(body.items[0].subscription.source).toBe(subscriptionData.list.should_be.items[0].subscription.source);
            expect(body.items[0].subscription.pubsub_name).toBe(subscriptionData.list.should_be.items[0].subscription.pubsub_name);
            done();
        });
})

/**
 * Delete Subscription
 */
it("deleteSubscription", (done) => {
    let url = new URL(_nonce_url);
    url.pathname = subscriptionRouter.delete.url
    url.searchParams.append("source", subscriptionData.delete.parameters.source)
    url.searchParams.append("owner", subscriptionData.delete.parameters.owner)
    let u = implicateID(url.toString().replace(_nonce_url, ""))
    request.delete(u)
        .set("Content-Type", "application/json")
        .set("authorization", ironMan.authorization)
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) {
                done(err);
                return;
            }
            let body = JSON.parse(res.text)
            expect(body.id).toBe(subscriptionData.delete.should_be.id);
            expect(body.status).toBe(subscriptionData.delete.should_be.status);
            done();
        });
});
