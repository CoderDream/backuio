

## IntelliJ IDEA

- Maven的仓库路径：D:\Java\repo

- 下载jar，在项目的pom.xml文件增加如下依赖，然后选中项目，点击右键【Run As】->【Maven Install】：
```
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.0.1</version>
</dependency>
```
- 将[源码](soucecode\javax.servlet-api-3.0.1-sources.jar)放到jar包下载的位置，如：D:\Java\repo\javax\servlet\javax.servlet-api\3.0.1
	源代码的名称为：javax.servlet-api-3.0.1-sources.jar

- 关联源代码
	1. 选中项目，使用组合键【Ctrl+Alt+Shift+S】打开【Project Structure】面板
	2. 【Platform Settings】->【Globals Libraries】->【】，然后点击中间【+】图标来增加源代码包，如：D:\Java\jdk1.8.0_191\src.zip或http://docs.oracle.com/javase/8/docs/api/

- 最终效果：                                                                                                                                                                                                   
![](snapshot\idea\01_Project_Structure_Libs.png)

### IntelliJ IDEA 鼠标移动到类上显示文档document（JavaDoc）内容

- 【File】->【Settings】->【Editor】->【General】->【Show quick documentation on mouse move】



### 为jdk下载或指定 JavaDoc
1. 选中项目，使用组合键【Ctrl+Alt+Shift+S】打开【Project Structure】面板
2. 【Platform Settings】->【SDKs】->【XX（1.8）】->【Documentation Paths】，然后点击【+】图标来增加源代码包，如：D:\Java\jdk1.8.0_191\src.zip或http://docs.oracle.com/javase/8/docs/api/

- 参考文档：[IntelliJ idea鼠标移动到类上显示文档document（javadoc）内容](https://blog.csdn.net/u013905744/article/details/73162294)