const name = makeid(10)
const desc = makeid(10)

export const rule = {
    name: name,
    desc: desc,
    type: 2,
    id: "",
    status: 0,
    createdAt: 0,
    updatedAt: 0,
    model_id: "modelid-1",
    model_name: "modelname-1"
}

export const target = {
    id: "",
    type: 0,
    host: "",
    value: "",
    ext: ""
}

const device_id0 = "id0"

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export const data = {
    updateRuleInfo: {
        request: {
            name: makeid(10),
            desc: makeid(10),
        },
    },
    addDevicesToRule: {
        request: {
            devices_ids: [device_id0],
        },
    },
    removeDevicesFromRule: {
        request: {
            devices_ids: [device_id0],
        },
    },
    createRuleTarget: {
        request: {
            // Edit this
            type: 1,
            host: "localhost",
            value: "/test"
        },
        mysqlrequest: {
            // Edit this

            sink_type: "mysql",
            sink_id: "id",
            table_name: "testabc",
            fields: [{ tfield_name: "abc", m_field: { name: "abc", type: "int" } }]
        },

    },
    updateRuleTarget: {
        request: {
            // Edit this
            host: "otherhost",
            value: "/othertest",
        }
    },
    testConnectionToKafka: {
        request: {
            // Edit this
            host: "myhost",
            topic: "someTopic"
        }
    },
    errSubscribe: {
        request: {
            // Edit this
            subscribe_id: "0",
        }
    },

    changeErrSubscribe: {
        request: {
            // Edit this
            subscribe_id: "1",
        }
    },

}
