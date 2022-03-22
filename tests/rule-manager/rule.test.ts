import {request} from "../../src/init";
import {spiderMan} from "../data";
import {getResponseData} from "../../src/utils";
import {ruleRouters} from "./router_data";
import {rule} from "./data";

/**
 * 创建订阅 endpoint
 */
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
            expect(result.type).toEqual(rule.type);
            expect(result.id).toBeDefined();
            rule.id = result.id;
            expect(result.createdAt).toBeDefined();
            rule.createdAt = result.createdAt;
            expect(result.updatedAt).toBeDefined();
            rule.updatedAt = result.updatedAt;

            done();
        });
});
