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
    id: "",
    endpoint: "",
    is_default: false
}

const subscribe_data = [subscribe]

const STATUS_SUCCESS = "SUCCESS"

const test_groups_data = ["197d6188-e82f-4c07-8786-fe3bb247cad8"]
const test_models_data = ["model-1", "model-2", "model-3"]
const test_ids_data = ["d969e1a2-754c-44a7-a3df-2335c7609aee"]

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
            total:2,
            page_num: 1,
            page_size: 10,
            last_page: 1,
            data: subscribe_data[0],
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
    changeSubscribe: {
        request:{
            target_id: "",
            selected_IDs: test_ids_data,
        },
        response: {
            status: STATUS_SUCCESS,
        }
    },
    SubscribeByDevice: {
        request: {
            id: test_ids_data[0],
            subscribe_ids: [subscribe.id]
        },
        response: {
            status: STATUS_SUCCESS,
        }
    }
};


