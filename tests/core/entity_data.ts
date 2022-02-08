export const entity_data = {
    id: "entityID",
    create_properties: {
        "id": "entityID",
        "type": "entity_type",
        "owner": "entity_owner",
        "source": "entity_source",
        "content": {
            "key": "value"
        }
    },
    update_properties: {
        "id": "entityID",
        "type": "entity_type",
        "owner": "entity_owner",
        "source": "entity_source",
        "content": {
            "key": "new_value"
        }
    },
    patch_properties: {
        "id": "entityID",
        "type": "entity_type",
        "owner": "entity_owner",
        "source": "entity_source",
        "content": [{
            "path": "key",
            "operator": "replace",
            "value": "replace_value"
        }],
        "should_be": {
            "id": "entityID",
            "type": "entity_type",
            "owner": "entity_owner",
            "source": "entity_source",
            "content": {
                "key": "replace_value"
            }
        }
    },
    search_type: {
        request: {
            query: "entity_type",
            page: {
                limit: 20,
            }
        },
        should_be: {
            id: "entityID",
            type: "entity_type",
            owner: "entity_owner",
            source: "entity_source",
            properties: {
                key: "value"
            }
        }
    },
    set_config: {
        "type": "BASIC",
        "owner": "entity_owner",
        "source": "entity_source",
        "content": [{
            "id": "metrics",
            "type": "struct",
            "define": {
                "fields": {
                    "key": {
                        "define": {
                            "type": "string",
                        }
                    },
                    "description": "this key named key is used to test the config",
                    "enabled": true,
                    "enabled_search": true,
                    "enabled_time_series": false,
                    "id": "key",
                    "type": "string",
                    "weight": 0,
                    "last_time": 0
                },
            },
            "enable": true,
            "enable_search": true,
        }]
    },
    patch_config: {
        append_cpu_used: {
            type: "BASIC",
            owner: "entity_owner",
            source: "entity_source",
            content:[{
                "path": "cpu_used",
                "operator": "replace",
                "value": {
                    "type": "float",
                    "define": {
                        "max": 1,
                        "min": 0,
                        "ext": {"test":123}
                    },
                    "enabled": true,
                    "enabled_search": true
                }
            }]
        },
        remove_cpu_used:{
            type: "BASIC",
            owner: "entity_owner",
            source: "entity_source",
            content:[{
                "path": "metrics.mem_used",
                "operator": "remove"
            }]
        },
        append_metrics_mem_used: {
            type: "BASIC",
            owner: "entity_owner",
            source: "entity_source",
            content:[{
                    "path": "metrics.mem_used",
                    "operator": "add",
                    "value": {
                        "type": "float",
                        "define": {
                            "max": 1,
                            "min": 0
                        },
                        "enabled": true,
                        "enabled_search": true
                    }
                }]
        },
        copy_metrics_mem_used: {
            type: "BASIC",
            owner: "entity_owner",
            source: "entity_source",
            content:[{
                "path": "metrics.mem_used",
                "operator": "copy"
            }]
        },
        remove_metrics_mem_used: {
            type: "BASIC",
            owner: "entity_owner",
            source: "entity_source",
            content:[{
                "path": "metrics.mem_used",
                "operator": "remove"
            }]
        },
        make_path_if_not_exist: {
            type: "BASIC",
            owner: "entity_owner",
            source: "entity_source",
            content:[
                {
                    "path": "metrics.pathnotfound.ttt",
                    "operator": "add",
                    "value": {
                        "type": "float",
                        "define": {
                            "max": 1,
                            "min": 0
                        },
                        "enabled": true,
                        "enabled_search": true
                    }
                }]
        },
        add_root_config: {
            type: "BASIC",
            owner: "entity_owner",
            source: "entity_source",
            content:[
                {
                    "path": "root2.pathnotfound.xxx",
                    "operator": "add",
                    "value": {
                        "type": "float",
                        "define": {
                            "max": 1,
                            "min": 0
                        },
                        "enabled": true,
                        "enabled_search": true
                    }
                }]
        },
        remove: {
            type: "BASIC",
            owner: "entity_owner",
            source: "entity_source",
            content:[{
                "path": "root2.pathnotfound.ttt",
                "operator": "remove"
            }]
        },
    },
    append_config: {
        "type": "BASIC",
        "owner": "entity_owner",
        "source": "entity_source",
        "content": [{
            "id": "temp",
            "type": "int",
            "define": {
                "unit": "°",
                "max": 500,
                "min": 10
            },
            "enabled": true,
            "enabled_search": true
        }]
    },
    remove_config: {
        "type": "entity_type",
        "owner": "entity_owner",
        "source": "entity_source",
        "property_ids": ["key"]
    },
    query_config: {
        "type": "BASIC",
        "owner": "entity_owner",
        "source": "entity_source",
        "property_ids": ["key"],
        "should_be": {
            "id": "device123",
            "source": "dm",
            "owner": "admin",
            "type": "DEVICE",
            "configs": {
                "temp": {
                    "define": {
                        "max": 500,
                        "min": 10,
                        "unit": "°"
                    },
                    "description": "",
                    "enabled": true,
                    "enabled_search": false,
                    "enabled_time_series": false,
                    "id": "temp",
                    "last_time": 0,
                    "type": "int",
                    "weight": 0
                }
            },
            "properties": {}
        }
    },
}

export function implicateID(str:string):string {
    return str.replace( ":id", entity_data.id);
}
