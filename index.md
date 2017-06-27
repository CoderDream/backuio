

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

	Referenced file contains errors (http://www.springframework.org/schema/beans/spring-beans-3.1.xsd). For more information, right click on the message in the Problems View and 
	select "Show Details..."


解决方案：

	把project菜单里的clean点击一下就OK了


好文章序列：
----------

1、Eclipse中执行maven命令

[http://blog.csdn.net/u011939453/article/details/43017865](http://blog.csdn.net/u011939453/article/details/43017865)