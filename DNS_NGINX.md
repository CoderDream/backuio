
<span id= "20185101">CentOS7下安装 DNS（最后更新：20181218）</span>
----------

## 安装 DNS


DNS  即Domain Name System（域名系统）的缩写，它是一种将ip地址转换成对应的主机名或将主机名转换成与之相对应ip地址的一种机制。其中通过域名解析出ip地址的叫做正向解析，通过ip地址解析出域名的叫做反向解析。  

### 一、安装BIND服务器软件并启动

- 1.安装BIND
```
[root@localhost ~]# yum -y install bind*
```

在安装完BIND后，系统会多一个用户named。

- 2.启动DNS服务
```
[root@localhost ~]# systemctl start named.service
```

- 3.查看named进程是否正常启动：
```
[root@localhost ~]# ps -eaf|grep named
named      1865      1  0 19:25 ?        00:00:00 /usr/sbin/named -u named -c /etc/named.conf
root       1871   1512  0 19:25 pts/0    00:00:00 grep --color=auto named
```

- 4.DNS采用的UDP协议，监听53号端口，进一步检验named工作是否正常：
```
[root@localhost ~]# netstat -an|grep :53
tcp        0      0 127.0.0.1:53            0.0.0.0:*               LISTEN     
tcp6       0      0 ::1:53                  :::*                    LISTEN     
udp        0      0 127.0.0.1:53            0.0.0.0:*                          
udp6       0      0 ::1:53                  :::*  
```

- 5.防火墙开放TCP和UDP的53号端口：

```
iptables -I INPUT -p tcp --dport 53 -j ACCEPT
iptables -I INPUT -p udp --dport 53 -j ACCEPT
```

### 二、DNS服务的相关配置文件

   对于BIND，需要配置的主要文件为/etc/named.conf。另外两个文件，/etc/named.isc-dlv.key保存加密用的可以，/etc/named.rfc1912.zones扩展配置文件。

- 1.修改主配置文件/etc/named.conf

  要注意在修改之前要先进行备份，使用cp -p /etc/named.conf /etc/named.conf.bak

命令备份，参数-p表示备份文件与源文件的属性一致。

vim /etc/named.conf修改文件：

```
options {
        listen-on port 53 { any; };
        listen-on-v6 port 53 { any; };
        directory       "/var/named";
        dump-file       "/var/named/data/cache_dump.db";
        statistics-file "/var/named/data/named_stats.txt";
        memstatistics-file "/var/named/data/named_mem_stats.txt";
        recursing-file  "/var/named/data/named.recursing";
        secroots-file   "/var/named/data/named.secroots";
        allow-query     { any; };

        recursion yes;

        dnssec-enable yes;
        dnssec-validation yes;

        /* Path to ISC DLV key */
        bindkeys-file "/etc/named.iscdlv.key";

        managed-keys-directory "/var/named/dynamic";

        pid-file "/run/named/named.pid";
        session-keyfile "/run/named/session.key";
};
```

- 2.修改/etc/named.rfc1912.zones

添加正向解析域cise.sdkd.net.cn，逆向解析域198.168.192.in-addr.arpa，其对应的域解析文件分别为由file指定的cise.sdkd.net.cn.zone和198.168.192.in-addr.arpa.zone。

在文件最后新增下面的代码：

```
[root@localhost ~]# vim /etc/named.rfc1912.zones
zone "coral.com" {
        type master;
        file "coral.com.zone";
        allow-update { none; };
};

```

- 3.添加/var/named/cise.sdkd.net.cn.zone

可以将模板文件复制一份，再进行修改，使用命令：

```
cp -p /var/named/named.localhost  /var/named/cise.sdkd.net.cn.zone
```

进入cise.sdkd.net.cn.zone进行配置
```
[root@localhost ~]# vim /var/named/cise.sdkd.net.cn.zone

$TTL 1D
@       IN SOA  coral.com. ns.coral.com (
                                        0       ; serial
                                        1D      ; refresh
                                        1H      ; retry
                                        1W      ; expire
                                        3H )    ; minimum
        NS      ns.coral.com
jschema A       192.168.172.1
www     A       192.168.172.1
        AAAA    ::1
```

- 4.添加/var/named/198.168.192.in-addr.arpa.zone


### 测试

- 修改DNS

```
vi /etc/resolv.conf
```

- 重启网络

```
service network restart
```

- 使用nslookup命令测试
```
[root@localhost ~]# nslookup www.baidu.com
Server:		192.168.226.2
Address:	192.168.226.2#53

Non-authoritative answer:
www.baidu.com	canonical name = www.a.shifen.com.
Name:	www.a.shifen.com
Address: 61.135.169.121
Name:	www.a.shifen.com
Address: 61.135.169.125

```


参考文档：[CentOS7下DNS服务器的安装与配置](https://blog.csdn.net/weiyongle1996/article/details/73302458)