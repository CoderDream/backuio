
 第五章 测试用例规划及TestNG的使用 
----------

宋现锋 2015-6-12 

经过上一章的学习，我们已经可以将一个手要测试用例转化成代码编写的测试用例，但是一个测试任务通常有很多测试用例。我们就这样一个一个地编写下去吗？答案是否定的。原因是这样编写的测试用例，代码重用率低，数据和测试用例混在一起不便于维护，所以我们得在编写大型的测试用例之前，对我们的测试用例工程进行规划一下。 

## 5.1 测试工程规划 ##

为了方便测试用例的管理，代码重用，以及出错后维护等工作，我们在编写测试用例之前都需要对测试工程的架构进行规划。本人习惯于测试通用函数，测试用例，测试数据分开这样的规划方式，所以我们仍然这样规划我们的测试用例。 

（1） 创建package:/src/CommonFunction:用来存放所有的公共操作，测试操作步骤，数据操作等。 

（2） 创建package:/src/TestCases:用来存放具体的测试用例文件，通常一个测试用例文件包含两到三个测试用例，太多的话就不方便调试和出错定位。 

（3） 创建package:/src/TestData:存放测试用例用到的测试数据文件xml,通常xml文件和测试用例文件同名，这样方便一一对应。 

（4） 由于TestNG的用例管理是通过testng.xml文件进行的，所以我们不需要再创建测试用例管理相关的文件夹。 

通过上面的规划，我们只要在编写测试用例的过程中，编写好公用函数，然后在测试用例文件中调用公用函数，读取测试用例文件进行具体的测试用例操作即可。如果页面有所变动，我们只需要修改相应的文件即可，不用大面积地去修改。
 
## 5.2 TestNG DataProvider讲解 ## 

 TestNG DataProvider是TestNG的数据驱动者，我们要实现数据驱动型的自动化测试用例编写，就一定要学会TestNG DataProvider的使用，网上有很多相关的讲解，如：http://www.cnblogs.com/zhangfei/archive/2012/10/09/2717043.html。 
而我们的使用方法是什么呢？ 

（1） 读取TestData文件夹下的测试数据文件，如：HelloWorld.xml. 

（2） 根据节点来读取数据。 

这就要求我们实现下面的功能，读取xml文件，及访问节点数据。 

一，创建DataProvide.java文件来提供DataProvider。 

	//DataProvide.java 
	package CommonFunction; 
	import java.io.File; 
	import java.lang.reflect.Method; 
	import org.testng.annotations.DataProvider; 
	import org.w3c.dom.*; 
	 
	import javax.xml.parsers.DocumentBuilder; 
	import javax.xml.parsers.DocumentBuilderFactory; 
	 
	public class DataProvide {     
	  
	 public Document doc; 

	 public void init(String filename) throws Exception { 
	  File inputXml = new File(new File(filename).getAbsolutePath()); 
	  // documentBuilder为抽象不能直接实例化(将XML文件转换为DOM文件) 
	  DocumentBuilder db = null; 
	  DocumentBuilderFactory dbf = null; 
	  try { 
	      // 返回documentBuilderFactory对象 
	      dbf = DocumentBuilderFactory.newInstance(); 
	      // 返回db对象用documentBuilderFatory对象获得返回documentBuildr对象 
	      db = dbf.newDocumentBuilder(); 
	      // 得到一个DOM并返回给document对象 
	      doc = (Document)db.parse(inputXml); 
	    } 
	    catch (Exception e) { 
	      e.printStackTrace(); 
	       } 
	     
	 } 
	  
	 @DataProvider(name="Test_xml_dataprovider") 
	 public Object[][] providerMethod(Method method){ 
	  return new Object[][]{new Object[]{doc}}; 
	 } 
	} 

读取传递过来的Xml文件，并传递Document对象给调用的函数。这也是java操作xml文件的基础，如果不会，请自己学习。@DataProvider(name=””)用来标识不同的DataProvider，以便后续对其进行调用。 

二，读取具体的节点值 

通过传递过来的Document对象，父节点和节点标签，读取节点对应的值。 

