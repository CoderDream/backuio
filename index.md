

Question1:
----------

Jsp file can not find the tag library descriptor for "http://java.sun.com/jsp/jstl/core"

add code to pom.xml

	<dependency>
	    <groupId>javax.servlet</groupId>
	    <artifactId>jstl</artifactId>
	    <version>1.2</version>
	</dependency>