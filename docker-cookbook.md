# <span id= "20180727">Docker 经典实例</span> #

1.11　在Docker中运行Hello World
----------
Docker常用命令

在命令行提示符下键入docker，将会显示docker 命令的使用方法，如下所示。
```shell
$ docker
Usage: docker [OPTIONS] COMMAND [arg...]
A self-sufficient runtime for linux containers.
...
Commands:
attach Attach to a running container
build Build an image from a Dockerfile
commit Create a new image from a container's changes
...
rm Remove one or more containers
rmi Remove one or more images
run Run a command in a new container
save Save an image to a tar archive
search Search for an image on the Docker Hub
start Start a stopped container
stop Stop a running container
tag Tag an image into a repository
top Lookup the running processes of a container
unpause Unpause a paused container
version Show the Docker version information
wait Block until a container stops, then print its exit code
```
在Docker中运行Hello World
```shell
docker run busybox echo hello world
```
运行结果：

```shell
[root@localhost ~]# docker run busybox echo hello world
Unable to find image 'busybox:latest' locally
Trying to pull repository docker.io/library/busybox ... 
latest: Pulling from docker.io/library/busybox
75a0e65efd51: Pull complete 
Digest: sha256:d21b79794850b4b15d8d332b451d95351d14c951542942a816eea69c9e04b240
Status: Downloaded newer image for docker.io/busybox:latest
hello world
```





```shell
[root@localhost ~]# docker run -d -p 1234:1234 python:2.7 python -m SimpleHTTPServer 1234
Unable to find image 'python:2.7' locally
Trying to pull repository docker.io/library/python ... 
2.7: Pulling from docker.io/library/python
55cbf04beb70: Already exists 
1607093a898c: Already exists 
9a8ea045c926: Already exists 
d4eee24d4dac: Already exists 
b59856e9f0ab: Pull complete 
27a58ded158c: Pull complete 
d3605d4d5a57: Pull complete 
7cf96e36db79: Pull complete 
010e69b0c00e: Pull complete 
Digest: sha256:b6d426927f5a2558e373e53a9f6c5d931b21644928e284fc6388a08e9adeaa81
Status: Downloaded newer image for docker.io/python:2.7
b215658f65f99d759f332bc37318a321e7b4157a0007406b96429aa8b6a44d0e
[root@localhost ~]# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS                    NAMES
6914a1cd259d        python:2.7          "python -m SimpleH..."   5 minutes ago       Created                                              eloquent_bhabha
```


这个-d 参数会让容器在后台运行。

通过查询得到容器ID：b215658f65f9
```shell
[root@localhost ~]# docker ps -n 5
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS                    NAMES
6914a1cd259d        python:2.7          "python -m SimpleH..."   21 minutes ago      Created                                              eloquent_bhabha
b215658f65f9        python:2.7          "python -m SimpleH..."   23 minutes ago      Up 23 minutes               0.0.0.0:1234->1234/tcp   gracious_kirch
4ba44b1ca7cc        ubuntu:14.04        "/bin/bash"              24 minutes ago      Exited (0) 4 minutes ago                             wizardly_davinci
7e970d118037        busybox             "echo hello world"       47 minutes ago      Exited (0) 47 minutes ago                            kind_wescoff
a805b161b255        busybox             "echo hello world"       53 minutes ago      Exited (0) 53 minutes ago                            focused_hodgkin

```
你可以通过运行exec 命令来启动一个bash shell，再次进入到该容器中，如下所示。
```shell
[root@localhost ~]# docker exec -ti b215658f65f9 /bin/bash
root@b215658f65f9:/# ps -ef | grep python
root          1      0  0 10:16 ?        00:00:00 python -m SimpleHTTPServer 1234
root         14      7  5 10:37 ?        00:00:00 grep python
```


```shell
[root@localhost ~]# docker create -P --expose=1234 python:2.7 python -m SimpleHTTPServer 1234
9836a2b21d06f1644367b5fb9edc8257ba7939f60527883e24b7718dd178ff7a
[root@localhost ~]# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS                    NAMES
9836a2b21d06        python:2.7          "python -m SimpleH..."   18 seconds ago      Created                                              tender_wing

```

```shell
[root@localhost ~]# docker start 9836a2b21d06
9836a2b21d06
[root@localhost ~]# 

```


