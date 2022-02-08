import { request } from "../../src/init";
import { ironMan, keel } from "../data";
import * as device from "./device_data";

export const deviceCase = "this is deviceCase";

/** sleep function: wait for plugin to take effect*/
function sleep(numberMillis) {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime) return;
  }
}

/**
 * 创建租户
 */
it("creat tenants", (done) => {
  console.log("create tenants");
  console.log(ironMan.authorization);
  request
    .post(`/apis/security/v1/tenants`)
    .send({
      title: `test_tenant_${keel.repoName[0].slice(0, 4)}`,
      remark: "any word",
      admin: {
        username: "tanli",
        password: "123456",
      },
    })
    .set("authorization", ironMan.authorization)
    .expect(200)
    .then((res) => {
      console.log("login return ");
      let result = JSON.parse(res.text).data;
      let tenant_id = `${result.tenant_id}`;
      console.log("get tenant_id ", tenant_id);
      device.tenantInfo["tenant_id"] = tenant_id;
      done();
    });
});

/**
 * 租户登录平台
 */
it("login", (done) => {
  console.log(
    "login:",
    `/apis/security/v1/oauth/${device.tenantInfo.tenant_id}/token?grant_type=password&username=tanli&password=123456`
  );
  request
    .get(
      `/apis/security/v1/oauth/${device.tenantInfo.tenant_id}/token?grant_type=password&username=tanli&password=123456`
    )
    .expect(200)
    .then((res: any) => {
      console.log("login return ");
      let result = JSON.parse(res.text).data;
      let authorization = `${result.token_type} ${result.access_token}`;
      device.tenantInfo["tenantAuthorization"] = authorization;
      ironMan["tenantAuthorization"] = authorization;
      console.log("get tenants token ", authorization);
      done();
    });
});

/**
 * 启动插件
 */
test("start tkeel-device plugin", (done) => {
  console.log("start plugin");
  request
    .post(`/apis/rudder/v1/plugins/tkeel-device/tenants`)
    .send("Y2hhbmdlbWU=")
    .set("authorization", device.tenantInfo.tenantAuthorization)
    .expect(200, done);
});

/**
 * 创建设备1
 */
test("creat device", (done) => {
  console.log("create device");
  console.log("sleep 10s");
  sleep(10000);
  console.log("tenants token =", device.tenantInfo.tenantAuthorization);
  request
    .post(`/apis/tkeel-device/v1/devices`)
    .send(device.createDeviceInfo1)
    .set("authorization", device.tenantInfo.tenantAuthorization)
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ", JSON.stringify(result));
      let devToken = `${result.deviceObject.properties.sysField._token}`;
      let devId = `${result.deviceObject.properties.sysField._id}`;
      device.devicesInfo["dev1Token"] = devToken;
      device.devicesInfo["dev1Id"] = devId;
      console.log("dev1Token = ", device.devicesInfo.dev1Token);
      console.log("dev1Id = ", device.devicesInfo.dev1Id);
      done();
    });
});

/**
 * 更新设备
 */
test("update device", (done) => {
  console.log("update device");
  request
    .put(`/apis/tkeel-device/v1/devices/${device.devicesInfo.dev1Id}`)
    .send(device.updateDeviceInfo)
    .set("authorization", device.tenantInfo.tenantAuthorization)
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ", JSON.stringify(result));
      done();
    });
});

/**
 * 获取设备
 */
test("get device", (done) => {
  console.log("get device");
  request
    .get(`/apis/tkeel-device/v1/devices/${device.devicesInfo.dev1Id}`)
    .set("authorization", device.tenantInfo.tenantAuthorization)
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ", JSON.stringify(result));
      done();
    });
});

/**
 * 创建设备2
 */
test("creat device", (done) => {
  console.log("create device");
  request
    .post(`/apis/tkeel-device/v1/devices`)
    .send(device.createDeviceInfo2)
    .set("authorization", device.tenantInfo.tenantAuthorization)
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ", JSON.stringify(result));
      let devToken = `${result.deviceObject.properties.sysField._token}`;
      let devId = `${result.deviceObject.properties.sysField._id}`;
      device.devicesInfo["dev2Token"] = devToken;
      device.devicesInfo["dev2Id"] = devId;
      console.log("dev2Token = ", device.devicesInfo.dev1Token);
      console.log("dev2Id = ", device.devicesInfo.dev1Id);
      done();
    });
});

/**
 * 创建设备3
 */
test("creat device", (done) => {
  console.log("create device");
  request
    .post(`/apis/tkeel-device/v1/devices`)
    .send(device.createDeviceInfo3)
    .set("authorization", device.tenantInfo.tenantAuthorization)
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ", JSON.stringify(result));
      let devToken = `${result.deviceObject.properties.sysField._token}`;
      let devId = `${result.deviceObject.properties.sysField._id}`;
      device.devicesInfo["dev3Token"] = devToken;
      device.devicesInfo["dev3Id"] = devId;
      console.log("dev3Token = ", device.devicesInfo.dev1Token);
      console.log("dev3Id = ", device.devicesInfo.dev1Id);
      done();
    });
});

/**
 * 获取设备列表
 */
test("get device list", (done) => {
  console.log("get device list", device.getDeviceListInfo);
  request
    .post(`/apis/tkeel-device/v1/devices/search`)
    .send(device.getDeviceListInfo)
    .set("authorization", device.tenantInfo.tenantAuthorization)
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ", JSON.stringify(result));
      done();
    });
});

/**
 * 删除设备
 */
test("del device", (done) => {
  console.log("getDelDeviceInfo", device.getDelDeviceInfo());
  request
    .post(`/apis/tkeel-device/v1/devices/delete`)
    .send(device.getDelDeviceInfo())
    .set("authorization", device.tenantInfo.tenantAuthorization)
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ", JSON.stringify(result));
      done();
    });
});

/**
 * 添加设备扩展配置信息
 */
test("add device ext", (done) => {
  console.log("add device ext", device.addDeviceExtInfo);
  request
    .post(`/apis/tkeel-device/v1/devices/${device.devicesInfo.dev1Id}/ext`)
    .send(device.addDeviceExtInfo)
    .set("authorization", device.tenantInfo.tenantAuthorization)
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ", JSON.stringify(result));
      done();
    });
});

/**
 * 更新设备扩展配置信息
 */
test("update device ext", (done) => {
  console.log("update device ext", device.updateDeviceExtInfo);
  request
    .put(`/apis/tkeel-device/v1/devices/${device.devicesInfo.dev1Id}/ext`)
    .send(device.updateDeviceExtInfo)
    .set("authorization", device.tenantInfo.tenantAuthorization)
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ", JSON.stringify(result));
      done();
    });
});

/**
 * 删除设备扩展配置信息
 */
test("del device ext", (done) => {
  console.log("del device ext", device.deleteDeviceExtInfo);
  request
    .put(`/apis/tkeel-device/v1/devices/${device.devicesInfo.dev1Id}/ext`)
    .send(device.deleteDeviceExtInfo)
    .set("authorization", device.tenantInfo.tenantAuthorization)
    .expect(200)
    .then((res: any) => {
      let result = JSON.parse(res.text).data;
      console.log("all response : ", JSON.stringify(result));
      done();
    });
});
