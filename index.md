

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