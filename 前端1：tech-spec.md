# 产业链图谱 — 技术规格

## 依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| `react` | ^18.2.0 | UI 框架 |
| `react-dom` | ^18.2.0 | DOM 渲染 |
| `vite` | ^5.0.0 | 构建工具 |
| `@vitejs/plugin-react` | ^4.0.0 | Vite React 支持 |
| `typescript` | ^5.0.0 | 类型系统 |
| `tailwindcss` | ^3.4.0 | 样式方案 |
| `lucide-react` | ^0.400.0 | 图标库（齿轮、布局切换等） |
| `clsx` | ^2.0.0 | 条件类名拼接 |
| `tailwind-merge` | ^2.0.0 | Tailwind 类名冲突解决 |

**不引入额外图表库**：核心产业链图谱完全基于原生 Canvas 2D API 封装，以保证视觉风格的完全自定义和渲染性能。

---

## 组件清单

### 布局组件（页面级）

| 组件 | 来源 | 说明 |
|------|------|------|
| `Sidebar` | 自建 | 左侧固定导航栏，含 Logo + 产业分类列表 |
| `StockPanel` | 自建 | 右侧抽屉式股票列表面板，支持滑出/收起 |
| `ViewToggleBar` | 自建 | 顶部视图模式切换工具栏 |

### 核心组件

| 组件 | 来源 | 说明 |
|------|------|------|
| `IndustryCanvas` | 自建 | Canvas 产业链图谱主渲染组件，含缩放/平移/交互逻辑 |
| `StockListItem` | 自建 | 右侧列表单行股票项 |
| `IndustryNavItem` | 自建 | 左侧导航产业分类单项 |

### Hooks

| Hook | 说明 |
|------|------|
| `useCanvasRenderer` | 封装 Canvas 绘制循环（管道、节点、动画），管理 requestAnimationFrame |
| `useCanvasInteraction` | 封装 Canvas 交互：鼠标滚轮缩放、拖拽平移、节点 Hover 检测 |
| `useViewMode` | 管理三种视图模式状态（fullscreen / split / thumbnail）及切换逻辑 |

---

## 动画实现方案

| 动画 | 库 / 方案 | 实现方式 | 复杂度 |
|------|----------|----------|--------|
| 管道流动高光（虚线移动） | 原生 Canvas | `ctx.setLineDash()` + `lineDashOffset` 每帧递减 | 🔒 Medium |
| 画布缩放/平移 | 原生 Canvas | 维护 `transform` 矩阵（scale/translate），在 `draw()` 前 `ctx.setTransform()` | 🔒 Medium |
| 节点 Hover 放大发光 | 原生 Canvas | 检测鼠标位置与节点 bbox 碰撞，动态调整 `shadowBlur` / `scale` 重绘 | Low |
| 右侧面板滑出/收起 | CSS Transition | `transform: translateX()` + `transition: transform 300ms ease` | Low |
| 导航项 Hover/Active 高亮 | CSS Transition | `transition: color/background/border-color 200ms ease` | Low |
| 列表项 ↔ 画布节点联动高亮 | 状态驱动 | Hover 列表项时设置 `highlightedStockId`，Canvas 渲染循环中检测并绘制闪烁边框 | Low |

---

## 状态与逻辑架构

### 视图模式状态机

三种视图模式构成互斥状态：`fullscreen` | `split` | `thumbnail`。

- `fullscreen`：Canvas 占据 `calc(100vw - 240px)`，右侧面板完全收起
- `split`：Canvas 与右侧面板各占中间区域 50%
- `thumbnail`：Canvas 收缩为中间区域顶部缩略图（高度约 40%），下方留给右侧面板主导

状态变更时，Canvas 需要重新计算自身容器尺寸并调整缩放比例以适应新视口。

### 画布坐标系管理

采用**分层坐标系**：

- **世界坐标系（World）**：产业链节点的原始逻辑坐标，不变
- **视图坐标系（View）**：经缩放/平移变换后的屏幕坐标

维护一个 `viewTransform` 对象：`{ scale: number, offsetX: number, offsetY: number }`。

所有鼠标事件（点击、Hover）发生时，需将屏幕坐标逆变换为世界坐标，再与节点的世界坐标 bbox 做碰撞检测。

### 产业数据 → 渲染管线

数据流向为单向：

```
industryData (JSON) → parsedNodes[] + connections[] → useCanvasRenderer → Canvas 帧循环
                                                          ↑
                                                   viewTransform (交互更新)
```

- `industryData`：包含 nodes（产业节点 + 股票节点）和 connections（连接关系）
- `parsedNodes`：解析后的节点数组，含计算好的 bbox、类型标记
- `connections`：连接关系数组，含起点/终点节点引用
- Canvas 帧循环每帧：清空画布 → 应用 transform → 绘制管道（三层）→ 绘制节点 → 绘制流动动画

---

## 其他关键决策

### Canvas 渲染策略：命令式封装

Canvas 是命令式 API，与 React 的声明式模型天然不匹配。采用以下策略：

- `IndustryCanvas` 组件仅负责：创建 `<canvas>` 元素、绑定 ref、处理容器尺寸变化
- 所有绘制逻辑封装在 `useCanvasRenderer` hook 中，通过 `requestAnimationFrame` 驱动
- 交互状态（`viewTransform`、`hoveredNodeId`）使用 `useRef` 存储，避免触发 React 重渲染，保证 60fps 流畅度
- 只有当需要同步 UI（如显示 Tooltip、联动列表）时，才通过回调将状态暴露给 React

### 节点布局算法

产业链节点采用**预置坐标 + 简单层级排列**，而非自动图布局算法：

- 每个产业的数据中，节点已带有 `(x, y)` 世界坐标
- 同一层级的产业节点沿水平方向排列（上游 → 中游 → 下游）
- 股票节点垂直排列在其父产业节点下方
- 这种固定布局保证了产业链的阅读顺序（从左到右为流程方向），更符合交易员的认知习惯

### 数据硬编码

项目为前端静态展示，三个产业（半导体、新能源汽车、光伏）的完整产业链数据作为 JSON 模块直接导入，不接入后端或 API。
