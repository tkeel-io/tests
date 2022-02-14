
// 测试环境
export const service = "http://192.168.123.9";
export const port = "32710";
export const baseURL = `${service}:${port}`;

export const subscribeInfo: any = {
    subscribe_id: ""
};

export const tenantInfo: any = {
    tenantAuthorization: "租户登录用的token",
    tenant_id: "5imdM-Ve"
};

export function getTenantToken() {
    return tenantInfo["tenantAuthorization"];
} 
