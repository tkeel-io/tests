const prefix:string = "/apis/core-broker/v1"

export const subscribeRouters = {
    "create": {
        "method": "post",
        "url": prefix + "/subscribe",
    },
    "delete": {
        "method": "delete",
        "url": prefix + "/subscribe/:id",
    },
    "list": {
        "method": "post",
        "url": prefix + "/subscribe/list",
    },
    "update": {
        "method": "patch",
        "url": prefix + "/subscribe/:id",
    },
    "get": {
        "method": "get",
        "url": prefix + "/subscribe/:id",
    },
    "changeStatus": {
        "method": "put",
        "url": prefix + "/subscribe/:id",
    },
    "subscribeByIDs": {
        "method": "post",
        "url": prefix + "/subscribe/:id/entities",
    },
    "subscribeByGroup" : {
        "method": "post",
        "url": prefix + "/subscribe/:id/groups",
    },
    "subscribeByModels" : {
        "method": "post",
        "url": prefix + "/subscribe/:id/models",
    },
    "listSubscribeEntities": {
        "method": "post",
        "url": prefix + "/subscribe/:id/entities/list"
    },
    "unsubscribeEntities": {
        "method": "post",
        "url": prefix + "/subscribe/:id/entities/delete"
    },
    "changeSubscribe": {
        "method": "put",
        "url": prefix + "/subscribe/:id"
    },
    "subscribeByDevices": {
        "method": "post",
        "url": "/subscribe/device/:id"
    }
}
