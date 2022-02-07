const prefix:string = "/apis/core/v1"

export const entityRouters = {
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
    "searchEntities": {
        "method": "post",
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
    },
    "patchConfig": {
        "method": "post",
        "url": prefix + "/entities/:id/configs/patch"
    },
    "appendConfig": {
        "method": "put",
        "url": prefix + "/entities/:id/configs"
    },
    "queryConfig": {
        "method": "get",
        "url": prefix + "/entities/:id/configs"
    },
    "removeConfig": {
        "method": "delete",
        "url": prefix + "/entities/:id/configs"
    },
}