```shell
[root@localhost ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS                     NAMES
9836a2b21d06        python:2.7          "python -m SimpleH..."   About a minute ago   Up 28 seconds       0.0.0.0:32768->1234/tcp   tender_wing
b215658f65f9        python:2.7          "python -m SimpleH..."   29 minutes ago       Up 29 minutes       0.0.0.0:1234->1234/tcp    gracious_kirch
[root@localhost ~]# 


```





```shell
$ docker restart 9836a2b21d06
9836a2b21d06
$ docker ps
CONTAINER ID IMAGE COMMAND ... NAMES
a842945e2414 python:2.7 "python -m SimpleHTT ... fervent_hodgkin
$ docker kill 9836a2b21d06
9836a2b21d06
$ docker rm 9836a2b21d06
9836a2b21d06
$ docker ps -a
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
```

## 1.14　使用Dockerfile构建Docker镜像 ##

在一个空文件夹下创建一个名为Dockerfile 的文件，如下所示。
```shell
FROM busybox

ENV foo=bar
```
可以通过docker build 命令来构建一个新镜像，并命名为busybox2，如下所示。

```shell
[root@localhost busybox]# docker build -t busybox2 .
Sending build context to Docker daemon 2.048 kB
Step 1/2 : FROM busybox
 ---> 22c2dd5ee85d
Step 2/2 : ENV foo bar
 ---> Running in 2129b0e00db8
 ---> 2e6f7aa0f8b5
Removing intermediate container 2129b0e00db8
Successfully built 2e6f7aa0f8b5
[root@localhost busybox]#
```
构建结束之后，你就能通过docker images 命令看到新构建的镜像了。

```shell
[root@localhost busybox]# docker images
REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
busybox2                        latest              2e6f7aa0f8b5        5 minutes ago       1.16 MB
busybox3                        latest              2e6f7aa0f8b5        5 minutes ago       1.16 MB
```
可以基于这个新镜像启动一个容器，检查一下其中是否有一个名为foo 的环境变量，并且其值被设置为了bar，如下所示。
```shell
[root@localhost busybox]# docker run busybox2 env | grep foo
foo=bar
```
## 1.15　在单一容器中使用Supervisor运行WordPress ##

为了运行WordPress，你需要安装MySQL、Apache 2（即httpd）、PHP 以及最新版本的WordPress。你将需要创建一个用于WordPress 的数据库。在该范例的配置文件中，WordPress 数据库用户名为root，密码也是root，数据库名为wordpress。如果你想对数据库的配置进行修改，需要同时修改wp-config.php 和Dockerfile 这两个文件，并让它们的设置保持一致。

Dockerfile

```shell
FROM ubuntu:14.04
RUN apt-get update && apt-get -y install \
apache2 \
php5 \
php5-mysql \
supervisor \
wget
RUN echo 'mysql-server mysql-server/root_password password root' | \
debconf-set-selections && \
echo 'mysql-server mysql-server/root_password_again password root' | \
debconf-set-selections
RUN apt-get install -qqy mysql-server
RUN wget http://wordpress.org/latest.tar.gz && \
tar xzvf latest.tar.gz && \
cp -R ./wordpress/* /var/www/html && \
rm /var/www/html/index.html
RUN (/usr/bin/mysqld_safe &); sleep 5; mysqladmin -u root -proot create wordpress
COPY wp-config.php /var/www/html/wp-config.php
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
EXPOSE 80
CMD ["/usr/bin/supervisord"]
```
Supervisor 的配置文件supervisord.conf 如下所示。
```shell
[supervisord]
nodaemon=true
[program:mysqld]
command=/usr/bin/mysqld_safe
autostart=true
autorestart=true
user=root
[program:httpd]
command=/bin/bash -c "rm -rf /run/httpd/* && /usr/sbin/apachectl -D FOREGROUND"
```

```shell
systemctl stop firewalld.service
```


