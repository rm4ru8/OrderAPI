# 作品集

Nest + typeorm + MySQL + swagger文檔

訂單資料介接API



## 創建

* 創建nest項目

* 安裝typeorm、mysql包

* 創建訂單區塊
* 添加swagger包

```bash
nest new portfolio
cd portfolio
yarn add typeorm mysql
nest g res orders

yarn add @nestjs/swagger swagger-ui-express
```



* 創建database、provider

* 增加order訂單模塊的entities、service、controller內容



# 遇到問題

## MySQL連接錯誤

連接資料庫MySQL8時出現error

```bash
ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client mysql
```

原因：最新的mysql模塊未完全支持MySQL 8的“caching_sha2_password”加密方式

解決方式：重新修改用戶root密碼，並指定mysql模塊能夠支持的加密方式

```mysql
ALTER USER 'root'@'localhost' IDENTIFIED BY '!QAZ2wsx';
```



## 自動生成資料庫文件

不能用原生的，要用npx

```
yarn add typeorm-model-generator
npx typeorm-model-generator -h #主機 -d test -u sa -x #密碼 -e mssql -o .
```

