# 产业链图谱 — 应用代码

本目录是产业链图谱项目的应用代码，包含完整的前后端实现。

## 启动

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 填写 DATABASE_URL 等信息

# 初始化数据库
npm run db:push

# 启动开发服务器（端口 3000）
npm run dev
```

## 目录结构

```
app/
├── api/              # Hono + tRPC 后端
│   ├── routers/      # API 路由
│   ├── lib/          # 工具函数
│   └── boot.ts       # 入口
├── db/               # Drizzle ORM 数据库层
│   ├── schema.ts     # 表定义
│   └── seed.ts       # 种子数据
├── src/              # 前端源码
│   ├── components/
│   │   ├── chain/    # 产业链核心组件
│   │   └── ui/       # shadcn/ui 组件库
│   ├── hooks/        # 自定义 Hooks
│   ├── data/         # 静态数据
│   └── pages/        # 页面
├── contracts/        # 类型定义
├── scripts/          # 工具脚本
└── package.json
```

详细项目介绍请查看[根目录 README](../README.md)。
