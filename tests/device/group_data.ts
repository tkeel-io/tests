/**
 * 用于存放数据
 * 1、测试环境数据
 * 2、单用例参数化的测试数据
 * 3、全局变量存储测试依赖数据
 */

export const groupsInfo: any = {
  group1Id: "",
  group2Id: "",
  group3Id: "",
};

export const createGroupInfo1: any = {
      name: "group1",
      desc: "group_test1",
      parent:"",
      ext :{
        location:"wuhan1",
        owner:"qingcloud1",
        check:"xxxx1",
    },
};
export const createGroupInfo2: any = {
      name: "group2",
      desc: "group_test2",
      parent:"",
      ext :{
        location:"wuhan2",
        owner:"qingcloud2",
        check:"xxxx2",
    },
};

export const createGroupInfo3: any = {
      name: "group3",
      desc: "group_test3",
      parent:"",
      ext :{
        location:"wuhan3",
        owner:"qingcloud3",
        check:"xxxx3",
    },
};

export const updateGroupInfo: any = {
      name: "group_update",
      desc: "group_test_update",
      parent:"update_parent",
      ext :{
        location:"wuhan3_update",
        owner:"qingcloud3_update",
        check:"xxxx3_update",
    },
};


export const getGroupListInfo: any = {
      query: "type=group",
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

export function getDelGroupInfo (){
    return {
      ids: [groupsInfo["dev2Id"], groupsInfo["dev3Id"]],
    };
} 

export const addGroupExtInfo: any = {
      price:"1000",
      matrix:"matrix",
};

export const updateGroupExtInfo: any = {
      price:"1001",
      matrix:"tenet",
      new:"new",
};

export const deleteGroupExtInfo: any = {
      keys:["price","new"],
};