```shell
Removing intermediate container e7a58ff15399
Step 6/10 : RUN (/usr/bin/mysqld_safe &); sleep 5; mysqladmin -u root -proot create wordpress
 ---> Running in 22bbaf910011

180727 14:54:51 mysqld_safe Can't log to error log and syslog at the same time.  
Remove all --log-error configuration options for --syslog to take effect.
180727 14:54:51 mysqld_safe Logging to '/var/log/mysql/error.log'.
180727 14:54:51 mysqld_safe Starting mysqld daemon with databases from /var/lib/mysql
 ---> 5c7d524684b7
Removing intermediate container 22bbaf910011
Step 7/10 : COPY wp-config.php /var/www/html/wp-config.php
 ---> 32e2e48378f7
Removing intermediate container d2675665075c
Step 8/10 : COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
 ---> 59040663df32
Removing intermediate container 8ba631b245f7
Step 9/10 : EXPOSE 80
 ---> Running in e76d2f0fa18a
 ---> 7449990e9132
Removing intermediate container e76d2f0fa18a
Step 10/10 : CMD /usr/bin/supervisord
 ---> Running in e055fda53294
 ---> b6d903ee943c
Removing intermediate container e055fda53294
Successfully built b6d903ee943c
[root@localhost supervisor]# 
```

检查运行结果：
```shell
[root@localhost supervisor]# docker images
REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
wordpress                       latest              b6d903ee943c        13 minutes ago      498 MB
busybox2                        latest              2e6f7aa0f8b5        4 hours ago         1.16 MB
busybox3                        latest              2e6f7aa0f8b5        4 hours ago         1.16 MB
docker.io/mysql                 latest              5dbe5b6313e1        13 hours ago        445 MB
docker.io/python                2.7                 17c0fe4e76a5        44 hours ago        908 MB
docker.io/coderdream/node_pm2   latest              5673b666addd        3 days ago          701 MB
docker.io/wordpress             latest              de5872642db1        6 days ago          408 MB
docker.io/node                  latest              52fe93b8eea7        6 days ago          674 MB
docker.io/jenkins               latest              cd14cecfdb3a        9 days ago          696 MB
docker.io/redis                 latest              f06a5773f01e        10 days ago         83.4 MB
docker.io/ubuntu                14.04               971bb384a50a        10 days ago         188 MB
docker.io/busybox               latest              22c2dd5ee85d        10 days ago         1.16 MB
docker.io/centos                7                   49f7960eb7e4        7 weeks ago         200 MB
docker.io/centos                latest              49f7960eb7e4        7 weeks ago         200 MB
docker.io/jpetazzo/nsenter      latest              c16fe938c1a5        2 years ago         371 MB
[root@localhost supervisor]# 
```

如果你有很多停止中的容器待删除，可以在一条命令中使用嵌套的shell 来删
除所有容器。docker ps 的-q 选项只会返回容器的ID 信息，如下所示。

```shell

$ docker rm $(docker ps -a -q)
```

启动一个MySQL 容器，并通过命令行工具的--name 选项为这个容器设置一个名称，通过
MYSQL_ROOT_PASSWORD 环境变量来设置MySQL 的密码，如下所示。
```shell

$ docker run --name mysqlwp -e MYSQL_ROOT_PASSWORD=wordpressdocker -d mysql
```

现在就可以基于wordpress:latest 镜像启动WordPress 容器了。这个容器将会通过--link 选
项链接到MySQL 容器，这样Docker 会自动进行网络配置，让WordPress 容器能访问到
MySQL 容器中暴露出来的端口，如下所示。


```shell
$ docker run --name wordpress --link mysqlwp:mysql -p 80:80 -d wordpress
```

## docker容器iptables failed: iptables ##

今天tomcat的docker容器挂了，只要是带命令-p映射端口就起不来并且报错：


```shell
Error response from daemon: Cannot start container eb9d501f56bc142d9bf75ddfc7ad88383b7388ca6a5959309af2165f1fff6292:
 iptables failed: iptables --wait -t nat -A DOCKER -p tcp -d 0/0 --dport 8081 -j DNAT --to-destination 
172.17.0.164:8080 ! -i docker0: iptables: No chain/target/match by that name.
 (exit status 1)
```



网上查找发现，可能是网络问题造成
首先先验证docker容器内部网络是否能ping通宿主机
如果能ping通，即可通过重建docker0网络恢复
先停掉宿主机上运行的docker容器，然后执行以下命令
在宿主机执行：

问题即可解决。

```shell
pkill docker 
iptables -t nat -F 
ifconfig docker0 down 
brctl delbr docker0 
docker -d
service network restart
```

----------

