---
title: 排版预览：研究笔记与日常思考
description: 这是一篇本地预览草稿，用来检查 dyzj-light 风格的文章排版，不会发布到线上。
date: 2026-10-04
tags: [排版预览, Markdown]
permalink: /blog/style-preview/
---

写作是一种整理思考的方式。这里是一页尚未发表的笔记，用来预览中文、English、代码与公式在网页上的呈现。

## 从一个问题开始

好的研究笔记不必一开始就有答案。它可以从一个观察、一段实验，或者一个尚未想清楚的问题开始。

> 保留问题的上下文，往往比只记录最后的结论更有价值。

### 整理思路

- 记录研究问题和假设。
- 对照论文与实验结果。
- 写下下一步想尝试的方向。

### 一段代码

```python
def summarize_experiment(results):
    """Keep a small, reproducible record."""
    return {"mean": sum(results) / len(results)}
```

行内代码如 `learning_rate` 使用主题中的暖色背景。

## 公式与表格

例如，一个简单的损失函数：

$$
\mathcal{L}(\theta) = \frac{1}{N}\sum_{i=1}^{N} \|f_\theta(x_i)-y_i\|^2.
$$

| 记录项 | 内容 | 用途 |
| :--- | :--- | :--- |
| 假设 | 实验之前的猜想 | 帮助复盘 |
| 设置 | 数据、模型、参数 | 保证可复现 |
| 观察 | 实验结果与现象 | 形成下一步问题 |

## 留一点空间给思考

可以引用 [VIPL Laboratory](https://vipl.ict.ac.cn/) 等资料，也可以使用脚注补充说明。[^note]

<details markdown="1">
<summary>展开一条补充笔记</summary>

折叠块可以放次要推导、额外实验或参考资料，让正文更轻盈。

</details>

---

每一次认真记录，都是为未来的自己留下一条线索。

[^note]: 这是脚注样式的预览。此草稿只用于本地检查。
