---
title: 如何在这里写一篇博客
date: 2026-10-04 09:00:00 +0800
description: 从 Typora 里的第一行 Markdown，到网站上的一篇文章：一份写作、排版与发布的小教程。
tags: [使用教程, Markdown]
---

这个 Blog 用 Markdown 写作，文章页面直接使用本地 Typora **dyzj-light** 主题的设置、字体和图标。你可以在熟悉的编辑器里整理笔记，再将文件放进网站仓库。标题、摘要、标签和目录会自动生成。

这篇文章既是一份上手教程，也是排版示例。

## 1. 创建第一篇文章

在网站项目的 `_posts` 文件夹中新建一个 Markdown 文件，文件名遵循下面的格式：

```text
YYYY-MM-DD-english-slug.md
```

例如：

```text
_posts/2026-10-04-my-first-note.md
```

日期是发布日，后面的英文部分用于生成文章地址。上面的文件默认对应 `/blog/my-first-note/`。标题可以用中文，文件名建议用小写英文和短横线。

更方便的方式是：在 Typora 中打开 `docs/blog-template.md`，选择「另存为」，把新文件存到 `_posts` 里。

### 填写文章信息

文件顶部保留这一小段信息，下面才是正文：

```yaml
---
title: 我的第一篇笔记
date: 2026-10-04 12:00:00 +0800
description: 用一两句话介绍这篇文章。
tags: [研究笔记, 阅读]
---
```

| 字段 | 用途 | 建议 |
| :--- | :--- | :--- |
| `title` | 文章标题 | 直接写中文或英文 |
| `date` | 发布日期 | 填实际发布日和时间 |
| `description` | 列表中的摘要 | 一两句话即可 |
| `tags` | 标签和筛选 | 用方括号列出多个标签 |

> 日期晚于构建时间的文章默认不会发布。文章找不到时，先检查文件名和 `date`，再检查文件是否放在 `_posts` 中。

## 2. 用 Markdown 整理内容

标题会在文章开头自动显示，因此正文通常从二级标题开始。二级、三级标题会加入左侧目录；在手机上，目录显示为可展开的区域。

```markdown
## 一个章节

这里写正文，可以使用 **加粗**、*斜体* 和 `行内代码`。

### 一个小节

- 第一条观察
- 第二条观察

1. 第一步
2. 第二步
```

### 引用与链接

用 `>` 可以写出这样的提示：

> 先把想法写下来，再慢慢整理结构。笔记不必一开始就是完整的文章。

链接使用 `[显示文字](网址)`，例如 [VIPL Laboratory](https://vipl.ict.ac.cn/)。文章中按 dyzj-light 的原始设置显示青色下边框，鼠标悬停时变为青色背景。

### 代码块

输入三个反引号，在后面标明语言，再用三个反引号结束。下面是一段 Python 代码的实际显示效果，右上角可以复制：

```python
def mean(values):
    if not values:
        raise ValueError("values must not be empty")
    return sum(values) / len(values)

print(mean([1, 2, 3]))
```

可以标明 `python`、`bash`、`yaml`、`cpp` 等语言。行内变量和短命令则使用一个反引号围住，例如 `learning_rate`。

### 数学公式

行内公式可以写成 `$E = mc^2$`，显示为 $E = mc^2$。

独立公式用两行 `$$` 围住：

```text
$$
\mathcal{L}(\theta) = \frac{1}{N}\sum_{i=1}^{N}(f_\theta(x_i)-y_i)^2
$$
```

实际效果如下：

$$
\mathcal{L}(\theta) = \frac{1}{N}\sum_{i=1}^{N}(f_\theta(x_i)-y_i)^2
$$

### 补充说明与脚注

次要说明可以放进折叠块：

<details markdown="1">
<summary>展开：如何写一个折叠块</summary>

使用下面的结构。`markdown="1"` 让块内的 Markdown 也能被解析；正文前后留一个空行。

```html
<details markdown="1">
<summary>补充说明</summary>

这里可以继续写 **Markdown**。

</details>
```

</details>

参考资料或旁注也可以用脚注。[^markdown]

## 3. 添加图片

将图片放在网站的 `assets/images/blog/` 文件夹中，再在正文引用：

```markdown
![实验结果说明](/assets/images/blog/my-result.png)
```

这里的文件名是示例，需要换成真实存在的图片。路径以 `/` 开头，表示网站根目录，不是当前文章所在的目录。

> Typora 中能显示的本机图片，不一定能在网页中显示。请不要把 `C:\...`、`D:\...` 或 `file://...` 当作发布后的图片地址。

在 Typora 中插入图片后，检查文件是否已经复制到网站仓库、Markdown 中的路径是否正确。`![shadow-图片说明](图片路径)` 还可以为图片加上柔和阴影。

## 4. 预览并发布

### 本地预览

在网站项目目录打开 PowerShell，运行当前项目的预览命令：

```powershell
$env:JEKYLL_NO_BUNDLER_REQUIRE='true'
jekyll _3.10.0_ serve --port 4100
```

然后在浏览器打开 `http://127.0.0.1:4100/blog/`。如果 4100 端口已经被占用，换一个端口，并相应调整地址。结束预览时在终端按 Ctrl+C。

预览时检查标题、摘要、图片和公式，也可以缩窄窗口检查手机排版。修改 `_config.yml` 后需要重启预览服务。

### 发布到网站

将文章和它引用的图片一起提交到 GitHub。可以用 Git 客户端，也可以在项目目录运行：

```bash
git add _posts/2026-10-04-my-first-note.md assets/images/blog/my-result.png
git commit -m "Add my first blog note"
git push origin main
```

上面的文章名和图片名需要替换成自己的；没有图片时，删掉图片路径。GitHub Pages 部署完成后，Blog 列表会自动出现新文章，并按日期倒序排列。

## 5. 还没写完时，先存为草稿

未完成的文章可以放进 `_drafts/`，例如 `_drafts/my-next-note.md`。草稿默认不会出现在线上，预览时加上 `--drafts` 即可查看：

```powershell
$env:JEKYLL_NO_BUNDLER_REQUIRE='true'
jekyll _3.10.0_ serve --drafts --port 4100
```

写完后，将文件移到 `_posts`，加上日期前缀，并更新顶部信息。本项目还保留了 `_drafts/blog-style-preview.md`，可以在本地查看更多排版效果。

---

从一条阅读摘记、一个实验观察，或一个想继续追问的问题开始，就足够了。

[^markdown]: 常见 Markdown 可以直接使用；Typora 的 `[TOC]` 不必写入，网页会自动生成目录。编辑器专有语法或插件效果可能需要另做网页适配。