令人感兴趣的是，你可以通过设置几个环境变量来创建一个数据库，并且只有具有相应权限的用户才能操作数据库：MYSQL_DATABASE、MYSQL_USER 和MYSQL_PASSWORD。在前面的例子中，WordPress 使用了MySQL 的root 用户，这并不是一个好实践。最好是创建一个名
为wordpress 的数据库，并为其创建一个用户，像下面这样。

```shell
$ docker run --name mysqlwp -e MYSQL_ROOT_PASSWORD=wordpressdocker \
-e MYSQL_DATABASE=wordpress \
-e MYSQL_USER=wordpress \
-e MYSQL_PASSWORD=wordpresspwd \
-d mysql

f2e90fa9fc2dc245d78931e84c9c140e7a0516fd3c455108eecc5594bf2c8732
[root@localhost ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
f2e90fa9fc2d        mysql               "docker-entrypoint..."   10 seconds ago      Up 9 seconds        3306/tcp            mysqlwp
[root@localhost ~]# 
```



如果你需要删除所有容器，可以使用下面这种嵌套shell 的快捷方式。




```shell
$ docker stop $(docker ps -q)
$ docker rm -v $(docker ps -aq)
```

docker rm 命令的-v 选项用来删除MySQL 镜像中定义的数据卷。
数据库容器启动之后，可以启动WordPress 容器并指定你设置好的数据库表，如下所示。
```shell
$ docker run --name wordpress --link mysqlwp:mysql -p 80:80 \
-e WORDPRESS_DB_NAME=wordpress \
-e WORDPRESS_DB_USER=wordpress \
-e WORDPRESS_DB_PASSWORD=wordpresspwd \
-d wordpress

ed3aedac94853b53b5f98ce30637a60103f24e44c4f63c69753b3a832f6dbc1a
[root@localhost ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS                NAMES
ed3aedac9485        wordpress           "docker-entrypoint..."   About a minute ago   Up About a minute   0.0.0.0:80->80/tcp   wordpress
f2e90fa9fc2d        mysql               "docker-entrypoint..."   4 minutes ago        Up 4 minutes        3306/tcp             mysqlwp
[root@localhost ~]# 

```



有一种方式可以在容器被docker rm -v 命令删除之后也能保留数据，就是将宿主机的卷挂载到容器中。如果你只是使用docker rm 命令来删除容器，那么这个容器的镜像所定义的卷会在磁盘上保留，尽管这时容器已经不存在了。如果看一下构建这个MySQL 镜像的Dockerfile 文件（https://github.com/docker-library/mysql/blob/d6268ace61047c74468d7c59b4d8da6be5dec16a/5.6/Dockerfile），将会看到VOLUME /var/lib/mysql 这一行。这一行的意思是，当你基于该镜像启动一个容器时，可以将宿主机的文件夹绑定到容器中的这个挂载点上，比如下面这样。

```shell
$ docker run --name mysqlwp -e MYSQL_ROOT_PASSWORD=wordpressdocker \
-e MYSQL_DATABASE=wordpress \
-e MYSQL_USER=wordpress \
-e MYSQL_PASSWORD=wordpresspwd \
-v /home/docker/mysql:/var/lib/mysql \
-d mysql
```

上面命令中-v /home/docker/mysql:/var/lib/mysql 这一行进行了宿主机和容器中卷的绑定。当完成WordPress 的设置之后，在宿主机/home/docker/mysql 文件夹下就能看到这些文件变动。
```shell
$ ls mysql/
auto.cnf ibdata1 ib_logfile0 ib_logfile1 mysql performance_schema wordpress
```

为了对整个MySQL 数据库进行备份， 可以使用docker exec 命令在容器内执行mysqldump，如下所示。
```shell
$ docker exec mysqlwp mysqldump --all-databases \
--password=wordpressdocker > wordpress.backup
```

现在你可以使用传统方式来进行数据库的备份和恢复了。比如，在云环境中，你可能会将Elastic Block Store（例如AWS EBS）挂载到一个主机实例，再挂载到容器中。你也可以将你的MySQL 备份保存到Elastic Storage（比如AWS S3）中。



