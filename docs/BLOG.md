# 如何添加博客

Blog 地址：`/blog/`。保留最初的浅色青绿色单栏布局，仅参考 Argon 的文章组织功能，不采用它的横幅与侧栏外观。文章直接使用本地 Typora **dyzj-light** 的原始设置、字体与图标资源。长文自动生成目录与阅读进度。

## 发布文章

日常更新不必逐个指定图片。在项目目录运行 `git add _posts`、`git commit -m "Update blog"`、`git push origin main`，就能一起提交文章和 `_posts/assets` 内的图片。提交前用 `git diff --cached --stat` 检查清单，避免把此前已暂存的其他修改一起发布。不要用 `git add .`，以免带上无关文件。

1. 在 Typora 打开 `docs/blog-template.md`，另存为 `_posts/YYYY-MM-DD-english-slug.md`（没有 `_posts` 文件夹时先创建），例如 `_posts/2026-10-04-first-note.md`。
2. 保留最上方两个 `---` 之间的信息，填写 `title`、`date`、`description` 和 `tags`。日期不要晚于实际发布时间；正文不必重复写文章标题。
3. 在第二个 `---` 下面写 Markdown 正文。二级、三级标题会自动加入阅读目录。
4. 图片放到 `_posts/assets/`，正文写 `![图片说明](assets/example.png)` 或 `![图片说明](/_posts/assets/example.png)`。相对路径会自动转换成网站路径，Typora 也能直接预览。不要使用本机磁盘路径。
5. 提交并推送到 GitHub 后自动构建；文章默认地址为 `/blog/english-slug/`，列表按日期倒序。

`tags: [研究笔记, 3D Vision]` 自动提供筛选；可添加 `categories: [研究]`，显示分类筛选。支持年份筛选和标题/正文搜索范围。搜索结果先标题匹配、后正文匹配，同类按时间从新到旧排序；高亮关键词，标题匹配显示完整 description（未填写时回退到文章摘录），正文匹配显示命中句。多个空格分隔的关键词需要全部在标题或全部在正文中匹配。每次显示 10 篇，可加载更多。`description` 是文章摘要；不写时使用第一段。

尚未接入全站浏览量统计。Argon 将浏览量写入 WordPress 后端；GitHub Pages 是静态站点，需要独立计数后端或第三方服务。没有使用 localStorage 伪造全站数据。

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

Typora 的 `[TOC]` 不必填写，网页自动生成目录。普通 Markdown 与常见 HTML 可使用。文章链接按 dyzj-light 原始设置显示青色下边框及悬停背景，不再使用主页的链接样式。

## 主题源文件

`assets/vendor/dyzj-light/` 保存从本地直接复制的原始主题文件。`source-manifest.json` 记录 SHA-256。`assets/css/dyzj-light-web.css` 由 `tools/sync-typora-theme.mjs` 机械生成：只隔离选择器、映射 HTML/body/content 容器和修正资源路径；所有原始字号、颜色、间距与动画设置保留。`typora-bridge.css` 将 Jekyll 的代码块、图片、脚注等 HTML 与主题所需的类名对应起来。

主题的中文字体设置是 `等距更纱黑体 SC`，属于本机字体，原主题没有附带其字体文件；没有安装的设备会按原始设置回退到后续字体。Source Sans Pro、JetBrains Mono 与风车/提示图标字体已随网站提供。
