

Question1:
----------

Jsp file can not find the tag library descriptor for "http://java.sun.com/jsp/jstl/core"

add code to pom.xml

	<dependency>
	    <groupId>javax.servlet</groupId>
	    <artifactId>jstl</artifactId>
	    <version>1.2</version>
	</dependency>


Question2
----------

eclipse导入新工程报错：

	Referenced file contains errors (http://www.springframework.org/schema/beans/spring-beans-3.1.xsd). 
	For more information, right click on the message in the Problems View and 
	select "Show Details..."


解决方案：

	把project菜单里的clean点击一下就OK了


好文章序列：
----------

#### 1、Eclipse中执行maven命令 ####

[http://blog.csdn.net/u011939453/article/details/43017865](http://blog.csdn.net/u011939453/article/details/43017865)


#### 2、pom文件常用配置 ####

- 解决控制台乱码
- 编译时不运行单元测试


pom.xml

	<properties>
		<argLine>-Dfile.encoding=UTF-8</argLine>
	</properties>
	<build>
		<finalName>pdrc</finalName>
		<plugins>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-compiler-plugin</artifactId>
				<version>2.3.2</version>
				<configuration>
					<source>1.8</source>
					<target>1.8</target>
					<encoding>UTF-8</encoding>
				</configuration>
			</plugin>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-surefire-plugin</artifactId>
				<configuration>
					<skip>true</skip>
				</configuration>
			</plugin>
			<plugin>
				<!-- https://mvnrepository.com/artifact/org.eclipse.jetty/jetty-maven-plugin -->
				<groupId>org.eclipse.jetty</groupId>
				<artifactId>jetty-maven-plugin</artifactId>
				<version>9.4.6.v20170531</version>
			</plugin>
		</plugins>
	</build>


 JQUERY获取当前页面的URL信息
----------

  
(一)设置或获取对象指定的文件名或路径

	window.location.pathname

例：http://localhost:8086/topic/index?topicId=361
alert(window.location.pathname); 则输出：/topic/index

(二)设置或获取整个 URL 为字符串

	window.location.href

例：http://localhost:8086/topic/index?topicId=361
alert(window.location.href); 则输出：http://localhost:8086/topic/index?topicId=361

(三)设置或获取与 URL 关联的端口号码

	window.location.port

例：http://localhost:8086/topic/index?topicId=361
alert(window.location.port); 则输出：8086

(四)设置或获取 URL 的协议部分

	window.location.protocol

例：http://localhost:8086/topic/index?topicId=361
alert(window.location.protocol); 则输出：http:

(五)设置或获取 href 属性中在井号“#”后面的分段

	window.location.hash

(六)设置或获取 location 或 URL 的 hostname 和 port 

	window.location.host

例：http://localhost:8086/topic/index?topicId=361
alert(window.location.host); 则输出：http:localhost:8086

(七)设置或获取 href 属性中跟在问号后面的部分

	window.location.search

例：http://localhost:8086/topic/index?topicId=361
alert(window.location.search); 则输出：?topicId=361

(八)window.location

|:--:|:--:|
--------

属性                描述
hash              设置或获取 href属性中在井号“#”后面的分段。
host               设置或获取 location 或 URL 的hostname 和 port 号码。
hostname     设置或获取 location 或 URL 的主机名称部分。
href                设置或获取整个 URL为字符串。
pathname     设置或获取对象指定的文件名或路径。
port                设置或获取与 URL关联的端口号码。
protocol         设置或获取 URL 的协议部分。
search           设置或获取 href属性中跟在问号后面的部分。



c:if标签用法
----------


	<c:if test="${profileView.gender==1}">checked</c:if>


TestNg
----------

eclipse插件地址

http://dl.bintray.com/testng-team/testng-eclipse-release/zipped/6.11.0.201703011520/



sqlserver中如何修改字段类型？
----------

我有一张表，字段类型是varchar,我现在要把这个字段变成text类型，sql如何写？？？？？

alter table 表名 alter column 字段名  text


【Maven】maven工程 调试出现 Source not found ，开启jetty调试
----------


问题：maven工程使用jetty 调试出现 Source not found，解决如下：

http://blog.csdn.net/dracotianlong/article/details/47975969

1、开启MAVEN_OPTS的调试参数
配置如下：

	-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=1066

配置的地方如下：

![](http://img.blog.csdn.net/20150825135525560?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

2、参数含义如下：
-Xdebug :通知JVM工作DEBUG模式下
-Xrunjdwp:通知JVM使用Java Debug wire protocol来运行环境
transport ：调试数据的传送方式，dt_socket使用socket方式
server ：是否支持server模式的vm中
suspend：是否在调试客户端建立起来后，再执行JVM
address：是和调试器通信的端口，不是服务的端口号
-Xnoagent: 禁用默认sun.tools.debug调试器 
-Djava.compiler=NONE: 禁止JIT编译器的加载 
dt_shmem: 共享内存传输，仅限于Windows 


Map 遍历
----------



	Map<Integer, Integer> map = new HashMap<Integer, Integer>();  
	  
	for (Map.Entry<Integer, Integer> entry : map.entrySet()) {  
	  
	    System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue());  
	  
	}  




eclipse jetty debug source not found
----------


eclipse
 
 在eclipse中用jetty maven插件debug 时，会找不到源代码， 可以用以下办法解决：
安装 Dynamic Source Lookup plugin 插件，
插件主页如下，
 https://github.com/ifedorenko/com.ifedorenko.m2e.sourcelookup

	com.ifedorenko.m2e m2e extensions - http://ifedorenko.github.io/m2e-extras/

![](http://dl2.iteye.com/upload/attachment/0110/2472/a62befbb-620f-3c96-9740-f0e828a645d2.bmp)


然后点击【Add】按钮，等待几秒钟，Name就会刷出【m2e extentensions】出来！



MyBatise 多个参数
----------

	where profileid = #{param1} and projectid = #{param2};



解决Dynamic Web Module 3.1 requires Java 1.7 or newer
----------

http://blog.csdn.net/qq_31614947/article/details/70231289

概述：使用maven构建web项目时，经常会遇见这个问题，问题原因报错讲述的很清晰明了，就是web模块需要使用java1.7及以后的版本，目前的版本不符合。因而只需要修改java版本到1.7及以上即可。

解决方法：

1. 在eclipse 构建 web中关于java版本有三处需要修改统一。

	（1）在 Java Build Path的libraries中修改

	（2）在Java Compiler 中修改

	（3）在Project Facet中修改

2. 大部分按上上述修改就应该可以了，但总是有意外，还是报错。因为使用了 maven构建项目，因而最好在pom.xml文件中的build标签中加入以下代码：


		<build>
		  <plugins>
		       <plugin>
		             <groupId>org.apache.maven.plugins</groupId>
		             <artifactId>maven-compiler-plugin</artifactId>
		             <version>3.1</version>
		             <configuration>
		                 <source>1.7</source>     //如果是1.8，修改为1.8
		                 <target>1.7</target>      //如果是1.8，修改为1.8
		             </configuration>
		       </plugin>
		  </plugins>
		</build>

         
3.最后再右键使用maven的Update Project 即可。 


maven项目配置jetty9插件
----------
	<plugin>
		<groupId>org.eclipse.jetty</groupId>
		<artifactId>jetty-maven-plugin</artifactId>
		<version>9.4.6.v20170531</version>
		<configuration>
			<scanIntervalSeconds>10</scanIntervalSeconds>
			<httpConnector>
				<port>9080</port>
				<idleTimeout>60000</idleTimeout>
			</httpConnector>
			<webApp>
				<contextPath>/${project.build.finalName}</contextPath>
			</webApp>
		</configuration>
	</plugin>




Nginx启动报错：10013: An attempt was made to access a socket in a way forbidden
----------

Nginx在win7，win2008下启动报错：bind() to 0.0.0.0:80 failed (10013: An attempt was made to access a socket in a way forbidden by its access permissions) 。

原因是Win7下nginx默认80端口被System占用，造成nginx启动报错的解决方案。

在cmd窗口运行如下命令：
 
	C:\Users\Administrator>netstat -aon | findstr :80  
 
看到80端口果真被占用。发现占用的pid是4，名字是System。怎么禁用呢？
 
1、打开注册表：regedit
 
2、找到：HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\services\HTTP
 
3、找到一个REG_DWORD类型的项Start，将其改为0
 
4、重启系统，System进程不会占用80端口
 
重启之后，start nginx.exe 。在浏览器中，输入127.0.01，即可看到亲爱的“Welcome to nginx!” 了。



http://www.360sdn.com/Nginx/2014/0807/4044.html


如何查看某个端口被谁占用
----------
http://jingyan.baidu.com/article/3c48dd34491d47e10be358b8.html

查看被占用端口对应的PID，输入命令：netstat -aon|findstr "49157"，回车，记下最后一位数字，即PID,这里是2720