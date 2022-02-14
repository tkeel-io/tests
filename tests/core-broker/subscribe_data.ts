function makeid(length) {
    let result = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export const subscribe = {
    title: "",
    description: "",
    ID: "",
    endpoint: "",
}

const subscribe_data = {
    "data":[subscribe]
}

const STATUS_SUCCESS = "SUCCESS"

const test_groups_data = ["group-1", "group-2", "group-3"]
const test_models_data = ["model-1", "model-2", "model-3"]
const test_ids_data = ["entity_id-1", "entity_id-2", "entity_id-3"]

export const subscribeInfo: any = {
    creation:{
        title: makeid(10),
        description: makeid(20),
    },
    updated:{
        title: makeid(10),
        description: makeid(20),
    },
    listWithPagination:{
        page: {
            page_num: 1,
            page_size: 10,
        },
        response: {
            total:1,
            page_num: 1,
            page_size: 10,
            last_page: 1,
            data: subscribe_data,
        }
    },
    subscribeByIDs : {
        request:{
            entities: test_ids_data,
        },
        response: {
            status: STATUS_SUCCESS,
        }
    },
    subscribeByGroup: {
        request:{
            groups: test_groups_data,
        },
        response: {
            status: STATUS_SUCCESS,
        }
    },
    subscribeByModel: {
        request:{
            models: test_models_data,
        },
        response: {
            status: STATUS_SUCCESS,
        }
    },
    unsubscribeByIDs : {
        request:{
            entities: test_ids_data,
        },
        response: {
            status: STATUS_SUCCESS,
        }
    },
};


