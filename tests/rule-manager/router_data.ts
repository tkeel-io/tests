const prefix: string = '/apis/rule-manager/v1';

export const ruleRouters = {
    "create": {
        "method": "post",
        "url": `${prefix}/rules`
    },
    "list/query": {
        "method": "get",
        "url": `${prefix}/rules`
    },
    "update": {
        "method": "put",
        "url": `${prefix}/rules/:id`
    },
    "get": {
        "method": "get",
        "url": `${prefix}/rules/:id`
    },
    "delete": {
        "method": "delete",
        "url": `${prefix}/rules/:id`
    },
    "ruleStatusSwitch": {
        "method": "put",
        "url": `${prefix}/rules/:id/running_status`
    },
    "ruleDevicesList": {
        "method": "get",
        "url": `${prefix}/rules/:ruleId/devices`
    },
    "addDevicesToRule": {
        "method": "post",
        "url": `${prefix}/rules/:ruleId/devices`
    },
    "removeDevicesFromRule": {
        "method": "delete",
        "url": `${prefix}/rules/:ruleId/devices`
    },
    "getRuleDevices": {
        "method": "get",
        "url": `${prefix}/rules/:ruleId/devices`
    },
    "createRuleTarget": {
        "method": "post",
        "url": `${prefix}/rules/:ruleId/target`
    },
    "updateRuleTarget": {
        "method": "put",
        "url": `${prefix}/rules/:ruleId/target/:targetId`
    },
    "testConnectionToKafka": {
        "method": "get",
        "url": `${prefix}/testing/kafka`
    },
    "ListRuleTarget": {
        "method": "get",
        "url": `${prefix}/rules/:ruleId/targets`
    },
    "deleteRuleTarget": {
        "method": "delete",
        "url": `${prefix}/rules/:ruleId/targets/:targetId`
    },
    "errSubscribe": {
        "method": "post",
        "url": `${prefix}/rules/:ruleId/subscribe/error`
    },
    "changeErrSubscribe": {
        "method": "put",
        "url": `${prefix}/rules/:ruleId/subscribe/error`
    },
    "errUnsubscribe": {
        "method": "delete",
        "url": `${prefix}/rules/:ruleId/subscribe/error`
    }
}
