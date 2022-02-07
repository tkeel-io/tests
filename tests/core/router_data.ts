const prefix:string = "/apis"
export const routerData = {
    "createEntity": {
        "method": "post",
        "url": prefix + "/entities",
    },
    "deleteEntity": {
        "method": "delete",
        "url": prefix + "/entities/:id",
    },
    "getEntity": {
        "method": "get",
        "url": prefix + "/entities/:id",
    },
    "listEntities": {
        "method": "get",
        "url": prefix + "/entities/search",
    },
    "updateEntity": {
        "method": "put",
        "url": prefix + "/entities/:id",
    },
    "patchEntity": {
        "method": "patch",
        "url": prefix + "/entities/:id",
    },
    "patchEntityZ": {
        "method": "patch",
        "url": prefix + "/entities/:id/patch",
    },
    "setConfig": {
        "method": "post",
        "url": prefix + "/entities/:id/configs"
    }
}