#DataReader.java 

	package CommonFunction; 
	 
	import org.w3c.dom.*; 
	 
	public class DataReader { 
	  
	 /** 
	  * 从Xml中获取相应的节点的数据 
	  * @param doc 数据文件的Document 
	  * @param firsttag 子节点 
	  * @param secondtag 要获取的元素的节点 
	  * @return 要查找的节点数据 
	  */ 
	 public String readnodevalue(Document doc,String firsttag,String secondtag) 
	 { 
	  String result=""; 
	  Element root=doc.getDocumentElement(); 
	  NodeList childnode = root.getElementsByTagName(firsttag); 
	  NodeList resnode=childnode.item(0).getChildNodes(); 
	  for(int i=0;i<resnode.getLength();i++) 
	  { 
	   if(resnode.item(i).getNodeName().equals(secondtag)) 
	   { 
	    result=resnode.item(i).getTextContent(); 
	    break; 
	   } 
	  }    
	  return result;    
	 } 
	  
	} 

通过这两个文件，我们就可以读取xml文件为测试用例文件提供测试数据。 

## 5.3 新架构下测试用例编写  ##

在上我们还以第四章的众筹网登录检测为例，来在新框架进编写对应的测试用例。具体步骤如下： 

（1）分析测试用例。我们要实现测试用例和测试数据的分离和代码重用。就要先将上面的两个DataProvider相关的文件存放到package:/src/CommonFunction下。然后再创建一个共用函数类文件CommonFunctions.java文件，存放公用的函数。
 
（2）编写公用函数。创建java类文件CommonFunctions.java，由于登录退出操作是通用的操作，所以我们会在这个类文件中写两个相应的函数。并且根据我们第四章的了解，在这个测试用例中我们用到了获取元素文本的操作，所以我们也写一个函数来完成这个功能。最终的CommonFunctions.java

