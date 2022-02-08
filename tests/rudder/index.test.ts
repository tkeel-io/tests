// 讲 case.ts 文件中的某个变量导入，框架会按照导入的顺序执行用例
import { repoCase } from "./repo.case";


it("index", () => {
  console.log(repoCase); // 打印导入的变量，使导入生效

});
