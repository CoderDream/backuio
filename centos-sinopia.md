# <span id= "20180727">CentOS 7 安装Sinopia</span> #


参考：
1. [使用Sinopia搭建私有的npm仓库](https://segmentfault.com/a/1190000005790827)
2. 


```shell
npm install -g sinopia
```
当前用户下执行sinopia , 在~/sinopia/文件夹下就是配置信息及缓存包存放地

修改 /root/.config/sinopia/config.yaml
 

```shell
uplinks:
	npmjs:
		url: http://registry.npm.taobao.org/
```
增加，外网可以通过IP访问:
 
```shell
listen: 0.0.0.0:4873
```

启动sinopia


```shell
pm2 start sinopia
```
运行结果
```shell

[root@localhost ~]# pm2 start sinopia

                        -------------

__/\\\\\\\\\\\\\____/\\\\____________/\\\\____/\\\\\\\\\_____
 _\/\\\/////////\\\_\/\\\\\\________/\\\\\\__/\\\///////\\\___
  _\/\\\_______\/\\\_\/\\\//\\\____/\\\//\\\_\///______\//\\\__
   _\/\\\\\\\\\\\\\/__\/\\\\///\\\/\\\/_\/\\\___________/\\\/___
    _\/\\\/////////____\/\\\__\///\\\/___\/\\\________/\\\//_____
     _\/\\\_____________\/\\\____\///_____\/\\\_____/\\\//________
      _\/\\\_____________\/\\\_____________\/\\\___/\\\/___________
       _\/\\\_____________\/\\\_____________\/\\\__/\\\\\\\\\\\\\\\_
        _\///______________\///______________\///__\///////////////__


                          Runtime Edition

        PM2 is a Production Process Manager for Node.js applications
                     with a built-in Load Balancer.

                Start and Daemonize any application:
                $ pm2 start app.js

                Load Balance 4 instances of api.js:
                $ pm2 start api.js -i 4

                Monitor in production:
                $ pm2 monitor

                Make pm2 auto-boot at server restart:
                $ pm2 startup

                To go further checkout:
                http://pm2.io/


                        -------------

[PM2] Spawning PM2 daemon with pm2_home=/root/.pm2
[PM2] PM2 Successfully daemonized
[PM2] Starting /usr/local/bin/sinopia in fork_mode (1 instance)
[PM2] Done.
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────┬───────────┬──────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ cpu │ mem       │ user │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────┼───────────┼──────┼──────────┤
│ sinopia  │ 0  │ fork │ 14252 │ online │ 0       │ 0s     │ 0%  │ 12.8 MB   │ root │ disabled │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────┴───────────┴──────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
[root@localhost ~]# 

```

----------
## VMWare中的 CentOS 7 不能上网 ##

修改


```shell
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```

修改 ONBOOT为yes

```shell
ONBOOT=yes
```
按esc，然后:wq 保存退出。接下来重启网络：

```shell
service network restart
```
----------

## Linux上搭建内部npm，sinopia开启了本地无法访问 ##

不仅要改配置，还要在开放防火墙的端口
```shell
[root@webteam sysconfig]# systemctl stop firewalld.service 
[root@webteam sysconfig]# systemctl start firewalld.service 
[root@webteam sysconfig]# firewall-cmd --permanent --add-port=4873/tcp  
success
[root@webteam sysconfig]# firewall-cmd --reload
success
[root@webteam sysconfig]# 
```

按照上面的方式添加了listen: 0.0.0.0:4873，还是不行。于是就考虑可能是防火墙的问题。
1、关闭防火墙的服务，测试是否能够访问服务

systemctl stop firewalld.service
2、确定关闭后可以访问，于是开启防火墙，准备开放端口

systemctl start firewalld.service
3、开放端口

firewall-cmd --permanent --add-port=4873/tcp
4、防火墙重新加载配置

firewall-cmd --reload


----------

## npm 安装包报错 rollbackFailedOptional ##

原因是设置的代理错误，删除即可

```shell
npm config rm proxy
npm config rm https-proxy

```

然后使用npm install -g cnpm --registry=https://registry.npm.taobao.org安装淘宝的cnpm

然后就可以使用cnpm命令了


----------

```shell

```



```shell

```

```shell

```



```shell

```

```shell

```



```shell

```

```shell

```



```shell

```

```shell

```



```shell

```

```shell

```

























