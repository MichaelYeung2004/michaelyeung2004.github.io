---
layout: blog
title: '科研笔记：深度学习基础'
date: 2024-03-10
tags:
  - deep-learning
  - neural-networks
  - research
  - machine-learning
---

# 科研笔记：深度学习基础

这篇文章记录了深度学习的一些基础概念。

## 神经网络基础

神经网络由多个层组成：

1. **输入层**：接收原始数据
2. **隐藏层**：提取特征
3. **输出层**：生成预测结果

## 常用激活函数

### ReLU

$$f(x) = \max(0, x)$$

优点：
- 计算简单
- 缓解梯度消失

### Sigmoid

$$\sigma(x) = \frac{1}{1 + e^{-x}}$$

特点：
- 输出范围 (0, 1)
- 适合二分类问题

## 优化算法

### 梯度下降

基本更新规则：

$$\theta_{t+1} = \theta_t - \eta \nabla L(\theta_t)$$

其中 $\eta$ 是学习率。

### Adam 优化器

结合了动量和自适应学习率：

- 动量项：加速收敛
- 自适应学习率：自动调整步长

## 正则化技术

### Dropout

随机丢弃神经元，防止过拟合。

### Batch Normalization

标准化每层输入，加速训练。

## 总结

深度学习是一个快速发展的领域，需要不断学习和实践。

## 参考资料

- Goodfellow et al. "Deep Learning" (2016)
- [Deep Learning Specialization](https://www.coursera.org/specializations/deep-learning)

