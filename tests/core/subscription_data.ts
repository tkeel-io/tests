export const subscriptionData = {
    id: 'subscription_id',
    create: {
        parameters: {
            "id": "subscription_id",
            "source": "source_pub",
            "owner": "publisher_id",
        },
        request: {
            filter: "filter",
            mode: "mode",
            pubsub_name: "pubsub",
            source: "source_pub",
            target: "source_sub",
            topic: "topic"
        },
        should_be: {
            id: "subscription_id",
            owner: "publisher_id",
            source: "source_pub",
            subscription: {
                filter: "filter",
                mode: "mode",
                pubsub_name: "pubsub",
                source: "source_pub",
                target: "source_sub",
                topic: "topic"
            }
        }
    },
    get:{
        parameters: {
            "source": "source_pub",
            "owner": "publisher_id",
        },
        should_be: {
            id: "subscription_id",
            owner: "publisher_id",
            source: "source_pub",
            subscription: {
                filter: "filter",
                mode: "mode",
                pubsub_name: "pubsub",
                source: "source_pub",
                target: "source_sub",
                topic: "topic"
            }
        }
    },
    update:{
        parameters: {
            "source": "source_pub",
            "owner": "publisher_id",
        },
        request: {
            filter: "new_filter",
            mode: "new_mode",
            pubsub_name: "new_pubsub",
            source: "new_source_pub",
            target: "new_source_sub",
            topic: "new_topic"
        },
        should_be:{
            id: "subscription_id",
            owner: "publisher_id",
            source: "new_source_pub",
            subscription: {
                filter: "new_filter",
                mode: "new_mode",
                pubsub_name: "new_pubsub",
                source: "new_source_pub",
                target: "new_source_sub",
                topic: "new_topic"
            }
        }
    },
    list:{
        parameters: {
            "source": "source_pub",
            "owner": "publisher_id",
        },
        should_be:{
            count: 1,
            items: [
                {
                    id: "subscription_id",
                    owner: "publisher_id",
                    source: "new_source_pub",
                    subscription: {
                        filter: "new_filter",
                        mode: "new_mode",
                        pubsub_name: "new_pubsub",
                        source: "new_source_pub",
                        target: "new_source_sub",
                        topic: "new_topic"
                    }
                }]
        }
    },
    delete:{
        parameters: {
            "source": "source_pub",
            "owner": "publisher_id",
        },
        should_be: {
            id: "subscription_id",
            status:"ok",
        }
    },
}

export function implicateID(str:string):string {
    return str.replace( ":id", subscriptionData.id);
}
