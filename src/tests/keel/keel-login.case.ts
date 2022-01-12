import { keel, request } from "../init.case";

it.each(keel.password)("%password login", (password, done: any) => {
  request
    .get(`/apis/rudder/v1/oauth2/admin?password=${password}`)
    .expect(200, done);
});


export const keelLoginCase  = `keel 模块 login 接口的测试用例`
