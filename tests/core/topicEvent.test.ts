import {ironMan} from "../data";
import {topicRouter} from "./router_data";
import {request} from "../../src/init";
import {topicEvent_data} from "./topicEvent_data";

export const topicEventTest = "test for topic event";

it("topicEventHandler", (done) => {
    request.post(topicRouter.topicEvent.url)
        .send(topicEvent_data.postTopicEvent.request)
        .set("Content-Type", "application/json")
        .set("authorization", ironMan.authorization)
        .expect(200)
        .end((err, res) => {
            if (err) {
                done(err);
                return;
            }
            let body = JSON.parse(res.text)
            expect(body.status).toBe(topicEvent_data.postTopicEvent.should_be.status);
            done();
        });
});
