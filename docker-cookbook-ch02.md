# <span id= "20180730">Docker 经典实例 第2章 创建和共享镜像</span> #

2.1　将对容器的修改提交到镜像
----------
Docker常用命令

在命令行提示符下键入docker，将会显示docker 命令的使用方法，如下所示。
```shell
$ docker run -t -i ubuntu:14.04 /bin/bash
```
在Docker中运行Hello World
```shell
[root@localhost ~]# docker run -t -i ubuntu:14.04 /bin/bash
root@a119ac6c26b0:/# apt-get update
```
当你退出容器后，容器会停止运行，但容器还在，直到你通过docker rm 命令彻底将容器从系统中删除。所以在删除容器之前，可以提交对容器作出的修改，并以此创建一个新的镜像ubuntu:update。镜像的名称为ubuntu，同时添加了一个标签update（参见范例2.6），以与ubuntu:latest 镜像加以区分。



```shell
$ docker commit a119ac6c26b0 ubuntu:update
sha256:423594de941de96edf6c5e82735814f0b904ddd2bf2ec1efd857a30b014b90b1
```

```shell
$ docker images
[root@localhost ~]# docker images
REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
ubuntu                          update              423594de941d        31 seconds ago      209 MB
```

现在你就可以安全地删除已经停止的容器了，同时也可以基于刚创建的ubuntu:update 镜像启动新的容器。

2.1.3　讨论
可以通过docker diff 命令来查看在容器中对镜像作出的修改，如下所示。


```shell
$ docker diff a119ac6c26b0
C /root
A /root/.bash_history
C /run
D /run/secrets
C /tmp
C /var
C /var/cache
C /var/cache/apt
D /var/cache/apt/pkgcache.bin
D /var/cache/apt/srcpkgcache.bin
C /var/lib
C /var/lib/apt/lists
A /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty-backports_InRelease
A /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty-backports_main_binary-amd64_Packages.gz
A /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty-backports_multiverse_binary-amd64_Packages.gz
A /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty-backports_restricted_binary-amd64_Packages.gz
A /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty-backports_universe_binary-amd64_Packages.gz
A /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty-updates_InRelease
A /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty-updates_main_binary-amd64_Packages.gz
A /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty-updates_multiverse_binary-amd64_Packages.gz
A /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty-updates_restricted_binary-amd64_Packages.gz
A /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty-updates_universe_binary-amd64_Packages.gz
A /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty-updates_universe_source_Sources.gz
C /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty_Release
C /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty_Release.gpg
A /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty_main_binary-amd64_Packages.gz
A /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty_multiverse_binary-amd64_Packages.gz
A /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty_restricted_binary-amd64_Packages.gz
A /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty_universe_binary-amd64_Packages.gz
A /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_trusty_universe_source_Sources.gz
C /var/lib/apt/lists/lock
D /var/lib/apt/lists/partial
A /var/lib/apt/lists/security.ubuntu.com_ubuntu_dists_trusty-security_InRelease
A /var/lib/apt/lists/security.ubuntu.com_ubuntu_dists_trusty-security_main_binary-amd64_Packages.gz
A /var/lib/apt/lists/security.ubuntu.com_ubuntu_dists_trusty-security_multiverse_binary-amd64_Packages.gz
A /var/lib/apt/lists/security.ubuntu.com_ubuntu_dists_trusty-security_restricted_binary-amd64_Packages.gz
A /var/lib/apt/lists/security.ubuntu.com_ubuntu_dists_trusty-security_universe_binary-amd64_Packages.gz
A /var/lib/apt/lists/security.ubuntu.com_ubuntu_dists_trusty-security_universe_source_Sources.gz
C /var/lib/dpkg
C /var/lib/dpkg/lock


```


## 2.2　将镜像和容器保存为tar文件进行共享 ##

你创建了一些镜像，或者有一些容器，你希望能将它们保存下来并与你的同伴共享。

