
import { v4 as uuidv4 } from "uuid";


export function genUUID():string {
    return uuidv4()
}

export const TenantData : any = {
    "title":"",
    "tenant_id":"",
    "admin":{
        "username":"admin",
        "password":"123456"
    },
}