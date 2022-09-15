# common-m

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### .env 配置对应不同环境

```
# 环境文件只包含环境变量的“键=值”
# 只有以 VUE_APP_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中,可在代码中访问
# NODE_ENV 应用运行的模式
# VUE_APP_DEPLOY_ENV 发布环境 dev tst rc prod 代码中可以用 DeployConfig.deployEnv 访问
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 合并分支

```
# 拉取所有分支
git pull (vsCode拉取变基)

# 从主分支创建临时分支
git branch temp （vsCode左下角可以创建）

# 切换到要合并的开发分支
git checkout origin/search  （vsCode左下角可切换）

# 合并临时分支到开发分支，解决冲突 (当前更改就是当前分支的改动)
git merge temp

# 提交改动并推送

# 切换到主分支
git checkout master

# 合并开发分支
git merge search

# 提交改动并推送

# 删除无用分支
git branch -d temp
git branch -d search
```
