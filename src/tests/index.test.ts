/**
 * case 执行顺序
 * 1.导入顺序,自上而下
 * 2. it 顺序,自上而下
 */

import { keelCase } from "./keel/keel.case";
import { tenantCase } from "./tenent/tenant.case";
import { keelLoginCase } from "./keel/keel-login.case";

it("index", () => {
  // console.log(process.env);
  console.log(keelCase);
  console.log(keelLoginCase);
  console.log(tenantCase);
});
