// 电网设备产业链数据
// ID段：根节点 700-715，子节点 70001-70999，股票 70001-70999，连接 70001-70999

import type { IndustryData } from "./semiconductor";

// === 根节点 ===
const rootNodes = [
  // 上游
  { id: 700, name: "硅钢/取向硅钢", level: "upstream", description: "变压器核心磁性材料，取向硅钢决定了变压器能效等级，进口依赖度曾超50%", plainLanguageDescription: "取向硅钢是变压器的'心脏材料'，直接决定变压器能效等级，曾长期被进口垄断", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 701, name: "铜铝材料", level: "upstream", description: "电网导线/电缆核心导电材料，铜占比电缆成本60%+，铝代铜趋势在架空线领域加速", plainLanguageDescription: "铜铝材料是电线电缆的'骨架'，铜导电最好但贵，铝便宜轻量，特高压导线用高强铝合金", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 702, name: "绝缘材料", level: "upstream", description: "电缆绝缘料、复合绝缘子、电子绝缘材料，特高压对绝缘性能要求极高", plainLanguageDescription: "绝缘材料是电网的'安全服'，防止电流泄漏和触电，特高压对绝缘性能要求极高", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 703, name: "稀土永磁", level: "upstream", description: "高性能电机及变压器核心材料，钕铁硼磁性能直接影响电机效率，中国产量占全球90%", plainLanguageDescription: "稀土永磁是高性能电机的'磁源'，中国产量占全球九成，新能源车电机离不开它", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  // 中游
  { id: 704, name: "变压器", level: "midstream", description: "电力系统核心变电设备，特高压变压器单台价值1亿+，非晶合金变压器节能30%+", plainLanguageDescription: "变压器是电网的'电压转换器'，把高压电变成家用电，特高压变压器单台价值过亿", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 705, name: "开关设备/GIS", level: "midstream", description: "高压开关及GIS组合电器，特高压GIS单间隔价值5000万+，GIS替代敞开式趋势明显", plainLanguageDescription: "开关设备是电网的'断路器'，故障时快速切断电流保护设备，GIS组合电器占地小更安全", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 706, name: "输电线路/电缆", level: "midstream", description: "高压电缆及架空导线，海缆单公里价值500万+，特高压导线用高强铝合金", plainLanguageDescription: "输电线路和电缆是电力的'血管'，海缆单公里价值超500万，特高压导线用特殊铝合金", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 707, name: "智能电表/计量", level: "midstream", description: "用电信息采集及智能计量，IR46标准智能电表更换周期8年，年招标量9000万只", plainLanguageDescription: "智能电表是家家户户的'用电记账本'，能远程抄表、分时计费，8年更换一轮", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 708, name: "无功补偿/电容器", level: "midstream", description: "SVG/STATCOM及电力电容器，新能源并网带动无功补偿需求，薄膜电容替代铝电解趋势", plainLanguageDescription: "无功补偿设备让电网电压更稳定，新能源并网多了，对无功补偿的需求越来越大", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 709, name: "特高压核心设备", level: "midstream", description: "换流阀、直流穿墙套管、均压电容等特高压专用设备，技术壁垒极高，国产替代加速", plainLanguageDescription: "特高压核心设备包括换流阀、穿墙套管等，技术壁垒极高，被称为电网设备的'皇冠明珠'", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  // 下游
  { id: 710, name: "电网建设/运维", level: "downstream", description: "电网工程EPC及智能运维，十四五电网投资超3万亿，配电网改造占比提升至60%", plainLanguageDescription: "电网建设和运维是电力系统的'施工队和物业'，十四五电网投资超3万亿", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 711, name: "配电网改造", level: "downstream", description: "一二次融合设备、台区智能化、分布式能源接入，配网自动化覆盖率目标90%", plainLanguageDescription: "配电网改造让老旧电网升级换代，从人工巡检到智能自愈，配网自动化覆盖率目标九成", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 712, name: "充电桩/虚拟电厂", level: "downstream", description: "充电基础设施及虚拟电厂聚合运营，V2G车网互动技术示范，虚拟电厂聚合资源超1000万千瓦", plainLanguageDescription: "充电桩和虚拟电厂是新型电力系统的'新物种'，电动车不仅能充电还能反向给电网送电", parentId: null, stockCount: 1, childCount: 2, stocks: [] },
];

// === 子节点 ===
const childNodes: Record<number, any> = {
  700: [
    { id: 70001, name: "取向硅钢", level: "upstream", description: "变压器铁芯核心材料，高磁感取向硅钢B8≥1.88T，国内仅宝钢/首钢等少数企业量产", plainLanguageDescription: "取向硅钢是变压器铁芯核心材料，国内仅宝钢、首钢等少数企业能量产高磁感产品", parentId: 700, stockCount: 3, childCount: 0, stocks: [
      { id: 70001, name: "宝钢股份", code: "600019.SH", tag: "取向硅钢龙头，市占率55%，高磁感产品占比70%", description: "宝钢股份（600019.SH）是取向硅钢领域的代表性上市公司，取向硅钢龙头，市场占有率55%，高磁感产品占比70%，在产业链中占据重要位置。" },
      { id: 70002, name: "首钢股份", code: "000959.SZ", tag: "高磁感取向硅钢specialist，0.20mm超薄规格量产", description: "首钢股份（000959.SZ）是取向硅钢领域的代表性上市公司，高磁感取向硅钢专业供应商，0.20mm超薄规格量产，在产业链中占据重要位置。" },
      { id: 70003, name: "太钢不锈", code: "000825.SZ", tag: "无取向硅钢龙头，新能源汽车驱动电机用钢市占率30%", description: "太钢不锈（000825.SZ）是取向硅钢领域的代表性上市公司，无取向硅钢龙头，新能源汽车驱动电机用钢市场占有率30%，在产业链中占据重要位置。" },
    ]},
    { id: 70002, name: "电磁线/扁线", level: "upstream", description: "变压器及电机绕组核心材料，新能源车驱动电机用扁线渗透率提升至60%+", plainLanguageDescription: "电磁线和扁线是变压器及电机绕组的'血管'，新能源车驱动电机用扁线渗透率超六成", parentId: 700, stockCount: 4, childCount: 0, stocks: [
      { id: 70004, name: "精达股份", code: "600577.SH", tag: "电磁线龙头，市占率35%，新能源车扁线放量", description: "精达股份（600577.SH）是电磁线/扁线领域的代表性上市公司，电磁线龙头，市场占有率35%，新能源车扁线放量，在产业链中占据重要位置。" },
      { id: 70005, name: "长城科技", code: "603897.SH", tag: "电磁线specialist，新能源车用扁线产能1万吨", description: "长城科技（603897.SH）是电磁线/扁线领域的代表性上市公司，电磁线专业供应商，新能源车用扁线产能1万吨，在产业链中占据重要位置。" },
      { id: 70006, name: "金杯电工", code: "002533.SZ", tag: "扁线电机用电磁线，产能2万吨，特斯拉二级供应商", description: "金杯电工（002533.SZ）是电磁线/扁线领域的代表性上市公司，扁线电机用电磁线，产能2万吨，特斯拉二级供应商，在产业链中占据重要位置。" },
    ]},
  ],
  701: [
    { id: 70003, name: "电解铜/铜杆", level: "upstream", description: "电线电缆核心导电材料，电解铜纯度99.95%+，铜价波动对电缆成本影响显著", plainLanguageDescription: "电解铜是电线电缆的核心导电材料，纯度要求99.95%以上，铜价波动直接影响电缆成本", parentId: 701, stockCount: 3, childCount: 0, stocks: [
      { id: 70007, name: "江西铜业", code: "600362.SH", tag: "铜冶炼龙头，阴极铜产能180万吨，国内第一", description: "江西铜业（600362.SH）是电解铜/铜杆领域的代表性上市公司，铜冶炼龙头，阴极铜产能180万吨，国内第一，在产业链中占据重要位置。" },
      { id: 70008, name: "云南铜业", code: "000878.SZ", tag: "铜冶炼specialist，冶炼成本行业最低，硫酸副产品盈利", description: "云南铜业（000878.SZ）是电解铜/铜杆领域的代表性上市公司，铜冶炼专业供应商，冶炼成本行业最低，硫酸副产品盈利，在产业链中占据重要位置。" },
      { id: 70009, name: "铜陵有色", code: "000630.SZ", tag: "铜冶炼+铜加工一体化，铜箔产能4万吨，PCB用高端铜箔", description: "铜陵有色（000630.SZ）是电解铜/铜杆领域的代表性上市公司，铜冶炼+铜加工一体化，铜箔产能4万吨，PCB用高端铜箔，在产业链中占据重要位置。" },
    ]},
    { id: 70004, name: "铝材/铝合金", level: "upstream", description: "特高压导线及变压器散热器材料，高强铝合金导线导电率提升5%，轻量化需求增长", plainLanguageDescription: "铝材和铝合金用于特高压导线，高强铝合金导电率提升5%，轻量化让铁塔承受更少重量", parentId: 701, stockCount: 4, childCount: 0, stocks: [
      { id: 70010, name: "中国铝业", code: "601600.SH", tag: "电解铝龙头，产能400万吨，特高压导线用铝合金", description: "中国铝业（601600.SH）是铝材/铝合金领域的代表性上市公司，电解铝龙头，产能400万吨，特高压导线用铝合金，在产业链中占据重要位置。" },
      { id: 70011, name: "云铝股份", code: "000807.SZ", tag: "水电铝specialist，碳排放仅为煤电铝1/5，绿电铝概念", description: "云铝股份（000807.SZ）是铝材/铝合金领域的代表性上市公司，水电铝专业供应商，碳排放仅为煤电铝1/5，绿电铝概念，在产业链中占据重要位置。" },
      { id: 70012, name: "南山铝业", code: "600219.SH", tag: "高端铝材，航空板+汽车板+特高压导线用铝，毛利率25%", description: "南山铝业（600219.SH）是铝材/铝合金领域的代表性上市公司，高端铝材，航空板+汽车板+特高压导线用铝，毛利率水平25%，在产业链中占据重要位置。" },
    ]},
  ],
  702: [
    { id: 70005, name: "复合绝缘子", level: "upstream", description: "特高压输电线路绝缘核心部件，复合绝缘子重量仅为瓷绝缘子1/10，防污闪性能优异", plainLanguageDescription: "复合绝缘子是特高压线路的'绝缘伞'，重量仅为瓷绝缘子的十分之一，防污闪性能优异", parentId: 702, stockCount: 3, childCount: 0, stocks: [
      { id: 70013, name: "神马电力", code: "603530.SH", tag: "复合绝缘子龙头，特高压市占率60%，复合套管突破", description: "神马电力（603530.SH）是复合绝缘子领域的代表性上市公司，复合绝缘子龙头，特高压市场占有率60%，复合套管突破，在产业链中占据重要位置。" },
      { id: 70014, name: "麦克奥迪", code: "300341.SZ", tag: "绝缘子specialist，海外出口占比50%，美国电网客户", description: "麦克奥迪（300341.SZ）是复合绝缘子领域的代表性上市公司，绝缘子专业供应商，海外出口占比50%，美国电网客户，在产业链中占据重要位置。" },
      { id: 70015, name: "大连电瓷", code: "002606.SZ", tag: "瓷绝缘子龙头，国网特高压中标第一，百年品牌", description: "大连电瓷（002606.SZ）是复合绝缘子领域的代表性上市公司，瓷绝缘子龙头，国网特高压中标第一，百年品牌，在产业链中占据重要位置。" },
    ]},
    { id: 70006, name: "电缆料/电子绝缘", level: "upstream", description: "高压电缆绝缘料、电工绝缘材料，高压电缆料国产化率从30%提升至60%", plainLanguageDescription: "电缆料和电子绝缘材料是高压电缆的'外皮'，高压电缆料国产化率已从三成提升至六成", parentId: 702, stockCount: 4, childCount: 0, stocks: [
      { id: 70016, name: "万马股份", code: "002276.SZ", tag: "电缆料龙头，市占率25%，高压电缆料国产替代", description: "万马股份（002276.SZ）是电缆料/电子绝缘领域的代表性上市公司，电缆料龙头，市场占有率25%，高压电缆料国产替代，在产业链中占据重要位置。" },
      { id: 70017, name: "东材科技", code: "601208.SH", tag: "电工绝缘材料specialist，特高压用绝缘薄膜，光伏背板基膜", description: "东材科技（601208.SH）是电缆料/电子绝缘领域的代表性上市公司，电工绝缘材料专业供应商，特高压用绝缘薄膜，光伏背板基膜，在产业链中占据重要位置。" },
      { id: 70018, name: "洁美科技", code: "002859.SZ", tag: "电子绝缘材料，MLCC离型膜国产替代，市占率40%", description: "洁美科技（002859.SZ）是电缆料/电子绝缘领域的代表性上市公司，电子绝缘材料，MLCC离型膜国产替代，市场占有率40%，在产业链中占据重要位置。" },
    ]},
  ],
  703: [
    { id: 70007, name: "稀土永磁材料", level: "upstream", description: "钕铁硼永磁材料，高性能磁材剩磁≥1.4T，新能源车单车用量2-3kg，中国产量占全球90%", plainLanguageDescription: "稀土永磁材料中钕铁硼性能最强，新能源车单车用量2-3公斤，中国产量占全球九成", parentId: 703, stockCount: 3, childCount: 0, stocks: [
      { id: 70019, name: "北方稀土", code: "600111.SH", tag: "轻稀土龙头，冶炼分离产能12万吨，配额占比60%", description: "北方稀土（600111.SH）是稀土永磁材料领域的代表性上市公司，轻稀土龙头，冶炼分离产能12万吨，配额占比60%，在产业链中占据重要位置。" },
      { id: 70020, name: "金力永磁", code: "300748.SZ", tag: "高性能钕铁硼，新能源车用占比60%，晶界渗透技术领先", description: "金力永磁（300748.SZ）是稀土永磁材料领域的代表性上市公司，高性能钕铁硼，新能源车用占比60%，晶界渗透技术领先，在产业链中占据重要位置。" },
      { id: 70021, name: "中科三环", code: "000970.SZ", tag: "烧结钕铁硼龙头，特斯拉核心供应商，产能2万吨", description: "中科三环（000970.SZ）是稀土永磁材料领域的代表性上市公司，烧结钕铁硼龙头，特斯拉核心供应商，产能2万吨，在产业链中占据重要位置。" },
    ]},
    { id: 70008, name: "高效电机", level: "upstream", description: "IE4/IE5超高效电机，稀土永磁同步电机效率可达96%+，工业电机存量替换空间巨大", plainLanguageDescription: "高效电机效率可达96%以上，工业电机存量替换市场空间巨大，IE4/IE5标准加速推广", parentId: 703, stockCount: 4, childCount: 0, stocks: [
      { id: 70022, name: "卧龙电驱", code: "600580.SH", tag: "高效电机龙头，市占率15%，新能源车电机放量", description: "卧龙电驱（600580.SH）是高效电机领域的代表性上市公司，高效电机龙头，市场占有率15%，新能源车电机放量，在产业链中占据重要位置。" },
      { id: 70023, name: "汇川技术", code: "300124.SZ", tag: "伺服电机龙头，工控市占率第一，新能源车电控核心", description: "汇川技术（300124.SZ）是高效电机领域的代表性上市公司，伺服电机龙头，工控市场占有率第一，新能源车电控核心，在产业链中占据重要位置。" },
      { id: 70024, name: "江特电机", code: "002176.SZ", tag: "特种电机specialist，锂云母提锂+电机双主业", description: "江特电机（002176.SZ）是高效电机领域的代表性上市公司，特种电机专业供应商，锂云母提锂+电机双主业，在产业链中占据重要位置。" },
    ]},
  ],
  704: [
    { id: 70009, name: "电力变压器", level: "midstream", description: "110kV-1000kV电力变压器，特高压单台价值1亿+，非晶合金变压器空载损耗降低70%", plainLanguageDescription: "电力变压器从110kV到1000kV，特高压单台价值过亿，非晶合金变压器空载损耗降低七成", parentId: 704, stockCount: 3, childCount: 0, stocks: [
      { id: 70025, name: "特变电工", code: "600089.SH", tag: "变压器全球龙头，特高压市占率35%，±1100kV技术领先", description: "特变电工（600089.SH）是电力变压器领域的代表性上市公司，变压器全球龙头，特高压市场占有率35%，±1100kV技术领先，在产业链中占据重要位置。" },
      { id: 70026, name: "中国西电", code: "601179.SH", tag: "高压开关+变压器，国网中标前三，特高压全套设备", description: "中国西电（601179.SH）是电力变压器领域的代表性上市公司，高压开关+变压器，国网中标前三，特高压全套设备，在产业链中占据重要位置。" },
      { id: 70027, name: "保变电气", code: "600550.SH", tag: "特高压变压器specialist，国网特高压中标常客", description: "保变电气（600550.SH）是电力变压器领域的代表性上市公司，特高压变压器专业供应商，国网特高压中标常客，在产业链中占据重要位置。" },
    ]},
    { id: 70010, name: "干式变压器/配电变", level: "midstream", description: "环氧树脂浇注干式变压器，配电变压器节能替换周期10年，S13/S15高效替代加速", plainLanguageDescription: "干式变压器用环氧树脂浇注，配电变压器节能替换周期10年，高效替代加速", parentId: 704, stockCount: 4, childCount: 0, stocks: [
      { id: 70028, name: "金盘科技", code: "688676.SH", tag: "干式变压器龙头，海风配套占比高，数字化工厂降本", description: "金盘科技（688676.SH）是干式变压器/配电变领域的代表性上市公司，干式变压器龙头，海风配套占比高，数字化工厂降本，在产业链中占据重要位置。" },
      { id: 70029, name: "三变科技", code: "002112.SZ", tag: "配电变压器specialist，光伏升压变+储能变放量", description: "三变科技（002112.SZ）是干式变压器/配电变领域的代表性上市公司，配电变压器专业供应商，光伏升压变+储能变放量，在产业链中占据重要位置。" },
      { id: 70030, name: "顺钠股份", code: "000533.SZ", tag: "配电变压器，南网市场领先，非晶合金变specialist", description: "顺钠股份（000533.SZ）是干式变压器/配电变领域的代表性上市公司，配电变压器，南网市场领先，非晶合金变专业供应商，在产业链中占据重要位置。" },
    ]},
  ],
  705: [
    { id: 70011, name: "GIS组合电器", level: "midstream", description: "气体绝缘金属封闭开关设备，110kV-1000kV GIS，占地面积仅为敞开式1/10", plainLanguageDescription: "GIS组合电器把开关设备密封在金属壳内，占地面积仅为敞开式的十分之一", parentId: 705, stockCount: 3, childCount: 0, stocks: [
      { id: 70031, name: "平高电气", code: "600312.SH", tag: "GIS龙头，特高压GIS市占率40%，国网中标第一", description: "平高电气（600312.SH）是GIS组合电器领域的代表性上市公司，GIS龙头，特高压GIS市场占有率40%，国网中标第一，在产业链中占据重要位置。" },
      { id: 70032, name: "中国西电", code: "601179.SH", tag: "GIS+开关设备，电网核心供应商，海外EPC突破", description: "中国西电（601179.SH）是GIS组合电器领域的代表性上市公司，GIS+开关设备，电网核心供应商，海外EPC突破，在产业链中占据重要位置。" },
      { id: 70033, name: "思源电气", code: "002028.SZ", tag: "一次设备平台型公司，GIS增速快，海外占比30%", description: "思源电气（002028.SZ）是GIS组合电器领域的代表性上市公司，一次设备平台型公司，GIS增速快，海外占比30%，在产业链中占据重要位置。" },
    ]},
    { id: 70012, name: "断路器/隔离开关", level: "midstream", description: "高压断路器及隔离开关，真空断路器向40.5kV+发展，SF6替代技术成趋势", plainLanguageDescription: "断路器和隔离开关是电网的'保险丝'，真空断路器向40.5kV以上发展，SF6替代成趋势", parentId: 705, stockCount: 4, childCount: 0, stocks: [
      { id: 70034, name: "良信股份", code: "002706.SZ", tag: "低压电器龙头，新能源专用占比40%，毛利率40%", description: "良信股份（002706.SZ）是断路器/隔离开关领域的代表性上市公司，低压电器龙头，新能源专用占比40%，毛利率水平40%，在产业链中占据重要位置。" },
      { id: 70035, name: "正泰电器", code: "601877.SH", tag: "低压电器全球龙头，市占率18%，户用光伏协同", description: "正泰电器（601877.SH）是断路器/隔离开关领域的代表性上市公司，低压电器全球龙头，市场占有率18%，户用光伏协同，在产业链中占据重要位置。" },
      { id: 70036, name: "宏发股份", code: "600885.SH", tag: "继电器龙头，高压直流继电器市占率60%，新能源车核心", description: "宏发股份（600885.SH）是断路器/隔离开关领域的代表性上市公司，继电器龙头，高压直流继电器市场占有率60%，新能源车核心，在产业链中占据重要位置。" },
    ]},
  ],
  706: [
    { id: 70013, name: "高压电缆/海缆", level: "midstream", description: "500kV+高压电缆及海底电缆，海缆单公里价值500万+，500kV三芯海缆技术突破", plainLanguageDescription: "高压电缆和海缆是跨海输电和海上风电的'生命线'，500kV三芯海缆技术刚突破", parentId: 706, stockCount: 3, childCount: 0, stocks: [
      { id: 70037, name: "中天科技", code: "600522.SH", tag: "海缆+陆缆龙头，海缆市占率35%，500kV海缆量产", description: "中天科技（600522.SH）是高压电缆/海缆领域的代表性上市公司，海缆+陆缆龙头，海缆市场占有率35%，500kV海缆量产，在产业链中占据重要位置。" },
      { id: 70038, name: "远东股份", code: "600869.SH", tag: "智能缆网龙头，产能行业第一，特高压导线", description: "远东股份（600869.SH）是高压电缆/海缆领域的代表性上市公司，智能缆网龙头，产能行业第一，特高压导线，在产业链中占据重要位置。" },
      { id: 70039, name: "亨通光电", code: "600487.SH", tag: "光纤光缆+海缆，特高压导线，欧洲海缆市场突破", description: "亨通光电（600487.SH）是高压电缆/海缆领域的代表性上市公司，光纤光缆+海缆，特高压导线，欧洲海缆市场突破，在产业链中占据重要位置。" },
    ]},
    { id: 70014, name: "导线/架空线", level: "midstream", description: "特高压架空导线，高强铝合金导线导电率62.5%IACS，碳纤维复合芯导线轻量化", plainLanguageDescription: "架空导线是特高压输电的'空中走廊'，碳纤维复合芯导线让线路更轻、传输更远", parentId: 706, stockCount: 4, childCount: 0, stocks: [
      { id: 70040, name: "通光线缆", code: "300265.SZ", tag: "特高压导线specialist，碳纤维复合芯导线量产", description: "通光线缆（300265.SZ）是导线/架空线领域的代表性上市公司，特高压导线专业供应商，碳纤维复合芯导线量产，在产业链中占据重要位置。" },
      { id: 70041, name: "东方电缆", code: "603606.SH", tag: "海缆龙头，500kV海缆突破，海上风电海缆市占率40%", description: "东方电缆（603606.SH）是导线/架空线领域的代表性上市公司，海缆龙头，500kV海缆突破，海上风电海缆市场占有率40%，在产业链中占据重要位置。" },
      { id: 70042, name: "起帆电缆", code: "605222.SH", tag: "电线电缆全品类，产能80万吨，特高压导线+海缆", description: "起帆电缆（605222.SH）是导线/架空线领域的代表性上市公司，电线电缆全品类，产能80万吨，特高压导线+海缆，在产业链中占据重要位置。" },
    ]},
  ],
  707: [
    { id: 70015, name: "智能电表", level: "midstream", description: "IR46标准智能电能表，年招标量9000万只，2024-2025年更换高峰期，单价200-300元", plainLanguageDescription: "智能电表年招标量9000万只，IR46新标准2024-2025年迎来更换高峰", parentId: 707, stockCount: 3, childCount: 0, stocks: [
      { id: 70043, name: "海兴电力", code: "603556.SH", tag: "智能电表出口龙头，海外市占率15%，亚非拉市场领先", description: "海兴电力（603556.SH）是智能电表领域的代表性上市公司，智能电表出口龙头，海外市场占有率15%，亚非拉市场领先，在产业链中占据重要位置。" },
      { id: 70044, name: "炬华科技", code: "300306.SZ", tag: "国网智能电表中标前三，IR46标准表量产，毛利率40%", description: "炬华科技（300306.SZ）是智能电表领域的代表性上市公司，国网智能电表中标前三，IR46标准表量产，毛利率水平40%，在产业链中占据重要位置。" },
      { id: 70045, name: "友讯达", code: "300514.SZ", tag: "智能电表+通信模块，HPLC载波通信，南网中标增长", description: "友讯达（300514.SZ）是智能电表领域的代表性上市公司，智能电表+通信模块，HPLC载波通信，南网中标增长，在产业链中占据重要位置。" },
    ]},
    { id: 70016, name: "用电信息采集", level: "midstream", description: "用电信息采集系统、电力线载波通信，HPLC双模通信渗透率提升至80%", plainLanguageDescription: "用电信息采集系统实现远程抄表和负荷监测，HPLC双模通信渗透率提升至八成", parentId: 707, stockCount: 4, childCount: 0, stocks: [
      { id: 70046, name: "威胜信息", code: "688100.SH", tag: "用电信息采集龙头，市占率25%，海外AMI系统出海", description: "威胜信息（688100.SH）是用电信息采集领域的代表性上市公司，用电信息采集龙头，市场占有率25%，海外AMI系统出海，在产业链中占据重要位置。" },
      { id: 70047, name: "东软载波", code: "300183.SZ", tag: "电力线载波通信龙头，HPLC芯片市占率30%", description: "东软载波（300183.SZ）是用电信息采集领域的代表性上市公司，电力线载波通信龙头，HPLC芯片市场占有率30%，在产业链中占据重要位置。" },
      { id: 70048, name: "鼎信通讯", code: "603421.SH", tag: "载波通信+智能电表，配电网故障指示器市占率第一", description: "鼎信通讯（603421.SH）是用电信息采集领域的代表性上市公司，载波通信+智能电表，配电网故障指示器市场占有率第一，在产业链中占据重要位置。" },
    ]},
  ],
  708: [
    { id: 70017, name: "SVG/STATCOM", level: "midstream", description: "静止无功发生器，新能源并网必备，35kV直挂式SVG单机容量100Mvar+", plainLanguageDescription: "SVG静止无功发生器是新能源并网的'稳压器'，35kV直挂式单机容量超100Mvar", parentId: 708, stockCount: 3, childCount: 0, stocks: [
      { id: 70049, name: "思源电气", code: "002028.SZ", tag: "SVG无功补偿龙头，新能源配套占比60%，海外增速50%", description: "思源电气（002028.SZ）是SVG/STATCOM领域的代表性上市公司，SVG无功补偿龙头，新能源配套占比60%，海外增速50%，在产业链中占据重要位置。" },
      { id: 70050, name: "新风光", code: "688663.SH", tag: "高压SVG specialist，市占率15%，储能PCS协同", description: "新风光（688663.SH）是SVG/STATCOM领域的代表性上市公司，高压SVG 专业供应商，市场占有率15%，储能PCS协同，在产业链中占据重要位置。" },
      { id: 70051, name: "禾望电气", code: "603063.SH", tag: "风电变流器+SVG，新能源配套，海上风电变流器突破", description: "禾望电气（603063.SH）是SVG/STATCOM领域的代表性上市公司，风电变流器+SVG，新能源配套，海上风电变流器突破，在产业链中占据重要位置。" },
    ]},
    { id: 70018, name: "电容器", level: "midstream", description: "薄膜电容及电力电容器，新能源车DC-Link薄膜电容替代铝电解，寿命提升10倍", plainLanguageDescription: "电容器用于无功补偿和滤波，薄膜电容正替代铝电解电容，寿命提升10倍", parentId: 708, stockCount: 4, childCount: 0, stocks: [
      { id: 70052, name: "法拉电子", code: "600563.SH", tag: "薄膜电容龙头，新能源车用占比40%，光伏风电配套", description: "法拉电子（600563.SH）是电容器领域的代表性上市公司，薄膜电容龙头，新能源车用占比40%，光伏风电配套，在产业链中占据重要位置。" },
      { id: 70053, name: "江海股份", code: "002484.SZ", tag: "铝电解电容龙头，超级电容放量，风电变桨系统配套", description: "江海股份（002484.SZ）是电容器领域的代表性上市公司，铝电解电容龙头，超级电容放量，风电变桨系统配套，在产业链中占据重要位置。" },
      { id: 70054, name: "艾华集团", code: "603989.SH", tag: "铝电解电容龙头，照明+工业+新能源车三驱", description: "艾华集团（603989.SH）是电容器领域的代表性上市公司，铝电解电容龙头，照明+工业+新能源车三驱，在产业链中占据重要位置。" },
    ]},
  ],
  709: [
    { id: 70019, name: "换流阀", level: "midstream", description: "特高压直流输电核心设备，单阀厅价值10亿+，IGBT/晶闸管为核心器件，国产替代加速", plainLanguageDescription: "换流阀是特高压直流输电的'心脏'，单阀厅价值超10亿，IGBT国产替代加速", parentId: 709, stockCount: 3, childCount: 0, stocks: [
      { id: 70055, name: "国电南瑞", code: "600406.SH", tag: "换流阀绝对龙头，市占率80%，IGBT模块自研突破", description: "国电南瑞（600406.SH）是换流阀领域的代表性上市公司，换流阀绝对龙头，市场占有率80%，IGBT模块自研突破，在产业链中占据重要位置。" },
      { id: 70056, name: "中国西电", code: "601179.SH", tag: "换流阀+直流场设备，特高压全套设备供应商", description: "中国西电（601179.SH）是换流阀领域的代表性上市公司，换流阀+直流场设备，特高压全套设备供应商，在产业链中占据重要位置。" },
      { id: 70057, name: "许继电气", code: "000400.SZ", tag: "换流阀specialist，市占率40%，直流控制保护系统", description: "许继电气（000400.SZ）是换流阀领域的代表性上市公司，换流阀专业供应商，市场占有率40%，直流控制保护系统，在产业链中占据重要位置。" },
    ]},
    { id: 70020, name: "直流穿墙套管", level: "midstream", description: "特高压直流穿墙套管，±800kV/±1100kV直流套管，复合套管替代瓷套管趋势", plainLanguageDescription: "直流穿墙套管是特高压换流站的'咽喉'，±1100kV复合套管技术壁垒极高", parentId: 709, stockCount: 4, childCount: 0, stocks: [
      { id: 70058, name: "神马电力", code: "603530.SH", tag: "复合套管龙头，特高压市占率60%，±1100kV突破", description: "神马电力（603530.SH）是直流穿墙套管领域的代表性上市公司，复合套管龙头，特高压市场占有率60%，±1100kV突破，在产业链中占据重要位置。" },
      { id: 70059, name: "中国西电", code: "601179.SH", tag: "套管+开关设备，特高压全套设备，套管specialist", description: "中国西电（601179.SH）是直流穿墙套管领域的代表性上市公司，套管+开关设备，特高压全套设备，套管专业供应商，在产业链中占据重要位置。" },
      { id: 70060, name: "抚顺电瓷", code: "未上市", tag: "瓷套管传统龙头，复合套管转型中", description: "抚顺电瓷是直流穿墙套管领域的重要企业，瓷套管传统龙头，复合套管转型中，目前尚未在A股上市。" },
    ]},
  ],
  710: [
    { id: 70021, name: "电网工程EPC", level: "downstream", description: "输变电工程总承包，特高压线路单公里投资2000万+，十四五电网投资超3万亿", plainLanguageDescription: "电网工程EPC是输变电工程总承包，特高压线路单公里投资超2000万", parentId: 710, stockCount: 3, childCount: 0, stocks: [
      { id: 70061, name: "中国电建", code: "601669.SH", tag: "电力工程EPC龙头，全球第一，抽水蓄能+电网双驱", description: "中国电建（601669.SH）是电网工程EPC领域的代表性上市公司，电力工程EPC龙头，全球第一，抽水蓄能+电网双驱，在产业链中占据重要位置。" },
      { id: 70062, name: "中国能建", code: "601868.SH", tag: "电网工程+新能源EPC，特高压设计市占率50%", description: "中国能建（601868.SH）是电网工程EPC领域的代表性上市公司，电网工程+新能源EPC，特高压设计市场占有率50%，在产业链中占据重要位置。" },
      { id: 70063, name: "永福股份", code: "300712.SZ", tag: "电力设计specialist，海上风电设计市占率第一", description: "永福股份（300712.SZ）是电网工程EPC领域的代表性上市公司，电力设计专业供应商，海上风电设计市场占有率第一，在产业链中占据重要位置。" },
    ]},
    { id: 70022, name: "电网智能运维", level: "downstream", description: "电力巡检机器人、无人机巡检、在线监测，智能运维替代人工巡检，效率提升5倍", plainLanguageDescription: "电网智能运维用机器人和无人机替代人工巡检，效率提升5倍还能避免人员危险", parentId: 710, stockCount: 4, childCount: 0, stocks: [
      { id: 70064, name: "申昊科技", code: "300853.SZ", tag: "电力巡检机器人龙头，轨交+电网双轮，市占率30%", description: "申昊科技（300853.SZ）是电网智能运维领域的代表性上市公司，电力巡检机器人龙头，轨交+电网双轮，市场占有率30%，在产业链中占据重要位置。" },
      { id: 70065, name: "亿嘉和", code: "603666.SH", tag: "电力特种机器人specialist，室外巡检机器人市占率25%", description: "亿嘉和（603666.SH）是电网智能运维领域的代表性上市公司，电力特种机器人专业供应商，室外巡检机器人市场占有率25%，在产业链中占据重要位置。" },
      { id: 70066, name: "红相股份", code: "300427.SZ", tag: "电力设备状态监测，局放检测技术领先，军工协同", description: "红相股份（300427.SZ）是电网智能运维领域的代表性上市公司，电力设备状态监测，局放检测技术领先，军工协同，在产业链中占据重要位置。" },
    ]},
  ],
  711: [
    { id: 70023, name: "一二次融合设备", level: "downstream", description: "配电自动化一二次融合开关，DTU/FTU终端，馈线自动化覆盖率目标90%", plainLanguageDescription: "一二次融合设备把测量和保护合二为一，馈线自动化覆盖率目标九成", parentId: 711, stockCount: 3, childCount: 0, stocks: [
      { id: 70067, name: "科陆电子", code: "002121.SZ", tag: "配电自动化设备，储能+电网双驱，美的集团入主", description: "科陆电子（002121.SZ）是一二次融合设备领域的代表性上市公司，配电自动化设备，储能+电网双驱，美的集团入主，在产业链中占据重要位置。" },
      { id: 70068, name: "许继电气", code: "000400.SZ", tag: "配电网保护+自动化，一二次融合开关市占率前三", description: "许继电气（000400.SZ）是一二次融合设备领域的代表性上市公司，配电网保护+自动化，一二次融合开关市场占有率前三，在产业链中占据重要位置。" },
      { id: 70069, name: "国电南自", code: "600268.SH", tag: "配网自动化specialist，国网系平台，继电保护龙头", description: "国电南自（600268.SH）是一二次融合设备领域的代表性上市公司，配网自动化专业供应商，国网系平台，继电保护龙头，在产业链中占据重要位置。" },
    ]},
    { id: 70024, name: "台区智能改造", level: "downstream", description: "配电变压器台区智能化改造，智能融合终端+低压监测单元，年改造量100万台+", plainLanguageDescription: "台区智能改造让配变台区装上'智慧大脑'，智能融合终端+低压监测单元全面覆盖", parentId: 711, stockCount: 4, childCount: 0, stocks: [
      { id: 70070, name: "威胜信息", code: "688100.SH", tag: "台区智能融合终端龙头，市占率30%，南网+国网双覆盖", description: "威胜信息（688100.SH）是台区智能改造领域的代表性上市公司，台区智能融合终端龙头，市场占有率30%，南网+国网双覆盖，在产业链中占据重要位置。" },
      { id: 70071, name: "友讯达", code: "300514.SZ", tag: "台区智能化解决方案，HPLC双模通信，台区线损监测", description: "友讯达（300514.SZ）是台区智能改造领域的代表性上市公司，台区智能化解决方案，HPLC双模通信，台区线损监测，在产业链中占据重要位置。" },
      { id: 70072, name: "万胜智能", code: "300882.SZ", tag: "智能电表+台区设备，国网中标增长，IR46标准表量产", description: "万胜智能（300882.SZ）是台区智能改造领域的代表性上市公司，智能电表+台区设备，国网中标增长，IR46标准表量产，在产业链中占据重要位置。" },
    ]},
  ],
  712: [
    { id: 70025, name: "充电桩设备", level: "downstream", description: "直流快充模块及充电桩整机，大功率快充向480kW+发展，液冷技术成趋势", plainLanguageDescription: "充电桩设备向480kW大功率快充发展，液冷技术让充电速度越来越快", parentId: 712, stockCount: 3, childCount: 0, stocks: [
      { id: 70073, name: "特锐德", code: "300001.SZ", tag: "充电桩运营龙头，运营量52万台，特来电子公司分拆", description: "特锐德（300001.SZ）是充电桩设备领域的代表性上市公司，充电桩运营龙头，运营量52万台，特来电子公司分拆，在产业链中占据重要位置。" },
      { id: 70074, name: "盛弘股份", code: "300693.SZ", tag: "充电桩设备specialist，直流快充模块，液冷超充突破", description: "盛弘股份（300693.SZ）是充电桩设备领域的代表性上市公司，充电桩设备专业供应商，直流快充模块，液冷超充突破，在产业链中占据重要位置。" },
      { id: 70075, name: "道通科技", code: "688208.SH", tag: "充电桩出海龙头，欧标认证，美国市场突破，毛利率45%", description: "道通科技（688208.SH）是充电桩设备领域的代表性上市公司，充电桩出海龙头，欧标认证，美国市场突破，毛利率水平45%，在产业链中占据重要位置。" },
    ]},
    { id: 70026, name: "虚拟电厂/V2G", level: "downstream", description: "虚拟电厂聚合运营及车网互动，聚合分布式资源参与电力市场交易，V2G技术示范", plainLanguageDescription: "虚拟电厂把分散的充电桩、储能、光伏聚合成一个'大电厂'，参与电力市场交易", parentId: 712, stockCount: 4, childCount: 0, stocks: [
      { id: 70076, name: "国网信通", code: "600131.SH", tag: "虚拟电厂平台建设，国网系核心，电力交易+负荷聚合", description: "国网信通（600131.SH）是虚拟电厂/V2G领域的代表性上市公司，虚拟电厂平台建设，国网系核心，电力交易+负荷聚合，在产业链中占据重要位置。" },
      { id: 70077, name: "恒实科技", code: "300513.SZ", tag: "虚拟电厂operator，深圳试点，聚合负荷超100MW", description: "恒实科技（300513.SZ）是虚拟电厂/V2G领域的代表性上市公司，虚拟电厂operator，深圳试点，聚合负荷超100MW，在产业链中占据重要位置。" },
      { id: 70078, name: "国能日新", code: "301162.SZ", tag: "新能源功率预测+虚拟电厂，电力交易辅助决策，市占率30%", description: "国能日新（301162.SZ）是虚拟电厂/V2G领域的代表性上市公司，新能源功率预测+虚拟电厂，电力交易辅助决策，市场占有率30%，在产业链中占据重要位置。" },
    ]},
  ],
};

// === 连接关系 ===
const connections = [
  // 上游→中游
  { id: 70001, fromNodeId: 70001, toNodeId: 70009, label: "硅钢材料供给" },
  { id: 70002, fromNodeId: 70003, toNodeId: 70013, label: "铜材料供给" },
  { id: 70003, fromNodeId: 70005, toNodeId: 70014, label: "绝缘材料供给" },
  { id: 70004, fromNodeId: 70007, toNodeId: 70008, label: "稀土材料供给" },
  { id: 70005, fromNodeId: 70003, toNodeId: 70010, label: "铜材料供给" },
  // 中游→中游
  { id: 70006, fromNodeId: 70009, toNodeId: 70011, label: "变压器配套" },
  { id: 70007, fromNodeId: 70011, toNodeId: 70013, label: "GIS配套" },
  { id: 70008, fromNodeId: 70013, toNodeId: 70015, label: "电缆配套" },
  { id: 70009, fromNodeId: 70017, toNodeId: 70011, label: "无功补偿配套" },
  { id: 70010, fromNodeId: 70019, toNodeId: 70020, label: "换流阀配套" },
  { id: 70011, fromNodeId: 70009, toNodeId: 70019, label: "变压器配套" },
  // 中游→下游
  { id: 70012, fromNodeId: 70019, toNodeId: 70021, label: "特高压工程" },
  { id: 70013, fromNodeId: 70011, toNodeId: 70021, label: "开关设备工程" },
  { id: 70014, fromNodeId: 70015, toNodeId: 70023, label: "计量设备供给" },
  { id: 70015, fromNodeId: 70017, toNodeId: 70024, label: "无功补偿改造" },
  { id: 70016, fromNodeId: 70021, toNodeId: 70022, label: "工程运维服务" },
  { id: 70017, fromNodeId: 70023, toNodeId: 70025, label: "配电设施供给" },
  { id: 70018, fromNodeId: 70024, toNodeId: 70026, label: "台区协同" },
  { id: 70019, fromNodeId: 70025, toNodeId: 70026, label: "V2G服务" },
  // 跨产业连接（电网设备→电力）
  { id: 70106, fromNodeId: 708, toNodeId: 609, label: "储能设备需求" },

  { id: 70100, fromNodeId: 704, toNodeId: 610, label: "变压器供给" },
  { id: 70101, fromNodeId: 705, toNodeId: 610, label: "开关设备供给" },
  { id: 70102, fromNodeId: 710, toNodeId: 610, label: "电网建设服务" },
  { id: 70103, fromNodeId: 712, toNodeId: 612, label: "充电设施供给" },
  // 跨产业连接（电网设备→半导体）
  { id: 70104, fromNodeId: 707, toNodeId: 8, label: "模拟芯片需求" },
  { id: 70105, fromNodeId: 709, toNodeId: 9, label: "逻辑芯片需求" },
  // 跨产业连接（电网设备→金属）
  { id: 70107, fromNodeId: 704, toNodeId: 80602, label: "电磁线采购" },
  { id: 70108, fromNodeId: 706, toNodeId: 80501, label: "铜材采购" },
];

// === 导出 ===
export const gridEquipmentData: IndustryData = {
  slug: "grid-equipment",
  name: "电网设备",
  icon: "Zap",
  description: "电网设备产业链涵盖硅钢/铜铝/绝缘材料上游、变压器/开关/电缆/智能电表中游制造、电网建设/配网改造/充电桩下游应用。",
  plainLanguageDescription: "电网设备就是电力系统的'骨架'，变压器、开关、电缆、电表等设备把电从发电厂安全送到工厂和家庭，是能源传输的物理基础。",
  rootNodes,
  childNodes,
  connections,
};
