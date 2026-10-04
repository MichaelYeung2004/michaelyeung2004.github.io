# 如何添加博客

Blog 地址：`/blog/`。文章采用本地 Typora **dyzj-light** 的网页适配样式：青绿色标题、浅蓝引用、代码高亮、表格、脚注、折叠块和数学公式。长文自动生成目录与阅读进度。

## 发布文章

1. 在 Typora 打开 `docs/blog-template.md`，另存为 `_posts/YYYY-MM-DD-english-slug.md`（没有 `_posts` 文件夹时先创建），例如 `_posts/2026-10-04-first-note.md`。
2. 保留最上方两个 `---` 之间的信息，填写 `title`、`date`、`description` 和 `tags`。日期不要晚于实际发布时间；正文不必重复写文章标题。
3. 在第二个 `---` 下面写 Markdown 正文。二级、三级标题会自动加入阅读目录。
4. 图片放到 `assets/images/blog/`，正文写 `![图片说明](/assets/images/blog/example.png)`。不要使用本机磁盘路径。
5. 提交并推送到 GitHub 后自动构建；文章默认地址为 `/blog/english-slug/`，列表按日期倒序。

`tags: [研究笔记, 3D Vision]` 自动提供筛选；搜索匹配标题和摘要。`description` 是文章摘要；不写时使用第一段。

## 草稿与预览

草稿放在 `_drafts/`，线上默认不会发布。已有 `_drafts/blog-style-preview.md` 用于排版预览。发布时改名移入 `_posts` 并更新顶部信息。

PowerShell 中运行：

```powershell
$env:JEKYLL_NO_BUNDLER_REQUIRE='true'
jekyll _3.10.0_ serve --drafts --port 4100
```

打开 `http://127.0.0.1:4100/blog/` 检查包含草稿的列表，`/blog/style-preview/` 检查排版。停止使用 Ctrl+C。普通构建和 GitHub Pages 不带 `--drafts`，不会发布预览草稿。

## Markdown

- 标题：`## 二级标题`、`### 三级标题`。
- 引用：`> 一段引用`。
- 代码：三个反引号围住，写语言名（例如 `python`）；右上角可复制。
- 公式：行内 `$x^2$`，独立公式用单独一行的 `$$` 围住。
- 脚注：正文 `[^note]`，文末 `[^note]: 补充说明`。
- 折叠：`<details markdown="1">`，内部加 `<summary>标题</summary>` 和 Markdown 正文。

Typora 的 `[TOC]` 不必填写，网页自动生成目录。普通 Markdown 与常见 HTML 可使用；编辑器专用控件和本机字体不保证逐项相同。网页保留主页蓝色链接与仅悬停下划线的习惯。