## 1.18　在宿主机和容器之间共享数据 ##
1.18.1　问题
你在宿主机上有一些数据，想在容器中也能访问到这些数据。
1.18.2　解决方案
在运行docker run 命令时，通过设置-v 选项将宿主机的卷挂载到容器中。
比如，你想将宿主机/cookbook 目录下的工作目录与容器共享，可以执行以下指令。
```shell
$ ls
data
$ docker run -ti -v "$PWD":/cookbook ubuntu:14.04 /bin/bash
root@11769701f6f7:/# ls /cookbook
data
```
在这个例子中，宿主机上的当前工作目录会挂载到容器中的/cookbook 目录上。如果你在
容器内创建了文件或者文件夹，那么这些修改会直接反映到宿主机上，如下所示。
```shell
[root@localhost cookbook]# docker run -ti -v "$PWD":/cookbook ubuntu:14.04 /bin/bash
root@4b4e299fd8f0:/# ls /cookbook
foobar  test
root@4b4e299fd8f0:/# vi test
root@4b4e299fd8f0:/# ls
bin  boot  cookbook  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@4b4e299fd8f0:/# cd cookbook/
root@4b4e299fd8f0:/cookbook# ls
foobar  test
root@4b4e299fd8f0:/cookbook# ls -i -l test  
106199737 -rw-r--r--. 1 root root 5 Jul 27 14:58 test
```

默认情况下，Docker 会以读写模式挂载数据卷。如果想以只读方式挂载数据卷，可以在卷名称后通过冒号设置相应的权限。比如在前面的例子中，如果想以只读方式将工作目录挂载到/cookbook，可以使用-v "$PWD":/cookbook:ro。可以通过docker inspect 命令来查看数据卷的挂载映射情况。参考范例9.1 可以获取更多有关inspect 的介绍。
```shell
root@4b4e299fd8f0:/cookbook# exit
exit
[root@localhost cookbook]# docker inspect -f {{.Mounts}} 4b4e299fd8f0
[{bind  /cookbook /cookbook   true rprivate}]
```
## 1.19　在容器之间共享数据 ##
1.19.1　问题
你已经知道了如何将宿主机中的数据卷挂载到运行中的容器上，但是你想和其他容器共享在一个容器中定义的卷。
卷。这样做的优点是让Docker 去负责管理卷，并且遵循了单一职责这一原则。
1.19.2　解决方案
使用数据容器。在范例1.18 中，你已经知道了如何将宿主机中的卷挂载到容器中，可以使用docker run 命令的-v 选项指定宿主机中的卷，以及该卷在容器中要挂载的路径。如果省略了宿主机中的路径，那么你就创建了一个称为􀺕􀨍􀶹􀴗的容器。
容器启动后会在内部创建参数中指定的卷，这是一个具备读写权限的文件系统，它不在容器镜像最顶层的只读层之上。Docker 会负责管理这个文件系统，但你也可以在宿主机上对其进行读写。下面我们就来看看它是如何工作的。（为了方便说明，这里对卷的ID 进行了截断。）

```shell
$ [root@localhost supervisor]# docker run -ti -v /cookbook ubuntu:14.04 /bin/bash
root@3f2119ea87c8:/# touch /cookbook/foobar
root@3f2119ea87c8:/#  ls cookbook/
foobar
root@3f2119ea87c8:/# exit
exit

$ docker inspect -f {{.Mounts}} 3f2119ea87c8
[{dbba7caf8d07b862b61b39... /var/lib/docker/volumes/dbba7caf8d07b862b61b39... \
/_data /cookbook local true}]
$ sudo ls /var/lib/docker/volumes/dbba7caf8d07b862b61b39...
foobar
```





```shell
$ sudo touch /var/lib/docker/volumes/2c5ca98b2d830b5b8b5568835852aa18dfcd3f44f515db3514543820ceba5304/_data/foobar2
$ docker start 3f2119ea87c8
$ docker exec -ti 3f2119ea87c8 /bin/bash
```

