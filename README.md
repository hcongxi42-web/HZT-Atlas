# 产业链图谱 — Industry Chain Graph

> 交互式产业链关系图谱，可视化展示产业上下游关系与相关上市公司。

## ✨ 功能特性

- **📊 产业链可视化**：基于原生 Canvas 2D API 的产业链关系图谱，支持节点拖拽、缩放、平移
- **🏭 三大产业链**：覆盖半导体、新能源汽车、光伏三大核心产业链
- **🔍 智能搜索**：支持节点搜索、股票搜索，快速定位产业链中的任意节点
- **🎨 三种视图模式**：全屏模式、分屏模式、缩略图模式，适应不同使用场景
- **🖱️ 丰富交互**：画布缩放/平移、节点 Hover 高亮、列表-画布联动、面包屑导航
- **✏️ 编辑模式**：支持动态添加/删除节点和连接关系
- **📈 股价展示**：节点详情面板展示相关上市公司涨跌幅数据

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | React 19 + TypeScript |
| 构建工具 | Vite 7 |
| 样式方案 | Tailwind CSS 3 + shadcn/ui |
| 后端框架 | Hono |
| API 层 | tRPC |
| 数据库 ORM | Drizzle ORM + MySQL |
| 图表渲染 | 原生 Canvas 2D API |
| 图标库 | Lucide React |

## 📁 项目结构

```
├── app/                          # 应用代码
│   ├── api/                      # 后端 API（Hono + tRPC）
│   │   ├── routers/              # tRPC 路由（产业链节点、连接、行业、股票）
│   │   ├── lib/                  # 工具库
│   │   └── boot.ts               # 服务入口
│   ├── db/                       # 数据库层（Drizzle ORM）
│   │   ├── schema.ts             # 数据库表结构
│   │   ├── relations.ts          # 表关联
│   │   └── seed.ts               # 种子数据
│   ├── src/
│   │   ├── components/
│   │   │   ├── chain/            # 产业链核心组件
│   │   │   │   ├── ChainGraph.tsx      # 图谱主组件（Canvas 渲染）
│   │   │   │   ├── ChainNode.tsx       # 节点组件
│   │   │   │   ├── NodeDetail.tsx      # 节点详情面板
│   │   │   │   ├── Toolbar.tsx         # 工具栏
│   │   │   │   ├── CommandPalette.tsx  # 命令面板（⌘K）
│   │   │   │   ├── Minimap.tsx         # 小地图
│   │   │   │   └── ...
│   │   │   └── ui/               # shadcn/ui 通用组件（50+）
│   │   ├── hooks/                # 自定义 Hooks
│   │   ├── data/                 # 静态数据
│   │   └── pages/                # 页面组件
│   ├── contracts/                # 类型定义
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   ├── package.json
│   └── tsconfig.json
├── 前端1：tech-spec.md            # 技术规格文档
├── 前端2：优化方案UI_UX_Optimization_Plan.md  # UI/UX 优化方案
└── docx/                        # 辅助工具
```

## 🚀 快速启动

### 环境要求

- Node.js 20+
- MySQL 数据库

### 本地开发

```bash
# 1. 进入应用目录
cd app

# 2. 安装依赖
npm install

# 3. 配置环境变量（复制 .env.example 为 .env 并填写）
cp .env.example .env

# 4. 初始化数据库
npm run db:push

# 5. 启动开发服务器
npm run dev
```

开发服务器运行在 `http://localhost:3000`。

### 构建部署

```bash
cd app
npm run build
npm run start
```

## 🎯 核心设计

### Canvas 渲染策略

- 产业链图谱完全基于原生 Canvas 2D API 封装，保证视觉风格完全自定义和 60fps 渲染性能
- 采用**分层坐标系**：世界坐标系（World）存储节点原始位置，视图坐标系（View）处理缩放/平移变换
- 管道流动高光动画通过 `setLineDash()` + `lineDashOffset` 每帧递减实现
- 所有绘制逻辑封装在 `useCanvasRenderer` hook 中，通过 `requestAnimationFrame` 驱动

### 视图模式

- **全屏模式（fullscreen）**：Canvas 占据全部空间
- **分屏模式（split）**：Canvas 与详情面板各占 50%
- **缩略图模式（thumbnail）**：Canvas 收缩为缩略图，下方展示详情

### 节点布局

- 产业链节点按上游 → 中游 → 下游水平方向排列
- 股票节点垂直排列在其父产业节点下方
- 固定布局保证了产业链的阅读顺序，符合交易员认知习惯

## 📄 许可证

MIT License

---

👤 **作者**: hcongxi42-web | 🔗 **仓库**: [GitHub](https://github.com/hcongxi42-web/-)