对于已有镜像，可以使用Docker 命令行的save 和load 命令来创建一个压缩包（tarball）；
而对于容器，可以使用import 和export 进行导入导出操作。
让我们从一个停止的容器开始，将它导出为一个新的压缩包文件，如下所示。


```shell
$ docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                       PORTS               NAMES
a119ac6c26b0        ubuntu:14.04        "/bin/bash"         10 minutes ago      Exited (127) 2 minutes ago                       flamboyant_mccarthy
bee6170fdc67        ubuntu:14.04        "sleep 360"         2 days ago          Exited (0) 2 days ago                            testcopy
```

```shell
$ docker export a119ac6c26b0 > update.tar
$ [root@localhost ~]# ls -l
total 313584
-rw-r--r--.  1 root root  195293696 Jul 30 19:33 update.tar
```

可以在本地将容器提交为一个新镜像（参见范例2.1），但是也可以使用Docker import 命令，如下所示。

```shell
[root@localhost ~]# docker import - update < update.tar
sha256:a8eed67e042383ff3a5d4b774259167e18eb48be467f0cbe459d90a3f78ccf54
[root@localhost ~]# docker images
REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
update                          latest              a8eed67e0423        5 seconds ago       186 MB
```

如果想和你的同伴共享这个镜像，可以将这个镜像上传到一个Web 服务器，你的同伴将这个镜像下载之后再通过Docker 的import 命令将镜像导入本地即可。

如果要对你通过提交操作创建的镜像进行导入导出，可以使用load 和save 命令，如下所示。


```shell
[root@localhost ~]# docker save -o update1.tar update
[root@localhost ~]# ls -l
total 504312
-rw-------.  1 root root  195301888 Jul 30 19:37 update1.tar
-rw-r--r--.  1 root root  195293696 Jul 30 19:33 update.tar
```



```shell
[root@localhost ~]# docker rmi update
Untagged: update:latest
Deleted: sha256:a8eed67e042383ff3a5d4b774259167e18eb48be467f0cbe459d90a3f78ccf54
Deleted: sha256:a9942b3332809ca47b2582ad0e4d36aa5d675885423d7e8d2b9052e815254b70
```

```shell
[root@localhost ~]# docker load < update1.tar 
a9942b333280: Loading layer [==================================================>] 195.3 MB/195.3 MB
Loaded image: update:latest
```
注意：Image ID没有变化
```shell
[root@localhost ~]# docker images
REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
update                          latest              a8eed67e0423        3 minutes ago       186 MB
ubuntu                          update              423594de941d        9 minutes ago       209 MB
```
## 2.3　编写你的第一个Dockerfile ##
要想自动构建Docker 镜像，你需要通过一个名为Dockerfile 的说明文件来描述镜像构建的步骤。这个文本文件使用一组指令来描述以下各项内容：新镜像的基础镜像，为了安装不同的依赖和应用程序需要执行哪些操作步骤，镜像中需要提供哪些文件，这些文件是怎么复制到镜像中的，要暴露哪些端口，以及在新的容器中启动时默认运行什么命令，此外还有一些其他的内容。

为了对此进行说明，让我们开始编写我们的第一个Dockerfile。从该Dockerfile 构建的镜像启动新的容器时，会执行/bin/echo 命令。在当前工作目录中创建一个名为 Dockerfile 的文本文件，文件内容如下所示。
```shell
FROM ubuntu:14.04

ENTRYPOINT ["/bin/echo"]
```

FROM 指令指定了新的镜像以哪个镜像为基础开始构建。这里我们选择了ubuntu:14.04 镜像作为基础镜像。ubuntu:14.04 是来自Docker Hub 上由Ubuntu 官方提供的镜像仓库（https://registry.hub.docker.com/_/ubuntu/）。ENTRYPOINT 指令设置了从该镜像创建的容器启动时需要执行的命令。要想构建这个镜像，可以在命令行提示符下键入docker build . 命令，如下所示。


```shell
[root@localhost ch02]# docker build .
Sending build context to Docker daemon 2.048 kB
Step 1/2 : FROM ubuntu:14.04
 ---> 971bb384a50a
Step 2/2 : ENTRYPOINT /bin/echo
 ---> Running in 61f829a4320d
 ---> 49ecf0a6248d
Removing intermediate container 61f829a4320d
Successfully built 49ecf0a6248d
```