```shell
[{volume 2c5ca98b2d830b5b8b5568835852aa18dfcd3f44f515db3514543820ceba5304 /var/lib/docker/
volumes/2c5ca98b2d830b5b8b5568835852aa18dfcd3f44f515db3514543820ceba5304/_data /cookbook local  true }]

[root@localhost /]# sudo ls 
/  /var/lib/docker/volumes/2c5ca98b2d830b5b8b5568835852aa18dfcd3f44f515db3514543820ceba5304/_data
foobar	foobar2

[root@localhost cookbook]# sudo touch 
/var/lib/docker/volumes/2c5ca98b2d830b5b8b5568835852aa18dfcd3f44f515db3514543820ceba5304/_data/foobar2
[root@localhost cookbook]# 
[root@localhost supervisor]# docker start 3f2119ea87c8
3f2119ea87c8
[root@localhost supervisor]# docker exec -ti 3f2119ea87c8 /bin/bash
root@3f2119ea87c8:/# ls /cookbook/
foobar  foobar2
root@3f2119ea87c8:/# 

```
这个容器并没有处于运行状态。但是它的卷映射关系已经存在，并且卷被持久化到了/var/lib/docker/vfs/dir 下面。你可以通过docker rm -v data 命令来删除容器和它的卷。如果你没有使用rm -v 选项来删除容器和它的卷，那么系统中将会遗留很多没有被使用的卷。
即使这个数据容器没有运行，你也可以通过--volumes-from 来挂载其中的卷，如下所示。


```shell
[root@localhost ~]# docker run -v /data --name data ubuntu:14.04
[root@localhost ~]# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
3f2119ea87c8        ubuntu:14.04        "/bin/bash"         10 minutes ago      Up 5 minutes                            gifted_bohr
[root@localhost ~]# docker inspect -f {{.Mounts}} data
[{volume d990ed9a1804922aa13f0f222e206302d9a0f722d376d53791cf0993ae92a525 /var/lib/docker/volumes/
d990ed9a1804922aa13f0f222e206302d9a0f722d376d53791cf0993ae92a525/_data /data local  true }]
[root@localhost ~]# docker run -ti --volumes-from data ubuntu:14.04 /bin/bash
root@2327f6d111c5:/# touch /data/foobar
root@2327f6d111c5:/# exit
exit

[root@localhost ~]# sudo ls /var/lib/docker/volumes/d990ed9a1804922aa13f0f222e206302d9a0f722d376d53791cf0993ae92a525/_data
foobar
[root@localhost ~]# 




```


## 1.20　对容器进行数据复制 ##
1.20.1　问题
你有一个运行中的容器，没有设置任何卷映射信息，但是你想从容器内复制数据出来或者将数据复制到容器里。
1.20.2　解决方案
使用docker cp 命令将文件从正在运行的容器复制到Docker 主机。docker cp 命令支持在Docker 主机与容器之间进行文件复制。其用法很简单，如下所示。

```shell
$ docker cp
"docker cp" requires exactly 2 argument(s).
See 'docker cp --help'.

Usage:  docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-
	docker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH

Copy files/folders between a container and the local filesystem

```
为了讲解它是如何工作的，我们先启动一个容器，并让它执行睡眠操作。然后你可以进入到这个容器，并手动创建一个文件，如下所示。


```shell
$ docker run -d --name testcopy ubuntu:14.04 sleep 360
$ docker exec -ti testcopy /bin/bash
root@b81793e9eb3e:/# cd /root
root@b81793e9eb3e:~# echo 'I am in the container' > file.txt
root@b81793e9eb3e:~# exit
```

要将在容器中创建的这个文件复制到宿主机上，使用docker cp 即可，如下所示。

```shell
$ docker cp testcopy:/root/file.txt .
$ cat file.txt
I am in the container
```

要想将文件从宿主机复制到容器，仍然可以使用docker cp 命令，只不过源和目的文件的参数要调换一下位置，如下所示。

```shell
$ echo 'I am in the host' > host.txt
$ docker cp host.txt testcopy:/root/host.txt
```


一个比较好的使用场景是将一个容器中的文件复制到另一个容器中，这可以通过临时先将主机作为文件的中转站，执行两次docker cp 命令来实现。比如，如果想将/root/file.txt 从两个运行容器中的c1 复制到c2，可以使用下面的命令。


```shell
$ docker cp c1:/root/file.txt .
$ docker file.txt c2:/root/file.txt
```
1.20.3　讨论
如果是1.8 版本之前的Docker，docker cp 还不支持将文件从宿主机复制到容器中。不过你可以组合使用docker exec 和一些shell 重定向，如下所示。

```shell
$ echo 'I am in the host' > host.txt
$ docker exec -i testcopy sh -c 'cat > /root/host.txt' < host.txt
$ docker exec -i testcopy sh -c 'cat /root/host.txt'
I am in the host
```
现在，新版本的Docker 已不需要再像上面那样麻烦了，但是上面的例子很好地展示了docker exec 命令的强大之处。





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

























