import {Base64} from 'js-base64';

let data = {
    "key": "value"
}
export const topicEvent_data = {
    postTopicEvent: {
        request: {
            data: data,
            data_base64: Base64.encode(JSON.stringify(data)),
            datacontenttype: "",
            id: "",
            pubsubname: "",
            source:"",
            specversion:"",
            subject:"",
            topic:"",
            type:"",
        },
        should_be: {
            status:"DROP",
        },
    },
}