```shell
[root@localhost ch02]# docker images
REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
<none>                          <none>              49ecf0a6248d        31 seconds ago      188 MB
```



```shell
$ docker run 49ecf0a6248d Hi Docker !
Hi Docker !
```

你也可以在Dockerfile 文件中使用CMD 指令。使用该指令的优点是，你可以在启动容器时，通过在docker run 命令后面指定新的CMD 参数来覆盖Dockerfile 文件中设置的内容。让我们使用CMD 指令来构建一个新镜像，如下所示。
```shell
FROM ubuntu:14.04
CMD ["/bin/echo" , "Hi Docker !"]
```

构建这个镜像并运行它，如下所示。
```shell
[root@localhost 02]# docker build .
Sending build context to Docker daemon 2.048 kB
Step 1/2 : FROM ubuntu:14.04
 ---> 971bb384a50a
Step 2/2 : CMD /bin/echo Hi Docker !
 ---> Running in 7bac63be0be7
 ---> 2876087ce7c0
Removing intermediate container 7bac63be0be7
Successfully built 2876087ce7c0
[root@localhost 02]# docker images
REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
<none>                          <none>              2876087ce7c0        18 seconds ago      188 MB
<none>                          <none>              49ecf0a6248d        2 hours ago         188 MB
[root@localhost 02]# docker run 2876087ce7c0
Hi Docker !
```

在上面的构建命令中，我们指定了当前文件夹路径。这时候Docker 会自动使用刚才创建的Dockerfile 文件。如果希望在构建镜像的时候使用在其他位置保存的Dockerfile，可以使用docker build 命令的-f 参数来指定Dockerfile文件的位置。

上面的操作看起来与之前的例子一模一样，但是，如果在docker run 命令后面指定一个其他的可执行命令，那么该命令就会被执行，而不是执行在Dockerfile 文件中定义的/bin/echo 命令，如下所示。

```shell
[root@localhost 02]#  docker run 2876087ce7c0 /bin/date
Mon Jul 30 13:53:04 UTC 2018
```


新的镜像并没有仓库名和标签信息，因为在构建时我们并没有指定这些信息。可以重新构建该镜像，通过docker build 命令的-t 参数将仓库名设置为cookbook，将标签设置为hello。由于这些操作都是在本地进行的，所以你可以随意对镜像仓库和标签进行命名。但是，如果你想将该镜像发布到镜像registry，就需要遵循一定的命名约定。
```shell
[root@localhost 02]# docker build -t cookbook:hello .
Sending build context to Docker daemon 2.048 kB
Step 1/2 : FROM ubuntu:14.04
 ---> 971bb384a50a
Step 2/2 : CMD /bin/echo Hi Docker !
 ---> Using cache
 ---> 2876087ce7c0
Successfully built 2876087ce7c0
[root@localhost 02]# docker images
REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
cookbook                        hello               2876087ce7c0        3 minutes ago       188 MB

```
docker build 命令有几个选项可以用来设置如何处理构建过程中的临时容器，如下所示。
```shell
[root@localhost 02]# docker build --help

Usage:	docker build [OPTIONS] PATH | URL | -

Build an image from a Dockerfile

Options:
      --build-arg list             Set build-time variables (default [])
      --cache-from stringSlice     Images to consider as cache sources
      --cgroup-parent string       Optional parent cgroup for the container
      --compress                   Compress the build context using gzip
      --cpu-period int             Limit the CPU CFS (Completely Fair Scheduler) period
      --cpu-quota int              Limit the CPU CFS (Completely Fair Scheduler) quota
  -c, --cpu-shares int             CPU shares (relative weight)
      --cpuset-cpus string         CPUs in which to allow execution (0-3, 0,1)
      --cpuset-mems string         MEMs in which to allow execution (0-3, 0,1)
      --disable-content-trust      Skip image verification (default true)
  -f, --file string                Name of the Dockerfile (Default is 'PATH/Dockerfile')
      --force-rm                   Always remove intermediate containers
      --help                       Print usage
      --isolation string           Container isolation technology
      --label list                 Set metadata for an image (default [])
  -m, --memory string              Memory limit
      --memory-swap string         Swap limit equal to memory plus swap: '-1' to enable unlimited swap
      --network string             Set the networking mode for the RUN instructions during build (default "default")
      --no-cache                   Do not use cache when building the image
      --pull                       Always attempt to pull a newer version of the image
  -q, --quiet                      Suppress the build output and print image ID on success
      --rm                         Remove intermediate containers after a successful build (default true)
      --security-opt stringSlice   Security options
      --shm-size string            Size of /dev/shm, default value is 64MB
  -t, --tag list                   Name and optionally a tag in the 'name:tag' format (default [])
      --ulimit ulimit              Ulimit options (default [])
  -v, --volume list                Set build-time bind mounts (default [])
```
## 2.4　将Flask应用打包到镜像 ##

