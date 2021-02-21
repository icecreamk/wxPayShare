const envList = {
  dev: {
    baseUrl: "",
  },
  test: {
    baseUrl: "",
  },
  prod: {
    domain: "http://m.51purse.com",
    baseUrl: "",
  },
};

// 当前项目环境变量
let currentEnv = "prod";
let params = {
  "dev-m.51purse.com": "dev",
  "test-m.51purse.com": "test",
  "prod-m.51purse.com": "prod",
};

currentEnv = params[location.hostname];

export default envList[currentEnv];
