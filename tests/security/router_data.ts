const securityV1Path: string = "/apis/security/v1"

export const securityRouters = {
    "Token": {
        "method":"get",
        "path":securityV1Path + "/oauth/:tenant_id/token"
    },
    "CreateTenant" : {
        "method" : "post",
        "path" : securityV1Path + "/tenants"
    },
    "GetTenant":{
      "method" : "get",
      "path" : securityV1Path + "/tenants/:tenant_id"
    },
    "ListTenant":{
        "method" : "get",
        "path" : securityV1Path + "/tenants"
    },
    "DeleteTenant":{
        "method" : "delete",
        "path" : securityV1Path + "/tenants/:tenant_id"
    },

    "CreateUser":{
        "method" : "post",
        "path" : securityV1Path + "/tenants/:tenant_id/users"
    },
    "GetUser":{
        "method" : "get",
        "path" : securityV1Path + "/tenants/:tenant_id/users/:user_id"
    },
    "ListUser":{
        "method" : "get",
        "path" : securityV1Path + "/tenants/:tenant_id/users"
    },
    "DeleteUser":{
        "method" : "delete",
        "path" : securityV1Path + "/tenants/:tenant_id/users/:user_id"
    },
    "UpdateUser":{
        "method" : "put",
        "path" : securityV1Path + "/tenants/:tenant_id/users/:user_id"
    },


}