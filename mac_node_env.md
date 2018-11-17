## Mac node.js WebStorm 环境配置 ###


安装nvm

```shell
CoderDreamdeMac:~ coderdream$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 12819  100 12819    0     0   3493      0  0:00:03  0:00:03 --:--:--  3495
=> Downloading nvm from git to '/Users/coderdream/.nvm'
=> Cloning into '/Users/coderdream/.nvm'...
remote: Enumerating objects: 267, done.
remote: Counting objects: 100% (267/267), done.
remote: Compressing objects: 100% (242/242), done.
remote: Total 267 (delta 31), reused 86 (delta 15), pack-reused 0
Receiving objects: 100% (267/267), 119.47 KiB | 45.00 KiB/s, done.
Resolving deltas: 100% (31/31), done.
=> Compressing and cleaning up git repository

=> Profile not found. Tried ~/.bashrc, ~/.bash_profile, ~/.zshrc, and ~/.profile.
=> Create one of them and run this script again
   OR
=> Append the following lines to the correct file yourself:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

=> Close and reopen your terminal to start using nvm or run the following to use it now:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
CoderDreamdeMac:~ coderdream$ 
```

1、安装 nvm
```shell

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

安装成功默认将会在用户文件夹中生成一个隐藏的 .nvm 文件

```shell
    显示隐藏文件：defaults write com.apple.finder AppleShowAllFiles Yes && killall Finder
    隐藏隐藏文件：defaults write com.apple.finder AppleShowAllFiles No && killall Finder
```

查看[最新版本](https://github.com/creationix/nvm/releases)

2、查看配置文件 .bash_profile

没有配置文件可以在 .nvm 中复制粘贴一个隐藏文件修改名字，将内容修改为如下代码：（注意：NVM_DIR 所指向的用户名可在 spotlight 中搜索"用户文件夹"，进行查看）

```shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

3、使配置文件 .bash_profile 生效（否则将会报：nvm: command not found）
```shell
source ~/.nvm/.bash_profile
```

4、nvm常用命令
以下用8.9.2版本为例
```shell
nvm ls ：打印出所有的版本
nvm install stable：安装最稳定的版本
nvm install v8.9.2 ： 安装node的8.9.2的版本（删除用uninstall）
nvm current ：当前使用的node版本
nvm use v8.9.2 ：将node改为8.9.2版本
nvm alias default 0.12.7：设置默认 node 版本为 0.12.7
nvm alias default ：设置系统默认的node版本
nvm alias  ：给不同的版本号添加别名
nvm unalias  ： 删除已定义的别名
nvm reinstall-packages ：在当前版本node环境下，重新全局安装指定版本号的npm包
npm install -g mz-fis：安装 mz-fis 模块至全局目录，安装的路径：/Users/<你的用户名>/.nvm/versions/node/v0.12.7/lib/mz-fis
nvm use 4：切换至 4.2.2 版本（支持模糊查询）
npm install -g react-native-cli：安装 react-native-cli 模块至全局目录，
安装的路径：/Users/<你的用户名>/.nvm/versions/node/v4.2.2/lib/react-native-cli
```

安装nrm（必须加sudo，然后输入密码）

```shell
npm install -g nrm
```

