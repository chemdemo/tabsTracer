# tabsTracer

tabsTracer插件，实时地跟踪chrome打开的tab，并记录url，在浏览器重启或者crash时可以从tabsTracer恢复。

很多熟悉chrome的同学都知道，浏览器可以设置启动时“从上次停下的地方继续”，这个功能很棒我也一直在使用。但是在使用的过程中，还是会有痛点：

- 浏览器crash，导致之前打开的tab都没记录了（浏览器没有出现恢复的按钮）。

- Mac版的chrome，似乎每次重启都不会记录之前的tab。

以上两点，诞生了开发tabsTracer的想法，算是对chrome功能的一点点补充吧。

## 插件截图

![tabsTracer](https://github.com/chemdemo/tabsTracer/blob/master/screenshots1.png)

![tabsTracer](https://github.com/chemdemo/tabsTracer/blob/master/screenshots2.png)

## 技术细节

- 采用Backbone框架开发，Model和Collection运行在background脚本，几个view运行在popup页面。

- 使用Gulp作为项目构建，包括dist、自动打包发布等。

总体算是Backbone和Gulp的一个练习项目吧。
