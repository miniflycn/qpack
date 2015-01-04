qpack
=====

> 一个 [Ques](https://github.com/miniflycn/qiqi) Compoent 命令行管理工具，贯穿`Ques Component`开发阶段。

### 安装

> $ npm install qpack -g

### 使用

* 初始化component

> $ qpack init [path]

会自动在`path`(默认为进程当前的工作目录)初始化`main.html`和`mian.css`，重构同学可以基于这两个文件进行开发

* 翻译成`Ques Comonent`

> $ qpack tran [src] [dist]

会将`src`(默认为进程当前的工作目录)中的源文件编译生成到`dist`(默认为相对于`src`的`../#{BlockName}`，BlockName由分析CSS生成)

### 进阶功能

开启开发服务器，可使用强大的CSS后置处理功能。

> $ qpack app [options] [path]

其中`options`可设置`port`，默认为80，如果我们要设置成3000，可以：

> $ qpack app -p 3000

`path`为映射的路径(默认为进程当前的工作目录)，如果我们要模拟`components/iheader`，则：

> $ qpack app components/iheader

### 已集成的CSS后处理技术

* [postcss-media-minmax](https://github.com/postcss/postcss-media-minmax)

![Alt text](https://camo.githubusercontent.com/bc3405169198f46ea05f7c1d3b7fab127a7ddc13/687474703a2f2f67746d7330322e616c6963646e2e636f6d2f7470732f69322f54423155496a7947565858585863436158585878323734467058582d3837372d3333392e676966)

* [postcss-custom-selectors](https://github.com/postcss/postcss-custom-selectors)

![Alt text](https://camo.githubusercontent.com/e396746eaa9a2eb406b4482bf07f0981104ac028/687474703a2f2f67746d7330312e616c6963646e2e636f6d2f7470732f69312f5442315a436533475658585858627a5846585852693438495858582d3738302d3631302e676966)

* [postcss-nested](https://github.com/postcss/postcss-nested) 就是类似`Scss`和`LESS`的`CSS嵌套`

* [cssgrace](https://github.com/cssdream/cssgrace)

![Alt text](https://camo.githubusercontent.com/148f0ef58a79c531eabf80968642f8dbf5c9a11f/687474703a2f2f67746d7330332e616c6963646e2e636f6d2f7470732f69332f5442314f584a614770585858586262584658585a2e6f55307058582d3834382d3530342e676966)

### 为什么使用CSS后置处理技术？

> CSS预处理技术应用广泛，例如：`Sass`、`LESS`，为什么不使用CSS预处理技术呢？

简单的说在`Component化`之后，实际上我们对CSS的`嵌套(nested)`、`混入(mixin)`、`函数(function)`将远远减少，实际上基于标准的CSS后知处理技术已经够用了，详细的分析请参见：[聊聊CSS postproccessors](https://app.yinxiang.com/shard/s30/sh/621a3a5f-49bd-4140-864d-9a1a66f675a6/a4bb7c5190d165ad2001e64aec17a624)

由于印象笔记最近被有关部门关闭分享，所以请查看这里：https://github.com/miniflycn/qpack/issues/3
