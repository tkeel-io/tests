import { request } from "../../src/init";
import { ironMan, keel } from "../data";
import * as device from "./device_data";
import * as group from "./group_data";

/**
 * 创建设备组1
 */
it("creat group", (done) => {
  console.log("create group ",group.createGroupInfo1)
  console.log("tenants token =", device.getTenantToken())
  request
    .post(`/apis/tkeel-device/v1/gropus`)
    .send(group.createGroupInfo1)
    .set("authorization",device.getTenantToken())
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ",JSON.stringify(result))
      let id = `${result.groupObject.properties.sysField._id}`;
      group.groupsInfo["group1Id"] = id;
      console.log("group1Id = ", group.groupsInfo.group1Id);
      done();
    });
});

