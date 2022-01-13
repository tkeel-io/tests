import { request } from "../../src/init";
import { keel } from "../data";

it.each(keel.password)("password login", (password, done: any) => {
  request
    .get(`/apis/rudder/v1/oauth2/admin?password=${password}`)
    .expect(200, done);
});
