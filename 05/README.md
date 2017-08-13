## 一个上传图片的Demo

### Installation

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

