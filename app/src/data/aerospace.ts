// 商业航天产业链数据
// ID段：根节点 900-908，子节点 90001-90999，股票 91001-91999，连接 90001-90999

import type { IndustryData, LocalNode, LocalConnection } from "./semiconductor";

// === 根节点 ===
const rootNodes: LocalNode[] = [
  { id: 900, name: "航天材料与推进剂", level: "upstream", description: "碳纤维复合材料、钛合金、高温合金、液体/固体推进剂等航天基础材料。中国碳纤维产能占全球60%+，但T800以上高端产品仍依赖进口；液氧甲烷发动机是商业航天新趋势", plainLanguageDescription: "碳纤维、钛合金、火箭燃料这些造火箭的基础材料。碳纤维像超级轻的钢筋，钛合金耐高温，液氧甲烷是新型火箭燃料", parentId: null, stockCount: 0, childCount: 4, stocks: [] },
  { id: 901, name: "电子元器件与载荷", level: "upstream", description: "星载计算机、太阳能电池、光学载荷、通信载荷等卫星核心电子系统。星载计算机抗辐射要求高，国产替代加速；砷化镓太阳能电池转换效率30%+", plainLanguageDescription: "卫星上的大脑（计算机）、眼睛（相机）、耳朵（天线）和充电宝（太阳能板）。没有它们卫星就是一块铁疙瘩", parentId: null, stockCount: 0, childCount: 4, stocks: [] },
  { id: 902, name: "火箭制造", level: "midstream", description: "液体/固体火箭发动机、火箭箭体结构、可回收火箭技术。中国商业火箭发射次数全球第二，液氧甲烷可回收火箭是技术制高点", plainLanguageDescription: "把材料和零件组装成火箭。从发动机到箭体再到回收技术，火箭越能重复使用，发射成本越低", parentId: null, stockCount: 0, childCount: 4, stocks: [] },
  { id: 903, name: "卫星制造", level: "midstream", description: "通信卫星、遥感卫星、导航增强卫星、科研试验卫星。中国卫星制造能力全球前三，小卫星批量化生产是趋势，成本降至千万级", plainLanguageDescription: "把电子元器件组装成卫星。中国造卫星的速度越来越快，小卫星像下饺子一样批量生产", parentId: null, stockCount: 0, childCount: 4, stocks: [] },
  { id: 904, name: "发射服务", level: "midstream", description: "商业发射、搭载发射、发射场与测控服务。海南商业航天发射场2024年启用，发射成本有望降至每公斤500美元以下", plainLanguageDescription: "把火箭和卫星运到发射场点火升空，还要在地面跟踪控制。发射场就像火箭的起跑线", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 905, name: "卫星通信应用", level: "downstream", description: "卫星宽带互联网、卫星物联网、应急通信。低轨星座计划发射超1.3万颗卫星，对标SpaceX星链", plainLanguageDescription: "用卫星实现手机上网、物联网追踪、灾害应急通信。偏远山区和海上没有基站，只能靠卫星", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 906, name: "卫星遥感应用", level: "downstream", description: "农业监测、城市规划、环境监测、国防遥感。中国遥感卫星分辨率已达亚米级，数据服务市场规模超百亿", plainLanguageDescription: "用卫星给地球拍照，监测农田、城市、环境变化。卫星眼比人眼看得远、看得全、看得细", parentId: null, stockCount: 0, childCount: 4, stocks: [] },
  { id: 907, name: "卫星导航应用", level: "downstream", description: "高精度定位、自动驾驶增强、授时服务。北斗三号全球组网完成，高精度定位服务覆盖亚太，民用精度达厘米级", plainLanguageDescription: "北斗导航的日常应用，从手机定位到自动驾驶到金融交易时间同步。北斗让中国不再依赖GPS", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 908, name: "新兴太空经济", level: "downstream", description: "太空旅游、在轨服务（卫星维修/加注）、太空科研。中国已开展亚轨道旅游试验，在轨服务处于技术验证阶段", plainLanguageDescription: "去太空旅游、在太空修卫星、在太空做实验。这些是未来的万亿市场，但目前还在起步阶段", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
];

// === 子节点 ===
const childNodes: Record<number, LocalNode[]> = {
  900: [
    { id: 90001, name: "复合材料", level: "upstream", description: "碳纤维、芳纶纤维、陶瓷基复合材料。T300-T800级碳纤维用于火箭箭体和卫星结构，光威复材国内市占率50%+", plainLanguageDescription: "碳纤维像超级轻又超级结实的黑色黄金，造火箭箭体比铝合金轻30%", parentId: 900, stockCount: 2, childCount: 0, stocks: [
      { id: 91001, name: "光威复材", code: "300699.SZ", tag: "碳纤维龙头，T300-T1100全系列，航空航天市占率50%+", description: "光威复材（300699.SZ）是复合材料领域的代表性上市公司，碳纤维龙头，T300-T1100全系列，航空航天市占率50%+，在产业链中占据重要位置。" },
      { id: 91002, name: "中简科技", code: "300777.SZ", tag: "ZT7/T800级高性能碳纤维，航空航天专用", description: "中简科技（300777.SZ）是复合材料领域的代表性上市公司，ZT7/T800级高性能碳纤维，航空航天专用，在产业链中占据重要位置。" },
    ]},
    { id: 90002, name: "特种金属", level: "upstream", description: "钛合金、高温合金、铝合金。火箭发动机涡轮盘、燃烧室需要GH4169等高温合金，耐温650℃+", plainLanguageDescription: "钛合金轻又耐高温，高温合金能扛上千度，火箭发动机里最核心的材料", parentId: 900, stockCount: 3, childCount: 0, stocks: [
      { id: 91003, name: "宝钛股份", code: "600456.SH", tag: "国内最大钛合金企业，航空航天钛材市占率40%+", description: "宝钛股份（600456.SH）是特种金属领域的代表性上市公司，国内最大钛合金企业，航空航天钛材市占率40%+，在产业链中占据重要位置。" },
      { id: 91004, name: "钢研高纳", code: "300034.SZ", tag: "高温合金龙头，航发/火箭发动机核心材料", description: "钢研高纳（300034.SZ）是特种金属领域的代表性上市公司，高温合金龙头，航发/火箭发动机核心材料，在产业链中占据重要位置。" },
      { id: 91005, name: "西部超导", code: "688122.SH", tag: "超导钛合金，MRI和航空发动机双轮驱动", description: "西部超导（688122.SH）是特种金属领域的代表性上市公司，超导钛合金，MRI和航空发动机双轮驱动，在产业链中占据重要位置。" },
    ]},
    { id: 90003, name: "液体推进剂", level: "upstream", description: "液氧/煤油、液氧/甲烷、液氧/液氢。液氧甲烷是商业航天新趋势，比冲高且可重复使用", plainLanguageDescription: "火箭的汽油。液氧甲烷是最新趋势，燃烧干净还能重复使用，像电动车一样环保", parentId: 900, stockCount: 2, childCount: 0, stocks: [
      { id: 91006, name: "九丰能源", code: "605090.SH", tag: "商业航天特种燃料，液氧/甲烷/液氢供应商", description: "九丰能源（605090.SH）是液体推进剂领域的代表性上市公司，商业航天特种燃料，液氧/甲烷/液氢供应商，在产业链中占据重要位置。" },
      { id: 91007, name: "昊华科技", code: "600378.SH", tag: "超高纯液氧/甲烷，航天推进剂核心供应商", description: "昊华科技（600378.SH）是液体推进剂领域的代表性上市公司，超高纯液氧/甲烷，航天推进剂核心供应商，在产业链中占据重要位置。" },
    ]},
    { id: 90004, name: "固体推进剂", level: "upstream", description: "丁羟推进剂、改性双基推进剂。固体火箭结构简单、响应快，适合快速发射和小卫星搭载", plainLanguageDescription: "固体燃料像大烟花，一点就着，适合快速响应发射和导弹", parentId: 900, stockCount: 1, childCount: 0, stocks: [
      { id: 91008, name: "国科军工", code: "688543.SH", tag: "固体火箭发动机推进剂模块，军转民技术", description: "国科军工（688543.SH）是固体推进剂领域的代表性上市公司，固体火箭发动机推进剂模块，军转民技术，在产业链中占据重要位置。" },
    ]},
  ],
  901: [
    { id: 90101, name: "星载计算机/处理器", level: "upstream", description: "抗辐射加固CPU、SoC芯片、FPGA。宇航级芯片需要抗总剂量辐射100krad以上，国产替代加速", plainLanguageDescription: "卫星上的大脑，要抗得住太空辐射。普通手机芯片到太空就死机，必须用特制的宇航级芯片", parentId: 901, stockCount: 2, childCount: 0, stocks: [
      { id: 91009, name: "航天电子", code: "600879.SH", tag: "星载计算机/传感器市占率90%+，航天配套核心", description: "航天电子（600879.SH）是星载计算机/处理器领域的代表性上市公司，星载计算机/传感器市占率90%+，航天配套核心，在产业链中占据重要位置。" },
      { id: 91010, name: "臻镭科技", code: "688270.SH", tag: "射频收发芯片，卫星载荷信号处理", description: "臻镭科技（688270.SH）是星载计算机/处理器领域的代表性上市公司，射频收发芯片，卫星载荷信号处理，在产业链中占据重要位置。" },
    ]},
    { id: 90102, name: "太阳能电池", level: "upstream", description: "砷化镓/锗太阳能电池、柔性太阳翼。转换效率30%+，是卫星唯一能源来源", plainLanguageDescription: "卫星的充电宝，靠太阳能发电。砷化镓电池转换效率30%+，三结电池是主流", parentId: 901, stockCount: 1, childCount: 0, stocks: [
      { id: 91011, name: "乾照光电", code: "300102.SZ", tag: "砷化镓太阳能电池外延片，卫星电源核心", description: "乾照光电（300102.SZ）是太阳能电池领域的代表性上市公司，砷化镓太阳能电池外延片，卫星电源核心，在产业链中占据重要位置。" },
    ]},
    { id: 90103, name: "光学载荷", level: "upstream", description: "星敏感器、光学相机、激光通信终端。星敏感器精度达角秒级，用于卫星姿态确定", plainLanguageDescription: "卫星的眼睛，星敏感器看星星定方向，光学相机给地球拍照", parentId: 901, stockCount: 1, childCount: 0, stocks: [
      { id: 91012, name: "天银机电", code: "300342.SZ", tag: "星敏感器龙头，应用150+颗卫星，姿态控制核心", description: "天银机电（300342.SZ）是光学载荷领域的代表性上市公司，星敏感器龙头，应用150+颗卫星，姿态控制核心，在产业链中占据重要位置。" },
    ]},
    { id: 90104, name: "通信载荷", level: "upstream", description: "相控阵天线、T/R组件、射频芯片。有源相控阵是低轨卫星通信核心，可同时波束成形多个方向", plainLanguageDescription: "卫星的耳朵和嘴巴，相控阵天线像蜂窝一样，能同时跟地面多个用户通信", parentId: 901, stockCount: 1, childCount: 0, stocks: [
      { id: 91013, name: "国博电子", code: "688375.SH", tag: "有源相控阵T/R组件，卫星通信载荷核心", description: "国博电子（688375.SH）是通信载荷领域的代表性上市公司，有源相控阵T/R组件，卫星通信载荷核心，在产业链中占据重要位置。" },
    ]},
  ],
  902: [
    { id: 90201, name: "液体火箭发动机", level: "midstream", description: "液氧煤油发动机、液氧甲烷发动机。YF-100推力120吨用于长征系列；蓝箭TQ-12液氧甲烷发动机推力80吨", plainLanguageDescription: "火箭的心脏，液氧甲烷是商业航天新方向，能重复使用降低成本", parentId: 902, stockCount: 1, childCount: 0, stocks: [
      { id: 91014, name: "航天动力", code: "600343.SH", tag: "液体火箭发动机龙头，YF系列配套长征火箭", description: "航天动力（600343.SH）是液体火箭发动机领域的代表性上市公司，液体火箭发动机龙头，YF系列配套长征火箭，在产业链中占据重要位置。" },
    ]},
    { id: 90202, name: "固体火箭发动机", level: "midstream", description: "小型固体发动机、脉冲发动机。结构简单、成本低，适合快速响应发射", plainLanguageDescription: "像大烟花一样的发动机，点着就飞，适合快速发射小卫星", parentId: 902, stockCount: 1, childCount: 0, stocks: [
      { id: 91015, name: "中天火箭", code: "003009.SZ", tag: "固体火箭发动机，探空火箭/人工影响天气", description: "中天火箭（003009.SZ）是固体火箭发动机领域的代表性上市公司，固体火箭发动机，探空火箭/人工影响天气，在产业链中占据重要位置。" },
    ]},
    { id: 90203, name: "火箭箭体与结构", level: "midstream", description: "箭体结构、整流罩、贮箱、级间段。碳纤维用于箭体减重30%+，贮箱承受高压低温", plainLanguageDescription: "火箭的骨架和外壳，要轻又要结实。碳纤维能让火箭轻30%，多装卫星", parentId: 902, stockCount: 2, childCount: 0, stocks: [
      { id: 91016, name: "航天晨光", code: "600501.SH", tag: "火箭箭体结构件、特种车辆，航天科工旗下", description: "航天晨光（600501.SH）是火箭箭体与结构领域的代表性上市公司，火箭箭体结构件、特种车辆，航天科工旗下，在产业链中占据重要位置。" },
      { id: 91017, name: "上海沪工", code: "603131.SH", tag: "火箭结构件、卫星装配，商业航天配套", description: "上海沪工（603131.SH）是火箭箭体与结构领域的代表性上市公司，火箭结构件、卫星装配，商业航天配套，在产业链中占据重要位置。" },
    ]},
    { id: 90204, name: "可回收火箭技术", level: "midstream", description: "垂直起降、栅格舵、着陆腿、发动机深度变推力。SpaceX猎鹰9号已实现一级回收复用15+次", plainLanguageDescription: "让火箭像飞机一样能重复使用，是降低发射成本的关键。SpaceX已经做到了，中国正在追赶", parentId: 902, stockCount: 0, childCount: 0, stocks: [
    ]},
  ],
  903: [
    { id: 90301, name: "通信卫星", level: "midstream", description: "高通量通信卫星、低轨星座卫星。中国卫星CAST2000平台小卫星龙头；银河航天200Gbps高通量卫星", plainLanguageDescription: "专门用来通信的卫星，像太空中的信号塔。低轨卫星离地面近，延迟低", parentId: 903, stockCount: 2, childCount: 0, stocks: [
      { id: 91018, name: "中国卫星", code: "600118.SH", tag: "小卫星制造龙头，CAST2000平台，国内市占率第一", description: "中国卫星（600118.SH）是通信卫星领域的代表性上市公司，小卫星制造龙头，CAST2000平台，国内市占率第一，在产业链中占据重要位置。" },
      { id: 91019, name: "航天电器", code: "002025.SZ", tag: "航天高端连接器，卫星/火箭配套", description: "航天电器（002025.SZ）是通信卫星领域的代表性上市公司，航天高端连接器，卫星/火箭配套，在产业链中占据重要位置。" },
    ]},
    { id: 90302, name: "遥感卫星", level: "midstream", description: "光学遥感、SAR雷达遥感。欧比特珠海一号星座实现高光谱遥感；航天宏图女娲SAR星座", plainLanguageDescription: "专门给地球拍照的卫星，能看清农田、城市、环境变化", parentId: 903, stockCount: 1, childCount: 0, stocks: [
      { id: 91020, name: "欧比特", code: "300053.SZ", tag: "珠海一号遥感星座，卫星大数据服务", description: "欧比特（300053.SZ）是遥感卫星领域的代表性上市公司，珠海一号遥感星座，卫星大数据服务，在产业链中占据重要位置。" },
    ]},
    { id: 90303, name: "导航增强卫星", level: "midstream", description: "北斗增强、低轨导航星座。低轨卫星可增强北斗信号精度至厘米级", plainLanguageDescription: "帮北斗导航更准的卫星，像给GPS信号加功放", parentId: 903, stockCount: 1, childCount: 0, stocks: [
      { id: 91021, name: "北斗星通", code: "002151.SZ", tag: "北斗芯片/模块龙头，22nm GNSS SoC", description: "北斗星通（002151.SZ）是导航增强卫星领域的代表性上市公司，北斗芯片/模块龙头，22nm GNSS SoC，在产业链中占据重要位置。" },
    ]},
    { id: 90304, name: "科研试验卫星", level: "midstream", description: "技术验证、空间科学、新技术在轨验证。如可展开天线、新型推进系统、太空新材料", plainLanguageDescription: "用来试验新技术的卫星，像太空中的实验室", parentId: 903, stockCount: 0, childCount: 0, stocks: [
    ]},
  ],
  904: [
    { id: 90401, name: "商业发射服务", level: "midstream", description: "整箭发射、星座组网发射。海南商业发射场2024年启用；蓝箭朱雀二号全球首枚入轨液氧甲烷火箭", plainLanguageDescription: "帮客户把卫星送上天，按公斤收费。发射成本越低，接的单越多", parentId: 904, stockCount: 2, childCount: 0, stocks: [
      { id: 91022, name: "航天科技", code: "000901.SZ", tag: "航天科工旗下，运载火箭配套", description: "航天科技（000901.SZ）是商业发射服务领域的代表性上市公司，航天科工旗下，运载火箭配套，在产业链中占据重要位置。" },
      { id: 91023, name: "星图测控", code: "920116.BJ", tag: "航天测控服务，卫星轨道管理", description: "星图测控（920116.BJ）是商业发射服务领域的代表性上市公司，航天测控服务，卫星轨道管理，在产业链中占据重要位置。" },
    ]},
    { id: 90402, name: "搭载发射服务", level: "midstream", description: "拼单发射、顺风车发射。利用火箭富余运力搭载小卫星，成本降低50%+", plainLanguageDescription: "像卫星的拼车服务，小卫星搭大火箭的顺风车上天，省钱", parentId: 904, stockCount: 0, childCount: 0, stocks: [
    ]},
    { id: 90403, name: "发射场与测控", level: "midstream", description: "发射场运营、地面测控站、飞控中心、推进剂加注。西安卫星测控中心负责中国航天器轨道管理", plainLanguageDescription: "火箭的起跑线和监控室，从点火到入轨全程跟踪控制", parentId: 904, stockCount: 0, childCount: 0, stocks: [
    ]},
  ],
  905: [
    { id: 90501, name: "卫星宽带互联网", level: "downstream", description: "低轨星座互联网、偏远地区宽带。中国星网GW计划发射1.3万颗卫星；银河航天验证低轨5G通信", plainLanguageDescription: "用卫星实现全球WiFi，偏远山区和海上也能高速上网", parentId: 905, stockCount: 1, childCount: 0, stocks: [
      { id: 91024, name: "中国卫通", code: "601698.SH", tag: "国内唯一卫星通信运营商，管理中星/亚太卫星", description: "中国卫通（601698.SH）是卫星宽带互联网领域的代表性上市公司，国内唯一卫星通信运营商，管理中星/亚太卫星，在产业链中占据重要位置。" },
    ]},
    { id: 90502, name: "卫星物联网", level: "downstream", description: "海洋监测、物流追踪、野外数据采集、智慧农业。覆盖地面网络盲区", plainLanguageDescription: "用卫星连接各种设备，集装箱在哪、渔船在哪，卫星都知道", parentId: 905, stockCount: 2, childCount: 0, stocks: [
      { id: 91025, name: "华力创通", code: "300045.SZ", tag: "卫星通信基带芯片，天通物联网终端", description: "华力创通（300045.SZ）是卫星物联网领域的代表性上市公司，卫星通信基带芯片，天通物联网终端，在产业链中占据重要位置。" },
      { id: 91026, name: "震有科技", code: "688418.SH", tag: "卫星通信核心网，天通一号独家供应商", description: "震有科技（688418.SH）是卫星物联网领域的代表性上市公司，卫星通信核心网，天通一号独家供应商，在产业链中占据重要位置。" },
    ]},
    { id: 90503, name: "应急通信", level: "downstream", description: "灾害救援、应急指挥、军事通信、极地探险。天通一号卫星电话在汶川地震、河南水灾中发挥关键作用", plainLanguageDescription: "灾难时地面基站毁了，靠卫星打电话求救", parentId: 905, stockCount: 1, childCount: 0, stocks: [
      { id: 91027, name: "海格通信", code: "002465.SZ", tag: "军用/卫星通信终端，军民融合发展标杆", description: "海格通信（002465.SZ）是应急通信领域的代表性上市公司，军用/卫星通信终端，军民融合发展标杆，在产业链中占据重要位置。" },
    ]},
  ],
  906: [
    { id: 90601, name: "农业监测", level: "downstream", description: "作物长势、病虫害监测、产量预估、精准农业。遥感+AI实现农田精准管理", plainLanguageDescription: "卫星看农田，哪块地缺水、哪块地长虫，一目了然", parentId: 906, stockCount: 1, childCount: 0, stocks: [
      { id: 91028, name: "航天宏图", code: "688066.SH", tag: "遥感数据处理PIE平台，女娲SAR星座", description: "航天宏图（688066.SH）是农业监测领域的代表性上市公司，遥感数据处理PIE平台，女娲SAR星座，在产业链中占据重要位置。" },
    ]},
    { id: 90602, name: "城市规划", level: "downstream", description: "土地利用监测、违章建筑识别、基础设施评估、交通流量分析。亚米级遥感影像可实现厘米级变化检测", plainLanguageDescription: "卫星给城市体检，哪里违章建房、哪里道路拥堵都能发现", parentId: 906, stockCount: 1, childCount: 0, stocks: [
      { id: 91029, name: "中科星图", code: "688568.SH", tag: "数字地球平台，空天信息服务", description: "中科星图（688568.SH）是城市规划领域的代表性上市公司，数字地球平台，空天信息服务，在产业链中占据重要位置。" },
    ]},
    { id: 90603, name: "环境监测", level: "downstream", description: "大气污染、水质监测、森林防火、碳排放核算。高分五号实现大气痕量气体探测", plainLanguageDescription: "卫星监测环境，森林着火、水质污染、空气雾霾都能看到", parentId: 906, stockCount: 1, childCount: 0, stocks: [
      { id: 91030, name: "四维图新", code: "002405.SZ", tag: "高精度地图，遥感数据应用", description: "四维图新（002405.SZ）是环境监测领域的代表性上市公司，高精度地图，遥感数据应用，在产业链中占据重要位置。" },
    ]},
    { id: 90604, name: "国防遥感", level: "downstream", description: "边境监控、目标识别、战场态势感知、导弹预警。军民用遥感技术同源，分辨率达0.5米级", plainLanguageDescription: "军用卫星侦察，看边境、找目标、预警导弹", parentId: 906, stockCount: 0, childCount: 0, stocks: [
    ]},
  ],
  907: [
    { id: 90701, name: "高精度定位", level: "downstream", description: "测绘、精准农业、无人机导航、工程测量。北斗RTK精度达厘米级", plainLanguageDescription: "北斗让定位精度到厘米，比GPS还准，测绘和种地都用得上", parentId: 907, stockCount: 2, childCount: 0, stocks: [
      { id: 91031, name: "华测导航", code: "300627.SZ", tag: "高精度卫星导航定位设备，测绘/农业/自动驾驶", description: "华测导航（300627.SZ）是高精度定位领域的代表性上市公司，高精度卫星导航定位设备，测绘/农业/自动驾驶，在产业链中占据重要位置。" },
      { id: 91032, name: "振芯科技", code: "300101.SZ", tag: "北斗导航射频/基带芯片，军用为主", description: "振芯科技（300101.SZ）是高精度定位领域的代表性上市公司，北斗导航射频/基带芯片，军用为主，在产业链中占据重要位置。" },
    ]},
    { id: 90702, name: "自动驾驶增强", level: "downstream", description: "车道级导航、V2X通信、高精地图融合。北斗+5G+高精地图是自动驾驶必备", plainLanguageDescription: "北斗帮自动驾驶汽车知道自己在哪条车道，精度不够会撞车", parentId: 907, stockCount: 1, childCount: 0, stocks: [
      { id: 91033, name: "合众思壮", code: "002383.SZ", tag: "高精度北斗导航产品和解决方案", description: "合众思壮（002383.SZ）是自动驾驶增强领域的代表性上市公司，高精度北斗导航产品和解决方案，在产业链中占据重要位置。" },
    ]},
    { id: 90703, name: "授时服务", level: "downstream", description: "金融交易、电力调度、通信同步、区块链。北斗授时精度达纳秒级", plainLanguageDescription: "北斗给金融交易对表，高频交易差一纳秒就亏大钱", parentId: 907, stockCount: 0, childCount: 0, stocks: [
    ]},
  ],
  908: [
    { id: 90801, name: "太空旅游", level: "downstream", description: "亚轨道飞行、轨道空间站旅游、失重体验。中国已开展亚轨道旅游试验，票价有望降至百万级", plainLanguageDescription: "花钱去太空玩一圈，体验失重和看地球。目前只有富豪玩得起", parentId: 908, stockCount: 0, childCount: 0, stocks: [
    ]},
    { id: 90802, name: "在轨服务", level: "downstream", description: "卫星维修、燃料加注、太空拖船、轨道清理。航天环宇开发在轨服务机器人", plainLanguageDescription: "给卫星加油和维修，延长卫星寿命，清理太空垃圾", parentId: 908, stockCount: 1, childCount: 0, stocks: [
      { id: 91034, name: "航天环宇", code: "688523.SH", tag: "测控天线伺服系统，在轨服务装备", description: "航天环宇（688523.SH）是在轨服务领域的代表性上市公司，测控天线伺服系统，在轨服务装备，在产业链中占据重要位置。" },
    ]},
    { id: 90803, name: "太空科研", level: "downstream", description: "微重力实验、新材料制备、生命科学、太空制药。中国空间站已开展数百项科学实验", plainLanguageDescription: "在太空做实验，没有重力影响，能合成地球上做不出来的新材料", parentId: 908, stockCount: 0, childCount: 0, stocks: [
    ]},
  ],
};

// === 连接关系 ===
const connections: LocalConnection[] = [
  // === 根节点骨架连接 ===
  { id: 90001, fromNodeId: 900, toNodeId: 902, label: "航天材料供给" },
  { id: 90002, fromNodeId: 900, toNodeId: 903, label: "航天材料供给" },
  { id: 90003, fromNodeId: 901, toNodeId: 903, label: "电子载荷供给" },
  { id: 90004, fromNodeId: 902, toNodeId: 904, label: "火箭交付" },
  { id: 90005, fromNodeId: 903, toNodeId: 904, label: "卫星交付" },
  { id: 90006, fromNodeId: 904, toNodeId: 905, label: "发射服务支撑" },
  { id: 90007, fromNodeId: 904, toNodeId: 906, label: "发射服务支撑" },
  { id: 90008, fromNodeId: 904, toNodeId: 907, label: "发射服务支撑" },
  { id: 90009, fromNodeId: 905, toNodeId: 908, label: "应用延伸" },
  { id: 90010, fromNodeId: 906, toNodeId: 908, label: "应用延伸" },
  { id: 90011, fromNodeId: 907, toNodeId: 908, label: "应用延伸" },
  // === 上游→中游（原材料供给） ===
  { id: 90012, fromNodeId: 90001, toNodeId: 90203, label: "复合材料供给" },
  { id: 90013, fromNodeId: 90002, toNodeId: 90201, label: "特种金属供给" },
  { id: 90014, fromNodeId: 90002, toNodeId: 90203, label: "特种金属供给" },
  { id: 90015, fromNodeId: 90003, toNodeId: 90201, label: "液体推进剂供给" },
  { id: 90016, fromNodeId: 90004, toNodeId: 90202, label: "固体推进剂供给" },
  { id: 90017, fromNodeId: 90101, toNodeId: 90301, label: "星载计算机供给" },
  { id: 90018, fromNodeId: 90101, toNodeId: 90302, label: "星载计算机供给" },
  { id: 90019, fromNodeId: 90101, toNodeId: 90303, label: "星载计算机供给" },
  { id: 90020, fromNodeId: 90101, toNodeId: 90304, label: "星载计算机供给" },
  { id: 90021, fromNodeId: 90102, toNodeId: 90301, label: "太阳能电池供给" },
  { id: 90022, fromNodeId: 90102, toNodeId: 90302, label: "太阳能电池供给" },
  { id: 90023, fromNodeId: 90102, toNodeId: 90303, label: "太阳能电池供给" },
  { id: 90024, fromNodeId: 90102, toNodeId: 90304, label: "太阳能电池供给" },
  { id: 90025, fromNodeId: 90103, toNodeId: 90302, label: "光学载荷供给" },
  { id: 90026, fromNodeId: 90104, toNodeId: 90301, label: "通信载荷供给" },
  // === 中游→上游（原材料采购） ===
  { id: 90027, fromNodeId: 90201, toNodeId: 90002, label: "特种金属采购" },
  { id: 90028, fromNodeId: 90202, toNodeId: 90004, label: "固体推进剂采购" },
  { id: 90029, fromNodeId: 90203, toNodeId: 90001, label: "复合材料采购" },
  { id: 90030, fromNodeId: 90203, toNodeId: 90002, label: "特种金属采购" },
  { id: 90031, fromNodeId: 90301, toNodeId: 90101, label: "星载计算机采购" },
  { id: 90032, fromNodeId: 90301, toNodeId: 90102, label: "太阳能电池采购" },
  { id: 90033, fromNodeId: 90301, toNodeId: 90104, label: "通信载荷采购" },
  { id: 90034, fromNodeId: 90302, toNodeId: 90101, label: "星载计算机采购" },
  { id: 90035, fromNodeId: 90302, toNodeId: 90102, label: "太阳能电池采购" },
  { id: 90036, fromNodeId: 90302, toNodeId: 90103, label: "光学载荷采购" },
  // === 中游→中游（加工集成） ===
  { id: 90037, fromNodeId: 90201, toNodeId: 90203, label: "发动机集成" },
  { id: 90038, fromNodeId: 90202, toNodeId: 90203, label: "发动机集成" },
  { id: 90039, fromNodeId: 90203, toNodeId: 90204, label: "可回收技术集成" },
  { id: 90040, fromNodeId: 90301, toNodeId: 90401, label: "通信卫星交付" },
  { id: 90041, fromNodeId: 90302, toNodeId: 90401, label: "遥感卫星交付" },
  { id: 90042, fromNodeId: 90303, toNodeId: 90401, label: "导航卫星交付" },
  { id: 90043, fromNodeId: 90304, toNodeId: 90401, label: "科研卫星交付" },
  // === 中游→中游（反向） ===
  { id: 90044, fromNodeId: 90203, toNodeId: 90201, label: "发动机采购" },
  { id: 90045, fromNodeId: 90401, toNodeId: 90301, label: "通信卫星采购" },
  { id: 90046, fromNodeId: 90401, toNodeId: 90302, label: "遥感卫星采购" },
  // === 中游→下游（服务支撑） ===
  { id: 90047, fromNodeId: 90401, toNodeId: 90501, label: "卫星入轨支撑" },
  { id: 90048, fromNodeId: 90401, toNodeId: 90601, label: "遥感卫星入轨" },
  { id: 90049, fromNodeId: 90401, toNodeId: 90701, label: "导航卫星入轨" },
  { id: 90050, fromNodeId: 90402, toNodeId: 90304, label: "搭载科研卫星" },
  { id: 90051, fromNodeId: 90501, toNodeId: 90401, label: "发射服务采购" },
  // === 下游→中游（服务采购） ===
  { id: 90052, fromNodeId: 90601, toNodeId: 90401, label: "发射服务采购" },
  { id: 90053, fromNodeId: 90701, toNodeId: 90401, label: "发射服务采购" },
  { id: 90054, fromNodeId: 90501, toNodeId: 90502, label: "宽带→物联网" },
  // === 下游内部 ===
  { id: 90055, fromNodeId: 90501, toNodeId: 90503, label: "宽带→应急通信" },
  { id: 90056, fromNodeId: 90601, toNodeId: 90602, label: "农业→城市规划" },
  { id: 90057, fromNodeId: 90602, toNodeId: 90603, label: "城市规划→环境监测" },
  { id: 90058, fromNodeId: 90101, toNodeId: 7, label: "星载芯片需求" },
  // === 跨产业连接 ===
  { id: 90059, fromNodeId: 90104, toNodeId: 7, label: "射频芯片需求" },
  { id: 90060, fromNodeId: 90002, toNodeId: 80402, label: "钛合金采购" },
  { id: 90061, fromNodeId: 90201, toNodeId: 80402, label: "高温合金采购" },
  { id: 90062, fromNodeId: 90102, toNodeId: 610, label: "太阳能电池并网" },
  { id: 90063, fromNodeId: 90403, toNodeId: 704, label: "发射场电力设备" },
  { id: 90064, fromNodeId: 7, toNodeId: 90101, label: "宇航芯片供应" },
  { id: 90065, fromNodeId: 7, toNodeId: 90104, label: "射频芯片供应" },
  { id: 90066, fromNodeId: 80402, toNodeId: 90002, label: "钛合金供应" },
  { id: 90067, fromNodeId: 610, toNodeId: 90102, label: "电力供应" },
  { id: 90068, fromNodeId: 704, toNodeId: 90403, label: "变压器供应" },
];

// === 导出产业数据 ===
export const aerospaceData: IndustryData = {
  slug: "aerospace",
  name: "商业航天",
  icon: "Rocket",
  description: "商业航天产业链涵盖航天材料/推进剂上游、火箭/卫星/发射服务中游、卫星通信/遥感/导航/新兴太空经济下游。中国商业航天正处于爆发期，低轨星座、可回收火箭、太空经济是三大主线。",
  plainLanguageDescription: "商业航天就是用市场化的方式造火箭、发卫星、做太空生意。从造火箭的材料、卫星上的芯片，到发射服务、卫星上网和导航，再到未来的太空旅游，这是一条通往星辰大海的产业链。",
  rootNodes,
  childNodes,
  connections,
};
