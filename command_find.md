## Centos之文件搜索命令find ##


### 语法 ###
```shell
find [搜索范围] [搜索条件]
```

### 搜索文件 ###

```shell
find / -name install.log
#  避免大范围搜索，会非常耗费系统资源
#  find是在系统当中搜索符合条件的文件名。如果需要匹配，使用通配符匹配，通配符是完全匹配。
```

```shell
[root@localhost ~]# ls
222  anaconda-ks.cfg  牛逼  牛牛
[root@localhost ~]# find / -name 牛牛
/root/牛牛
/tmp/牛牛
[root@localhost ~]# find / -name 牛
[root@localhost ~]# 
```


我们发现 搜索牛牛 能搜索到结果，但是搜索牛，么有结果，所以说 find搜索 是完全匹配搜索；

 
如果我们需要进行模糊查询，我们要使用通配符；



```shell
* 匹配任意内容  

?匹配任意一个字符 

[]匹配任意一个中括号的字符
```

我们创建一些文件来测试

```shell
[root@localhost ~]# ls
222  anaconda-ks.cfg  牛逼  牛逼2  牛牛  牛牛2

[root@localhost ~]# find / -name "牛*"
/root/牛逼
/root/牛牛
/root/牛逼2
/root/牛牛2
/tmp/牛牛
``` 
查找开头是 “牛”的所有文件

### 查找root目录下，所以“牛”开头然后后面接一位字符的文件 ###
```shell
[root@localhost ~]# find /root -name "牛?"
/root/牛逼
/root/牛牛
``` 

### 查找首尾分别是“牛”“2”，中间字符串是“牛逼”当中的任一字符的文件 ###
```shell
[root@localhost ~]# find /root -name "牛[牛逼]2"

/root/牛逼2

/root/牛牛2

[root@localhost ~]# 
``` 

### 不区分大小写 ###
```shell
find /root -iname anaconda-ks.cfg
``` 

### 根据所有者搜索 ###

```shell
find /root -user root
```

### 查找没有所有者的文件 ###

```shell
find /root -nouser
```



### linux是严格区分大小写的，假如用iname 查询时不区分大小写 ###

```shell
[root@localhost ~]# find /root -iname Anaconda-ks.cfg
/root/anaconda-ks.cfg

[root@localhost ~]# find /root -name Anaconda-ks.cfg
[root@localhost ~]# 
``` 




### root用户的所有文件 ###

```shell
[root@localhost ~]# find /root -user root
/root
/root/.bash_logout
/root/.bash_profile
/root/.bashrc
/root/.cshrc
/root/.tcshrc
/root/anaconda-ks.cfg
/root/.bash_history
/root/牛逼
/root/牛逼/java.pdf
/root/222
/root/牛牛
/root/牛逼2
/root/牛牛2
``` 





### 查找10天前修改的文件 ###
```shell
find /var/log/ -mtime +10
``` 
 

- -10 10天内修改的文件
- 10 10天当前修改的文件
- +10 10天前修改的文件

 

atime 文件访问时间

ctime 改变文件属性

mtime 修改文件内容

### 查找10天前的日志 ###
```shell
[root@localhost ~]# find /var/log -mtime +10

/var/log/ppp
``` 





### 查找文件大小是1到2KB的文件（进一法） ###
```shell
find /root  -size 2k
``` 

- -2k 小于2KB的文件
- 2k 等于2KB的文件
- +2k 大于2KB的文件

### 查找i节点是262422的文件 ###
```shell
find /root -inum 262422
``` 

```shell
[root@localhost ~]# find /root -size 2k
/root/anaconda-ks.cfg
/root/.bash_history

[root@localhost ~]# find /root -size -2k
/root
...
/root/牛逼2
/root/牛牛2

[root@localhost ~]# find /root -size +2k
[root@localhost ~]# 
``` 



 ### 根据i节点来搜索 ###
```shell
[root@localhost ~]# ls -i
33575031 222                801541 牛逼   33575023 牛牛
33574979 anaconda-ks.cfg  33605192 牛逼2  33605193 牛牛2
[root@localhost ~]# find /root -inum 33575023
/root/牛牛
[root@localhost ~]# 
```


 
### 查找/etc/目录下，大于20KB并且小于50KB的文件 ###
```shell
find /etc -size +20k -a -size -50k
```

- -a and 逻辑与 ，两个条件都满足
- -o or 逻辑或，两个条件满足一个即可

### 查找/etc/目录下，大于20KB并且小于50KB的文件，并显示详细信息； ### 

```shell
find /etc -size +20k -a -size -50k -exec ls -lh{} \ ;
```

-exec/-ok 命令{} \; 对搜索结果执行操作；

```shell
[root@localhost ~]# find /etc -size +20k -a -size -50k
/etc/selinux/targeted/active/modules/100/apache/hll
/etc/selinux/targeted/active/modules/100/init/hll
...
/etc/ld.so.cache
/etc/dnsmasq.conf
/etc/postfix/access
/etc/postfix/header_checks
/etc/postfix/main.cf
[root@localhost ~]# find /etc -size +20k -a -size -50k -exec ls -lh {}\;
```
find: 遗漏“-exec”的参数

```shell
[root@localhost ~]# find /etc -size +20k -a -size -50k -exec ls -lh {} \;
-rw-r--r--. 1 root root 25K 11月 12 2016 /etc/selinux/targeted/active/modules/100/apache/hll
-rw-r--r--. 1 root root 31K 11月 12 2016 /etc/selinux/targeted/active/modules/100/init/hll
...
-rw-r--r--. 1 root root 22K 6月  10 2014 /etc/postfix/header_checks
-rw-r--r--. 1 root root 27K 6月  10 2014 /etc/postfix/main.cf
[root@localhost ~]# 
```