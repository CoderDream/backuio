

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

