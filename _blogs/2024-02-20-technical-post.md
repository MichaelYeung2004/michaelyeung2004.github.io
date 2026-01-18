---
layout: blog
title: 'Jekyll 博客搭建指南'
date: 2024-02-20
tags:
  - jekyll
  - github-pages
  - tutorial
  - technical
---

# Jekyll 博客搭建指南

本文将介绍如何使用 Jekyll 搭建个人学术主页。

## 什么是 Jekyll？

Jekyll 是一个静态网站生成器，特别适合：

- 个人博客
- 学术主页
- 项目文档

## 主要特性

### 1. 简单易用

使用 Markdown 编写内容，无需数据库。

### 2. GitHub Pages 支持

可以免费托管在 GitHub Pages 上。

### 3. 高度可定制

通过主题和插件实现个性化。

## 基本结构

```
my-site/
├── _config.yml    # 配置文件
├── _layouts/      # 布局模板
├── _includes/     # 可复用组件
├── _posts/        # 博客文章
└── index.html     # 首页
```

## 开始使用

### 安装 Jekyll

```bash
gem install jekyll bundler
```

### 创建新站点

```bash
jekyll new my-site
cd my-site
bundle exec jekyll serve
```

## 小结

Jekyll 是搭建学术主页的优秀选择，希望这篇文章对你有帮助！

