# 文章管理系统

## 一、依赖安装
```bash
npm install
```



## 二、本地运行

```bash
npm run dev;
# 接口在本地运行，数据库用的mysql，接口用nodejs写的
# 本地建立mysql库，数据库名为user，表名为userinfo，登录数据库名root 密码Neko.520
# 包含id(自增) user_name nick_name password
npm run start;
```



## 三、打包

```bash
npm run build
```



## 四、项目可用功能

### 1.可上传文章

### 2.支持单页搜索功能

### 3.可编辑、置顶、删除文章



## 五、bug

### 1.评论功能

- 都是以一个名字发表的
- 置顶、上传文章时评论位置无法实时更新



## 六、暂未实现的功能

### 1.头像更新

### 2.评论回复

## 补充：
当前为vue2版本，功能实现后计划迁至vue3版本