代码如下： 
	
	package CommonFunction; 
	import java.util.HashSet; 
	import java.util.Set; 
	 
	import org.openqa.selenium.By;  
	import org.openqa.selenium.WebDriver; 
	import org.openqa.selenium.firefox.FirefoxDriver;   
	import org.openqa.selenium.support.ui.Select; 
	import org.openqa.selenium.WebElement;  
	 
	import static org.junit.Assert.*; 
	 
	public class CommonFunctions { 
	   /** 
	    * 程序公用函数 
	    */ 
	 static public WebDriver driver; 
	  
	 /** 
	  * 构造函数    
	  */ 
	 public CommonFunctions() { 
	  //do nothing 
	 } 
	 public CommonFunctions(String url)  { 
	     // 如果你的 FireFox 没有安装在默认目录，那么必须在程序中设置   
	  //System.setProperty("webdriver.firefox.bin", "E:\\software\\firefox\\firefox.exe");   
	     // 创建一个 FireFox 的浏览器实例   
	  driver = new FirefoxDriver(); 
	  driver.manage().window().maximize(); 
	  driver.get(url); 
	   
	 }   
	  
	 /** 
	  * 打开网页 
	  * @param url 要打开的URL 
	  * @throws Exception  
	  */ 
	 public void geturl(String url) throws Exception { 
	  driver.get(url); 
	  Thread.sleep(5000); 
	 } 
	   
	 /** 
	  * 退出浏览器 
	  */ 
	 public void teardown() {   
	  try { 
	   driver.quit();    
	  } catch (Exception e) {   
	   e.printStackTrace(); 
	  } 
	 } 
	  
	 /** 
	  * 获取页面标签 
	  * @param type 元素定位类型，如：Xpath,css,name等 
	  * @param location 元素位置 
	  * @return 返回获取到的页面元素的文本 
	  */ 
	 public String gettext(String type,String location) { 
	  WebElement elem=null; 
	  if(type.equals("xpath")) { 
	   elem=driver.findElement(By.xpath(location));    
	  } 
	  if(type.equals("name")) { 
	     elem=driver.findElement(By.name(location));    
	  } 
	  if(type.equals("id")) { 
	   elem=driver.findElement(By.id(location));    
	  } 
	  if(type.equals("classname")) { 
	   elem=driver.findElement(By.className(location));    
	  } 
	  if(type.equals("css")) { 
	   elem=driver.findElement(By.cssSelector(location));    
	  } 
	  return elem.getText(); 
	 } 

	 /** 
	  * 单击某个元素 
	  * @param type 元素定位类型，如：Xpath,css,name等 
	  * @param location 元素位置 
	  */ 
	 public void clickitem(String type,String location) { 
	  WebElement elem=null; 
	  if(type.equals("xpath")) { 
	   elem=driver.findElement(By.xpath(location));    
	  } 
	  if(type.equals("classname")) { 
	   elem=driver.findElement(By.className(location));    
	  } 
	  if(type.equals("text")) { 
	   elem=driver.findElement(By.linkText(location));    
	  } 
	  if(type.equals("name")) { 
	   elem=driver.findElement(By.name(location));    
	  } 
	  elem.click(); 
	 } 
	  
	 /** 
	  * 清除文本框中的内容 
	  * @param type 元素定位类型，如：Xpath,css,name等 
	  * @param location 元素位置 
	  */ 
	 public void clearvalue(String type,String location) { 
	  WebElement elem=null; 
	  if(type.equals("xpath")) { 
	   elem=driver.findElement(By.xpath(location)); 
	  } 
	  if(type.equals("name")) { 
	     elem=driver.findElement(By.name(location)); 
	  } 
	  elem.clear(); 
	 } 
	  
     /** 
     * 向文本框中输入文字 
     * @param type 元素定位类型，如：Xpath,css,name等 
  	 * @param location 元素位置 
     * @param text 要输入的内容 
     */ 
	 public void inputvalue(String type,String location,String text) { 
	  WebElement elem=null; 
	  if(type.equals("xpath")) { 
	   elem=driver.findElement(By.xpath(location));   
	  } 
	  if(type.equals("name")) { 
	   elem=driver.findElement(By.name(location));    
	  } 
	  if(type.equals("id")) { 
	   elem=driver.findElement(By.id(location));   
	  } 
	  elem.sendKeys(text);   
	 } 
	  
	 /** 
	  * 判断str1和str2是否相等 
	  * @param str1 源字符串 
	  * @param str2 目标字符串 
	  */ 
	 public void checkequal(String str1,String str2) { 
	  assertEquals(str1,str2); 
	 } 

	/** 
	 * 登录操作 
	 * @param name:用户名 
	 * @param psd:密码 
	  * @throws Exception  
	 */  
	 public void login(String name,String psd) throws Exception { 
	     this.clickitem("classname", "Js-showLogin"); 
	     Thread.sleep(3000); 
	     this.clearvalue("name", "username"); 
	     this.inputvalue("name", "username", name); 
	     this.clearvalue("name", "user_pwd"); 
	     this.inputvalue("name", "user_pwd", psd); 
	  Thread.sleep(1000); 
	  this.clickitem("classname", "zc"); 
	  Thread.sleep(5000); 
	 } 
	  
	 /** 
	  * 退出登录 
	  * @throws Exception 
	  */ 
	 public void logout() throws Exception { 
	  this.geturl("http://www.zhongchou.cn/usernew-loginout"); 
	 } 
	  
	} 

代码讲解： 

首先我们对具体的操作，如click,clear,input等进行了相应的封装，函数中我们已加上了大量的注释，不难理解。 

编写登录函数login(),退出函数logout(),获取元素文本函数gettext（）等。 

这些儿函数就像我们小时候玩的积木，下面我们就可以利用这些儿函数来组织我们的测试用例。
 
（3） 准备测试数据。在package:/src/TestData下创建xml文件LoginTest.xml(对应的我们也会创建测试用例文件LoginTest.java),在文件中存放我们需要用到的测试数据。 

内容如下： 

	<?xml version="1.0" encoding="UTF-8"?> 
	<testdata> 
       <login name="登录相关测试数据"> 
          <username>18311338905</username> 
          <password>a000000</password> 
           <checkpoint1>div.siteLgInner</checkpoint1> 
                 <value1>潜龙9527</value1> 
       </login>  
	</testdata> 

（4） 编写测试用例。下面我们编写对应的测试用例文件，在package:/src/TestCases下创建测试用例文件LoginTest.java，在文件中编写具体的测试步骤。 


