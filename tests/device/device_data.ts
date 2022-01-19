/**
 * 用于存放数据
 * 1、测试环境数据
 * 2、单用例参数化的测试数据
 * 3、全局变量存储测试依赖数据
 */

export const tenantInfo: any = {
  tenantAuthorization: "租户登录用的token",
  tenant_id :""
};

export function getTenantToken (){
    return {
      tenantToken : tenantInfo["tenantAuthorization"],
    };
} 

export const devicesInfo: any = {
  dev1Token: "",
  dev1Id: "",
  dev2Token: "",
  dev2Id: "",
  dev3Token: "",
  dev3Id: "",
};

export const createDeviceInfo1: any = {
      name: "device1",
      desc: "test",
      group:"",
      directConnection: false,
      templateId:"",
      selfLearn: false,
      ext :{
        alias:"deviceAlias",
        location:"wuhan",
        owner:"qingcloud",
    },
};

export const createDeviceInfo2: any = {
      name: "device2",
      desc: "test",
      group:"",
      directConnection: false,
      templateId:"",
      selfLearn: false,
      ext :{
        alias:"deviceAlias",
        location:"wuhan",
        owner:"qingcloud",
    },
};

export const createDeviceInfo3: any = {
      name: "device3",
      desc: "test",
      group:"",
      directConnection: false,
      templateId:"",
      selfLearn: false,
      ext :{
        alias:"deviceAlias",
        location:"wuhan",
        owner:"qingcloud",
    },
};

export const updateDeviceInfo: any = {
      name: "device1",
      desc: "test_update",
      group:"root",
      directConnection: true,
      templateId:"",
      selfLearn: true,
      ext :{
        alias:"deviceAlias_update",
        location:"wuhan_hongshan",
        owner:"qingcloud_iot",
    },
};

export const getDeviceListInfo: any = {
      query: "type=device",
      condition:[
          {
              field:"owner",
              operator:"$eq",
              value:"dm",
          }, 
          {
              field:"version",
              operator:"$gt",
              value:"2",
          },
      ], 
      page :{
          limit:1, 
          sort:"id",
      },
};

export function getDelDeviceInfo (){
    return {
      ids: [devicesInfo["dev2Id"], devicesInfo["dev3Id"]],
    };
}

export const addDeviceExtInfo: any = {
      price:"1000",
      matrix:"matrix",
};

export const updateDeviceExtInfo: any = {
      price:"1001",
      matrix:"tenet",
      new:"new",
};

export const deleteDeviceExtInfo: any = {
      keys:["price","new"],
};

