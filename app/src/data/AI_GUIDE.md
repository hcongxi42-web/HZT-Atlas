# AI 产业链数据生成指南

## 项目概述

这是一个产业链图谱可视化平台。每个产业是一个独立的 TypeScript 数据文件，导出 `IndustryData` 对象。

## 数据结构

```typescript
// 每个产业文件必须导出：
export const xxxData: IndustryData = {
  slug: "产业英文名",     // 用于URL，如 "lithium"
  name: "产业中文名",     // 导航栏显示，如 "锂电池"
  icon: "图标名",          // Battery / Sun / Bot / FlaskConical / Cpu / Zap
  description: "一句话描述",
  rootNodes: [...],        // 根节点（一级概念）
  childNodes: {...},       // 子节点（二级细分）
  connections: [...],      // 跨分支连接
};
```

### 节点类型

```typescript
// 根节点（上游/中游/下游的顶层分类）
{
  id: number,              // 从1递增
  name: "概念名",
  level: "upstream" | "midstream" | "downstream",
  description: "描述",
  parentId: null,          // 根节点固定为null
  stockCount: 0,           // 计算属性，stocks.length
  childCount: N,           // 实际子节点数量
  stocks: []               // 根节点固定为空
}

// 子节点（细分概念，含股票列表）
{
  id: number,              // 从101递增（101, 102, 103...）
  name: "细分概念名",
  level: "upstream" | "midstream" | "downstream",
  description: "描述",
  parentId: 1,             // 对应根节点id
  stockCount: N,           // 必须等于stocks.length
  childCount: 0,           // 叶子节点固定为0
  stocks: [
    {
      id: number,          // 从1001递增（1001, 1002, 1003...）
      name: "公司名",
      code: "XXXXXX.SZ",   // 深圳.SZ / 上海.SH / 港股.HK
      tag: "核心竞争力+量化"  // 见下方规范
    }
  ]
}
```

### 连接类型

```typescript
{
  id: number,              // 从1递增
  fromNodeId: 101,         // 起点子节点id
  toNodeId: 201,           // 终点子节点id
  label: "关系描述"         // 如 "原材料→制造"
}
```

## ID 规则（每个产业文件内部独立）

| 层级 | ID范围 | 示例 |
|------|--------|------|
| 根节点 | 1, 2, 3, 4... | 1=锂矿, 2=正极材料 |
| 子节点 | 101, 102, 103... | 101=锂辉石, 102=盐湖提锂 |
| 股票 | 1001, 1002, 1003... | 1001=赣锋锂业, 1002=天齐锂业 |
| 连接 | 1, 2, 3, 4... | 1=锂矿→正极 |

**关键**：每个产业文件内部的ID从1开始独立递增，不与其他产业冲突。

## 描述规范

### 子节点 description 必须包含（至少2项）

```
好示例：
"磷酸铁锂正极材料，能量密度180-200Wh/kg，循环寿命3000次+。湖南裕能市占32%全球第一"

好示例：
"光芯片唯一基底材料，全球供需缺口超70%，2英寸从800美元涨至2300-2500美元"

好示例：
"高速光模块，800G/1.6T速率，月产能超20万只。中际旭创市占42%全球第一"

差示例（避免）：
"光模块公司"        ← 太泛
"龙头企业"          ← 无量化
```

### 股票 tag 规范

```
好示例：
"光模块全球龙头，市占42%，1.6T已量产"
"InP衬底国内唯一6英寸量产，市占80%+"
"磷酸铁锂出货全球第一，市占32%，绑定宁德时代"
"碳酸锂自有矿占比60%，成本优势显著"

差示例（避免）：
"龙头企业"          ← 无具体信息
"值得关注"          ← 主观判断
```

## 产业链拆解模板

### 上游（至少4个根节点）

| 根节点 | 子节点示例 | 股票示例 |
|--------|-----------|---------|
| 矿产/原材料 | 锂辉石、盐湖提锂、云母提锂 | 赣锋锂业、天齐锂业、盐湖股份 |
| 核心材料 | 正极材料、负极材料、电解液、隔膜 | 当升科技、璞泰来、天赐材料、恩捷股份 |
| 核心设备 | 搅拌设备、涂布设备、辊压设备、分容设备 | 先导智能、赢合科技、科恒股份 |
| 零部件 | 精密轴承、电控系统、传感器 | 恒立液压、汇川技术 |

### 中游（至少4个根节点，含多条技术路线）

