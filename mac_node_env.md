## Mac node.js WebStorm 环境配置 ###






安装nrm（必须加sudo，然后输入密码）




```shell
npm install -g nrm
```

参考：
- [mac安装报错Error: EACCES: permission denied](https://blog.csdn.net/shaleilei/article/details/80812410)
- [nrm官方教程](https://www.npmjs.com/package/nrm)


向nrm中新增本地sinopia

```shell
nrm add sinopia http://192.168.226.130:4873/
```