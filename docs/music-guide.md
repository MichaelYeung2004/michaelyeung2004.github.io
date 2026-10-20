# 添加自己的音乐专辑

网页地址：`/music/`。所有专辑在 `_data/music.yml` 中管理，不需要修改网页代码。

## 添加专辑

1. 将专辑封面保存到 `images/music/`。推荐准备约 300px 的小图及来源提供的最高分辨率原图，均使用正方形 JPG 或 WebP；不要将小图放大充当高清图。
2. 在 Spotify 打开专辑，选择“分享 → 复制专辑链接”。请用专辑链接，而非歌曲链接。
3. 打开 `_data/music.yml`，在现有的 `albums:` 下复制一段专辑信息，并填写自己的内容。下面展示完整格式；文件里只保留一个 `albums:`：

```yaml
albums:
  - title: "专辑名称"
    artist: "歌手 / 乐队"
    year: "2026"
    cover: "/images/music/my-album.jpg"
    full_cover: "/images/music/my-album-full.jpg"
    spotify: "https://open.spotify.com/album/你的专辑ID"
    note: "一句你喜欢它的理由。"
    tags: ["华语", "流行"]
    tone: "sage"
```

`cover` 可以使用完整的 HTTPS 图片地址，但保存在仓库里更稳定。`note`、`tags`、`year` 和 `tone` 都可以省略。没有封面时会显示一个唱片式占位封面；`title`、`artist`、`spotify` 应填写完整。

`full_cover` 可选：先展示 `cover` 小图，沿用头像的渐进加载脚本，等高清图下载、解码完成后原位替换，不改变布局。高清图失败时保留小图；不填写则只显示 `cover`。两种尺寸均由本站提供，访客不必连接 Spotify 或 Apple Music。高清版本也会自动加入空闲预取清单。

### 当前封面来源（2026-10-20 核对）

对比 Spotify 官方提供的 640×640 封面后，选用了 Apple Music 同图案的更高清版本。通过 Apple 官方 iTunes lookup API 获取 artwork URL，并请求大尺寸；服务端实际返回以下尺寸，而非请求尺寸 9999px。高清文件原样保存、没有人工放大，预览图由对应高清图缩小为 300×300。

| 专辑 | 高清尺寸 | 官方来源 |
| --- | --- | --- |
| Abbey Road | 1500×1500 | [Apple Music](https://music.apple.com/us/album/1474815798) |
| Dookie | 1425×1425 | [Apple Music](https://music.apple.com/us/album/1160081985) |
| American Idiot | 1425×1425 | [Apple Music](https://music.apple.com/us/album/1161539183) |
| Reborn | 3000×3000 | [Apple Music](https://music.apple.com/us/album/1547226812) |
| HIT ME HARD AND SOFT | 3000×3000 | [Apple Music](https://music.apple.com/us/album/1739659134) |
| SABINA之淚 | 3000×3000 | [Apple Music](https://music.apple.com/hk/album/1583189438) |
| 黑豹 | 1400×1400 | [Apple Music](https://music.apple.com/hk/album/177025348) |

## 继续添加、排序、删除

- 同一个 `albums:` 下继续添加 `- title: ...` 段落，不要重复写 `albums:`。每个段落表示一张专辑。
- 页面按 YAML 中从上到下的填写顺序展示，不再按 Spotify 链接排序；移动整段专辑信息即可自由调整，新专辑写在想展示的位置。
- 桌面端每行四张，平板每行三张，手机端每行两张；紫色方格共用外框和窄隔板，组成一整面立体唱片墙。新增专辑自动换行，末行不足的位置保留空格。
- 专辑名和歌手显示在浅紫色层板正面；标题换行时层板会自动增高，不会遮住文字。专辑展示名称可以自行简化，Spotify 链接可以仍然指向 Deluxe 等具体版本。
- 删除一张专辑时，删除它的整个段落。封面文件可以保留或自行删除。
- 如果暂时全部清空，可以写 `albums: []`，页面会显示唱片架的空状态。
- `tone` 可选 `sage`（绿）、`amber`（暖黄）、`rose`（粉）或 `blue`（蓝），仅影响未填写封面时的底色。
- 点击专辑封面或标题会在新窗口打开 Spotify，不会自动播放；页面不显示 Spotify 图标或悬浮播放按钮。
- 唱片架材质从 `assets/images/music-reference.png` 的空白区域提取为四张无损 WebP（总计约 24.6KB），由 CSS 分层显示。原 PNG 保留作素材，不会在网页中下载；重新生成可运行 `tools/optimize-music-material.py`（需要 Pillow）。
- 网站在当前页面加载完成后，利用空闲时间逐张、低优先级缓存其他页面实际使用的站内图片。新增专辑和博文图片自动加入清单；省流量模式、2G 网络或后台标签页会暂停，不会一次下载整个仓库图片。
- 外框和底部统一收边；信息栏使用均匀紫色与淡纹理，避免参考图窄条拉伸带来的局部色差。
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