2.4.1　问题
你有一个基于Python 框架Flask（http://flask.pocoo.org）编写的Web 应用程序，该程序运行于Ubuntu 14.04 之上。你希望在容器中运行这个应用。
2.4.2　解决方案
这里我们使用一个很简单的Hello World（http://flask.pocoo.org）应用为例进行说明，其Python 代码如下所示。
hello.py
```shell
#!/usr/bin/env python
from flask import Flask
app = Flask(__name__)
@app.route('/hi')
def hello_world():
return 'Hello World!'
if __name__ == '__main__':
app.run(host='0.0.0.0', port=5000)
```

为了让这个应用程序能够在Docker 容器中运行，你需要编写一个Dockerfile 文件，在Dockerfile 文件中使用RUN 指令来安装运行该程序所需要的软件，使用EXPOSE 指令将应用程序监听的端口暴露给外部。同时你需要使用ADD 指令将应用程序复制到容器内的文件系统上。

这个应用程序的Dockerfile 如下所示。

```shell
FROM ubuntu:14.04
RUN apt-get update
RUN apt-get install -y python
RUN apt-get install -y python-pip
RUN apt-get clean all
RUN pip install flask
ADD hello.py /tmp/hello.py

EXPOSE 5000
CMD ["python","/tmp/hello.py"]
```

这里我们并没有刻意对Dockerfile 文件进行优化。当你理解了Dockerfile 的基本概念之后，可以参考范例2.5 来根据编写Dockerfile 的最佳实践构建镜像。RUN 指令允许你在构建镜像过程中执行指定的shell 命令。在这个例子中我们更新了仓库缓存，安装了Python 和Pip，然后安装了Flask 微框架。

通过ADD 命令可以将应用程序复制到镜像内。这里将hello.py 文件复制到了/tmp/ 文件夹下。
这个应用程序使用了5000 端口，并将这个端口暴露给了Docker 主机。
最后通过CMD 指令设置了容器启动时将会执行的命令python /tmp/hello.py。
剩下的工作就是构建镜像了，如下所示。
```shell
[root@localhost 0204]# docker build -t flask .
Sending build context to Docker daemon 3.072 kB
Step 1/9 : FROM ubuntu:14.04
 ---> 971bb384a50a
Step 2/9 : RUN apt-get update
 ---> Using cache
 ---> a523343925d9
Step 3/9 : RUN apt-get install -y python
 ---> Using cache
 ---> 4b856d6568bb
Step 4/9 : RUN apt-get install -y python-pip
 ---> Using cache
 ---> 290f2b70942b
Step 5/9 : RUN apt-get clean all
 ---> Using cache
 ---> 6b9f87c1be8d
Step 6/9 : RUN pip install flask
 ---> Using cache
 ---> 335b77cfe982
Step 7/9 : ADD hello.py /tmp/hello.py
 ---> e2db7094ae9f
Removing intermediate container 7438d644414b
Step 8/9 : EXPOSE 5000
 ---> Running in f4832e6bc1a3
 ---> 22a402b06918
Removing intermediate container f4832e6bc1a3
Step 9/9 : CMD python /tmp/hello.py
 ---> Running in cd7a8c7e44c0
 ---> b0314dfa5bdd
Removing intermediate container cd7a8c7e44c0
Successfully built b0314dfa5bdd
[root@localhost 0204]# 

```

