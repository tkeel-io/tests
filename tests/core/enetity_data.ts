export const entity_data = {
    "id": "entity_id",
    "create_properties": {
        "id": "entity_id",
        "type": "entity_type",
        "owner": "entity_owner",
        "source": "entity_source",
        "content": {
            "key": "value"
        }
    },
    "update_properties": {
        "id": "entity_id",
        "type": "entity_type",
        "owner": "entity_owner",
        "source": "entity_source",
        "content": {
            "key": "new_value"
        }
    },
    "patch_properties": {
        "id": "entity_id",
        "type": "entity_type",
        "owner": "entity_owner",
        "source": "entity_source",
        "content": [{
            "path": "key",
            "operator": "replace",
            "value": "replace_value"
        }],
        "should_be": {
            "id": "entity_id",
            "type": "entity_type",
            "owner": "entity_owner",
            "source": "entity_source",
            "content": {
                "key": "replace_value"
            }
        }
    },
    "set_config": {
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
                            "default": "default_value"
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
    }
}

export function implicateID(str:string):string {
    return str.replace( ":id", entity_data.id);
}
