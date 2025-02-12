# OpenTGX 中的自适应分辨率适配策略

随着社会的发展，市面上的手机分辨率越来越多，很难统一。如果要为每一个分辨率都做适配的话几乎是不可能的。

OpenTGX 提供了一个分辨率自动适配组件 [ResolutionAutoFit](https://github.com/MrKylinGithub/OpenTGX/blob/main/tgx-core-cocos/assets/core_tgx/base/ResolutionAutoFit.ts)，它采用一种外扩机制，可以使你的 UI 在任何分辨率下都不会被裁剪。

## 痛点

比如，我们在 1280 x 720 （16：9）的分辨率下，做了一个界面，这个界面几乎撑满了屏幕。

Cocos 引擎提供了 `Fixed Width`, `Fixed Height` 两个选项，可以形成四种组合。

- 自动：`Fixed With = false`, `Fixed Height = false`
- 定宽：`Fixed With = true`, `Fixed Height = false`
- 定高：`Fixed With = false`, `Fixed Height = true`
- 显示全部：`Fixed With = true`, `Fixed Height = true`


如果我们使用定宽的话，那在 1440 x 720 (2:1) 的手机上，你会发现上下会被裁剪。

如果我们使用定高的话，那在 1024 x 768 (4:3) 的 iPad 上，你会发现左右两边被裁剪。

引擎提供了另外两个功能也是不符合需求的。可以自行测试。

## 解决原理

`ResolutionAutoFit`` 的做法非常简单，就是在比设计分辨率更宽的机器上，采用定高。这样左右两边会多显示出一些内容。 在更高的机器上，采用定宽，这样上下两边会多显示出一些内容。

如此一来，就不用担心界面被裁剪掉，美术可以放心地设计接近全屏的界面，呈现更多好看的内容。


## 分辨率选择

项目的设计分辨率的选择主要有两个指标
- 长宽比
- 像素

### 长宽比
长宽比的选择，应该以当前最流行的主流分辨率为主。 比如，早期的 4：3，到后来 iPhone 6/7/8 时代的 16：9，再到现在的 2:1 甚至 2.+ : 1。

如果是现在做项目，建议选择 16：9或者 2：1（竖屏倒过来就行）。

当然，如果是做的 H5 游戏，由于要去除浏览器的顶和底，9：16 可能是最好的选择。

### 像素选择
决定了长宽比之后，面临的就是像素选择问题。 比如，以 16:9 为例。我们就可以选。

分辨率|全屏内存| 内存比例
|:---|:---|:---|
| 1136 x 640 | 2.77 MB | 100%  
| 1280 x 720 | 3.51 MB | 126%
| 1920 x 1080 | 7.9 MB | 285%
| 2560 x 1440 | 14.06 MB | 500%

这里面，推荐选择 720p，也就是 1280 x 720。如果确实需要高清一点，那么选择 1920 x 1080 也行。 如果想要尽可能兼顾低端机型，选择 1136 x 640 也是可以的。 

从内存比例这一栏可以看到，随着分辨率的增大，内存的开销呈数倍增长。对应的分辨率需要对应的精度的图片才能达到效果。因此请谨慎选择。

其它长宽比的选择也是如此，只需要确认短边的像素值，就可以反算出长边的。比如 2：1 的情况下，我们可以选择。

- 1280 x 640
- 1440 x 720
- 2160 x 1080
- 2880 x 1440
