# NodeJsTimerTask
类似于博客的定时发布功能模块，这是一个小项目，包括前端+nodejs后台。
这个项目可以让你简单入门nodejs，以及react的简单使用。要看懂此项目，您需要先了解一下nodejs以及reactjs。

以下是写这个项目的来源

这是一个很小的项目，使用nodejs开发。

一个定时器模块，要求如下：

    （1）可以定时执行某个模块或者函数。[Timer.schedule({task: schedule}})]
    （2）可以方便地修改定时任务的时间安排。[Timer.update(task, schedule)]
    （3）可以方便停止某个模块或函数的定时任务。[Timer.stop(task)]
    （4）可以方便获取所有任务的执行的时间安排。[Timer.info()]
    （5）请写一些小实例使用并测试你所开发的这个小模块。
    下面给出一个场景方便理解题目：

    在官方博客里写一些文章（post），需要设定一些发布时间以及过期时间，所以定时器需要做到在发布时间到来的时候将post发布（post.publish()），并在过期时间到达的时候将post下架（post.expired）。
    另外，还可以定时统计post的浏览量，可能会每天晚上定时跑一个统计脚本（post.collect_data()）来进行统计。

你可以使用一些如underscore或者async的基础库，但是不能使用任何跟时间或者定时有关的库。





一、主要技术：后端用nodejs,前端用reactjs;

二、文件说明：

	1、app 前端工程：

		1）component渲染react页面需要用到的组件，eg：title.

		2）css 属性文件.

		3）page 前端页面.

		4）util 经react封装的工具 eg:toast（仿安卓）.

		5）global 全局变量，公有方法.

		6）main.js react应用入口。webpack.config.js配置文件有说明.

	2、build是用webpack打包前端项目所产生 bundle.js

	3、dao是后端操作数据库：

		1）、baseDao 创建数据库之类.

		2）、tasksSqlMapping 查询数据库的语句.

		3）、taskDao 处理接口业务.

		4）、scheduleDao 后台业务逻辑，包含：
				1、定时发布任务及定时下架任务;
				
				2、运行检查发布或下架服务器关闭期间未执行任务;
				
				3、更新、删除、新增定时任务时，在后端修改、启动或删除定时任务.

	4、node_modules里面是nodejs运行所需的模块，前端运行所需要的module比较大需另行下载.

	5、router接口入口路径.

	6、index.html,首页.

	7、server.js node后台服务入口.

	8、package.json npm init生成文件.

	9、webpack.config.js webpack编译说明，配置app项目打包规则.

三、具体的请看对应的源码方法说明.


四、前端整体功能描述：

	1、首页设置服务器地址；

	2、查看所有待发布、待下架目录

	3、新增任务

	4、待发布、待下架任务可查看详情

	5、待发布任务可以更改发布时间跟下架时间.

	6、统计所有已发布任务的阅读数.

	7、删除待发布、待下架任务.

五、后端逻辑:

	1、检查在服务器关闭期间所有任务，并在后台执行相应的逻辑：

		1）、未发布的任务（一个任务设置两个定时任务，即发布、下架定时任务）;

		2）、待下架未发布内容（更新数据库,并且发布，设置一个下架定时任务）;

		3）、待下架已发布；（设置一个下架定时任务）;

		4）、已过时，未下架（更新数据库的，并且下架）;

	2、接口：
		1）add:新增任务（后台设置两个定时任务）;

		2）getAll:获取所有的未下架任务;
		
		3）updateReadCount：更新阅读;
		
		4）updateTask：更新任务（后台删除原有的下架定时任务，发布一个新的定时任务）;
		
		5）deleteTask：删除任务（后台删除原有定时任务）;

六、数据库的链接在baseDao.js里面，nodejs_mysql是我设置的数据库名称，需要配置数据库，下面是本人访问数据库的配置，更改为自己的即可。

		user: 'root',

        password: '123456',

        port: 3306,

        database: 'nodejs_mysql',


七、使用步骤:

	1、在解压后的目录中执行：node server.js,前提是安装了nodejs;

	2、打开网页访问地址为： eg:192.168.1.104:8081,即可访问到服务器,前面为个人ip地址;

	3、数据库的配置在第六点;

	4、有任何不懂的给我留言，联系我：微信：ZCMing2013，QQ：522236495，或者给我发邮件。