该命令将会创建一个flask Docker 镜像，如下所示。

```shell
[root@localhost 0204]# docker images
REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
flask                           latest              b0314dfa5bdd        55 seconds ago      364 MB
```

启动容器时，使用docker run 的-d 选项，这将会让容器以后台守护方式运行，docker run的-P 选项告诉Docker 在宿主机上选择一个端口并映射到在Dockerfile 中设置的端口（比如 5000）。
```shell
[root@localhost 0204]# docker run -d -P flask
1c4a2a540df9bf030b327bcebf37825b622f392f2f003627db1fbec74c2b7e2f
[root@localhost 0204]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                     NAMES
1c4a2a540df9        flask               "python /tmp/hello.py"   6 seconds ago       Up 5 seconds        0.0.0.0:32769->5000/tcp   thirsty_saha

```

该容器会进入后台方式并立即返回，你不会登录到交互式shell 中。PORTS 字段显示了容器中的5000 端口被映射到了Docker 宿主机的 32769 端口上。简单地通过curl 命令访问http://localhost:32769/hi 会看到Hello World 输出结果，或者你也可以在浏览器中打开这个URL。

2.4.3　讨论
由于你已经在Dockerfile 中通过CMD 指令设置了容器要运行的命令，所以在启动容器的时候没有必要在镜像名后面指定要运行的命令。但是你可以覆盖这个默认运行的命令，在启动容器时运行bash shell 进入交互模式，如下所示。

```shell
[root@localhost 0204]# docker run -t -i -P flask /bin/bash
root@6d266b2b03fa:/# ls -l /tmp
total 4
-rw-r--r--. 1 root root 196 Jul 30 14:44 hello.py
root@6d266b2b03fa:/# 
```
## 2.5　根据最佳实践优化Dockerfile ##


这个Dockerfile 应该像下面这样进行改写。
```shell
FROM ubuntu:14.04
RUN apt-get update && apt-get install -y \
python
python-pip
RUN pip install flask
COPY hello.py /tmp/hello.py
```
你还可以通过使用官方Python 镜像，来进一步对这个Dockerfile 进行优化，如下所示。
```shell
FROM python:2.7.10
RUN pip install flask
COPY hello.py /tmp/hello.py
```

当然你并不需要做到这种地步，这只是让你对如何优化Dockerfile 有更深入的体会。要想获得更详细的信息，可以参考官方推荐的最佳实践（https://docs.docker.com/articles/dockerfile_best-practices/）。

## 2.6　通过标签对镜像进行版本管理 ##

举例来说，让我们将ubuntu:14.04 镜像重命名为foobar。这里没有指定标签，而只是修改了镜像名，因此Docker 会自动使用latest 标签。
```shell
[root@localhost 0204]# docker images
REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
docker.io/ubuntu                14.04               971bb384a50a        13 days ago         188 MB
```

```shell
[root@localhost 0204]# docker tag ubuntu foobar
Error response from daemon: no such id: ubuntu
[root@localhost 0204]# docker tag ubuntu:14.04 foobar
[root@localhost 0204]# docker images
REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
docker.io/ubuntu                14.04               971bb384a50a        13 days ago         188 MB
foobar                          latest              971bb384a50a        13 days ago         188 MB
```

在上面的例子中，你最先会看到的是，当你尝试给ubuntu 镜像打标签时，Docker 抛出了错误。这是因为ubuntu 镜像只有一个14.04 标签，而没有latest 标签。在你的第二条命令中，你通过冒号为这个镜像指定了本地已有的标签，打标签操作成功了。Docker 创建了一个新的名为foobar 的镜像，并自动添加了latest 标签。如果你在新的镜像名后面使用冒号为镜像设置一个标签，那么你会得到下面的结果。
```shell
[root@localhost 0204]# docker tag ubuntu:14.04 foobar:cookbook
[root@localhost 0204]# docker images
REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
docker.io/ubuntu                14.04               971bb384a50a        13 days ago         188 MB
foobar                          cookbook            971bb384a50a        13 days ago         188 MB
foobar                          latest              971bb384a50a        13 days ago         188 MB
```
## 2.7　使用Docker provider从Vagrant迁移到Docker ##


