import { initApi } from "../src/api/base";

let APIS= { // 各环境 业务 api 服地址
  "development":"http://127.0.0.1:8890",
  "test":"http://127.0.0.1:8890",
  "production": "http://127.0.0.1:8890"
}
console.info('process.env.NODE_ENV', process.env.NODE_ENV)
initApi(APIS[process.env.NODE_ENV])