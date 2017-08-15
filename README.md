# 暑假作业

注：若无特殊说明，代码默认监听3000端口。

​	若无特殊说明，先根据package.json安装模块



## 游戏（01

```
TODO
```



## Web worker（02

```
$node app.js
```



## Ajax封装（代码在./lib/front.js）（02

```
$node app.js
```



## Gulp（03


```
$gulp
```





## 图片上传（05

在services文件夹新建一个config.js用于连接数据库

格式如下

```
module.exports = {
  host: 'localhost',
  user: 'xxx',
  password: 'xxx',
  database: 'xxx'
}
```

在数据库中新建一个表，只要一列名为'image'的列就行

```
$node app.js
```

### 功能

- 简陋进度条
- 预览功能
- 支持拖拽图片

### TODO

- [ ] 加强进度条
- [ ] 换成formData
- [ ] 前端的图片剪切

## Websocket聊天室（06

基于Mysql储存用户信息和Redis储存session，使用socket.io库

Mysql配置与05作业一致，Redis无需配置。

```
$node app.js
```



TODO：

- [ ] 聊天显示头像，修改头像

- [ ] 加强逻辑，更多功能

      ​