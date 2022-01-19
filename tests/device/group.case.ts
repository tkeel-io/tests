import { request } from "../../src/init";
import { ironMan, keel } from "../data";
import * as device from "./device_data";
import * as group from "./group_data";


export const groupCase = 'this is groupCase'

/**
 * 创建设备组1
 */
it("creat group", (done) => {
  console.log("tenants token =", device.getTenantToken())
  request
    .post(`/apis/tkeel-device/v1/groups`)
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


/**
 * 更新设备组1
 */
test("update group", (done) => {
  console.log("update group =", group.groupsInfo.group1Id)
  request
    .put(`/apis/tkeel-device/v1/groups/${group.groupsInfo.group1Id}`)
    .send(group.updateGroupInfo)
    .set("authorization",device.getTenantToken())
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ",JSON.stringify(result))
      done();
    });
});

/**
 * 获取设备组1
 */
test("get group", (done) => {
  console.log("get group")
  request
    .get(`/apis/tkeel-device/v1/groups/${group.groupsInfo.group1Id}`)
    .set("authorization",device.getTenantToken())
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ",JSON.stringify(result))
      done();
    });
});


/**
 * 创建设备组2
 */
test("creat group", (done) => {
  console.log("create group 2")
  request
    .post(`/apis/tkeel-device/v1/groups`)
    .send(group.createGroupInfo2)
    .set("authorization",device.getTenantToken())
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ",JSON.stringify(result))
      let groupId = `${result.groupObject.properties.sysField._id}`;
      group.groupsInfo["group2Id"] = groupId;
      console.log("group2Id = ", group.groupsInfo.group2Id);
      done();
    });
});

/**
 * 创建设备3
 */
test("creat group", (done) => {
  console.log("create group 3")
  request
    .post(`/apis/tkeel-device/v1/groups`)
    .send(group.createGroupInfo3)
    .set("authorization",device.getTenantToken())
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ",JSON.stringify(result))
      let groupId = `${result.groupObject.properties.sysField._id}`;
      group.groupsInfo["group3Id"] = groupId;
      console.log("group3Id = ", group.groupsInfo.group3Id);
      done();
    });
});

/**
 * 获取设备组列表
 */
test("get group list", (done) => {
  console.log("get group list",group.getGroupListInfo)
  request
    .post(`/apis/tkeel-device/v1/groups/search`)
    .send(group.getGroupListInfo)
    .set("authorization",device.getTenantToken())
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ",JSON.stringify(result))
      done();
    });
});

/**
 * 删除设备组
 */
test("del group", (done) => {
  console.log("getDelgroupInfo", group.getDelGroupInfo())
  request
    .post(`/apis/tkeel-device/v1/groups/delete`)
    .send(group.getDelGroupInfo())
    .set("authorization",device.getTenantToken())
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ",JSON.stringify(result))
      done();
    });
}); 

/**
 * 添加设备组扩展配置信息
 */
test("add group ext", (done) => {
  console.log("add group ext", group.addGroupExtInfo)
  request
    .post(`/apis/tkeel-device/v1/groups/${group.groupsInfo.group1Id}/ext`)
    .send(group.addGroupExtInfo)
    .set("authorization",device.getTenantToken())
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ",JSON.stringify(result))
      done();
    });
});

/**
 * 更新设备组扩展配置信息
 */
test("update group ext", (done) => {
  console.log("update group ext", group.updateGroupExtInfo)
  request
    .put(`/apis/tkeel-device/v1/groups/${group.groupsInfo.dev1Id}/ext`)
    .send(group.updateGroupExtInfo)
    .set("authorization",device.getTenantToken())
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ",JSON.stringify(result))
      done();
    });
});

/**
 * 删除设备组扩展配置信息
 */
test("del group ext", (done) => {
  console.log("del group ext", group.deleteGroupExtInfo)
  request
    .post(`/apis/tkeel-device/v1/groups/${group.groupsInfo.group1Id}/ext/delete`)
    .send(group.deleteGroupExtInfo)
    .set("authorization",device.getTenantToken())
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ",JSON.stringify(result))
      done();
    });
});
