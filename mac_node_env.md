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

### 在Mac/Linux下通过nodejs执行shell ###

- 新建shell脚本

test.sh
```shell
#!/usr/bin/env bash
npm install -D shelljs
```

- 授权

```shell
chmod 755 test.sh
```

- 执行

```javascript
const child_process = require('child_process');
const exec = child_process.exec;

exec('./test.sh .', function(error, stdout, stderr){
    if(error){
        throw error;
    }
    console.log(stdout);
});
```

- 运行结果

```shell
/usr/local/bin/node /Users/coderdream/WebstormProjects/automatic-web-testing-4-pdrc/shell/test/execute_shell.js
+ shelljs@0.8.2
updated 1 package in 41.492s


Process finished with exit code 0

```

参考：
