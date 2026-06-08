// 半导体产业链数据
// ID规则：根节点 1-99，子节点 101-9999，股票 1-999

export interface LocalNode {
  id: number;
  name: string;
  level: string;
  description: string | null;
  plainLanguageDescription?: string | null;
  parentId: number | null;
  stockCount: number;
  childCount: number;
  stocks: { id: number; name: string; code: string; tag: string; description?: string }[];
}

export interface LocalConnection {
  id: number;
  fromNodeId: number;
  toNodeId: number;
  label: string | null;
}

export interface IndustryData {
  slug: string;
  name: string;
  icon: string;
  description: string;
  plainLanguageDescription?: string | null;
  /** 产业链大白话概述：什么是这个产业、为什么重要 */
  overviewSummary?: string;
  /** 产业链架构说明：上游/中游/下游各管什么 */
  overviewArchitecture?: string;
  /** 产业链关键数据亮点 */
  overviewHighlights?: string[];
  rootNodes: LocalNode[];
  childNodes: Record<number, LocalNode[]>;
  connections: LocalConnection[];
}

// === 根节点 ===
const rootNodes: LocalNode[] = [
  { id: 1, name: "EDA/IP核", level: "upstream", description: "电子设计自动化工具与知识产权核，芯片设计的基石", plainLanguageDescription: "EDA/IP核好比是芯片设计师的'画图软件'和'标准图纸库'，没有它们就设计不出芯片", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 2, name: "半导体设备", level: "upstream", description: "芯片制造所需的核心设备，包括光刻、刻蚀、薄膜沉积等", plainLanguageDescription: "半导体设备是芯片工厂的'机床'，光刻机、刻蚀机等设备决定了芯片能做多么先进", parentId: null, stockCount: 0, childCount: 4, stocks: [] },
  { id: 3, name: "半导体材料", level: "upstream", description: "硅片、光刻胶、电子特气、靶材等基础材料", plainLanguageDescription: "半导体材料是造芯片的'原材料'，就像盖房子需要钢筋水泥，硅片、光刻胶等材料的质量直接决定芯片性能", parentId: null, stockCount: 0, childCount: 4, stocks: [] },
  { id: 4, name: "晶圆制造（代工）", level: "upstream", description: "晶圆代工是芯片制造的核心环节", plainLanguageDescription: "晶圆制造就是把设计好的电路图'印'到硅片上，是芯片从图纸变成实物最关键的环节", parentId: null, stockCount: 0, childCount: 0, stocks: [
    { id: 1, name: "中芯国际", code: "688981.SH", tag: "晶圆代工龙头", description: "中芯国际（688981.SH）是晶圆制造（代工）领域的代表性上市公司，晶圆代工龙头，在产业链中占据重要位置。" },
    { id: 2, name: "华虹公司", code: "688347.SH", tag: "特色工艺代工", description: "华虹公司（688347.SH）是晶圆制造（代工）领域的代表性上市公司，特色工艺代工，在产业链中占据重要位置。" },
  ]},
  { id: 5, name: "芯片设计", level: "midstream", description: "集成电路设计，决定芯片功能和性能", plainLanguageDescription: "芯片设计好比是给芯片'画图纸'，决定芯片有什么功能、性能有多强，是整个产业链的'大脑'", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 6, name: "存储芯片", level: "midstream", description: "DRAM、NAND Flash等存储器芯片", plainLanguageDescription: "存储芯片是电子设备的'记忆仓库'，手机能存多少照片、电脑能开多少程序都靠它", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 7, name: "功率半导体", level: "midstream", description: "IGBT、MOSFET等功率器件", plainLanguageDescription: "功率半导体是电能控制的'开关'，电动车充电快慢、空调省不省电都由它决定", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 8, name: "模拟芯片", level: "midstream", description: "电源管理、信号链等模拟集成电路", plainLanguageDescription: "模拟芯片负责处理现实世界的声音、光线、温度等连续信号，让电子设备能'感知'外界", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 9, name: "逻辑芯片", level: "midstream", description: "CPU、GPU、FPGA等数字逻辑芯片", plainLanguageDescription: "逻辑芯片是电子设备的'大脑'，CPU负责思考、GPU负责图形、FPGA灵活可编程，处理各种数字信号", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 90, name: "光通信/CPO", level: "midstream", description: "光模块、CPO共封装光学、光芯片等光通信核心器件", plainLanguageDescription: "光通信/CPO是数据中心的'高速公路'，用光而不是电来传输数据，速度比传统电缆快成千上万倍", parentId: null, stockCount: 0, childCount: 6, stocks: [] },
  { id: 10, name: "封装测试", level: "downstream", description: "芯片封装与测试，产业链后端关键环节", plainLanguageDescription: "封装测试是芯片出厂前的'体检和包装'，把裸芯片包上保护壳并测试确保每颗都能正常工作", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 11, name: "终端应用", level: "downstream", description: "消费电子、汽车电子、AI服务器、数据中心液冷等终端市场", plainLanguageDescription: "终端应用是芯片最终'工作的地方'，手机、电脑、电动车、AI服务器、数据中心液冷里都有芯片在发挥作用", parentId: null, stockCount: 0, childCount: 5, stocks: [] },
  { id: 12, name: "分销渠道", level: "downstream", description: "芯片分销商与贸易商", plainLanguageDescription: "分销渠道是芯片从工厂到终端客户的'物流公司'，帮助芯片原厂把产品销售到全球各地", parentId: null, stockCount: 1, childCount: 2, stocks: [] },
  { id: 91, name: "被动元器件/MLCC", level: "midstream", description: "电子电路中用量最大的基础元件，手机单台用量超1000颗，汽车MLCC用量是手机的5-10倍", plainLanguageDescription: "被动元器件是电路里的'配角'，不主动放大信号但必不可少，MLCC就是里面用量最大的一种'小电池'", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
];

// === 子节点 ===
const childNodes: Record<number, LocalNode[]> = {
  1: [
    { id: 101, name: "EDA工具", level: "upstream", description: "电子设计自动化软件", plainLanguageDescription: "EDA工具是芯片设计师用的专业软件，就像建筑师用CAD画图，没有它芯片设计根本没法开始", parentId: 1, stockCount: 3, childCount: 0, stocks: [
      { id: 3, name: "华大九天", code: "301269.SZ", tag: "国产EDA龙头", description: "华大九天（301269.SZ）是EDA工具领域的代表性上市公司，国产EDA龙头，在产业链中占据重要位置。" },
      { id: 4, name: "概伦电子", code: "688206.SH", tag: "器件建模EDA", description: "概伦电子（688206.SH）是EDA工具领域的代表性上市公司，器件建模EDA，在产业链中占据重要位置。" },
      { id: 5, name: "广立微", code: "301095.SZ", tag: "良率提升EDA", description: "广立微（301095.SZ）是EDA工具领域的代表性上市公司，良率提升EDA，在产业链中占据重要位置。" },
    ]},
    { id: 102, name: "IP授权", level: "upstream", description: "半导体知识产权授权服务", plainLanguageDescription: "IP授权是把别人已经设计好的电路模块'租'来用，省去从头设计的麻烦，加速芯片开发", parentId: 1, stockCount: 3, childCount: 0, stocks: [
      { id: 6, name: "芯原股份", code: "688521.SH", tag: "IP授权龙头", description: "芯原股份（688521.SH）是IP授权领域的代表性上市公司，IP授权龙头，在产业链中占据重要位置。" },
      { id: 7, name: "国芯科技", code: "688262.SH", tag: "嵌入式CPU IP", description: "国芯科技（688262.SH）是IP授权领域的代表性上市公司，嵌入式CPU IP，在产业链中占据重要位置。" },
    ]},
  ],
  2: [
    { id: 201, name: "光刻设备", level: "upstream", description: "光刻机及配套系统", plainLanguageDescription: "光刻设备是芯片制造中最精密的'照相机'，用光线把电路图案投射到硅片上，精度要求达到纳米级", parentId: 2, stockCount: 1, childCount: 0, stocks: [
      { id: 8, name: "张江高科", code: "600895.SH", tag: "上海微电子关联", description: "张江高科（600895.SH）是光刻设备领域的代表性上市公司，上海微电子关联，在产业链中占据重要位置。" },
    ]},
    { id: 202, name: "刻蚀设备", level: "upstream", description: "干法/湿法刻蚀设备", plainLanguageDescription: "刻蚀设备是芯片制造中的'雕刻刀'，把不需要的材料精准去除，刻出复杂的电路结构", parentId: 2, stockCount: 2, childCount: 0, stocks: [
      { id: 9, name: "中微公司", code: "688012.SH", tag: "刻蚀设备龙头", description: "中微公司（688012.SH）是刻蚀设备领域的代表性上市公司，刻蚀设备龙头，在产业链中占据重要位置。" },
      { id: 10, name: "北方华创", code: "002371.SZ", tag: "半导体设备平台", description: "北方华创（002371.SZ）是刻蚀设备领域的代表性上市公司，半导体设备平台，在产业链中占据重要位置。" },
    ]},
    { id: 203, name: "薄膜沉积", level: "upstream", description: "CVD、PVD等薄膜沉积设备", plainLanguageDescription: "薄膜沉积是在硅片表面'涂'上各种功能薄膜，就像给墙刷漆，每一层都有特定作用", parentId: 2, stockCount: 2, childCount: 0, stocks: [
      { id: 11, name: "拓荆科技", code: "688072.SH", tag: "CVD设备龙头", description: "拓荆科技（688072.SH）是薄膜沉积领域的代表性上市公司，CVD设备龙头，在产业链中占据重要位置。" },
      { id: 12, name: "北方华创", code: "002371.SZ", tag: "PVD/CVD设备", description: "北方华创（002371.SZ）是薄膜沉积领域的代表性上市公司，PVD/CVD设备，在产业链中占据重要位置。" },
    ]},
    { id: 204, name: "量测设备", level: "upstream", description: "过程控制与检测设备", plainLanguageDescription: "量测设备是芯片工厂的'质检员'，在生产过程中不断检测，确保每道工序都达标", parentId: 2, stockCount: 3, childCount: 0, stocks: [
      { id: 13, name: "精测电子", code: "300567.SZ", tag: "检测设备", description: "精测电子（300567.SZ）是量测设备领域的代表性上市公司，检测设备，在产业链中占据重要位置。" },
      { id: 14, name: "中科飞测", code: "688361.SH", tag: "光学检测设备", description: "中科飞测（688361.SH）是量测设备领域的代表性上市公司，光学检测设备，在产业链中占据重要位置。" },
    ]},
  ],
  3: [
    { id: 301, name: "硅片", level: "upstream", description: "半导体级硅晶圆", plainLanguageDescription: "硅片是造芯片的'地基'，高纯度单晶硅拉成圆片，所有电路都在这上面搭建", parentId: 3, stockCount: 3, childCount: 0, stocks: [
      { id: 15, name: "沪硅产业", code: "688126.SH", tag: "大硅片龙头", description: "沪硅产业（688126.SH）是硅片领域的代表性上市公司，大硅片龙头，在产业链中占据重要位置。" },
      { id: 16, name: "立昂微", code: "605358.SH", tag: "硅片+功率器件", description: "立昂微（605358.SH）是硅片领域的代表性上市公司，硅片+功率器件，在产业链中占据重要位置。" },
      { id: 17, name: "TCL中环", code: "002129.SZ", tag: "半导体硅片", description: "TCL中环（002129.SZ）是硅片领域的代表性上市公司，半导体硅片，在产业链中占据重要位置。" },
    ]},
    { id: 302, name: "光刻胶", level: "upstream", description: "光刻工艺核心材料", plainLanguageDescription: "光刻胶是光刻工艺的'感光胶'，光线照到的地方发生化学反应，帮助把电路图案转移到硅片上", parentId: 3, stockCount: 3, childCount: 0, stocks: [
      { id: 18, name: "南大光电", code: "300346.SZ", tag: "ArF光刻胶", description: "南大光电（300346.SZ）是光刻胶领域的代表性上市公司，ArF光刻胶，在产业链中占据重要位置。" },
      { id: 19, name: "晶瑞电材", code: "300655.SZ", tag: "光刻胶+电子化学品", description: "晶瑞电材（300655.SZ）是光刻胶领域的代表性上市公司，光刻胶+电子化学品，在产业链中占据重要位置。" },
      { id: 20, name: "容大感光", code: "300576.SZ", tag: "PCB/显示光刻胶", description: "容大感光（300576.SZ）是光刻胶领域的代表性上市公司，PCB/显示光刻胶，在产业链中占据重要位置。" },
    ]},
    { id: 303, name: "电子特气", level: "upstream", description: "高纯电子特种气体", plainLanguageDescription: "电子特气是芯片制造中的'特殊空气'，各种高纯气体参与化学反应，纯度要求极高", parentId: 3, stockCount: 3, childCount: 0, stocks: [
      { id: 21, name: "南大光电", code: "300346.SZ", tag: "电子特气", description: "南大光电（300346.SZ）是电子特气领域的代表性上市公司，电子特气，在产业链中占据重要位置。" },
      { id: 22, name: "华特气体", code: "688268.SH", tag: "电子特气龙头", description: "华特气体（688268.SH）是电子特气领域的代表性上市公司，电子特气龙头，在产业链中占据重要位置。" },
      { id: 23, name: "凯美特气", code: "002549.SZ", tag: "电子特气", description: "凯美特气（002549.SZ）是电子特气领域的代表性上市公司，电子特气，在产业链中占据重要位置。" },
    ]},
    { id: 304, name: "CMP材料", level: "upstream", description: "化学机械抛光材料", plainLanguageDescription: "CMP材料用于'打磨抛光'硅片表面，确保每一层都平整光滑，否则电路会短路", parentId: 3, stockCount: 2, childCount: 0, stocks: [
      { id: 24, name: "安集科技", code: "688019.SH", tag: "CMP抛光液龙头", description: "安集科技（688019.SH）是CMP材料领域的代表性上市公司，CMP抛光液龙头，在产业链中占据重要位置。" },
    ]},
  ],
  90: [
    { id: 9001, name: "光模块/CPO", level: "midstream", description: "高速光模块与共封装光学（CPO），数据中心光互联核心。800G/1.6T速率，月产能超20万只", plainLanguageDescription: "光模块是数据中心的'光纤收发器'，把电信号转成光信号高速传输；CPO是把光模块和芯片封装在一起的新技术，速度更快、功耗更低", parentId: 90, stockCount: 8, childCount: 0, stocks: [
      { id: 900, name: "中际旭创", code: "300308.SZ", tag: "光模块全球龙头，市占42%，1.6T已量产", description: "中际旭创（300308.SZ）是光模块/CPO领域的代表性上市公司，光模块全球龙头，市占42%，1.6T已量产，在产业链中占据重要位置。" },
      { id: 901, name: "新易盛", code: "300502.SZ", tag: "高速光模块，净利预增231%-249%", description: "新易盛（300502.SZ）是光模块/CPO领域的代表性上市公司，高速光模块，净利预增231%-249%，在产业链中占据重要位置。" },
      { id: 902, name: "光迅科技", code: "002281.SZ", tag: "光模块+光芯片，华工系背景", description: "光迅科技（002281.SZ）是光模块/CPO领域的代表性上市公司，光模块+光芯片，华工系背景，在产业链中占据重要位置。" },
      { id: 903, name: "华工科技", code: "000988.SZ", tag: "光模块+激光设备", description: "华工科技（000988.SZ）是光模块/CPO领域的代表性上市公司，光模块+激光设备，在产业链中占据重要位置。" },
      { id: 904, name: "剑桥科技", code: "603083.SH", tag: "光模块新锐", description: "剑桥科技（603083.SH）是光模块/CPO领域的代表性上市公司，光模块新锐，在产业链中占据重要位置。" },
      { id: 905, name: "联特科技", code: "301205.SZ", tag: "光模块", description: "联特科技（301205.SZ）是光模块/CPO领域的代表性上市公司，光模块，在产业链中占据重要位置。" },
      { id: 906, name: "德科立", code: "688205.SH", tag: "光传输模块", description: "德科立（688205.SH）是光模块/CPO领域的代表性上市公司，光传输模块，在产业链中占据重要位置。" },
      { id: 907, name: "博创科技", code: "300548.SZ", tag: "光器件/硅光", description: "博创科技（300548.SZ）是光模块/CPO领域的代表性上市公司，光器件/硅光，在产业链中占据重要位置。" },
    ]},
    { id: 9002, name: "光芯片", level: "midstream", description: "激光器、探测器、调制器等光通信芯片。EML/DML激光器为核心", plainLanguageDescription: "光芯片是光模块的'心脏'，负责把电变成光、光变成电，激光器质量直接决定传输速度和距离", parentId: 90, stockCount: 3, childCount: 0, stocks: [
      { id: 908, name: "源杰科技", code: "688498.SH", tag: "光芯片龙头，100G EML量产", description: "源杰科技（688498.SH）是光芯片领域的代表性上市公司，光芯片龙头，100G EML量产，在产业链中占据重要位置。" },
      { id: 909, name: "仕佳光子", code: "688313.SH", tag: "光芯片/PLC", description: "仕佳光子（688313.SH）是光芯片领域的代表性上市公司，光芯片/PLC，在产业链中占据重要位置。" },
      { id: 910, name: "长光华芯", code: "688048.SH", tag: "激光芯片，200G送样", description: "长光华芯（688048.SH）是光芯片领域的代表性上市公司，激光芯片，200G送样，在产业链中占据重要位置。" },
    ]},
    { id: 9003, name: "光器件", level: "midstream", description: "光引擎、光纤连接器、陶瓷套管等配套器件", plainLanguageDescription: "光器件是光模块里的'配角'，透镜、连接器等小零件，但缺了它们光信号就传不出去", parentId: 90, stockCount: 3, childCount: 0, stocks: [
      { id: 911, name: "天孚通信", code: "300394.SZ", tag: "光器件/CPO配套龙头", description: "天孚通信（300394.SZ）是光器件领域的代表性上市公司，光器件/CPO配套龙头，在产业链中占据重要位置。" },
      { id: 912, name: "太辰光", code: "300570.SZ", tag: "光纤连接器", description: "太辰光（300570.SZ）是光器件领域的代表性上市公司，光纤连接器，在产业链中占据重要位置。" },
      { id: 913, name: "光库科技", code: "300620.SZ", tag: "光纤器件，TFLN调制器先行者", description: "光库科技（300620.SZ）是光器件领域的代表性上市公司，光纤器件，TFLN调制器先行者，在产业链中占据重要位置。" },
    ]},
    { id: 9004, name: "磷化铟(InP)衬底", level: "upstream", description: "光芯片唯一基底材料。全球供需缺口超70%，2英寸从800美元涨至2300-2500美元", plainLanguageDescription: "磷化铟衬底是光芯片的'生长土壤'，光芯片必须在这种特殊材料上制造，全球供应紧张", parentId: 90, stockCount: 4, childCount: 0, stocks: [
      { id: 914, name: "云南锗业", code: "002428.SZ", tag: "InP衬底国内唯一6英寸量产，市占80%+", description: "云南锗业（002428.SZ）是磷化铟(InP)衬底领域的代表性上市公司，InP衬底国内唯一6英寸量产，市占80%+，在产业链中占据重要位置。" },
      { id: 915, name: "三安光电", code: "600703.SH", tag: "InP全产业链IDM，月产1万片6英寸", description: "三安光电（600703.SH）是磷化铟(InP)衬底领域的代表性上市公司，InP全产业链IDM，月产1万片6英寸，在产业链中占据重要位置。" },
      { id: 916, name: "有研新材", code: "600206.SH", tag: "02专项6英寸InP攻关完成", description: "有研新材（600206.SH）是磷化铟(InP)衬底领域的代表性上市公司，02专项6英寸InP攻关完成，在产业链中占据重要位置。" },
      { id: 917, name: "锡业股份", code: "000960.SZ", tag: "原生铟全球龙头，铟占InP成本60%", description: "锡业股份（000960.SZ）是磷化铟(InP)衬底领域的代表性上市公司，原生铟全球龙头，铟占InP成本60%，在产业链中占据重要位置。" },
    ]},
    { id: 9005, name: "薄膜铌酸锂(TFLN)", level: "midstream", description: "下一代高速调制器技术，速率>400G潜力，低功耗。短期与InP EML并存，长期或成主流", plainLanguageDescription: "薄膜铌酸锂是光通信的'下一代神器'，能把更多数据塞进一根光纤，速度比传统材料快数倍", parentId: 90, stockCount: 2, childCount: 0, stocks: [
      { id: 918, name: "光库科技", code: "300620.SZ", tag: "TFLN调制器国内先行者，产线建成", description: "光库科技（300620.SZ）是薄膜铌酸锂(TFLN)领域的代表性上市公司，TFLN调制器国内先行者，产线建成，在产业链中占据重要位置。" },
      { id: 919, name: " HyperLight(未上市)", code: "未上市", tag: "TFLN薄膜技术领先", description: " HyperLight(未上市)是薄膜铌酸锂(TFLN)领域的重要企业，TFLN薄膜技术领先，目前尚未在A股上市。" },
    ]},
    { id: 9006, name: "CPO封装/散热", level: "downstream", description: "CPO共封装光学散热方案。氮化铝(AlN)陶瓷基板+液冷散热，单机BOM 5-8万美元", plainLanguageDescription: "CPO封装是给高速光模块'降温'的技术，芯片和光模块贴得太近会发热，需要特殊材料和液冷技术", parentId: 90, stockCount: 4, childCount: 0, stocks: [
      { id: 920, name: "三环集团", code: "300408.SZ", tag: "AlN陶瓷基板龙头", description: "三环集团（300408.SZ）是CPO封装/散热领域的代表性上市公司，AlN陶瓷基板龙头，在产业链中占据重要位置。" },
      { id: 921, name: "中瓷电子", code: "003031.SZ", tag: "电子陶瓷/散热基板", description: "中瓷电子（003031.SZ）是CPO封装/散热领域的代表性上市公司，电子陶瓷/散热基板，在产业链中占据重要位置。" },
      { id: 922, name: "博敏电子", code: "603936.SH", tag: "AMB陶瓷基板", description: "博敏电子（603936.SH）是CPO封装/散热领域的代表性上市公司，AMB陶瓷基板，在产业链中占据重要位置。" },
    ]},
  ],
  5: [
    { id: 501, name: "SOC设计", level: "midstream", description: "系统级芯片设计", plainLanguageDescription: "SOC设计是把CPU、内存、显卡等多个功能集成到一颗芯片上，让手机芯片越来越小却越来越强", parentId: 5, stockCount: 3, childCount: 0, stocks: [
      { id: 25, name: "瑞芯微", code: "603893.SH", tag: "SoC芯片设计", description: "瑞芯微（603893.SH）是SOC设计领域的代表性上市公司，SoC芯片设计，在产业链中占据重要位置。" },
      { id: 26, name: "全志科技", code: "300458.SZ", tag: "智能终端SoC", description: "全志科技（300458.SZ）是SOC设计领域的代表性上市公司，智能终端SoC，在产业链中占据重要位置。" },
      { id: 27, name: "晶晨股份", code: "688099.SH", tag: "智能机顶盒SoC", description: "晶晨股份（688099.SH）是SOC设计领域的代表性上市公司，智能机顶盒SoC，在产业链中占据重要位置。" },
    ]},
    { id: 502, name: "ASIC设计", level: "midstream", description: "专用集成电路设计", plainLanguageDescription: "ASIC设计是为特定用途量身定制的芯片，就像定制西装，性能最高但只能干一件事", parentId: 5, stockCount: 2, childCount: 0, stocks: [
      { id: 28, name: "寒武纪", code: "688256.SH", tag: "AI芯片设计", description: "寒武纪（688256.SH）是ASIC设计领域的代表性上市公司，AI芯片设计，在产业链中占据重要位置。" },
      { id: 29, name: "海光信息", code: "688041.SH", tag: "DCU/CPU设计", description: "海光信息（688041.SH）是ASIC设计领域的代表性上市公司，DCU/CPU设计，在产业链中占据重要位置。" },
    ]},
    { id: 503, name: "无线通信芯片", level: "midstream", description: "WiFi、蓝牙、5G基带芯片", plainLanguageDescription: "无线通信芯片让设备能连WiFi、蓝牙、5G，是物联网设备的'无线网卡'", parentId: 5, stockCount: 2, childCount: 0, stocks: [
      { id: 30, name: "乐鑫科技", code: "688018.SH", tag: "WiFi MCU", description: "乐鑫科技（688018.SH）是无线通信芯片领域的代表性上市公司，WiFi MCU，在产业链中占据重要位置。" },
    ]},
  ],
  6: [
    { id: 601, name: "DRAM内存", level: "midstream", description: "动态随机存取存储器", plainLanguageDescription: "DRAM是电脑和手机的'临时记忆'，开机时所有运行的程序都存放在这里，断电就消失", parentId: 6, stockCount: 2, childCount: 0, stocks: [
      { id: 31, name: "兆易创新", code: "603986.SH", tag: "利基型DRAM", description: "兆易创新（603986.SH）是DRAM内存领域的代表性上市公司，利基型DRAM，在产业链中占据重要位置。" },
      { id: 32, name: "北京君正", code: "300223.SZ", tag: "车规级DRAM", description: "北京君正（300223.SZ）是DRAM内存领域的代表性上市公司，车规级DRAM，在产业链中占据重要位置。" },
    ]},
    { id: 602, name: "NAND闪存", level: "midstream", description: "闪存存储器", plainLanguageDescription: "NAND是手机的'硬盘'，照片、视频、APP都存在这里，断电也不会丢失", parentId: 6, stockCount: 1, childCount: 0, stocks: [
      { id: 33, name: "兆易创新", code: "603986.SH", tag: "NOR+NAND", description: "兆易创新（603986.SH）是NAND闪存领域的代表性上市公司，NOR+NAND，在产业链中占据重要位置。" },
    ]},
    { id: 603, name: "NOR闪存", level: "midstream", description: "代码型闪存存储器", plainLanguageDescription: "NOR是嵌入式设备的'固件存储'，开机指令存在这里，读取速度快但容量小", parentId: 6, stockCount: 4, childCount: 0, stocks: [
      { id: 34, name: "兆易创新", code: "603986.SH", tag: "NOR Flash龙头", description: "兆易创新（603986.SH）是NOR闪存领域的代表性上市公司，NOR Flash龙头，在产业链中占据重要位置。" },
      { id: 35, name: "普冉股份", code: "688766.SH", tag: "NOR Flash", description: "普冉股份（688766.SH）是NOR闪存领域的代表性上市公司，NOR Flash，在产业链中占据重要位置。" },
      { id: 36, name: "东芯股份", code: "688110.SH", tag: "中小容量存储", description: "东芯股份（688110.SH）是NOR闪存领域的代表性上市公司，中小容量存储，在产业链中占据重要位置。" },
    ]},
  ],
  7: [
    { id: 701, name: "IGBT", level: "midstream", description: "绝缘栅双极型晶体管", plainLanguageDescription: "IGBT是高压大功率场景的'电力开关'，高铁、电动车、电网都靠它来控制大电流", parentId: 7, stockCount: 3, childCount: 0, stocks: [
      { id: 37, name: "斯达半导", code: "603290.SH", tag: "IGBT模块龙头", description: "斯达半导（603290.SH）是IGBT领域的代表性上市公司，IGBT模块龙头，在产业链中占据重要位置。" },
      { id: 38, name: "时代电气", code: "688187.SH", tag: "轨交/车规IGBT", description: "时代电气（688187.SH）是IGBT领域的代表性上市公司，轨交/车规IGBT，在产业链中占据重要位置。" },
      { id: 39, name: "士兰微", code: "600460.SH", tag: "IDM模式功率器件", description: "士兰微（600460.SH）是IGBT领域的代表性上市公司，IDM模式功率器件，在产业链中占据重要位置。" },
    ]},
    { id: 702, name: "MOSFET", level: "midstream", description: "金属氧化物半导体场效应管", plainLanguageDescription: "MOSFET是最常用的'小开关'，手机充电器、电脑电源里都有它，控制小电流开关", parentId: 7, stockCount: 2, childCount: 0, stocks: [
      { id: 40, name: "新洁能", code: "605111.SH", tag: "MOSFET设计", description: "新洁能（605111.SH）是MOSFET领域的代表性上市公司，MOSFET设计，在产业链中占据重要位置。" },
      { id: 41, name: "闻泰科技", code: "600745.SH", tag: "安世半导体", description: "闻泰科技（600745.SH）是MOSFET领域的代表性上市公司，安世半导体，在产业链中占据重要位置。" },
    ]},
    { id: 703, name: "SiC/GaN", level: "midstream", description: "第三代半导体功率器件", plainLanguageDescription: "SiC/GaN是第三代半导体，耐高温、高效率，让电动车充电更快、续航更远", parentId: 7, stockCount: 4, childCount: 0, stocks: [
      { id: 42, name: "三安光电", code: "600703.SH", tag: "SiC/GaN衬底+外延", description: "三安光电（600703.SH）是SiC/GaN领域的代表性上市公司，SiC/GaN衬底+外延，在产业链中占据重要位置。" },
      { id: 43, name: "天岳先进", code: "688234.SH", tag: "SiC衬底龙头", description: "天岳先进（688234.SH）是SiC/GaN领域的代表性上市公司，SiC衬底龙头，在产业链中占据重要位置。" },
      { id: 44, name: "晶盛机电", code: "300316.SZ", tag: "SiC设备+材料", description: "晶盛机电（300316.SZ）是SiC/GaN领域的代表性上市公司，SiC设备+材料，在产业链中占据重要位置。" },
    ]},
  ],
  8: [
    { id: 801, name: "电源管理", level: "midstream", description: "电源管理芯片PMIC", plainLanguageDescription: "电源管理芯片是设备的'电池管家'，决定手机充多快、用多久，关系到续航体验", parentId: 8, stockCount: 3, childCount: 0, stocks: [
      { id: 45, name: "圣邦股份", code: "300661.SZ", tag: "模拟芯片龙头", description: "圣邦股份（300661.SZ）是电源管理领域的代表性上市公司，模拟芯片龙头，在产业链中占据重要位置。" },
      { id: 46, name: "韦尔股份", code: "603501.SH", tag: "CIS+电源管理", description: "韦尔股份（603501.SH）是电源管理领域的代表性上市公司，CIS+电源管理，在产业链中占据重要位置。" },
      { id: 47, name: "晶丰明源", code: "688368.SH", tag: "LED驱动IC", description: "晶丰明源（688368.SH）是电源管理领域的代表性上市公司，LED驱动IC，在产业链中占据重要位置。" },
    ]},
    { id: 802, name: "信号链", level: "midstream", description: "ADC/DAC等信号链芯片", plainLanguageDescription: "信号链芯片负责把真实世界的声音、温度等模拟信号转换成数字信号，让设备能'听懂'外界", parentId: 8, stockCount: 2, childCount: 0, stocks: [
      { id: 48, name: "思瑞浦", code: "688536.SH", tag: "信号链芯片", description: "思瑞浦（688536.SH）是信号链领域的代表性上市公司，信号链芯片，在产业链中占据重要位置。" },
      { id: 49, name: "纳芯微", code: "688052.SH", tag: "隔离芯片+信号链", description: "纳芯微（688052.SH）是信号链领域的代表性上市公司，隔离芯片+信号链，在产业链中占据重要位置。" },
    ]},
    { id: 803, name: "射频前端", level: "midstream", description: "射频开关、LNA、滤波器", plainLanguageDescription: "射频前端是手机的'天线系统'，决定信号好不好、上网快不快", parentId: 8, stockCount: 3, childCount: 0, stocks: [
      { id: 50, name: "卓胜微", code: "300782.SZ", tag: "射频开关龙头", description: "卓胜微（300782.SZ）是射频前端领域的代表性上市公司，射频开关龙头，在产业链中占据重要位置。" },
      { id: 51, name: "唯捷创芯", code: "688153.SH", tag: "射频功率放大器", description: "唯捷创芯（688153.SH）是射频前端领域的代表性上市公司，射频功率放大器，在产业链中占据重要位置。" },
    ]},
  ],
  9: [
    { id: 901, name: "CPU", level: "midstream", description: "中央处理器", plainLanguageDescription: "CPU是电脑的'大脑'，负责算数、逻辑判断和任务调度，所有计算指令都经它处理", parentId: 9, stockCount: 2, childCount: 0, stocks: [
      { id: 52, name: "海光信息", code: "688041.SH", tag: "国产CPU龙头", description: "海光信息（688041.SH）是CPU领域的代表性上市公司，国产CPU龙头，在产业链中占据重要位置。" },
      { id: 53, name: "龙芯中科", code: "688047.SH", tag: "自主架构CPU", description: "龙芯中科（688047.SH）是CPU领域的代表性上市公司，自主架构CPU，在产业链中占据重要位置。" },
    ]},
    { id: 902, name: "GPU", level: "midstream", description: "图形处理器", plainLanguageDescription: "GPU是'图形专用计算器'，原本用来打游戏，现在AI训练也靠它并行计算", parentId: 9, stockCount: 2, childCount: 0, stocks: [
      { id: 54, name: "寒武纪", code: "688256.SH", tag: "AI训练芯片", description: "寒武纪（688256.SH）是GPU领域的代表性上市公司，AI训练芯片，在产业链中占据重要位置。" },
      { id: 55, name: "景嘉微", code: "300474.SZ", tag: "国产GPU", description: "景嘉微（300474.SZ）是GPU领域的代表性上市公司，国产GPU，在产业链中占据重要位置。" },
    ]},
    { id: 903, name: "FPGA", level: "midstream", description: "现场可编程门阵列", plainLanguageDescription: "FPGA是'可变形芯片'，出厂后还能改电路，适合需要灵活调整的高端场景", parentId: 9, stockCount: 4, childCount: 0, stocks: [
      { id: 56, name: "复旦微电", code: "688385.SH", tag: "FPGA设计", description: "复旦微电（688385.SH）是FPGA领域的代表性上市公司，FPGA设计，在产业链中占据重要位置。" },
      { id: 57, name: "紫光国微", code: "002049.SZ", tag: "特种FPGA", description: "紫光国微（002049.SZ）是FPGA领域的代表性上市公司，特种FPGA，在产业链中占据重要位置。" },
      { id: 58, name: "安路科技", code: "688107.SH", tag: "民用FPGA", description: "安路科技（688107.SH）是FPGA领域的代表性上市公司，民用FPGA，在产业链中占据重要位置。" },
    ]},
  ],
  10: [
    { id: 1001, name: "先进封装", level: "downstream", description: "Chiplet、3D封装等先进封装技术", plainLanguageDescription: "先进封装用Chiplet等技术把多颗小芯片拼在一起，绕过光刻限制实现高性能", parentId: 10, stockCount: 2, childCount: 0, stocks: [
      { id: 59, name: "长电科技", code: "600584.SH", tag: "封测龙头", description: "长电科技（600584.SH）是先进封装领域的代表性上市公司，封测龙头，在产业链中占据重要位置。" },
      { id: 60, name: "通富微电", code: "002156.SZ", tag: "AMD封装核心伙伴", description: "通富微电（002156.SZ）是先进封装领域的代表性上市公司，AMD封装核心伙伴，在产业链中占据重要位置。" },
    ]},
    { id: 1002, name: "传统封装", level: "downstream", description: "QFN、BGA等传统封装", plainLanguageDescription: "传统封装是给裸芯片套上保护壳、接上引脚，让它能焊到电路板上使用", parentId: 10, stockCount: 2, childCount: 0, stocks: [
      { id: 61, name: "华天科技", code: "002185.SZ", tag: "封测三强之一", description: "华天科技（002185.SZ）是传统封装领域的代表性上市公司，封测三强之一，在产业链中占据重要位置。" },
      { id: 62, name: "晶方科技", code: "603005.SH", tag: "WLCSP封装", description: "晶方科技（603005.SH）是传统封装领域的代表性上市公司，WLCSP封装，在产业链中占据重要位置。" },
    ]},
    { id: 1003, name: "测试服务", level: "downstream", description: "晶圆测试与成品测试", plainLanguageDescription: "测试服务是给芯片做'全面体检'，确保每颗出厂的芯片都符合规格", parentId: 10, stockCount: 1, childCount: 0, stocks: [] },
  ],
  11: [
    { id: 1101, name: "消费电子", level: "downstream", description: "手机、PC、平板等消费电子产品", plainLanguageDescription: "消费电子是老百姓日常用的电子产品，手机、电脑、耳机里装满了各种芯片", parentId: 11, stockCount: 2, childCount: 0, stocks: [
      { id: 63, name: "立讯精密", code: "002475.SZ", tag: "苹果供应链龙头", description: "立讯精密（002475.SZ）是消费电子领域的代表性上市公司，苹果供应链龙头，在产业链中占据重要位置。" },
      { id: 64, name: "歌尔股份", code: "002241.SZ", tag: "声学+VR/AR", description: "歌尔股份（002241.SZ）是消费电子领域的代表性上市公司，声学+VR/AR，在产业链中占据重要位置。" },
    ]},
    { id: 1102, name: "汽车电子", level: "downstream", description: "新能源车功率器件、智能驾驶芯片", plainLanguageDescription: "汽车电子是新能源车和智能驾驶的'神经系统'，从电池管理到自动驾驶都靠芯片", parentId: 11, stockCount: 2, childCount: 0, stocks: [
      { id: 65, name: "比亚迪", code: "002594.SZ", tag: "车规半导体IDM", description: "比亚迪（002594.SZ）是汽车电子领域的代表性上市公司，车规半导体IDM，在产业链中占据重要位置。" },
      { id: 66, name: "韦尔股份", code: "603501.SH", tag: "车载CIS龙头", description: "韦尔股份（603501.SH）是汽车电子领域的代表性上市公司，车载CIS龙头，在产业链中占据重要位置。" },
    ]},
    { id: 1103, name: "AI服务器", level: "downstream", description: "AI训练与推理服务器", plainLanguageDescription: "AI服务器是训练大模型的'超级计算机'，需要海量GPU芯片一起工作", parentId: 11, stockCount: 2, childCount: 0, stocks: [
      { id: 67, name: "工业富联", code: "601138.SH", tag: "AI服务器代工", description: "工业富联（601138.SH）是AI服务器领域的代表性上市公司，AI服务器代工，在产业链中占据重要位置。" },
      { id: 68, name: "浪潮信息", code: "000977.SZ", tag: "AI服务器龙头", description: "浪潮信息（000977.SZ）是AI服务器领域的代表性上市公司，AI服务器龙头，在产业链中占据重要位置。" },
    ]},
    { id: 1104, name: "IoT物联网", level: "downstream", description: "物联网终端设备", plainLanguageDescription: "IoT物联网是让冰箱、灯泡等普通物品也能联网智能控制的芯片应用", parentId: 11, stockCount: 1, childCount: 0, stocks: [] },
    { id: 1105, name: "数据中心液冷", level: "downstream", description: "AI服务器液冷散热系统，包括冷板、冷却液、CDU、液冷管路。NVIDIA H100功耗700W必须液冷，AI算力爆发驱动液冷渗透率从5%提升至50%+", plainLanguageDescription: "数据中心液冷是给AI服务器降温的技术。NVIDIA的H100芯片功耗700瓦，像个小暖炉，必须用液冷代替风扇。AI算力越猛，液冷越重要", parentId: 11, stockCount: 3, childCount: 0, stocks: [
      { id: 935, name: "英维克", code: "002837.SZ", tag: "数据中心温控龙头，液冷全链条布局", description: "英维克（002837.SZ）是数据中心液冷领域的代表性上市公司，数据中心温控龙头，液冷全链条布局，在产业链中占据重要位置。" },
      { id: 936, name: "高澜股份", code: "300499.SZ", tag: "液冷设备specialist，服务器液冷解决方案", description: "高澜股份（300499.SZ）是数据中心液冷领域的代表性上市公司，液冷设备specialist，服务器液冷解决方案，在产业链中占据重要位置。" },
      { id: 937, name: "巨化股份", code: "600160.SH", tag: "氟化工龙头，氟化液用于浸没式液冷", description: "巨化股份（600160.SH）是数据中心液冷领域的代表性上市公司，氟化工龙头，氟化液用于浸没式液冷，在产业链中占据重要位置。" },
    ]},
  ],
  12: [
    { id: 1201, name: "授权分销", level: "downstream", description: "原厂授权分销商", plainLanguageDescription: "授权分销是芯片原厂正式授权的经销商，像正规4S店，保证正品和售后服务", parentId: 12, stockCount: 2, childCount: 0, stocks: [
      { id: 69, name: "中电港", code: "001287.SZ", tag: "电子元器件分销龙头", description: "中电港（001287.SZ）是授权分销领域的代表性上市公司，电子元器件分销龙头，在产业链中占据重要位置。" },
      { id: 70, name: "香农芯创", code: "300475.SZ", tag: "存储分销", description: "香农芯创（300475.SZ）是授权分销领域的代表性上市公司，存储分销，在产业链中占据重要位置。" },
    ]},
    { id: 1202, name: "独立分销", level: "downstream", description: "独立贸易商与现货商", plainLanguageDescription: "独立分销是灵活的自由贸易商，专门解决紧缺芯片的采购难题，像芯片界的'代购'", parentId: 12, stockCount: 1, childCount: 0, stocks: [] },
  ],
  91: [
    { id: 9101, name: "MLCC制造", level: "midstream", description: "多层陶瓷电容器核心制造环节，叠层-烧结-电镀工艺，日韩台厂商占全球份额70%+", plainLanguageDescription: "把陶瓷粉和金属电极一层层叠起来烧结成米粒大小的电容，手机里有上千颗", parentId: 91, stockCount: 5, childCount: 0, stocks: [
      { id: 923, name: "风华高科", code: "000636.SZ", tag: "国产MLCC龙头，市占率国内第一，车规产品放量", description: "风华高科（000636.SZ）是MLCC制造领域的代表性上市公司，国产MLCC龙头，市占率国内第一，车规产品放量，在产业链中占据重要位置。" },
      { id: 924, name: "三环集团", code: "300408.SZ", tag: "电子陶瓷+MLCC全产业链，氧化铝粉体自供", description: "三环集团（300408.SZ）是MLCC制造领域的代表性上市公司，电子陶瓷+MLCC全产业链，氧化铝粉体自供，在产业链中占据重要位置。" },
      { id: 925, name: "火炬电子", code: "603678.SH", tag: "军用MLCC龙头，航发/导弹核心供应商", description: "火炬电子（603678.SH）是MLCC制造领域的代表性上市公司，军用MLCC龙头，航发/导弹核心供应商，在产业链中占据重要位置。" },
      { id: 926, name: "鸿远电子", code: "603267.SH", tag: "高可靠MLCC specialist，航天/军工市占率领先", description: "鸿远电子（603267.SH）是MLCC制造领域的代表性上市公司，高可靠MLCC specialist，航天/军工市占率领先，在产业链中占据重要位置。" },
      { id: 927, name: "宏达电子", code: "300726.SZ", tag: "钽电容+MLCC双布局，军工电子平台", description: "宏达电子（300726.SZ）是MLCC制造领域的代表性上市公司，钽电容+MLCC双布局，军工电子平台，在产业链中占据重要位置。" },
    ]},
    { id: 9102, name: "陶瓷粉体", level: "upstream", description: "MLCC最核心的上游材料，钛酸钡基陶瓷粉体占成本30-40%，日本厂商垄断高端市场", plainLanguageDescription: "MLCC的'面粉'，钛酸钡粉末的质量直接决定电容性能，高端粉体几乎被日本垄断", parentId: 91, stockCount: 3, childCount: 0, stocks: [
      { id: 928, name: "国瓷材料", code: "300285.SZ", tag: "MLCC陶瓷粉体龙头，纳米级钛酸钡量产", description: "国瓷材料（300285.SZ）是陶瓷粉体领域的代表性上市公司，MLCC陶瓷粉体龙头，纳米级钛酸钡量产，在产业链中占据重要位置。" },
      { id: 929, name: "东方锆业", code: "002167.SZ", tag: "锆材料+陶瓷粉体，核级锆材延伸", description: "东方锆业（002167.SZ）是陶瓷粉体领域的代表性上市公司，锆材料+陶瓷粉体，核级锆材延伸，在产业链中占据重要位置。" },
      { id: 930, name: "天工国际", code: "00826.HK", tag: "钛材龙头，钛酸钡原料供应", description: "天工国际（00826.HK）是陶瓷粉体领域的代表性上市公司，钛材龙头，钛酸钡原料供应，在产业链中占据重要位置。" },
    ]},
    { id: 9103, name: "片式电感/电阻", level: "midstream", description: "除MLCC外的主要片式被动元件，电感用于滤波/储能，电阻用于限流/分压", plainLanguageDescription: "电路里的另外两种'配角'，电感负责滤波储能，电阻负责控制电流大小", parentId: 91, stockCount: 4, childCount: 0, stocks: [
      { id: 931, name: "顺络电子", code: "002138.SZ", tag: "片式电感全球龙头，市占率国内第一", description: "顺络电子（002138.SZ）是片式电感/电阻领域的代表性上市公司，片式电感全球龙头，市占率国内第一，在产业链中占据重要位置。" },
      { id: 932, name: "麦捷科技", code: "300319.SZ", tag: "LTCC滤波器+电感，5G射频配套", description: "麦捷科技（300319.SZ）是片式电感/电阻领域的代表性上市公司，LTCC滤波器+电感，5G射频配套，在产业链中占据重要位置。" },
      { id: 933, name: "风华高科", code: "000636.SZ", tag: "片阻龙头，电阻产能全球前三", description: "风华高科（000636.SZ）是片式电感/电阻领域的代表性上市公司，片阻龙头，电阻产能全球前三，在产业链中占据重要位置。" },
      { id: 934, name: "洁美科技", code: "002859.SZ", tag: "纸质载带龙头，被动元件封装配套", description: "洁美科技（002859.SZ）是片式电感/电阻领域的代表性上市公司，纸质载带龙头，被动元件封装配套，在产业链中占据重要位置。" },
    ]},
  ],
};

// === 连接关系 ===
const connections: LocalConnection[] = [
  { id: 1, fromNodeId: 101, toNodeId: 5, label: "设计工具支撑" },
  { id: 2, fromNodeId: 2, toNodeId: 4, label: "制造设备供给" },
  { id: 3, fromNodeId: 3, toNodeId: 4, label: "原材料供给" },
  { id: 4, fromNodeId: 5, toNodeId: 4, label: "芯片设计委托代工" },
  { id: 5, fromNodeId: 5, toNodeId: 10, label: "设计→封测" },
  { id: 6, fromNodeId: 6, toNodeId: 10, label: "存储→封测" },
  { id: 7, fromNodeId: 7, toNodeId: 10, label: "功率→封测" },
  { id: 8, fromNodeId: 8, toNodeId: 10, label: "模拟→封测" },
  { id: 9, fromNodeId: 9, toNodeId: 10, label: "逻辑→封测" },
  { id: 10, fromNodeId: 10, toNodeId: 11, label: "封测→终端" },
  { id: 11, fromNodeId: 5, toNodeId: 11, label: "芯片→终端" },
  { id: 12, fromNodeId: 6, toNodeId: 1103, label: "存储→AI" },
  { id: 13, fromNodeId: 7, toNodeId: 1102, label: "功率→汽车" },
  { id: 14, fromNodeId: 9, toNodeId: 1103, label: "算力芯片→AI" },
  { id: 38, fromNodeId: 1103, toNodeId: 1105, label: "AI算力驱动液冷" },
  { id: 39, fromNodeId: 1105, toNodeId: 1103, label: "液冷方案定义服务器" },
  { id: 15, fromNodeId: 10, toNodeId: 12, label: "成品分销" },
  { id: 16, fromNodeId: 5, toNodeId: 12, label: "芯片分销" },
  // CPO/光通信
  { id: 17, fromNodeId: 90, toNodeId: 10, label: "光器件→封测" },
  { id: 18, fromNodeId: 9002, toNodeId: 9001, label: "光芯片→光模块" },
  { id: 19, fromNodeId: 9003, toNodeId: 9001, label: "光器件→光模块" },
  { id: 20, fromNodeId: 9001, toNodeId: 1103, label: "CPO→AI服务器" },
  { id: 21, fromNodeId: 90, toNodeId: 11, label: "光通信→终端" },
  { id: 22, fromNodeId: 9004, toNodeId: 9002, label: "InP衬底→光芯片" },
  { id: 23, fromNodeId: 9005, toNodeId: 9001, label: "TFLN→光模块" },
  { id: 24, fromNodeId: 9006, toNodeId: 9001, label: "散热基板→CPO" },
  { id: 28, fromNodeId: 9, toNodeId: 709, label: "逻辑芯片供给" },
  // 跨产业连接（半导体→电力）
  { id: 27, fromNodeId: 8, toNodeId: 707, label: "模拟芯片供给" },

  { id: 25, fromNodeId: 7, toNodeId: 604, label: "功率芯片→火电控制" },
  { id: 26, fromNodeId: 90, toNodeId: 610, label: "光通信→电网通信" },
  // 跨产业连接（半导体→金属）
  { id: 34, fromNodeId: 7, toNodeId: 80201, label: "稀土磁材采购" },
  { id: 35, fromNodeId: 7, toNodeId: 80603, label: "磁性材料采购" },
  { id: 36, fromNodeId: 10, toNodeId: 80602, label: "金属材料采购" },
  // 跨产业连接（半导体→液冷）
  { id: 40, fromNodeId: 7, toNodeId: 1105, label: "功率芯片驱动液冷" },
  { id: 41, fromNodeId: 1105, toNodeId: 7, label: "功率半导体采购" },
  { id: 42, fromNodeId: 1105, toNodeId: 80602, label: "铜材/铝材采购" },
  { id: 43, fromNodeId: 80602, toNodeId: 1105, label: "铜材/铝材供给" },
  // MLCC/被动元器件
  { id: 29, fromNodeId: 9102, toNodeId: 9101, label: "陶瓷粉体供给" },
  { id: 30, fromNodeId: 9101, toNodeId: 10, label: "MLCC→封测" },
  { id: 31, fromNodeId: 9101, toNodeId: 11, label: "MLCC→终端" },
  { id: 32, fromNodeId: 9103, toNodeId: 11, label: "电感电阻→终端" },
  { id: 33, fromNodeId: 3, toNodeId: 9102, label: "原材料供给" },
];

// === 导出产业数据 ===
export const semiconductorData: IndustryData = {
  slug: "semiconductor",
  name: "半导体",
  icon: "Cpu",
  description: "半导体产业链涵盖上游材料设备、中游设计制造封测、下游终端应用三大环节，是现代信息产业的基石。",
  plainLanguageDescription: "半导体就是芯片，从沙子（硅）变成手机/电脑/汽车里的'大脑'，要经过设计、制造、封装等几十道工序。没有它，现代电子设备全部停摆。",
  overviewSummary: `半导体是现代电子世界的"大脑"和"记忆体"。从你口袋里的手机、桌上的电脑，到路上跑的电动车、云端跑的AI大模型——它们能工作，全靠指甲盖大小的芯片在背后运算。

整个产业链的起点是沙子（硅），经过提纯拉晶、切割抛光变成硅片，再经过光刻、刻蚀等数百道工序，在硅片上"刻"出几十亿个晶体管，最后切割封装成一颗颗芯片。这个过程涉及的材料、设备、技术极其复杂，全球没有任何一个国家能独立完成全部环节——这就是为什么半导体被称为"工业皇冠上的明珠"。`,
  overviewArchitecture: `本图谱按照"上游→中游→下游"三层架构组织：

• 上游——材料和设备是"粮草"和"兵器"：EDA/IP核是设计芯片的软件工具；半导体设备（光刻机、刻蚀机等）是造芯片的"机床"；硅片、光刻胶、电子特气等材料是"原材料"；晶圆代工是把设计变成实物的核心制造环节
• 中游——芯片本身按功能分五大类：逻辑芯片（CPU/GPU，负责"思考"）、存储芯片（DRAM/NAND，负责"记忆"）、模拟芯片（感知现实世界的声光温度）、功率半导体（控制电能）、光通信/CPO（用光传输数据）
• 下游——封装测试给芯片穿上"铠甲"并检验质量，终端应用让芯片走进手机、汽车、AI服务器等所有电子设备，分销渠道负责把芯片送到全球客户手中`,
  overviewHighlights: [
    "全球半导体市场超 5,000 亿美元，中国是全球最大的芯片消费国",
    "一颗先进芯片的制造过程涉及 300+ 道工序，耗时 3-4 个月",
    "光刻机是全世界最精密的机器，ASML 的 EUV 光刻机单台售价超 2 亿美元",
    "中国在封装测试环节全球领先，在设备、材料和 EDA 环节加速追赶",
    "AI 大模型爆发推动算力芯片需求激增，数据中心成为半导体最大增长引擎",
  ],
  rootNodes,
  childNodes,
  connections,
};

// === 工具函数 ===
export function getNodesByParent(data: IndustryData, parentId: number | null): LocalNode[] {
  if (parentId === null) return data.rootNodes;
  return data.childNodes[parentId] ?? [];
}

export function getNodePath(data: IndustryData, nodeId: number): { id: number; name: string; level: string }[] {
  const all = [...data.rootNodes];
  for (const children of Object.values(data.childNodes)) all.push(...children);
  const path: { id: number; name: string; level: string }[] = [];
  let current = all.find(n => n.id === nodeId);
  while (current) {
    path.unshift({ id: current.id, name: current.name, level: current.level });
    if (!current.parentId) break;
    current = all.find(n => n.id === current!.parentId);
  }
  return path;
}

export function getNodeDetail(data: IndustryData, nodeId: number): (LocalNode & { children: LocalNode[] }) | null {
  const all = [...data.rootNodes];
  for (const children of Object.values(data.childNodes)) all.push(...children);
  const node = all.find(n => n.id === nodeId);
  if (!node) return null;
  const children = data.childNodes[nodeId] ?? [];
  return { ...node, children };
}