| 根节点 | 说明 |
|--------|------|
| 核心制造 | 价值最高的制造环节，如电芯制造 |
| 关键组件 | 模块化部件，如BMS电池管理系统 |
| 技术路线A | 主流路径1，如磷酸铁锂电池 |
| 技术路线B | 主流路径2（与A竞争），如三元锂电池 |
| 技术路线C | 新兴路径（可选），如固态电池 |

### 下游（至少3个根节点）

| 根节点 | 子节点示例 | 股票示例 |
|--------|-----------|---------|
| 终端产品 | 新能源车、消费电子、电动工具 | 比亚迪、亿纬锂能 |
| 应用场景 | 储能系统、数据中心、换电站 | 阳光电源、宁德时代 |
| 服务/回收 | 梯次利用、锂回收、电池租赁 | 格林美、天奇股份 |

## 完整示例：锂电池

```typescript
import type { IndustryData } from "./semiconductor";

// ==================== 根节点 ====================
const rootNodes = [
  // 上游
  { id: 1, name: "锂矿资源", level: "upstream", description: "锂辉石、盐湖、云母等锂源矿产，锂价从60万跌至8万后再回升", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 2, name: "正极材料", level: "upstream", description: "磷酸铁锂/三元/NCM等高能量密度正极，占电芯成本40%+", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 3, name: "负极材料", level: "upstream", description: "人造石墨/天然石墨/硅基负极，硅基负极能量密度提升10倍", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 4, name: "电解液与隔膜", level: "upstream", description: "电解液（LiPF6）+隔膜（湿法/干法），隔膜技术壁垒最高", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  // 中游
  { id: 5, name: "电芯制造", level: "midstream", description: "电池制造核心环节，宁德时代全球市占37%", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 6, name: "BMS与模组", level: "midstream", description: "电池管理系统+PACK组装，BMS是电池安全核心", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 7, name: "磷酸铁锂路线", level: "midstream", description: "成本低、安全性高、循环寿命3000次+，占比超60%", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 8, name: "三元高镍路线", level: "midstream", description: "能量密度高（300Wh/kg），高端车型主流，Ni90为最新代", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  // 下游
  { id: 9, name: "新能源车", level: "downstream", description: "动力电池最大下游，2025年渗透率超50%", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 10, name: "储能系统", level: "downstream", description: "储能电池需求爆发，2025年装机量翻倍", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 11, name: "电池回收", level: "downstream", description: "退役电池梯次利用+锂回收，2030年市场规模千亿", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
];

// ==================== 子节点 ====================
const childNodes = {
  1: [
    { id: 101, name: "锂辉石/锂云母", level: "upstream", description: "硬岩锂矿，澳洲Greenbushes为全球最大矿山，品位高", parentId: 1, stockCount: 4, childCount: 0, stocks: [
      { id: 1001, name: "赣锋锂业", code: "002460.SZ", tag: "锂盐龙头，氢氧化锂产能全球第一" },
      { id: 1002, name: "天齐锂业", code: "002466.SZ", tag: "Greenbushes二股东，锂精矿自给率80%" },
      { id: 1003, name: "中矿资源", code: "002738.SZ", tag: "Bikita矿山投产，锂精矿产能50万吨" },
      { id: 1004, name: "盛新锂能", code: "002240.SZ", tag: "锂盐产能7万吨，津巴布韦项目放量" },
    ]},
    { id: 102, name: "盐湖提锂", level: "upstream", description: "南美三角（智利/阿根廷）+中国青海西藏，成本低至3-4万/吨", parentId: 1, stockCount: 3, childCount: 0, stocks: [
      { id: 1005, name: "盐湖股份", code: "000792.SZ", tag: "察尔汗盐湖，氯化锂产能3万吨，成本最低" },
      { id: 1006, name: "藏格矿业", code: "000408.SZ", tag: "西藏盐湖，碳酸锂产能1万吨" },
      { id: 1007, name: "西藏矿业", code: "000762.SZ", tag: "扎布耶盐湖，锂浓度全球前三" },
    ]},
    { id: 103, name: "锂盐加工", level: "upstream", description: "碳酸锂/氢氧化锂冶炼加工，电池级纯度99.5%+", parentId: 1, stockCount: 3, childCount: 0, stocks: [
      { id: 1008, name: "雅化集团", code: "002497.SZ", tag: "氢氧化锂产能5万吨，特斯拉供应商" },
      { id: 1009, name: "永兴材料", code: "002756.SZ", tag: "云母提锂龙头，自有矿比例高" },
      { id: 1010, name: "天华新能", code: "603819.SH", tag: "氢氧化锂产能5万吨，绑定宁德时代" },
    ]},
  ],
  2: [
    { id: 201, name: "磷酸铁锂正极", level: "upstream", description: "成本低、安全性高，能量密度180-200Wh/kg，占比超60%", parentId: 2, stockCount: 5, childCount: 0, stocks: [
      { id: 1011, name: "湖南裕能", code: "301358.SZ", tag: "磷酸铁锂出货全球第一，市占32%" },
      { id: 1012, name: "德方纳米", code: "300769.SZ", tag: "液相法工艺龙头，高压实密度产品占比提升" },
      { id: 1013, name: "万润新能", code: "688275.SH", tag: "磷酸铁锂新锐，湖北基地产能20万吨" },
      { id: 1014, name: "龙蟠科技", code: "603906.SH", tag: "磷酸铁锂+电解液双轮驱动" },
      { id: 1015, name: "富临精工", code: "300432.SZ", tag: "磷酸铁锂产线满产，绑定主流电池厂" },
    ]},
    { id: 202, name: "三元正极", level: "upstream", description: "高能量密度（200-300Wh/kg），高镍化趋势Ni90/NCMA", parentId: 2, stockCount: 4, childCount: 0, stocks: [
      { id: 1016, name: "容百科技", code: "688005.SH", tag: "高镍三元全球龙头，Ni90量产中，市占18%" },
      { id: 1017, name: "当升科技", code: "300073.SZ", tag: "三元正极老牌龙头，海外客户占比40%+" },
      { id: 1018, name: "杉杉股份", code: "600884.SH", tag: "三元+硅基负极双布局，芬兰项目投产" },
      { id: 1019, name: "长远锂科", code: "688779.SH", tag: "三元正极新锐，单晶技术领先" },
    ]},
    { id: 203, name: "正极前驱体", level: "upstream", description: "三元前驱体是三元正极的中间品，占正极成本40%", parentId: 2, stockCount: 3, childCount: 0, stocks: [
      { id: 1020, name: "中伟股份", code: "300919.SZ", tag: "三元前驱体全球龙头，市占26%" },
      { id: 1021, name: "格林美", code: "002340.SZ", tag: "前驱体+回收双轮驱动，镍资源自给率提升" },
      { id: 1022, name: "华友钴业", code: "603799.SH", tag: "钴镍锂全链条，前驱体绑定下游大客户" },
    ]},
  ],
  3: [
    { id: 301, name: "人造石墨", level: "upstream", description: "主流负极材料，能量密度340-360mAh/g，占负极80%+", parentId: 3, stockCount: 3, childCount: 0, stocks: [
      { id: 1023, name: "璞泰来", code: "603659.SH", tag: "人造石墨负极龙头，市占率18%" },
      { id: 1024, name: "杉杉股份", code: "600884.SH", tag: "负极材料+偏光片双主业" },
      { id: 1025, name: "中科电气", code: "300035.SZ", tag: "负极材料二线龙头，绑定宁德时代" },
    ]},
    { id: 302, name: "硅基负极", level: "upstream", description: "下一代负极，理论容量4200mAh/g（石墨10倍），掺硅比例提升中", parentId: 3, stockCount: 3, childCount: 0, stocks: [
      { id: 1026, name: "贝特瑞", code: "835185.BJ", tag: "硅基负极龙头，出货量全球第一" },
      { id: 1027, name: "杉杉股份", code: "600884.SH", tag: "硅基负极中试线投产" },
      { id: 1028, name: "翔丰华", code: "300890.SZ", tag: "硅碳负极研发领先" },
    ]},
    { id: 303, name: "天然石墨", level: "upstream", description: "成本低，能量密度略低，主要用于消费电子", parentId: 3, stockCount: 2, childCount: 0, stocks: [
      { id: 1029, name: "贝特瑞", code: "835185.BJ", tag: "天然石墨负极龙头" },
      { id: 1030, name: "翔丰华", code: "300890.SZ", tag: "天然石墨负极" },
    ]},
  ],
  4: [
    { id: 401, name: "电解液", level: "upstream", description: "LiPF6+溶剂+添加剂，占电芯成本10-15%，天赐材料全球第一", parentId: 4, stockCount: 4, childCount: 0, stocks: [
      { id: 1031, name: "天赐材料", code: "002709.SZ", tag: "电解液全球龙头，市占28%，六氟磷酸锂自供" },
      { id: 1032, name: "新宙邦", code: "300037.SZ", tag: "电解液老二，海外客户占比高" },
      { id: 1033, name: "瑞泰新材", code: "301238.SZ", tag: "电解液新锐，LiFSI技术领先" },
      { id: 1034, name: "多氟多", code: "002407.SZ", tag: "六氟磷酸锂龙头，产能5万吨" },
    ]},
    { id: 402, name: "隔膜", level: "upstream", description: "湿法隔膜为主流，恩捷股份全球市占35%+，技术壁垒最高", parentId: 4, stockCount: 3, childCount: 0, stocks: [
      { id: 1035, name: "恩捷股份", code: "002812.SZ", tag: "湿法隔膜全球龙头，市占35%" },
      { id: 1036, name: "星源材质", code: "300568.SZ", tag: "干法隔膜龙头，湿法快速追赶" },
      { id: 1037, name: "中材科技", code: "002080.SZ", tag: "隔膜+玻纤双主业" },
    ]},
  ],
  5: [
    { id: 501, name: "动力电池", level: "midstream", description: "新能源车用电池，宁德时代全球市占37%，比亚迪第二", parentId: 5, stockCount: 6, childCount: 0, stocks: [
      { id: 1038, name: "宁德时代", code: "300750.SZ", tag: "动力电池全球龙头，市占37%，麒麟电池量产" },
      { id: 1039, name: "比亚迪", code: "002594.SZ", tag: "刀片电池+整车一体化，铁锂路线标杆" },
      { id: 1040, name: "亿纬锂能", code: "300014.SZ", tag: "动力电池增速第一，储能双轮驱动" },
      { id: 1041, name: "中创新航", code: "03931.HK", tag: "动力电池第三，广汽/小鹏核心供应商" },
      { id: 1042, name: "国轩高科", code: "002074.SZ", tag: "大众持股背书，铁锂路线深耕" },
      { id: 1043, name: "欣旺达", code: "300207.SZ", tag: "动力电池快速放量，HEV技术领先" },
    ]},
    { id: 502, name: "储能电池", level: "midstream", description: "储能专用电池，大容量/长循环/低成本要求", parentId: 5, stockCount: 3, childCount: 0, stocks: [
      { id: 1044, name: "宁德时代", code: "300750.SZ", tag: "储能电池全球第一，市占40%" },
      { id: 1045, name: "亿纬锂能", code: "300014.SZ", tag: "储能电池增速最快" },
      { id: 1046, name: "鹏辉能源", code: "300438.SZ", tag: "储能电池二线龙头" },
    ]},
    { id: 503, name: "消费电池", level: "midstream", description: "手机/笔记本/穿戴设备用电池，增速放缓", parentId: 5, stockCount: 2, childCount: 0, stocks: [
      { id: 1047, name: "ATL(未上市)", code: "未上市", tag: "消费电池全球龙头，苹果核心供应商" },
      { id: 1048, name: "欣旺达", code: "300207.SZ", tag: "消费电池+动力电池双轮" },
    ]},
  ],
  6: [
    { id: 601, name: "BMS系统", level: "midstream", description: "电池管理系统，电池安全核心，占PACK成本10%", parentId: 6, stockCount: 3, childCount: 0, stocks: [
      { id: 1049, name: "经纬恒润", code: "688326.SH", tag: "BMS系统龙头，车规级技术领先" },
      { id: 1050, name: "均胜电子", code: "600699.SH", tag: "BMS+汽车电子双主业" },
      { id: 1051, name: "科列技术(未上市)", code: "未上市", tag: "BMS专业厂商" },
    ]},
    { id: 602, name: "PACK组装", level: "midstream", description: "电池模组组装，自动化程度要求高", parentId: 6, stockCount: 2, childCount: 0, stocks: [
      { id: 1052, name: "宁德时代", code: "300750.SZ", tag: "CTP/CTC技术领先" },
      { id: 1053, name: "比亚迪", code: "002594.SZ", tag: "刀片电池PACK一体化" },
    ]},
  ],
  7: [
    { id: 701, name: "磷酸铁锂电芯", level: "midstream", description: "成本低（0.4元/Wh）、安全性高、循环3000次+，占比超60%", parentId: 7, stockCount: 3, childCount: 0, stocks: [
      { id: 1054, name: "宁德时代", code: "300750.SZ", tag: "神行电池超充版磷酸铁锂" },
      { id: 1055, name: "比亚迪", code: "002594.SZ", tag: "刀片电池磷酸铁锂标杆" },
      { id: 1056, name: "国轩高科", code: "002074.SZ", tag: "磷酸铁锂技术深厚，大众背书" },
    ]},
    { id: 702, name: "磷酸锰铁锂", level: "midstream", description: "磷酸铁锂升级版，能量密度提升15-20%，即将量产", parentId: 7, stockCount: 2, childCount: 0, stocks: [
      { id: 1057, name: "德方纳米", code: "300769.SZ", tag: "磷酸锰铁锂国内领先，已小批量供货" },
      { id: 1058, name: "当升科技", code: "300073.SZ", tag: "磷酸锰铁锂正极研发中" },
    ]},
  ],
  8: [
    { id: 801, name: "高镍三元", level: "midstream", description: "Ni80/Ni90高镍化，能量密度300Wh/kg，高端车型主流", parentId: 8, stockCount: 3, childCount: 0, stocks: [
      { id: 1059, name: "宁德时代", code: "300750.SZ", tag: "高镍三元麒麟电池，极氪009搭载" },
      { id: 1060, name: "LG新能源(未上市)", code: "未上市", tag: "高镍三元技术领先，特斯拉供应商" },
      { id: 1061, name: "三星SDI(未上市)", code: "未上市", tag: "高镍三元+硅基负极" },
    ]},
    { id: 802, name: "半固态/固态电池", level: "midstream", description: "下一代电池技术，能量密度400Wh/kg+，2027-2030年量产", parentId: 8, stockCount: 3, childCount: 0, stocks: [
      { id: 1062, name: "卫蓝新能源(未上市)", code: "未上市", tag: "半固态电池国内领先，蔚来150度电池包" },
      { id: 1063, name: "清陶能源(未上市)", code: "未上市", tag: "固态电池龙头，上汽投资" },
      { id: 1064, name: "赣锋锂业", code: "002460.SZ", tag: "固态电池中试线投产" },
    ]},
  ],
  9: [
    { id: 901, name: "新能源乘用车", level: "downstream", description: "动力电池最大下游，2025年渗透率超50%", parentId: 9, stockCount: 5, childCount: 0, stocks: [
      { id: 1065, name: "比亚迪", code: "002594.SZ", tag: "新能源车全球销冠，刀片电池自供" },
      { id: 1066, name: "特斯拉(美股)", code: "TSLA", tag: "全球新能源车标杆，4680电池" },
      { id: 1067, name: "理想汽车", code: "02015.HK", tag: "增程式+纯电双路线，毛利率领先" },
      { id: 1068, name: "小鹏汽车", code: "09868.HK", tag: "智能驾驶领先，扶摇架构" },
      { id: 1069, name: "蔚来", code: "09866.HK", tag: "换电模式，半固态电池首发" },
    ]},
    { id: 902, name: "电动商用车", level: "downstream", description: "公交/物流/重卡电动化，政策驱动", parentId: 9, stockCount: 2, childCount: 0, stocks: [
      { id: 1070, name: "宇通客车", code: "600066.SH", tag: "新能源客车龙头" },
      { id: 1071, name: "潍柴动力", code: "000338.SZ", tag: "重卡氢燃料+电动化" },
    ]},
    { id: 903, name: "两轮电动车", level: "downstream", description: "锂电替代铅酸，雅迪/爱玛/九号", parentId: 9, stockCount: 2, childCount: 0, stocks: [
      { id: 1072, name: "雅迪控股", code: "01585.HK", tag: "两轮电动车全球龙头" },
      { id: 1073, name: "九号公司", code: "689009.SH", tag: "智能电动两轮车新锐" },
    ]},
  ],
  10: [
    { id: 1001, name: "大型储能", level: "downstream", description: "电网侧/发电侧储能，2025年装机量翻倍", parentId: 10, stockCount: 3, childCount: 0, stocks: [
      { id: 1074, name: "阳光电源", code: "300274.SZ", tag: "储能逆变器+系统集成全球龙头" },
      { id: 1075, name: "海博思创(未上市)", code: "未上市", tag: "储能系统国内龙头" },
      { id: 1076, name: "科华数据", code: "002335.SZ", tag: "储能PCS+数据中心" },
    ]},
    { id: 1002, name: "户用储能", level: "downstream", description: "家庭储能，欧洲需求爆发", parentId: 10, stockCount: 2, childCount: 0, stocks: [
      { id: 1077, name: "派能科技", code: "688063.SH", tag: "户用储能电池全球龙头" },
      { id: 1078, name: "固德威", code: "688390.SH", tag: "户用储能逆变器龙头" },
    ]},
  ],
  11: [
    { id: 1101, name: "梯次利用", level: "downstream", description: "退役动力电池降级为储能/低速车电池", parentId: 11, stockCount: 2, childCount: 0, stocks: [
      { id: 1079, name: "格林美", code: "002340.SZ", tag: "梯次利用+回收双轮驱动" },
      { id: 1080, name: "天奇股份", code: "002009.SZ", tag: "电池回收设备龙头" },
    ]},
    { id: 1102, name: "锂回收", level: "downstream", description: "从退役电池中提取锂/钴/镍，2030年市场规模千亿", parentId: 11, stockCount: 3, childCount: 0, stocks: [
      { id: 1081, name: "格林美", code: "002340.SZ", tag: "锂回收龙头，回收率90%+" },
      { id: 1082, name: "华友钴业", code: "603799.SH", tag: "镍钴回收+前驱体一体化" },
      { id: 1083, name: "赣锋锂业", code: "002460.SZ", tag: "锂回收布局，闭环供应链" },
    ]},
  ],
};

// ==================== 连接关系 ====================
const connections = [
  // 上游→中游
  { id: 1, fromNodeId: 101, toNodeId: 201, label: "锂矿→正极" },
  { id: 2, fromNodeId: 101, toNodeId: 103, label: "锂矿→锂盐" },
  { id: 3, fromNodeId: 103, toNodeId: 201, label: "锂盐→正极" },
  { id: 4, fromNodeId: 201, toNodeId: 501, label: "正极→电芯" },
  { id: 5, fromNodeId: 202, toNodeId: 501, label: "正极→电芯" },
  { id: 6, fromNodeId: 301, toNodeId: 501, label: "负极→电芯" },
  { id: 7, fromNodeId: 302, toNodeId: 501, label: "硅基负极→电芯" },
  { id: 8, fromNodeId: 401, toNodeId: 501, label: "电解液→电芯" },
  { id: 9, fromNodeId: 402, toNodeId: 501, label: "隔膜→电芯" },
  // 中游→中游
  { id: 10, fromNodeId: 501, toNodeId: 601, label: "电芯→BMS" },
  { id: 11, fromNodeId: 701, toNodeId: 801, label: "铁锂→三元(替代竞争)" },
  // 中游→下游
  { id: 12, fromNodeId: 501, toNodeId: 901, label: "电池→新能源车" },
  { id: 13, fromNodeId: 502, toNodeId: 1001, label: "储能电池→大型储能" },
  { id: 14, fromNodeId: 502, toNodeId: 1002, label: "储能电池→户用储能" },
  // 下游→回收
  { id: 15, fromNodeId: 901, toNodeId: 1101, label: "退役电池→梯次利用" },
  { id: 16, fromNodeId: 1101, toNodeId: 1102, label: "梯次利用后→锂回收" },
];

// ==================== 导出 ====================
export const lithiumData: IndustryData = {
  slug: "lithium",
  name: "锂电池",
  icon: "Battery",
  description: "锂电池产业链涵盖上游锂矿/正极/负极/电解液/隔膜、中游电芯制造/BMS/技术路线、下游新能源车/储能/回收。",
  rootNodes,
  childNodes,
  connections,
};
```

## 接入步骤

1. 将上述代码保存为 `src/data/lithium.ts`
2. 打开 `src/pages/Home.tsx`
3. 取消注释以下两行：

```typescript
import { lithiumData } from "@/data/lithium";

const ALL_INDUSTRIES: IndustryData[] = [
  semiconductorData,
  lithiumData,  // ← 取消注释
];
```

## 自检清单

生成完成后请确认：
- [ ] 上游≥4个根节点，每个≥3个子节点，每个子节点≥3只股票
- [ ] 中游≥4个根节点，技术路线作为独立分支
- [ ] 下游≥3个根节点，含回收/服务
- [ ] 所有描述追溯到最上游原材料
- [ ] 所有tag含量化数据（市占率/产能/良率/增速等）
- [ ] 连接关系≥10条
- [ ] ID递增不跳号：根1-N，子101-N，股票1001-N，连接1-N
- [ ] stockCount等于stocks.length
- [ ] childCount等于实际子节点数量
- [ ] 文件导出名为 `xxxData: IndustryData`