具体代码如下： 

	package TestCases; 
	 
	import org.w3c.dom.*; 
	import org.testng.annotations.Test; 
	import org.testng.annotations.BeforeTest; 
	import org.testng.annotations.AfterTest; 
	 
	import CommonFunction.CommonFunctions; 
	import CommonFunction.DataProvide; 
	import CommonFunction.DataReader; 
	 
	public class LoginTest extends DataProvide{ 
	  public CommonFunctions comfun; 
	  public DataReader dr; 
	   
	  @BeforeTest 
	  public void setup() throws Exception{   
	      String url = "http://www.zhongchou.cn"; 
	      comfun=new CommonFunctions(url); 
	      dr=new DataReader();      
	      //设置数据源 
	      init("src/TestData/LoginTest.xml"); 
	   }   
	   
	  @Test(dataProvider="Test_xml_dataprovider") 
	  public void testlogin(Document params) throws Exception { 
	   /** 
	    * 检测登录 
	    */   
	comfun.login(dr.readnodevalue(params, "login", "username"), dr.readnodevalue(params, "login", "password")); 
	   comfun.checkequal(comfun.gettext("css", dr.readnodevalue(params, "login", "checkpoint1")), dr.readnodevalue(params, "login", "value1")); 
	   //退出登录 
	   comfun.logout();   
	    
	  } 
	  @AfterTest 
	  public void teardown() { 
	   comfun.teardown(); 
	  } 
	} 

（5） 运行测试用例。此时运行一下这个测试用例文件，可以看到和第四章的一样结果。而测试函数中的代码其实就三行，而且在其他的测试用例中也可以去调用登录和退出函数，从而实现了代码重用。如果网站有变化，我们只需要修改一下测试用例数据文件LoginTest.xml,简化了用例维护工作。 

（6） 测试用例的添加。当我们把测试用例工程规划完成后，以后要做的工作就是在公用类中添加公用函数，添加具体的测试用例文件及对应的测试数据。 

## 5.4 测试用例的转化  ##

   到目前为止，我们已经可以在漂亮的架构下编写具体的自动化测试用例了。可是还有一个问题影响着我们自动化测试用例的实施，如何将手工测试用例转化成自动化测试用例？ 

（1） 用例的收集。自动化要测试的必须是成熟的功能，完成日常的回归测试。在一个比较重视质量的公司里，测试用例的收集是必须要做的工作，如果有相应的手工测试用例，转化成自动化测试用例就比较容易。如果没有对应的手工测试用例，我们需要补充手工测试用例，不能在没用用例的情况下，直接编写自动化测试用例，这样容易漏测试。 

（2） 用例评审。并不是所有的手工测试用例都能转化成自动化测试用例的，而且也没有必要。自动化测试主要的工作就是回归测试，一个回归测试你不可能将方方面面都测试一遍，保证主功能没有问题就可以了。所以在编写自动化测试用例之前，评审一下测试用例，哪些儿需要自动化，哪些儿不需要。 

（3） 从用例中抽出公用函数。在评审完测试用例后，我们就可以抽出哪些儿操作是所有测试用例都用到的，哪些儿是一部分测试用例中用到的，哪些儿是个别用到的？对这些儿有了一定的概念，就可以编写相应的公用函数。 

（4） 灵活运用各种检测技巧。计算机不能像人工测试那样灵活，只能通过代码进行对比，所以要灵活设置各种检测点儿，或是灵活执行操作。比如：如果我们要退出网站，人工是点击退出按钮。可是在退出按钮不容易定位的时候，我们可以直接打开退出对应的链接即可。 

## 5.5 本章小结 ##

本章我们讲解了如何规划一个测试用例工程，TestNG DataProvider数据驱动的使用。通过合理的规划测试代码结构，利用TestNG的数据驱动功能，我们可以实现测试用例和测试数据的分离，实现代码重用，使用测试用例的维护变的更加容易。接着又讲到了如何从手工测试用例转化成自动化测试用例，这是我们编写自动化测试用例的基本功。接下来我们将深入讲解如何使用testng.xml文件组织测试用例，以及测试报告的生成。 