参考：
- [mac安装报错Error: EACCES: permission denied](https://blog.csdn.net/shaleilei/article/details/80812410)
- [nrm官方教程](https://www.npmjs.com/package/nrm)


向nrm中新增本地sinopianode

```shell
nrm add sinopia http://192.168.226.130:4873/
```

### 在Mac/Linux下通过nodejs执行shell ###

- 新建shell脚本

test.sh
```shell
#!/usr/bin/env bash
npm install -D shelljs
```

- 授权

```shell
chmod 755 test.sh
```

- 执行

```javascript
const child_process = require('child_process');
const exec = child_process.exec;

exec('./test.sh .', function(error, stdout, stderr){
    if(error){
        throw error;
    }
    console.log(stdout);
});
```

- 运行结果

```shell
/usr/local/bin/node /Users/coderdream/WebstormProjects/automatic-web-testing-4-pdrc/shell/test/execute_shell.js
+ shelljs@0.8.2
updated 1 package in 41.492s


Process finished with exit code 0

```

参考：
[解决：perhaps the designated entry point is not set?](https://blog.csdn.net/jianguo_liao19840726/article/details/49226377)
[xcode运行出现Could not load the "xxx.jpg" image referenced from a nib in the bundle with identifier的解决方法](https://www.cnblogs.com/kagamikome/p/4864603.html)


```shell
CoderDreamdeMac:MyWeather coderdream$ pod install
Analyzing dependencies
Setting up CocoaPods master repo
  $ /usr/bin/git clone https://github.com/CocoaPods/Specs.git master --progress
  Cloning into 'master'...
  remote: Enumerating objects: 394, done.        
  remote: Counting objects: 100% (394/394), done.        
  remote: Compressing objects: 100% (347/347), done.        
  remote: Total 2574262 (delta 151), reused 35 (delta 35), pack-reused 2573868        
  Receiving objects: 100% (2574262/2574262), 587.27 MiB | 233.00 KiB/s, done.
  Resolving deltas: 100% (1509657/1509657), done.
  Checking out files: 100% (280574/280574), done.

CocoaPods 1.6.0.beta.2 is available.
To update use: `sudo gem install cocoapods --pre`
[!] This is a test version we'd love you to try.

For more information, see https://blog.cocoapods.org and the CHANGELOG for this version at https://github.com/CocoaPods/CocoaPods/releases/tag/1.6.0.beta.2

Setup completed
Downloading dependencies
Installing AFNetworking (2.6.3)
Installing SwiftyJSON (2.4.0)
Generating Pods project
Integrating client project

[!] Please close any current Xcode sessions and use `MyWeather.xcworkspace` for this project from now on.
Sending stats
Pod installation complete! There are 2 dependencies from the Podfile and 2 total pods installed.
CoderDreamdeMac:MyWeather coderdream$ 
```


```shell
viewDidLoad
12.1
warning: could not execute support code to read Objective-C class data in the process. 
This may reduce the quality of type information available.
locationManager didUpdateLocations
30.480741989934398
114.40172706634131
(lldb) 
```

```shell
viewDidLoad
12.1
2018-11-06 16:41:36.933730+0800 MyWeather[15741:972124] This app has attempted to access 
privacy-sensitive data without a usage description. The app's Info.plist must contain both 
“NSLocationAlwaysAndWhenInUseUsageDescription” and “NSLocationWhenInUseUsageDescription” 
keys with string values explaining to the user how the app uses this data

```


```shell
viewDidLoad
12.1
locationManager didUpdateLocations
30.480836311036434
114.40165580539323
locationManager didUpdateLocations
30.480836311036434
114.40165580539323
2018-11-08 09:02:58.661352+0800 MyWeather[20423:1244387] App Transport Security has blocked a cleartext HTTP (http://) resource load since it is insecure. Temporary exceptions can be configured via your app's Info.plist file.
2018-11-08 09:02:58.661639+0800 MyWeather[20423:1244387] Cannot start load of Task <FE202F0F-2271-4FE4-8498-A1872A62CDAA>.<0> since it does not conform to ATS policy
2018-11-08 09:02:58.663205+0800 MyWeather[20423:1244387] Cannot start load of Task <7C822944-AC0F-4415-9241-AD346843A06F>.<0> since it does not conform to ATS policy
2018-11-08 09:02:58.663462+0800 MyWeather[20423:1244478] NSURLConnection finished with error - code -1022
2018-11-08 09:02:58.663894+0800 MyWeather[20423:1244478] NSURLConnection finished with error - code -1022
Error: The resource could not be loaded because the App Transport Security policy requires the use of a secure connection.
Error: The resource could not be loaded because the App Transport Security policy requires the use of a secure connection.
```