----------
参考：

1. [如何在CentOS 7上安装Vagrant](https://www.howtoing.com/how-to-install-vagrant-on-centos-7 )
2. [Vagrant入门](https://www.cnblogs.com/davenkin/p/vagrant-virtualbox.html)
3. [CentOS7.2部署FTP](https://blog.csdn.net/xiaofeiaiai/article/details/55048812)

### Vagrant box国内镜像及本地安装教程 ###
https://c4ys.com/archives/1230

Vagrant是非常好的本地开发环境搭建工具。通常使用官方下载都会比较慢，而国内box下载地址较少，所以我特别下载了几个传到百度网盘。

#### Vagrant box的百度网盘下载地址 ####
```shell
Vagrant box Ubuntu 16.04 百度网盘下载地址
https://pan.baidu.com/s/1kVlAz59

Vagrant box Centos 7 百度网盘下载地址
http://pan.baidu.com/s/1gfNCud1

Vagrant box Debian 8 百度网盘下载地址
http://pan.baidu.com/s/1mhAuONu
```
#### 下载后的使用方法 ####
添加vagrant box到box list
```shell
vagrant box add centos7 CentOS-7.box
```
初始化一个虚拟机使用刚才添加的vagrant box
```shell
vagrant init centos7
```
启动vagrant box虚拟机
```shell
vagrant up
```


----------



## 2.11　运行私有registry ##
2.11.1　问题
使用Docker Hub 非常简单。然而，你可能在数据治理方面比较关心将镜像托管在自己基础设施之外所带来的风险。因此，你希望在自己的基础设施之上运行自己的Docker registry。

2.11.2　解决方案
使用Docker registry 镜像（https://hub.docker.com/_/registry/） 创建一个容器。这样，你就拥有了一个私有的registry。
拉取registry 镜像并以守护方式启动一个容器。然后， 你可以通过curl 访问http://localhost:5000/v2 来确认一下registry 是否正常运行，如下所示。

```shell
[root@localhost ~]# docker pull registry:2
Trying to pull repository docker.io/library/registry ... 
2: Pulling from docker.io/library/registry
4064ffdc82fe: Pull complete 
c12c92d1c5a2: Pull complete 
4fbc9b6835cc: Pull complete 
765973b0f65f: Pull complete 
3968771a7c3a: Pull complete 
Digest: sha256:51bb55f23ef7e25ac9b8313b139a8dd45baa832943c8ad8f7da2ddad6355b3c8
Status: Downloaded newer image for docker.io/registry:2

```


```shell
[root@localhost ~]# docker run -d -p 5000:5000 registry:2
d5b4e13cd9f2e63bde9b9798fc03fe75db5c21a6e978834bba460c7c478a3558
```

```shell
[root@localhost ~]# curl -i http://localhost:5000/v2/
HTTP/1.1 200 OK
Content-Length: 2
Content-Type: application/json; charset=utf-8
Docker-Distribution-Api-Version: registry/2.0
X-Content-Type-Options: nosniff
Date: Mon, 30 Jul 2018 17:29:40 GMT

{}[root@localhost ~]# 
```
上面的输出结果显示了Docker registry 正在运行，其API 版本为v2。要想使用这个私有registry，需要按照正确的命名规则，为你之前创建的本地镜像（比如在范例2.4 中创建的flask 镜像）打上标签。在我们的例子中，registry 运行在http://localhost:5000 上，所以我们打标签的时候会使用localhost:5000 作为前缀，并将这个镜像推送到私有registry。也可以使用Docker 主机的IP 地址，如下所示。
```shell
[root@localhost ~]# docker tag busybox localhost:5000/busy
[root@localhost ~]# docker push localhost:5000/busy
The push refers to a repository [localhost:5000/busy]
8e9a7d50b12c: Pushed 
latest: digest: sha256:1bd6df27274fef1dd36eb529d0f4c8033f61c675d6b04213dd913f902f7cafb5 size: 527
[root@localhost ~]# 
```

如果从其他计算机访问这个私有registry，你会收到一个错误消息，提示你的Docker 客户不能使用一个不安全的registry。如果是测试环境（生产环境不建议这样操作），可以编辑你的Docker 配置文件，增加insecure-registry 选项。比如，在Ubuntu 14.04 上编辑/etc/default/docker 文件，添加如下一行。

```shell
DOCKER_OPTS="--insecure-registry 192.168.229.131:5000"
```

重新启动Docker 服务（sudo service docker restart），然后再次访问远程私有registry。
（记住，需要在registry 所在计算机之外的其他计算机上进行上述操作。）

2.11.3　讨论
这个简短的例子使用了registry 的默认设置。默认设置下，不需要进行身份验证，registry是不安全的，会使用本地存储方式，并会使用一个SQLAlchemy 搜索引擎。这些选项都可以通过设置环境变量或者编辑配置文件来修改。这些在官方文档（ https://github.com/docker/distribution ）中都有详细的描述。

通过Docker 镜像运行的registry 是一个使用Golang 编写的应用程序，它对外提供了一套HTTP REST API（https://docs.docker.com/registry/spec/api/ ）。你可以使用自己的Docker 客户端甚至是curl 来访问这个registry。

比如，要想列出私有registry 保存的所有镜像，可以使用/v2/_catalog URI，如下所示。
```shell
$ curl http://localhost:5000/v2/_catalog
{"repositories":["busy"]}
```
如果以不同的标签将busybox 镜像推送到私有registry，你将会在返回的镜像列表中看到这个新添加的镜像，如下所示。

```shell
$ docker tag busybox localhost:5000/busy1
$ docker push localhost:5000/busy1
...
$ curl http://localhost:5000/v2/_catalog
{"repositories":["busy","busy1"]}
```

每个registry 中的镜像都使用清单对镜像进行描述。可以通过/v2//manifests/ 这个API 来获得镜像的清单描述，其中<name> 是镜像的名称，而<reference> 是镜像的标签。

```shell
$ curl http://localhost:5000/v2/busy1/manifests/latest
{
"schemaVersion": 1,
"name": "busy1",
"tag": "latest",
"architecture": "amd64",
"fsLayers": [
{
"blobSum": "sha256:a3ed95caeb02ffe68cdd9fd84406680ae93d633cb16422d..."
},
{
"blobSum": "sha256:1db09adb5ddd7f1a07b6d585a7db747a51c7bd17418d47e..."
},
{
"blobSum": "sha256:a3ed95caeb02ffe68cdd9fd84406680ae93d633cb16422d..."
}
],
...
```

上面看到的每个blob 都代表一个镜像层。可以通过registry API 来进行上传、下载或删除blob 操作。registry API 规范文档页面（ https://docs.docker.com/registry/spec/api/#deleting-animage ）中有详细的介绍。
要想列出一个镜像的所有标签，可以使用v2//tags/listURI，如下所示。

```shell
$ curl http://localhost:5000/v2/busy1/tags/list
{"name":"busy1","tags":["latest"]}
$ docker tag busybox localhost:5000/busy1:foobar
$ docker push localhost:5000/busy1:foobar
$ curl http://localhost:5000/v2/busy1/tags/list
{"name":"busy1","tags":["foobar","latest"]}
```

这些例子都使用了curl，主要是为了让你对registry API 有一个更直观的感受。完整的API文档可以在Docker 的官方网站（ https://docs.docker.com/reference/api/registry_api/#set-a-tagfor-a-specified-image-id ）上找到。
2.11.4　参考
• Docker Hub 上的Docker registry 主页（https://hub.docker.com/）
• GitHub 上更丰富的文档（https://github.com/docker/distribution）
• registry 部署说明（https://docs.docker.com/registry/deploying/）


## 2.12　为持续集成/部署在Docker Hub上配置自动构建 ##

不要设置标准仓库，而是创建自动构建仓库，并指向GitHub 或Bitbucket 上的应用。

选择完要使用的在线版本控制系统之后，需要选择用来构建镜像的项目。这应该是GitHub 或者Bitbucket 中有 **Dockerfile** 文件的项目，你想为这个项目自动构建Docker 镜像。然后你可以设置一个Docker Hub 仓库的名称，选择源代码所在分支，指定Dockerfile所在文件路径。这非常适合想在一个GitHub 或者Bitbucket 仓库中维护多个Dockerfile 的情况。Docker Hub 会在你的GitHub 仓库中创建一个GitHub 钩子。


当完成自动构建的配置之后，你就可以查看到构建的详情。构建的状态会从pending 到building 再到pushing，最后会变为finished。构建完成之后，你就可以拉取新镜像了。

```shell
[root@localhost ~]# docker pull coderdream/cobertura-demo
Using default tag: latest
Trying to pull repository docker.io/coderdream/cobertura-demo ... 
latest: Pulling from docker.io/coderdream/cobertura-demo
8284e13a281d: Already exists 
26e1916a9297: Already exists 
4102fc66d4ab: Already exists 
1cf2b01777b2: Already exists 
7f7a2d5e04ed: Already exists 
Digest: sha256:951c00de132e4be19ac94361a8ff8635b66400ddb100e062056253b2815872bf
Status: Downloaded newer image for docker.io/coderdream/cobertura-demo:latest
[root@localhost ~]# docker images
REPOSITORY                            TAG                 IMAGE ID            CREATED             SIZE
docker.io/coderdream/cobertura-demo   latest              92d810dd5e65        8 hours ago         188 MB
```

Dockerfile 选项卡会根据你的GitHub 仓库中的Dockerfile 文件的内容自动生成。如果存在README.md 文件，则会自动根据README.md 文件生成Information 选项卡的内容。

向GitHub 仓库推送了新的提交之后，Docker Hub 会自动触发一次镜像构建。当构建完成之后，新的镜像就可以使用了。

你也可以修改构建设置，从不同的分支触发构建，并为镜像设置不同的标签。比如，你可以从主分支进行构建并设置相关的标签为latest，使用发
布分支进行构建并设定一个不同标签（比如，为从1.0 分支构建的镜像设置1.0 的标签）。


除了通过向GitHub 或者Bitbucket 推送代码来自动触发构建，也可以通过发送一个HTTP的POST 请求到指定的URL 来触发构建，这个URL 可以在Build Trigger 页面得到。为了防止对Docker Hub 造成滥用，有些构建可能会被忽略。


## 2.13　使用Git钩子和私有registry建立本地自动构建环境 ##


使用Docker Hub、GitHub 或者Bitbucket 进行自动构建非常实用（参见范例2.12），但是你可能正在使用私有registry（比如一个本地的hub），并且希望在向本地的Git 项目中推送代码时触发Docker 镜像构建。

2.13.2　解决方案

创建一个Git 的post-commit 钩子，由它来触发一个构建并将新镜像推送到你的私有registry。
在你Git 项目的根文件夹下创建一个bash 脚本./git/hooks/post-commit，它的内容比较简单，如下所示。

```shell
#!/bin/bash
tag=`git log -1 HEAD --format="%h"`
docker build -t flask:$tag /home/coderdream/docbook/examples/flask
```

使用chmod +x .git/hooks/post-commit 命令将文件的属性设置为可执行。
现在，每当你向Git 项目中提交代码，bash 脚本post-commit 都会被执行。它将会使用提
交SHA 的简短散列字符串作为新的tag，并使用指定Dockerfile 文件触发一次构建。之后
它就会构建一个新的名为flask 的镜像，并使用由程序生成的标签。
$ git commit -m "fixing hook"
9c38962
Sending

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

```shell

```



```shell

```

```shell

```























