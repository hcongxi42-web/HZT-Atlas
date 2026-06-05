// 电力产业链数据
// ID段：根节点 600-615，子节点 60001-60999，股票 60001-60999，连接 60001-60999

import type { IndustryData } from "./semiconductor";

// === 根节点 ===
const rootNodes = [
  // 上游
  { id: 600, name: "煤炭/天然气", level: "upstream", description: "火电核心燃料，煤炭占中国发电量60%+，动力煤长协价维持700-800元/吨区间", plainLanguageDescription: "煤炭和天然气是火电厂的'粮食'，煤炭占中国发电量六成以上，燃料价格直接影响发电成本", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 601, name: "核燃料/核电设备", level: "upstream", description: "核电站核心燃料铀矿及主设备，核级材料国产化率提升至60%+", plainLanguageDescription: "核燃料和核电设备是核电站的'心脏'，铀矿稀缺且进口依赖度高，核级材料要求极为严苛", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 602, name: "风电设备", level: "upstream", description: "风力发电机组及核心零部件，陆上风电度电成本降至0.15-0.25元，海上风电快速降本", plainLanguageDescription: "风电设备是捕获风能的'大风车'，风机越来越大、成本越来越低，已成为最便宜的清洁能源之一", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 603, name: "光伏设备", level: "upstream", description: "光伏发电核心设备及材料，硅料价格从30万/吨降至4-5万/吨，组件价格跌破1元/W", plainLanguageDescription: "光伏设备是把阳光变成电的'太阳能板'，硅料价格暴跌让光伏发电成本降到历史最低", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  // 中游
  { id: 604, name: "火力发电", level: "midstream", description: "燃煤/燃气发电，中国火电装机占比降至48%，但仍是基荷电源核心", plainLanguageDescription: "火力发电是中国电力的'顶梁柱'，虽然占比在下降，但仍是保障电网稳定的基荷电源", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 605, name: "水力发电", level: "midstream", description: "水电及抽水蓄能，中国水电装机4.2亿千瓦，抽水蓄能规划装机1.2亿千瓦", plainLanguageDescription: "水力发电是清洁能源的'老兵'，大坝蓄水发电稳定可靠，抽水蓄能还能帮电网'储能调峰'", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 606, name: "风力发电", level: "midstream", description: "陆上及海上风电运营，中国风电装机4.4亿千瓦，海上风电装机超40GW", plainLanguageDescription: "风力发电把自然界的风变成清洁电力，三北地区大基地和海上风电是两大主战场", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 607, name: "光伏发电", level: "midstream", description: "集中式及分布式光伏电站运营，中国光伏装机6亿千瓦，全球占比超40%", plainLanguageDescription: "光伏发电让家家户户屋顶都能发电，从沙漠戈壁到城市屋顶，阳光就是免费的能源", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 608, name: "核能发电", level: "midstream", description: "核电站运营及建设，中国核电装机5700万千瓦，在建规模全球第一", plainLanguageDescription: "核能发电是零碳基荷电源，单台机组年发电百亿度，是替代煤电的重要选项", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 609, name: "储能系统", level: "midstream", description: "电化学储能及抽水蓄能，新型储能装机超50GW，锂电储能成本降至0.5元/Wh", plainLanguageDescription: "储能系统是电网的'充电宝'，把富余的电存起来缺电时释放，解决风光发电不稳定的难题", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  // 下游
  { id: 610, name: "电网输配电", level: "downstream", description: "特高压输电及智能电网，特高压线路里程超4万公里，跨区输电能力3亿千瓦", plainLanguageDescription: "电网输配电是电力的'高速公路'，特高压能把电从西部送到东部，损耗极低", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 611, name: "电力交易/售电", level: "downstream", description: "电力市场化交易及综合能源服务，全国电力市场交易电量占比超60%", plainLanguageDescription: "电力交易是电力的'股票市场'，发电厂和用电企业自由买卖，价格由市场决定", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 612, name: "用电侧服务", level: "downstream", description: "工商业用电、充电桩及绿电消费，充电桩保有量超900万台，车桩比2.4:1", plainLanguageDescription: "用电侧服务覆盖充电桩、绿电消费等，电动车充电和工厂用绿电都属这个领域", parentId: null, stockCount: 1, childCount: 2, stocks: [] },
];

// === 子节点 ===
const childNodes: Record<number, any> = {
  600: [
    { id: 60001, name: "动力煤", level: "upstream", description: "火电主力燃料，长协机制保障电厂成本稳定，优质动力煤热值5500大卡以上", plainLanguageDescription: "动力煤是火电厂的主力燃料，长协机制让电厂成本相对稳定，避免煤价暴涨暴跌", parentId: 600, stockCount: 3, childCount: 0, stocks: [
      { id: 60001, name: "中国神华", code: "601088.SH", tag: "动力煤龙头，年产能3亿吨，长协占比80%，ROE 18%+", description: "中国神华（601088.SH）是动力煤领域的代表性上市公司，动力煤龙头，年产能3亿吨，长协占比80%，ROE 18%+，在产业链中占据重要位置。" },
      { id: 60002, name: "陕西煤业", code: "601225.SH", tag: "单井规模第一，吨煤成本行业最低仅140元", description: "陕西煤业（601225.SH）是动力煤领域的代表性上市公司，单井规模第一，吨煤成本行业最低仅140元，在产业链中占据重要位置。" },
      { id: 60003, name: "中煤能源", code: "601898.SH", tag: "煤炭+煤化工双轮，产能1.5亿吨，煤化工盈利占比提升", description: "中煤能源（601898.SH）是动力煤领域的代表性上市公司，煤炭+煤化工双轮，产能1.5亿吨，煤化工盈利占比提升，在产业链中占据重要位置。" },
    ]},
    { id: 60002, name: "焦煤", level: "upstream", description: "钢铁冶炼核心原料，优质主焦煤资源稀缺，进口依赖度超10%", plainLanguageDescription: "焦煤主要用于钢铁冶炼，优质主焦煤资源稀缺，进口依赖度超过一成", parentId: 600, stockCount: 3, childCount: 0, stocks: [
      { id: 60004, name: "山西焦煤", code: "000983.SZ", tag: "焦煤龙头，资源储量30亿吨，山西国企改革核心", description: "山西焦煤（000983.SZ）是焦煤领域的代表性上市公司，焦煤龙头，资源储量30亿吨，山西国企改革核心，在产业链中占据重要位置。" },
      { id: 60005, name: "潞安环能", code: "601699.SH", tag: "喷吹煤specialist，市占率35%，高炉喷吹替代焦炭", description: "潞安环能（601699.SH）是焦煤领域的代表性上市公司，喷吹煤专业供应商，市场占有率35%，高炉喷吹替代焦炭，在产业链中占据重要位置。" },
      { id: 60006, name: "淮北矿业", code: "600985.SH", tag: "焦煤+焦化一体化，产能1200万吨，甲醇配套", description: "淮北矿业（600985.SH）是焦煤领域的代表性上市公司，焦煤+焦化一体化，产能1200万吨，甲醇配套，在产业链中占据重要位置。" },
    ]},
    { id: 60003, name: "天然气/LNG", level: "upstream", description: "燃气发电及城市燃气气源，进口LNG占比超60%，长协价格与油价挂钩", plainLanguageDescription: "天然气发电碳排放只有煤电的一半，是调峰电源的主力，长三角和珠三角布局集中", parentId: 600, stockCount: 4, childCount: 0, stocks: [
      { id: 60007, name: "广汇能源", code: "600256.SH", tag: "民营LNG龙头，启东接收站周转量300万吨/年", description: "广汇能源（600256.SH）是天然气/LNG领域的代表性上市公司，民营LNG龙头，启东接收站周转量300万吨/年，在产业链中占据重要位置。" },
      { id: 60008, name: "新奥股份", code: "600803.SH", tag: "城燃+LNG贸易，舟山接收站二期投产，周转量500万吨", description: "新奥股份（600803.SH）是天然气/LNG领域的代表性上市公司，城燃+LNG贸易，舟山接收站二期投产，周转量500万吨，在产业链中占据重要位置。" },
      { id: 60009, name: "九丰能源", code: "605090.SH", tag: "LNG进口+LPG贸易，东莞接收站，民营LNG新锐", description: "九丰能源（605090.SH）是天然气/LNG领域的代表性上市公司，LNG进口+LPG贸易，东莞接收站，民营LNG新锐，在产业链中占据重要位置。" },
    ]},
  ],
  601: [
    { id: 60004, name: "铀矿/核燃料", level: "upstream", description: "核电站核心燃料，天然铀进口依赖度超80%，中广核/中核集团主导", plainLanguageDescription: "铀矿是核电站的燃料，国内资源有限，进口依赖度超过八成，中广核和中核集团主导供应", parentId: 601, stockCount: 3, childCount: 0, stocks: [
      { id: 60010, name: "中广核矿业", code: "01164.HK", tag: "铀资源开发，海外权益储量3万吨，中广核集团唯一上市平台", description: "中广核矿业（01164.HK）是铀矿/核燃料领域的代表性上市公司，铀资源开发，海外权益储量3万吨，中广核集团唯一上市平台，在产业链中占据重要位置。" },
      { id: 60011, name: "东方锆业", code: "002167.SZ", tag: "核级锆材，核燃料包壳材料，核级海绵锆国产替代", description: "东方锆业（002167.SZ）是铀矿/核燃料领域的代表性上市公司，核级锆材，核燃料包壳材料，核级海绵锆国产替代，在产业链中占据重要位置。" },
      { id: 60012, name: "中核科技", code: "000777.SZ", tag: "核级阀门龙头，国产化率提升，三代核电AP1000配套", description: "中核科技（000777.SZ）是铀矿/核燃料领域的代表性上市公司，核级阀门龙头，国产化率提升，三代核电AP1000配套，在产业链中占据重要位置。" },
    ]},
    { id: 60005, name: "核电主设备", level: "upstream", description: "核岛/常规岛核心设备，蒸汽发生器、压力容器等，单台机组设备投资超100亿", plainLanguageDescription: "核电主设备包括蒸汽发生器、压力容器等，单台机组设备投资超百亿，技术门槛极高", parentId: 601, stockCount: 3, childCount: 0, stocks: [
      { id: 60013, name: "上海电气", code: "601727.SH", tag: "核岛主设备龙头，蒸汽发生器市占率60%，CAP1400核心供应商", description: "上海电气（601727.SH）是核电主设备领域的代表性上市公司，核岛主设备龙头，蒸汽发生器市场占有率60%，CAP1400核心供应商，在产业链中占据重要位置。" },
      { id: 60014, name: "东方电气", code: "600875.SH", tag: "核电汽轮发电机组龙头，核岛+常规岛双布局", description: "东方电气（600875.SH）是核电主设备领域的代表性上市公司，核电汽轮发电机组龙头，核岛+常规岛双布局，在产业链中占据重要位置。" },
      { id: 60015, name: "中国一重", code: "601106.SH", tag: "核反应堆压力容器，三代核电锻件垄断地位", description: "中国一重（601106.SH）是核电主设备领域的代表性上市公司，核反应堆压力容器，三代核电锻件垄断地位，在产业链中占据重要位置。" },
    ]},
    { id: 60006, name: "核级材料", level: "upstream", description: "核级钛材、不锈钢、密封件等，材料级要求极高，国产替代持续推进", plainLanguageDescription: "核级材料包括钛材、不锈钢等，在强辐射环境下工作，国产替代正在加速推进", parentId: 601, stockCount: 4, childCount: 0, stocks: [
      { id: 60016, name: "宝钛股份", code: "600456.SH", tag: "核级钛材龙头，国产替代率60%，航空航天+核电双驱", description: "宝钛股份（600456.SH）是核级材料领域的代表性上市公司，核级钛材龙头，国产替代率60%，航空航天+核电双驱，在产业链中占据重要位置。" },
      { id: 60017, name: "西部超导", code: "688122.SH", tag: "超导线材龙头，ITER项目供应商，核聚变材料前瞻布局", description: "西部超导（688122.SH）是核级材料领域的代表性上市公司，超导线材龙头，ITER项目供应商，核聚变材料前瞻布局，在产业链中占据重要位置。" },
      { id: 60018, name: "应流股份", code: "603308.SH", tag: "核级铸件+航空叶片，核一级泵阀铸件市占率30%", description: "应流股份（603308.SH）是核级材料领域的代表性上市公司，核级铸件+航空叶片，核一级泵阀铸件市场占有率30%，在产业链中占据重要位置。" },
    ]},
  ],
  602: [
    { id: 60007, name: "风机整机", level: "upstream", description: "风力发电机组，陆上风机大型化至6-10MW，海上风机突破16-18MW", plainLanguageDescription: "风机整机是风力发电的'大风车'，陆上风机已发展到6-10MW，海上突破16-18MW", parentId: 602, stockCount: 3, childCount: 0, stocks: [
      { id: 60019, name: "金风科技", code: "002202.SZ", tag: "风机整机龙头，市占率28%，直驱永磁技术路线标杆", description: "金风科技（002202.SZ）是风机整机领域的代表性上市公司，风机整机龙头，市场占有率28%，直驱永磁技术路线标杆，在产业链中占据重要位置。" },
      { id: 60020, name: "明阳智能", code: "601615.SH", tag: "海上风机领先，16MW机组量产，半直驱技术降本显著", description: "明阳智能（601615.SH）是风机整机领域的代表性上市公司，海上风机领先，16MW机组量产，半直驱技术降本显著，在产业链中占据重要位置。" },
      { id: 60021, name: "运达股份", code: "300772.SZ", tag: "陆上风机新锐，市占率12%，成本控制能力行业前三", description: "运达股份（300772.SZ）是风机整机领域的代表性上市公司，陆上风机新锐，市场占有率12%，成本控制能力行业前三，在产业链中占据重要位置。" },
    ]},
    { id: 60008, name: "风机零部件", level: "upstream", description: "风电轴承、叶片、齿轮箱等核心部件，大型化趋势下价值量占比提升", plainLanguageDescription: "风机零部件包括轴承、叶片、齿轮箱，风机越大这些零件越值钱", parentId: 602, stockCount: 3, childCount: 0, stocks: [
      { id: 60022, name: "日月股份", code: "603218.SH", tag: "风电铸件龙头，全球市占率25%，20MW+铸件量产", description: "日月股份（603218.SH）是风机零部件领域的代表性上市公司，风电铸件龙头，全球市场占有率25%，20MW+铸件量产，在产业链中占据重要位置。" },
      { id: 60023, name: "新强联", code: "300850.SZ", tag: "风电轴承龙头，3MW以上主轴承国产替代，毛利率35%", description: "新强联（300850.SZ）是风机零部件领域的代表性上市公司，风电轴承龙头，3MW以上主轴承国产替代，毛利率水平35%，在产业链中占据重要位置。" },
      { id: 60024, name: "中材科技", code: "002080.SZ", tag: "风电叶片龙头，市占率30%，100米+叶片量产能力", description: "中材科技（002080.SZ）是风机零部件领域的代表性上市公司，风电叶片龙头，市场占有率30%，100米+叶片量产能力，在产业链中占据重要位置。" },
    ]},
    { id: 60009, name: "塔筒/桩基", level: "upstream", description: "风电塔筒及海上风电基础结构，海上桩基单GW价值量5-8亿元", plainLanguageDescription: "塔筒和桩基是风机的'支柱'，海上风电的桩基单GW价值量高达5-8亿元", parentId: 602, stockCount: 4, childCount: 0, stocks: [
      { id: 60025, name: "天顺风能", code: "002531.SZ", tag: "风电塔筒龙头，产能80万吨，海工基地布局完善", description: "天顺风能（002531.SZ）是塔筒/桩基领域的代表性上市公司，风电塔筒龙头，产能80万吨，海工基地布局完善，在产业链中占据重要位置。" },
      { id: 60026, name: "大金重工", code: "002487.SZ", tag: "海工基础龙头，欧洲出口占比40%，单桩产能行业第一", description: "大金重工（002487.SZ）是塔筒/桩基领域的代表性上市公司，海工基础龙头，欧洲出口占比40%，单桩产能行业第一，在产业链中占据重要位置。" },
      { id: 60027, name: "海力风电", code: "301155.SZ", tag: "海上风电桩基specialist，江苏基地辐射海风核心区", description: "海力风电（301155.SZ）是塔筒/桩基领域的代表性上市公司，海上风电桩基专业供应商，江苏基地辐射海风核心区，在产业链中占据重要位置。" },
    ]},
  ],
  603: [
    { id: 60010, name: "硅料/硅片", level: "upstream", description: "光伏最上游材料，多晶硅纯度要求6N+，N型硅片占比提升至40%+", plainLanguageDescription: "硅料和硅片是光伏最上游，多晶硅纯度要求极高，N型硅片正逐步替代传统P型", parentId: 603, stockCount: 3, childCount: 0, stocks: [
      { id: 60028, name: "通威股份", code: "600438.SH", tag: "硅料龙头，产能90万吨，市占率25%，成本行业最低", description: "通威股份（600438.SH）是硅料/硅片领域的代表性上市公司，硅料龙头，产能90万吨，市场占有率25%，成本行业最低，在产业链中占据重要位置。" },
      { id: 60029, name: "大全能源", code: "688303.SH", tag: "高纯多晶硅specialist，N型料占比提升，单晶料占比99%", description: "大全能源（688303.SH）是硅料/硅片领域的代表性上市公司，高纯多晶硅专业供应商，N型料占比提升，单晶料占比99%，在产业链中占据重要位置。" },
      { id: 60030, name: "TCL中环", code: "002129.SZ", tag: "硅片龙头，210大尺寸占比70%，G12技术路线引领者", description: "TCL中环（002129.SZ）是硅料/硅片领域的代表性上市公司，硅片龙头，210大尺寸占比70%，G12技术路线引领者，在产业链中占据重要位置。" },
    ]},
    { id: 60011, name: "电池片/组件", level: "upstream", description: "光伏核心制造环节，TOPCon成为主流，HJT/BC技术快速迭代，组件价格跌破1元/W", plainLanguageDescription: "电池片和组件是光伏核心制造环节，TOPCon已成主流，组件价格跌破一元每瓦", parentId: 603, stockCount: 3, childCount: 0, stocks: [
      { id: 60031, name: "隆基绿能", code: "601012.SH", tag: "一体化组件龙头，HPBC技术量产，组件出货全球前三", description: "隆基绿能（601012.SH）是电池片/组件领域的代表性上市公司，一体化组件龙头，HPBC技术量产，组件出货全球前三，在产业链中占据重要位置。" },
      { id: 60032, name: "晶科能源", code: "688223.SH", tag: "N型TOPCon组件出货全球第一，效率26%+，产能100GW", description: "晶科能源（688223.SH）是电池片/组件领域的代表性上市公司，N型TOPCon组件出货全球第一，效率26%+，产能100GW，在产业链中占据重要位置。" },
      { id: 60033, name: "天合光能", code: "688599.SH", tag: "210组件龙头，市占率15%，储能系统协同放量", description: "天合光能（688599.SH）是电池片/组件领域的代表性上市公司，210组件龙头，市场占有率15%，储能系统协同放量，在产业链中占据重要位置。" },
    ]},
    { id: 60012, name: "逆变器", level: "upstream", description: "光伏系统核心电力电子设备，组串式占比超70%，微型逆变器增速超50%", plainLanguageDescription: "逆变器是光伏系统的'大脑'，把直流电转成交流电，组串式占比已超过七成", parentId: 603, stockCount: 4, childCount: 0, stocks: [
      { id: 60034, name: "阳光电源", code: "300274.SZ", tag: "光伏逆变器全球龙头，市占率32%，储能PCS协同", description: "阳光电源（300274.SZ）是逆变器领域的代表性上市公司，光伏逆变器全球龙头，市场占有率32%，储能PCS协同，在产业链中占据重要位置。" },
      { id: 60035, name: "禾迈股份", code: "688032.SH", tag: "微型逆变器龙头，毛利率45%，欧洲户储市场领先", description: "禾迈股份（688032.SH）是逆变器领域的代表性上市公司，微型逆变器龙头，毛利率水平45%，欧洲户储市场领先，在产业链中占据重要位置。" },
      { id: 60036, name: "德业股份", code: "605117.SH", tag: "组串式逆变器新锐，储能逆变器放量，南非市场领先", description: "德业股份（605117.SH）是逆变器领域的代表性上市公司，组串式逆变器新锐，储能逆变器放量，南非市场领先，在产业链中占据重要位置。" },
    ]},
  ],
  604: [
    { id: 60013, name: "煤电", level: "midstream", description: "燃煤发电，中国火电装机13.5亿千瓦，煤电容量电价机制落地，盈利稳定性提升", plainLanguageDescription: "煤电是中国电力的主力军，容量电价机制让煤电盈利更稳定，不再只靠发电量赚钱", parentId: 604, stockCount: 4, childCount: 0, stocks: [
      { id: 60037, name: "华能国际", code: "600011.SH", tag: "火电装机龙头，装机106GW，煤价下行盈利修复弹性大", description: "华能国际（600011.SH）是煤电领域的代表性上市公司，火电装机龙头，装机106GW，煤价下行盈利修复弹性大，在产业链中占据重要位置。" },
      { id: 60038, name: "国电电力", code: "600795.SH", tag: "国家能源集团旗下，煤电+新能源双驱，水电资产优质", description: "国电电力（600795.SH）是煤电领域的代表性上市公司，国家能源集团旗下，煤电+新能源双驱，水电资产优质，在产业链中占据重要位置。" },
      { id: 60039, name: "大唐发电", code: "601991.SH", tag: "五大发电集团之一，装机70GW，绿电转型加速", description: "大唐发电（601991.SH）是煤电领域的代表性上市公司，五大发电集团之一，装机70GW，绿电转型加速，在产业链中占据重要位置。" },
      { id: 60040, name: "华电国际", code: "600027.SH", tag: "煤电盈利修复，绿电装机占比提升至30%", description: "华电国际（600027.SH）是煤电领域的代表性上市公司，煤电盈利修复，绿电装机占比提升至30%，在产业链中占据重要位置。" },
    ]},
    { id: 60014, name: "气电", level: "midstream", description: "燃气发电，调峰能力强，碳排放仅为煤电一半，长三角/珠三角布局集中", plainLanguageDescription: "气电调峰能力强、启动快，是电网应对用电高峰的'灵活选手'", parentId: 604, stockCount: 4, childCount: 0, stocks: [
      { id: 60041, name: "深圳能源", code: "000027.SZ", tag: "气电+垃圾发电，粤港澳大湾区核心，LNG接收站配套", description: "深圳能源（000027.SZ）是气电领域的代表性上市公司，气电+垃圾发电，粤港澳大湾区核心，LNG接收站配套，在产业链中占据重要位置。" },
      { id: 60042, name: "申能股份", code: "600642.SH", tag: "上海燃气发电龙头，LNG接收站周转量150万吨", description: "申能股份（600642.SH）是气电领域的代表性上市公司，上海燃气发电龙头，LNG接收站周转量150万吨，在产业链中占据重要位置。" },
      { id: 60043, name: "粤电力A", code: "000539.SZ", tag: "广东气电龙头，海上风电储备丰富，装机15GW", description: "粤电力A（000539.SZ）是气电领域的代表性上市公司，广东气电龙头，海上风电储备丰富，装机15GW，在产业链中占据重要位置。" },
    ]},
  ],
  605: [
    { id: 60015, name: "大型水电", level: "midstream", description: "流域梯级水电开发，长江电力六库联调，雅砻江/澜沧江优质资源", plainLanguageDescription: "大型水电靠大江大河的落差发电，长江电力六库联调是世界级的水电运营标杆", parentId: 605, stockCount: 3, childCount: 0, stocks: [
      { id: 60044, name: "长江电力", code: "600900.SH", tag: "水电绝对龙头，装机容量71.8GW，六库联调，股息率4%+", description: "长江电力（600900.SH）是大型水电领域的代表性上市公司，水电绝对龙头，装机容量71.8GW，六库联调，股息率4%+，在产业链中占据重要位置。" },
      { id: 60045, name: "华能水电", code: "600025.SH", tag: "澜沧江水电开发，装机26GW，西电东送核心", description: "华能水电（600025.SH）是大型水电领域的代表性上市公司，澜沧江水电开发，装机26GW，西电东送核心，在产业链中占据重要位置。" },
      { id: 60046, name: "国投电力", code: "600886.SH", tag: "雅砻江水电，两河口电站投产，全流域调节能力", description: "国投电力（600886.SH）是大型水电领域的代表性上市公司，雅砻江水电，两河口电站投产，全流域调节能力，在产业链中占据重要位置。" },
    ]},
    { id: 60016, name: "抽水蓄能", level: "midstream", description: "电力系统调节性电源，规划装机1.2亿千瓦，2025年在运装机超60GW", plainLanguageDescription: "抽水蓄能是电网的'大号充电宝'，用电低谷时抽水上山，高峰时放水发电", parentId: 605, stockCount: 4, childCount: 0, stocks: [
      { id: 60047, name: "南网储能", code: "600995.SH", tag: "抽水蓄能运营龙头，装机10GW，在建8GW", description: "南网储能（600995.SH）是抽水蓄能领域的代表性上市公司，抽水蓄能运营龙头，装机10GW，在建8GW，在产业链中占据重要位置。" },
      { id: 60048, name: "东方电气", code: "600875.SH", tag: "抽蓄机组设备龙头，市占率45%，400MW级机组突破", description: "东方电气（600875.SH）是抽水蓄能领域的代表性上市公司，抽蓄机组设备龙头，市场占有率45%，400MW级机组突破，在产业链中占据重要位置。" },
      { id: 60049, name: "浙富控股", code: "002266.SZ", tag: "抽蓄水轮机组specialist，订单增速100%+", description: "浙富控股（002266.SZ）是抽水蓄能领域的代表性上市公司，抽蓄水轮机组专业供应商，订单增速100%+，在产业链中占据重要位置。" },
    ]},
  ],
  606: [
    { id: 60017, name: "陆上风电", level: "midstream", description: "陆上风电场运营，三北地区大基地项目集中，度电成本降至0.15-0.20元", plainLanguageDescription: "陆上风电场主要分布在三北地区，度电成本已降到一毛五到两毛钱，比煤电还便宜", parentId: 606, stockCount: 3, childCount: 0, stocks: [
      { id: 60050, name: "龙源电力", code: "001289.SZ", tag: "风电运营龙头，装机31GW，国家能源集团新能源平台", description: "龙源电力（001289.SZ）是陆上风电领域的代表性上市公司，风电运营龙头，装机31GW，国家能源集团新能源平台，在产业链中占据重要位置。" },
      { id: 60051, name: "三峡能源", code: "600905.SH", tag: "海上风电新锐，装机16GW，三峡集团新能源核心", description: "三峡能源（600905.SH）是陆上风电领域的代表性上市公司，海上风电新锐，装机16GW，三峡集团新能源核心，在产业链中占据重要位置。" },
      { id: 60052, name: "中广核新能源", code: "01811.HK", tag: "风电+光伏运营，装机14GW，中广核新能源上市平台", description: "中广核新能源（01811.HK）是陆上风电领域的代表性上市公司，风电+光伏运营，装机14GW，中广核新能源上市平台，在产业链中占据重要位置。" },
    ]},
    { id: 60018, name: "海上风电", level: "midstream", description: "海上风电场开发运营，深远海漂浮式技术突破，广东/福建/江苏核心区域", plainLanguageDescription: "海上风电向深远海发展，广东、福建、江苏是核心区域，漂浮式技术正在突破", parentId: 606, stockCount: 4, childCount: 0, stocks: [
      { id: 60053, name: "华电重工", code: "601226.SH", tag: "海上风电EPC龙头，安装船+基础制造一体化", description: "华电重工（601226.SH）是海上风电领域的代表性上市公司，海上风电EPC龙头，安装船+基础制造一体化，在产业链中占据重要位置。" },
      { id: 60054, name: "中天科技", code: "600522.SH", tag: "海缆龙头，海上风电市占率35%，500kV海缆突破", description: "中天科技（600522.SH）是海上风电领域的代表性上市公司，海缆龙头，海上风电市场占有率35%，500kV海缆突破，在产业链中占据重要位置。" },
      { id: 60055, name: "亨通光电", code: "600487.SH", tag: "海缆+海工，海上风电全产业链，欧洲市场突破", description: "亨通光电（600487.SH）是海上风电领域的代表性上市公司，海缆+海工，海上风电全产业链，欧洲市场突破，在产业链中占据重要位置。" },
    ]},
  ],
  607: [
    { id: 60019, name: "集中式光伏", level: "midstream", description: "大型地面光伏电站，风光大基地规划超4.5亿千瓦，沙漠/戈壁/荒漠重点区域", plainLanguageDescription: "集中式光伏是大规模地面电站，沙漠戈壁荒漠变身'光伏海洋'，风光大基地规划超4.5亿千瓦", parentId: 607, stockCount: 3, childCount: 0, stocks: [
      { id: 60056, name: "太阳能", code: "000591.SZ", tag: "光伏电站运营龙头，装机10GW，中节能新能源平台", description: "太阳能（000591.SZ）是集中式光伏领域的代表性上市公司，光伏电站运营龙头，装机10GW，中节能新能源平台，在产业链中占据重要位置。" },
      { id: 60057, name: "晶科科技", code: "601778.SH", tag: "光伏电站开发+运营，海外项目丰富，中东市场领先", description: "晶科科技（601778.SH）是集中式光伏领域的代表性上市公司，光伏电站开发+运营，海外项目丰富，中东市场领先，在产业链中占据重要位置。" },
      { id: 60058, name: "正泰电器", code: "601877.SH", tag: "户用光伏龙头，装机超20GW，整县推进核心参与者", description: "正泰电器（601877.SH）是集中式光伏领域的代表性上市公司，户用光伏龙头，装机超20GW，整县推进核心参与者，在产业链中占据重要位置。" },
    ]},
    { id: 60020, name: "分布式光伏", level: "midstream", description: "工商业及户用分布式光伏，整县推进政策驱动，BIPV建筑一体化兴起", plainLanguageDescription: "分布式光伏建在屋顶和工商业厂房上，整县推进政策让千家万户都能'自发自用'", parentId: 607, stockCount: 4, childCount: 0, stocks: [
      { id: 60059, name: "隆基绿能", code: "601012.SH", tag: "分布式组件+BIPV，Hi-MO X6防积灰组件，市占率领先", description: "隆基绿能（601012.SH）是分布式光伏领域的代表性上市公司，分布式组件+BIPV，Hi-MO X6防积灰组件，市场占有率领先，在产业链中占据重要位置。" },
      { id: 60060, name: "天合光能", code: "688599.SH", tag: "分布式系统解决方案龙头，至尊小金刚系列", description: "天合光能（688599.SH）是分布式光伏领域的代表性上市公司，分布式系统解决方案龙头，至尊小金刚系列，在产业链中占据重要位置。" },
      { id: 60061, name: "晶澳科技", code: "002459.SZ", tag: "分布式组件出货前三，DeepBlue系列效率23%+", description: "晶澳科技（002459.SZ）是分布式光伏领域的代表性上市公司，分布式组件出货前三，DeepBlue系列效率23%+，在产业链中占据重要位置。" },
    ]},
  ],
  608: [
    { id: 60021, name: "核电运营", level: "midstream", description: "核电站商业运营，中国在运核电机组55台，核准节奏加快至每年10台", plainLanguageDescription: "核电运营是核电站的商业运行，中国在运机组55台，每年核准节奏加快到10台", parentId: 608, stockCount: 2, childCount: 0, stocks: [
      { id: 60062, name: "中国核电", code: "601985.SH", tag: "核电运营龙头，装机24GW，中核集团旗下核心平台", description: "中国核电（601985.SH）是核电运营领域的代表性上市公司，核电运营龙头，装机24GW，中核集团旗下核心平台，在产业链中占据重要位置。" },
      { id: 60063, name: "中国广核", code: "003816.SZ", tag: "中广核核电平台，装机29GW，全球第三大核电运营商", description: "中国广核（003816.SZ）是核电运营领域的代表性上市公司，中广核核电平台，装机29GW，全球第三大核电运营商，在产业链中占据重要位置。" },
    ]},
    { id: 60022, name: "核电建设", level: "midstream", description: "核电站工程建设及设备供应，单台三代核电机组投资200亿+，建设周期5-6年", plainLanguageDescription: "核电建设包括工程建设和设备供应，单台三代机组投资超200亿，建设周期5-6年", parentId: 608, stockCount: 3, childCount: 0, stocks: [
      { id: 60064, name: "中国核建", code: "601611.SH", tag: "核电工程建设龙头，市占率90%，华龙一号核心建设方", description: "中国核建（601611.SH）是核电建设领域的代表性上市公司，核电工程建设龙头，市场占有率90%，华龙一号核心建设方，在产业链中占据重要位置。" },
      { id: 60065, name: "中核科技", code: "000777.SZ", tag: "核级阀门龙头，国产化率提升，三代核电AP1000配套", description: "中核科技（000777.SZ）是核电建设领域的代表性上市公司，核级阀门龙头，国产化率提升，三代核电AP1000配套，在产业链中占据重要位置。" },
    ]},
  ],
  609: [
    { id: 60023, name: "电化学储能", level: "midstream", description: "锂电池储能系统，2025年新型储能装机目标50GW，锂电储能成本降至0.5元/Wh", plainLanguageDescription: "电化学储能主要是锂电池储能，成本已降到5毛钱每瓦时，正快速规模化部署", parentId: 609, stockCount: 3, childCount: 0, stocks: [
      { id: 60066, name: "宁德时代", code: "300750.SZ", tag: "储能电池全球龙头，市占率38%， EnerC集装箱系统量产", description: "宁德时代（300750.SZ）是电化学储能领域的代表性上市公司，储能电池全球龙头，市场占有率38%， EnerC集装箱系统量产，在产业链中占据重要位置。" },
      { id: 60067, name: "亿纬锂能", code: "300014.SZ", tag: "储能电池增速第一，产能100GWh，280Ah大电芯主流", description: "亿纬锂能（300014.SZ）是电化学储能领域的代表性上市公司，储能电池增速第一，产能100GWh，280Ah大电芯主流，在产业链中占据重要位置。" },
      { id: 60068, name: "鹏辉能源", code: "300438.SZ", tag: "储能电芯specialist，户储出货前三，314Ah电芯量产", description: "鹏辉能源（300438.SZ）是电化学储能领域的代表性上市公司，储能电芯专业供应商，户储出货前三，314Ah电芯量产，在产业链中占据重要位置。" },
    ]},
    { id: 60024, name: "抽水蓄能/压缩空气", level: "midstream", description: "机械储能技术，抽水蓄能占储能装机80%+，压缩空气储能商业化起步", plainLanguageDescription: "抽水蓄能和压缩空气储能是机械储能，抽蓄占储能装机八成以上，压缩空气储能商业化起步", parentId: 609, stockCount: 3, childCount: 0, stocks: [
      { id: 60069, name: "东方电气", code: "600875.SH", tag: "压缩空气储能设备，300MW级机组突破，效率70%", description: "东方电气（600875.SH）是抽水蓄能/压缩空气领域的代表性上市公司，压缩空气储能设备，300MW级机组突破，效率70%，在产业链中占据重要位置。" },
      { id: 60070, name: "陕鼓动力", code: "601369.SH", tag: "压缩空气储能核心设备，轴流压缩机市占率80%", description: "陕鼓动力（601369.SH）是抽水蓄能/压缩空气领域的代表性上市公司，压缩空气储能核心设备，轴流压缩机市场占有率80%，在产业链中占据重要位置。" },
      { id: 60071, name: "中国能建", code: "601868.SH", tag: "300MW压缩空气储能示范项目，湖北应城项目并网", description: "中国能建（601868.SH）是抽水蓄能/压缩空气领域的代表性上市公司，300MW压缩空气储能示范项目，湖北应城项目并网，在产业链中占据重要位置。" },
    ]},
    { id: 60025, name: "储能变流器PCS", level: "midstream", description: "储能系统核心电力电子设备，大功率PCS向2.5MW+发展，构网型技术成趋势", plainLanguageDescription: "储能变流器PCS是储能系统的'心脏'，大功率PCS向2.5MW以上发展，构网型技术成趋势", parentId: 609, stockCount: 4, childCount: 0, stocks: [
      { id: 60072, name: "阳光电源", code: "300274.SZ", tag: "储能PCS全球龙头，出货30GW，PowerTitan系统量产", description: "阳光电源（300274.SZ）是储能变流器PCS领域的代表性上市公司，储能PCS全球龙头，出货30GW，PowerTitan系统量产，在产业链中占据重要位置。" },
      { id: 60073, name: "上能电气", code: "300827.SZ", tag: "储能PCS specialist，毛利率25%，大功率PCS领先", description: "上能电气（300827.SZ）是储能变流器PCS领域的代表性上市公司，储能PCS 专业供应商，毛利率水平25%，大功率PCS领先，在产业链中占据重要位置。" },
      { id: 60074, name: "科华数据", code: "002335.SZ", tag: "储能PCS+系统集成，数据中心双驱，S³液冷系统", description: "科华数据（002335.SZ）是储能变流器PCS领域的代表性上市公司，储能PCS+系统集成，数据中心双驱，S³液冷系统，在产业链中占据重要位置。" },
    ]},
  ],
  610: [
    { id: 60026, name: "特高压输电", level: "downstream", description: "±800kV直流/1000kV交流输电，特高压线路里程超4万公里，跨区输电能力3亿千瓦", plainLanguageDescription: "特高压输电是±800kV直流和1000kV交流，能把电从新疆送到上海，损耗极低", parentId: 610, stockCount: 3, childCount: 0, stocks: [
      { id: 60075, name: "国电南瑞", code: "600406.SH", tag: "电网自动化龙头，特高压保护市占率80%，换流阀核心", description: "国电南瑞（600406.SH）是特高压输电领域的代表性上市公司，电网自动化龙头，特高压保护市场占有率80%，换流阀核心，在产业链中占据重要位置。" },
      { id: 60076, name: "特变电工", code: "600089.SH", tag: "特高压变压器龙头，市占率35%，±1100kV技术领先", description: "特变电工（600089.SH）是特高压输电领域的代表性上市公司，特高压变压器龙头，市场占有率35%，±1100kV技术领先，在产业链中占据重要位置。" },
      { id: 60077, name: "许继电气", code: "000400.SZ", tag: "直流输电设备，换流阀市占率40%，国网系核心", description: "许继电气（000400.SZ）是特高压输电领域的代表性上市公司，直流输电设备，换流阀市场占有率40%，国网系核心，在产业链中占据重要位置。" },
    ]},
    { id: 60027, name: "智能电网", level: "downstream", description: "配电网自动化、电力信息化、用电信息采集，配电物联网建设加速", plainLanguageDescription: "智能电网让配电网自动化运行，从用电信息采集到故障自愈，电网越来越'聪明'", parentId: 610, stockCount: 4, childCount: 0, stocks: [
      { id: 60078, name: "国网信通", code: "600131.SH", tag: "电力信息化龙头，国网系平台，虚拟电厂+电力交易", description: "国网信通（600131.SH）是智能电网领域的代表性上市公司，电力信息化龙头，国网系平台，虚拟电厂+电力交易，在产业链中占据重要位置。" },
      { id: 60079, name: "远光软件", code: "002063.SZ", tag: "电力ERP龙头，国网市占率90%，碳资产管理平台", description: "远光软件（002063.SZ）是智能电网领域的代表性上市公司，电力ERP龙头，国网市场占有率90%，碳资产管理平台，在产业链中占据重要位置。" },
      { id: 60080, name: "东方电子", code: "000682.SZ", tag: "配电网自动化，市占率20%，调度系统核心供应商", description: "东方电子（000682.SZ）是智能电网领域的代表性上市公司，配电网自动化，市场占有率20%，调度系统核心供应商，在产业链中占据重要位置。" },
    ]},
  ],
  611: [
    { id: 60028, name: "电力交易", level: "downstream", description: "电力现货/中长期交易，全国电力市场化交易电量占比超60%，现货市场全面推进", plainLanguageDescription: "电力交易市场让电像股票一样买卖，全国市场化交易电量占比已超过六成", parentId: 611, stockCount: 3, childCount: 0, stocks: [
      { id: 60081, name: "国网信通", code: "600131.SH", tag: "电力交易平台建设，北京电力交易中心技术支撑", description: "国网信通（600131.SH）是电力交易领域的代表性上市公司，电力交易平台建设，北京电力交易中心技术支撑，在产业链中占据重要位置。" },
      { id: 60082, name: "恒实科技", code: "300513.SZ", tag: "虚拟电厂operator，深圳试点，聚合负荷超100MW", description: "恒实科技（300513.SZ）是电力交易领域的代表性上市公司，虚拟电厂operator，深圳试点，聚合负荷超100MW，在产业链中占据重要位置。" },
      { id: 60083, name: "国能日新", code: "301162.SZ", tag: "新能源功率预测，市占率30%，电力交易辅助决策", description: "国能日新（301162.SZ）是电力交易领域的代表性上市公司，新能源功率预测，市场占有率30%，电力交易辅助决策，在产业链中占据重要位置。" },
    ]},
    { id: 60029, name: "综合能源服务", level: "downstream", description: "节能服务、分布式能源、合同能源管理，工商业用户能源成本优化需求增长", plainLanguageDescription: "综合能源服务帮企业优化用电成本，从节能改造到分布式能源，一站式能源管家", parentId: 611, stockCount: 4, childCount: 0, stocks: [
      { id: 60084, name: "南网能源", code: "003035.SZ", tag: "节能服务龙头，分布式光伏+储能，南网旗下核心平台", description: "南网能源（003035.SZ）是综合能源服务领域的代表性上市公司，节能服务龙头，分布式光伏+储能，南网旗下核心平台，在产业链中占据重要位置。" },
      { id: 60085, name: "涪陵电力", code: "600452.SH", tag: "配电网节能，国网旗下平台，节能资产并购持续", description: "涪陵电力（600452.SH）是综合能源服务领域的代表性上市公司，配电网节能，国网旗下平台，节能资产并购持续，在产业链中占据重要位置。" },
      { id: 60086, name: "芯能科技", code: "603105.SH", tag: "分布式光伏运营，自发自用比例80%+，IRR 12%", description: "芯能科技（603105.SH）是综合能源服务领域的代表性上市公司，分布式光伏运营，自发自用比例80%+，IRR 12%，在产业链中占据重要位置。" },
    ]},
  ],
  612: [
    { id: 60030, name: "充电桩", level: "downstream", description: "新能源汽车充电基础设施，充电桩保有量超900万台，直流快充占比提升至45%", plainLanguageDescription: "充电桩是电动车的'加油站'，全国保有量超900万台，直流快充越来越普及", parentId: 612, stockCount: 3, childCount: 0, stocks: [
      { id: 60087, name: "特锐德", code: "300001.SZ", tag: "充电桩运营龙头，运营量52万台，特来电子公司分拆", description: "特锐德（300001.SZ）是充电桩领域的代表性上市公司，充电桩运营龙头，运营量52万台，特来电子公司分拆，在产业链中占据重要位置。" },
      { id: 60088, name: "盛弘股份", code: "300693.SZ", tag: "充电桩设备specialist，直流快充模块，毛利率40%", description: "盛弘股份（300693.SZ）是充电桩领域的代表性上市公司，充电桩设备专业供应商，直流快充模块，毛利率水平40%，在产业链中占据重要位置。" },
      { id: 60089, name: "道通科技", code: "688208.SH", tag: "充电桩出海龙头，欧标认证，美国市场突破", description: "道通科技（688208.SH）是充电桩领域的代表性上市公司，充电桩出海龙头，欧标认证，美国市场突破，在产业链中占据重要位置。" },
    ]},
    { id: 60031, name: "绿电消费", level: "downstream", description: "绿色电力证书交易、企业100%绿电消费承诺，出口型企业绿电采购需求激增", plainLanguageDescription: "绿电消费让企业用上清洁电力，出口型企业为应对碳关税纷纷采购绿电", parentId: 612, stockCount: 4, childCount: 0, stocks: [
      { id: 60090, name: "金开新能", code: "600821.SH", tag: "绿电运营商，平价项目占比高，绿证交易增量", description: "金开新能（600821.SH）是绿电消费领域的代表性上市公司，绿电运营商，平价项目占比高，绿证交易增量，在产业链中占据重要位置。" },
      { id: 60091, name: "晶科科技", code: "601778.SH", tag: "绿电PPA签约，出口型企业客户，绿证+碳资产协同", description: "晶科科技（601778.SH）是绿电消费领域的代表性上市公司，绿电PPA签约，出口型企业客户，绿证+碳资产协同，在产业链中占据重要位置。" },
      { id: 60092, name: "太阳能", code: "000591.SZ", tag: "绿电运营龙头，CCER重启受益，碳资产价值重估", description: "太阳能（000591.SZ）是绿电消费领域的代表性上市公司，绿电运营龙头，CCER重启受益，碳资产价值重估，在产业链中占据重要位置。" },
    ]},
  ],
};

// === 连接关系 ===
const connections = [
  // 上游→中游
  { id: 60001, fromNodeId: 60001, toNodeId: 60013, label: "煤炭燃料供给" },
  { id: 60002, fromNodeId: 60003, toNodeId: 60014, label: "天然气燃料供给" },
  { id: 60003, fromNodeId: 60004, toNodeId: 60021, label: "核燃料供给" },
  { id: 60004, fromNodeId: 60007, toNodeId: 60017, label: "风机设备供给" },
  { id: 60005, fromNodeId: 60010, toNodeId: 60019, label: "组件供给" },
  { id: 60006, fromNodeId: 60011, toNodeId: 60020, label: "组件供给" },
  // 中游→中游
  { id: 60007, fromNodeId: 60013, toNodeId: 60026, label: "火电电力输送" },
  { id: 60008, fromNodeId: 60015, toNodeId: 60026, label: "水电电力输送" },
  { id: 60009, fromNodeId: 60017, toNodeId: 60026, label: "风电电力输送" },
  { id: 60010, fromNodeId: 60019, toNodeId: 60026, label: "光伏电力输送" },
  { id: 60011, fromNodeId: 60021, toNodeId: 60026, label: "核电电力输送" },
  { id: 60012, fromNodeId: 60023, toNodeId: 60019, label: "储能配套" },
  { id: 60013, fromNodeId: 60023, toNodeId: 60017, label: "储能配套" },
  { id: 60014, fromNodeId: 60016, toNodeId: 60023, label: "调峰服务" },
  // 中游→下游
  { id: 60015, fromNodeId: 60026, toNodeId: 60027, label: "电网智能化" },
  { id: 60016, fromNodeId: 60027, toNodeId: 60028, label: "交易服务" },
  { id: 60017, fromNodeId: 60027, toNodeId: 60030, label: "基础设施" },
  { id: 60018, fromNodeId: 60028, toNodeId: 60029, label: "能源服务" },
  { id: 60019, fromNodeId: 60019, toNodeId: 60031, label: "绿电供给" },
  { id: 60020, fromNodeId: 60017, toNodeId: 60031, label: "绿电供给" },
  // 跨产业连接（电力→电网设备）
  { id: 60100, fromNodeId: 610, toNodeId: 704, label: "电网设备需求" },
  { id: 60101, fromNodeId: 610, toNodeId: 705, label: "电网设备需求" },
  { id: 60102, fromNodeId: 610, toNodeId: 706, label: "电网设备需求" },
  { id: 60103, fromNodeId: 609, toNodeId: 708, label: "储能设备需求" },
  { id: 60104, fromNodeId: 612, toNodeId: 712, label: "充电设施需求" },
  // 跨产业连接（电力→半导体）
  { id: 60106, fromNodeId: 610, toNodeId: 90, label: "光通信设备需求" },

  { id: 60105, fromNodeId: 604, toNodeId: 7, label: "功率器件需求" },
  // 跨产业连接（电力→金属）
  { id: 60107, fromNodeId: 610, toNodeId: 80502, label: "电力销售" },
  { id: 60108, fromNodeId: 602, toNodeId: 80401, label: "钢材采购" },
];

// === 导出 ===
export const powerData: IndustryData = {
  slug: "power",
  name: "电力",
  icon: "Zap",
  description: "电力产业链涵盖煤炭/核燃料/风光设备上游、火电/水电/风电/光伏/核电/储能中游运营、电网输配电及用电侧服务下游。",
  plainLanguageDescription: "电力产业链就是从煤炭/风/光/核变成电，再通过高压线送到千家万户的全过程。发电、输电、用电三大环节缺一不可。",
  rootNodes,
  childNodes,
  connections,
};
