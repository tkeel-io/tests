import {request} from "../../src/init";
import {subscribeRouters} from "./router_data";
import {spiderMan} from "../data";
import {getResponseData} from "../../src/utils";
import {subscribe, subscribeInfo} from "./subscribe_data";

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
});



