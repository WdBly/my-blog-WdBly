const fs = require("fs");
//读文件操作是相对于项目根路径
let babelConfig = JSON.parse(fs.readFileSync('./.babelrc'));
require("babel-register")(babelConfig);

require("./server.js");