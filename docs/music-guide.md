# 添加自己的音乐专辑

网页地址：`/music/`。所有专辑在 `_data/music.yml` 中管理，不需要修改网页代码。

## 添加专辑

1. 将专辑封面保存到 `images/music/`，推荐正方形 JPG 或 WebP，宽度约 600px。
2. 在 Spotify 打开专辑，选择“分享 → 复制专辑链接”。请用专辑链接，而非歌曲链接。
3. 打开 `_data/music.yml`，在现有的 `albums:` 下复制一段专辑信息，并填写自己的内容。下面展示完整格式；文件里只保留一个 `albums:`：

```yaml
albums:
  - title: "专辑名称"
    artist: "歌手 / 乐队"
    year: "2026"
    cover: "/images/music/my-album.jpg"
    spotify: "https://open.spotify.com/album/你的专辑ID"
    note: "一句你喜欢它的理由。"
    tags: ["华语", "流行"]
    tone: "sage"
```

`cover` 可以使用完整的 HTTPS 图片地址，但保存在仓库里更稳定。`note`、`tags`、`year` 和 `tone` 都可以省略。没有封面时会显示一个唱片式占位封面；`title`、`artist`、`spotify` 应填写完整。

## 继续添加、排序、删除

- 同一个 `albums:` 下继续添加 `- title: ...` 段落，不要重复写 `albums:`。每个段落表示一张专辑。
- 段落从上到下就是展示顺序。第一张专辑也会出现在页面上方的黑胶装饰区域。
- 删除一张专辑时，删除它的整个段落。封面文件可以保留或自行删除。
- 如果暂时全部清空，可以写 `albums: []`，页面会显示唱片架的空状态。
- `tone` 可选 `sage`（绿）、`amber`（暖黄）、`rose`（粉）或 `blue`（蓝），仅影响未填写封面时的底色。
- 搜索会匹配专辑名、歌手、年份和标签。点击专辑封面或标题会在新窗口打开 Spotify，不会自动播放。
- 文件名尽量使用英文和短横线；YAML 请用空格缩进，不要用 Tab。带冒号的文本请保留引号。

## 发布

在网站目录 `D:\michaelyeung2004.github.io` 中打开 PowerShell：

```powershell
git add _data/music.yml images/music
git diff --cached --stat
git commit -m "Update music collection"
git push origin main
```

推送后等待 GitHub Pages 部署完成即可。此操作只包含专辑清单和封面，不会顺带提交其他笔记。
