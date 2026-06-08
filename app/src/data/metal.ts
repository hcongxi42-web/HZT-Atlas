// 金属产业链数据
// ID段：根节点 800-807，子节点 80001-80999，股票 80001-80999，连接 80001-80999

import type { IndustryData, LocalNode, LocalConnection } from "./semiconductor";

// === 根节点 ===
const rootNodes: LocalNode[] = [
  // 上游
  { id: 800, name: "黑色金属矿产", level: "upstream", description: "铁矿石、锰矿、铬矿等黑色金属原矿开采，是钢铁冶炼的基础原料。中国铁矿石进口依赖度超80%【数据仅供参考】，澳洲、巴西为主要来源", plainLanguageDescription: "挖铁矿石和锰矿的地方，铁矿石是炼钢的'粮食'，但国内不够用，八成靠从澳大利亚和巴西进口", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 801, name: "有色金属矿产", level: "upstream", description: "铜矿、铝土矿、锌铅矿等有色金属原矿开采。铜矿全球集中度极高，智利/秘鲁占产量40%+【数据仅供参考】；铝土矿几内亚/澳大利亚/中国为主", plainLanguageDescription: "挖铜矿、铝土矿、锌矿的地方，这些矿产是电线电缆、铝合金门窗、电池的原材料", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 802, name: "稀有金属/稀土", level: "upstream", description: "稀土、钨、钼、锑、锡等战略性矿产资源。中国稀土储量占全球37%但供应了全球60%+【数据仅供参考】产量，钨/锑/锡资源禀赋全球领先", plainLanguageDescription: "稀土和钨钼锑锡这些'工业维生素'，用量不大但没有它们，高端制造和军工做不出来", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 803, name: "冶炼能源与辅料", level: "upstream", description: "焦炭、电力、耐火材料等冶炼辅助材料。冶炼是典型高耗能行业，电力成本占电解铝成本35%+，焦炭占生铁成本30%+【数据仅供参考】", plainLanguageDescription: "冶炼金属的'燃料和工具'，电和焦炭占炼钢炼铝成本的大头，能源价格一波动金属厂利润就跟着动", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  // 中游
  { id: 804, name: "黑色金属冶炼", level: "midstream", description: "生铁、粗钢、特种钢的冶炼生产。中国粗钢产量占全球54%【数据仅供参考】，长流程高炉+转炉为主（占90%）【数据仅供参考】，短流程电炉占比仅10%【数据仅供参考】", plainLanguageDescription: "把铁矿石烧成钢水再浇成钢锭的过程。中国产的钢占全球一半以上，但高端特种钢还得进口", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 805, name: "有色金属冶炼", level: "midstream", description: "电解铜、电解铝、锌铅镍等有色金属冶炼。电解铝吨电耗1.35万度，电力成本决定竞争力；电解铜冶炼费TC/RC为核心利润指标", plainLanguageDescription: "把矿石变成纯铜纯铝的过程。电解铝特别费电，一度电决定生死；炼铜靠收'加工费'赚钱", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 806, name: "金属加工与新材料", level: "midstream", description: "板材、管材、箔材、精密加工及合金新材料。金属加工是产业链价值提升的关键环节，电池铝箔/高温合金等高附加值产品毛利率超30%", plainLanguageDescription: "把钢锭铜锭压成钢板、铜管、铝箔，或者做成飞机用的高温合金。越往高端加工，利润越高", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  // 下游
  { id: 807, name: "建筑与基建", level: "downstream", description: "钢筋、钢结构、钢管等建筑用金属材料。建筑用钢占中国钢材消费55%+【数据仅供参考】，房地产和基建需求是钢铁行业的核心驱动力", plainLanguageDescription: "盖楼修桥用的钢筋和钢管，钢铁行业一半以上的产量被房地产和基建吃掉", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 808, name: "制造与新能源", level: "downstream", description: "汽车、电子电器、新能源等制造业用金属材料。新能源车单车用铝量150-200kg（比燃油车多30%），电池铝箔/锂/钴/镍需求爆发", plainLanguageDescription: "造汽车、手机、电池用的金属材料。新能源车比油车多用了三成的铝，电池里的锂镍钴需求涨得飞快", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
];

// === 子节点 ===
const childNodes: Record<number, LocalNode[]> = {
  800: [
    { id: 80001, name: "铁矿石", level: "upstream", description: "钢铁冶炼核心原料，中国进口依赖度超80%【数据仅供参考】，澳洲必和必拓/力拓/FMG占全球海运量70%+【数据仅供参考】", plainLanguageDescription: "炼钢的核心原料，像造房子的水泥一样不可或缺。国内铁矿品位差，八成靠从澳大利亚进口", parentId: 800, stockCount: 3, childCount: 0, stocks: [
      { id: 80001, name: "大中矿业", code: "001203.SZ", tag: "国内铁精粉龙头，内蒙古铁矿储量超5亿吨", description: "大中矿业（001203.SZ）是铁矿石领域的代表性上市公司，国内铁精粉龙头，内蒙古铁矿储量超5亿吨，在产业链中占据重要位置。" },
      { id: 80002, name: "海南矿业", code: "601969.SH", tag: "铁矿石+油气双轮，石碌铁矿国内领先", description: "海南矿业（601969.SH）是铁矿石领域的代表性上市公司，铁矿石+油气双轮，石碌铁矿国内领先，在产业链中占据重要位置。" },
      { id: 80003, name: "金岭矿业", code: "000655.SZ", tag: "淄博铁矿，国内老牌铁矿企业", description: "金岭矿业（000655.SZ）是铁矿石领域的代表性上市公司，淄博铁矿，国内老牌铁矿企业，在产业链中占据重要位置。" },
    ]},
    { id: 80002, name: "锰矿/铬矿", level: "upstream", description: "锰用于特种钢脱氧脱硫，铬用于不锈钢合金化。南非占全球锰矿产量40%【数据仅供参考】，印度/哈萨克斯坦/南非占铬矿产量70%+【数据仅供参考】", plainLanguageDescription: "锰和铬是炼特种钢的'调味料'，锰让钢更坚韧，铬让钢不生锈。南非是锰矿主产区", parentId: 800, stockCount: 3, childCount: 0, stocks: [
      { id: 80004, name: "南方锰业", code: "01091.HK", tag: "电解锰全球龙头，广西锰矿资源", description: "南方锰业（01091.HK）是锰矿/铬矿领域的代表性上市公司，电解锰全球龙头，广西锰矿资源，在产业链中占据重要位置。" },
      { id: 80005, name: "西藏矿业", code: "000762.SZ", tag: "铬铁矿+锂矿双轮，扎布耶盐湖锂资源", description: "西藏矿业（000762.SZ）是锰矿/铬矿领域的代表性上市公司，铬铁矿+锂矿双轮，扎布耶盐湖锂资源，在产业链中占据重要位置。" },
      { id: 80006, name: "湘潭电化", code: "002125.SZ", tag: "电解锰+锰酸锂，新能源材料转型", description: "湘潭电化（002125.SZ）是锰矿/铬矿领域的代表性上市公司，电解锰+锰酸锂，新能源材料转型，在产业链中占据重要位置。" },
    ]},
  ],
  801: [
    { id: 80101, name: "铜矿", level: "upstream", description: "铜矿全球集中度极高，智利/秘鲁/刚果金占产量50%+【数据仅供参考】。中国铜矿自给率不足20%【数据仅供参考】，进口依赖度极高", plainLanguageDescription: "挖铜矿石的地方，铜是电线电缆的'命根子'。国内铜矿不够，八成靠进口，智利和秘鲁是主要来源", parentId: 801, stockCount: 3, childCount: 0, stocks: [
      { id: 80101, name: "江西铜业", code: "600362.SH", tag: "铜矿龙头，阴极铜产能180万吨，德兴铜矿国内最大", description: "江西铜业（600362.SH）是铜矿领域的代表性上市公司，铜矿龙头，阴极铜产能180万吨，德兴铜矿国内最大，在产业链中占据重要位置。" },
      { id: 80102, name: "云南铜业", code: "000878.SZ", tag: "铜冶炼+铜矿，中铝集团旗下", description: "云南铜业（000878.SZ）是铜矿领域的代表性上市公司，铜冶炼+铜矿，中铝集团旗下，在产业链中占据重要位置。" },
      { id: 80103, name: "铜陵有色", code: "000630.SZ", tag: "铜冶炼+铜箔一体化，米拉多铜矿投产", description: "铜陵有色（000630.SZ）是铜矿领域的代表性上市公司，铜冶炼+铜箔一体化，米拉多铜矿投产，在产业链中占据重要位置。" },
    ]},
    { id: 80102, name: "铝土矿", level: "upstream", description: "铝土矿是电解铝的唯一原料，几内亚/澳大利亚/中国占全球产量75%【数据仅供参考】。中国铝土矿自给率约50%，进口依赖度持续上升", plainLanguageDescription: "挖铝土矿的地方，铝土矿是电解铝的唯一原料。几内亚的铝土矿品质最好，中国一半靠进口", parentId: 801, stockCount: 3, childCount: 0, stocks: [
      { id: 80104, name: "中国铝业", code: "601600.SH", tag: "铝土矿龙头，产能400万吨，几内亚Boffa项目", description: "中国铝业（601600.SH）是铝土矿领域的代表性上市公司，铝土矿龙头，产能400万吨，几内亚Boffa项目，在产业链中占据重要位置。" },
      { id: 80105, name: "云铝股份", code: "000807.SZ", tag: "水电铝specialist，碳排放仅为煤电铝1/5", description: "云铝股份（000807.SZ）是铝土矿领域的代表性上市公司，水电铝specialist，碳排放仅为煤电铝1/5，在产业链中占据重要位置。" },
      { id: 80106, name: "南山铝业", code: "600219.SH", tag: "高端铝材+铝土矿自给，印尼氧化铝项目", description: "南山铝业（600219.SH）是铝土矿领域的代表性上市公司，高端铝材+铝土矿自给，印尼氧化铝项目，在产业链中占据重要位置。" },
    ]},
    { id: 80103, name: "锌铅矿", level: "upstream", description: "锌用于镀锌钢板和电池，铅用于蓄电池。澳大利亚/中国/秘鲁占全球锌产量50%，中国/澳大利亚/美国占铅产量55%", plainLanguageDescription: "挖锌矿和铅矿的地方，锌用来给钢板防锈，铅主要做汽车电瓶。澳大利亚和中国是主产区", parentId: 801, stockCount: 3, childCount: 0, stocks: [
      { id: 80107, name: "驰宏锌锗", code: "600497.SH", tag: "锌铅锗综合，锗产量全球龙头", description: "驰宏锌锗（600497.SH）是锌铅矿领域的代表性上市公司，锌铅锗综合，锗产量全球龙头，在产业链中占据重要位置。" },
      { id: 80108, name: "中金岭南", code: "000060.SZ", tag: "铅锌铜综合，凡口铅锌矿国内领先", description: "中金岭南（000060.SZ）是锌铅矿领域的代表性上市公司，铅锌铜综合，凡口铅锌矿国内领先，在产业链中占据重要位置。" },
      { id: 80109, name: "锌业股份", code: "000751.SZ", tag: "锌冶炼specialist，葫芦岛锌厂", description: "锌业股份（000751.SZ）是锌铅矿领域的代表性上市公司，锌冶炼specialist，葫芦岛锌厂，在产业链中占据重要位置。" },
    ]},
  ],
  802: [
    { id: 80201, name: "稀土矿", level: "upstream", description: "稀土是17种金属元素的总称，被称为'工业维生素'。中国稀土储量占全球37%但供应了全球60%+【数据仅供参考】，轻稀土内蒙古/重稀土江西广东", plainLanguageDescription: "稀土是'工业维生素'，导弹、电动车电机、手机屏幕都离不开。中国产量占全球六成以上，是战略资源", parentId: 802, stockCount: 3, childCount: 0, stocks: [
      { id: 80201, name: "北方稀土", code: "600111.SH", tag: "轻稀土龙头，冶炼分离产能12万吨，配额占比60%", description: "北方稀土（600111.SH）是稀土矿领域的代表性上市公司，轻稀土龙头，冶炼分离产能12万吨，配额占比60%，在产业链中占据重要位置。" },
      { id: 80202, name: "中国稀土", code: "000831.SZ", tag: "中重稀土整合平台，离子型稀土资源", description: "中国稀土（000831.SZ）是稀土矿领域的代表性上市公司，中重稀土整合平台，离子型稀土资源，在产业链中占据重要位置。" },
      { id: 80203, name: "盛和资源", code: "600392.SH", tag: "稀土+锆钛双轮，海外资源布局", description: "盛和资源（600392.SH）是稀土矿领域的代表性上市公司，稀土+锆钛双轮，海外资源布局，在产业链中占据重要位置。" },
    ]},
    { id: 80202, name: "钨钼锑锡", level: "upstream", description: "钨用于硬质合金和特种钢，钼用于不锈钢合金化，锑用于阻燃剂，锡用于焊料。中国钨/锑/锡储量均占全球第一", plainLanguageDescription: "钨钼锑锡这些'小众但关键'的金属，钨做钻头、钼做不锈钢、锡做焊锡。中国储量都是世界第一", parentId: 802, stockCount: 3, childCount: 0, stocks: [
      { id: 80204, name: "厦门钨业", code: "600549.SH", tag: "钨全产业链+稀土+锂电正极，钨丝龙头", description: "厦门钨业（600549.SH）是钨钼锑锡领域的代表性上市公司，钨全产业链+稀土+锂电正极，钨丝龙头，在产业链中占据重要位置。" },
      { id: 80205, name: "洛阳钼业", code: "603993.SH", tag: "钼铜钨综合，钴产量全球第二，TFM铜钴矿", description: "洛阳钼业（603993.SH）是钨钼锑锡领域的代表性上市公司，钼铜钨综合，钴产量全球第二，TFM铜钴矿，在产业链中占据重要位置。" },
      { id: 80206, name: "华锡有色", code: "600301.SH", tag: "锡锑铟综合，锡产量国内前三", description: "华锡有色（600301.SH）是钨钼锑锡领域的代表性上市公司，锡锑铟综合，锡产量国内前三，在产业链中占据重要位置。" },
    ]},
  ],
  803: [
    { id: 80301, name: "焦炭/电力", level: "upstream", description: "焦炭是高炉炼铁的还原剂，电力是电解铝的核心成本。焦炭占生铁成本30%+【数据仅供参考】，电力占电解铝成本35%+【数据仅供参考】", plainLanguageDescription: "炼钢的焦炭和炼铝的电，是金属冶炼的'燃料'。电价一涨铝厂就亏损，焦炭价格一涨钢厂利润就薄", parentId: 803, stockCount: 3, childCount: 0, stocks: [
      { id: 80301, name: "山西焦煤", code: "000983.SZ", tag: "焦煤龙头，资源储量30亿吨", description: "山西焦煤（000983.SZ）是焦炭/电力领域的代表性上市公司，焦煤龙头，资源储量30亿吨，在产业链中占据重要位置。" },
      { id: 80302, name: "美锦能源", code: "000723.SZ", tag: "焦炭+氢能源双轮，焦炉煤气制氢", description: "美锦能源（000723.SZ）是焦炭/电力领域的代表性上市公司，焦炭+氢能源双轮，焦炉煤气制氢，在产业链中占据重要位置。" },
      { id: 80303, name: "内蒙华电", code: "600863.SH", tag: "煤电一体化，电解铝自备电厂", description: "内蒙华电（600863.SH）是焦炭/电力领域的代表性上市公司，煤电一体化，电解铝自备电厂，在产业链中占据重要位置。" },
    ]},
    { id: 80302, name: "耐火材料", level: "upstream", description: "高炉、转炉、电解槽内衬用耐火材料，占冶炼成本5-10%。镁碳砖、铝镁碳砖是主流产品，中国产量占全球65%+【数据仅供参考】", plainLanguageDescription: "冶炼炉里的'防火砖'，钢水一千多度，没有耐火材料炉子就烧穿了。中国是耐火材料最大生产国", parentId: 803, stockCount: 3, childCount: 0, stocks: [
      { id: 80304, name: "濮耐股份", code: "002225.SZ", tag: "耐火材料龙头，钢铁企业市占率领先", description: "濮耐股份（002225.SZ）是耐火材料领域的代表性上市公司，耐火材料龙头，钢铁企业市占率领先，在产业链中占据重要位置。" },
      { id: 80305, name: "北京利尔", code: "002392.SZ", tag: "耐火材料+冶金辅料，整体承包模式", description: "北京利尔（002392.SZ）是耐火材料领域的代表性上市公司，耐火材料+冶金辅料，整体承包模式，在产业链中占据重要位置。" },
      { id: 80306, name: "瑞泰科技", code: "002066.SZ", tag: "央企耐火材料平台，玻璃/钢铁双轮", description: "瑞泰科技（002066.SZ）是耐火材料领域的代表性上市公司，央企耐火材料平台，玻璃/钢铁双轮，在产业链中占据重要位置。" },
    ]},
  ],
  804: [
    { id: 80401, name: "粗钢/生铁", level: "midstream", description: "长流程高炉炼铁+转炉炼钢，占中国粗钢产量90%。中国粗钢产量10.2亿吨占全球54%【数据仅供参考】，但产能过剩、利润微薄", plainLanguageDescription: "把铁矿石烧成铁水再炼成钢锭，中国产的钢占全球一半以上。但普通钢产能过剩，一吨钢利润不如一斤白菜", parentId: 804, stockCount: 3, childCount: 0, stocks: [
      { id: 80401, name: "宝钢股份", code: "600019.SH", tag: "粗钢龙头，产能4700万吨，汽车板市占率50%+【数据仅供参考】", description: "宝钢股份（600019.SH）是粗钢/生铁领域的代表性上市公司，粗钢龙头，产能4700万吨，汽车板市占率50%+【数据仅供参考】，在产业链中占据重要位置。" },
      { id: 80402, name: "河钢股份", code: "000709.SZ", tag: "河北钢铁整合平台，产能3000万吨+", description: "河钢股份（000709.SZ）是粗钢/生铁领域的代表性上市公司，河北钢铁整合平台，产能3000万吨+，在产业链中占据重要位置。" },
      { id: 80403, name: "鞍钢股份", code: "000898.SZ", tag: "东北钢铁龙头，鞍本重组后产能超5000万吨", description: "鞍钢股份（000898.SZ）是粗钢/生铁领域的代表性上市公司，东北钢铁龙头，鞍本重组后产能超5000万吨，在产业链中占据重要位置。" },
    ]},
    { id: 80402, name: "特种钢", level: "midstream", description: "轴承钢、齿轮钢、模具钢、不锈钢等高性能钢材。中国特钢占比仅10%（日本25%）【数据仅供参考】，高端轴承钢/航空钢仍依赖进口", plainLanguageDescription: "有特殊性能的钢材，比如不生锈的不锈钢、耐高温的航空钢。中国普通钢过剩，但高端特钢还得进口", parentId: 804, stockCount: 3, childCount: 0, stocks: [
      { id: 80404, name: "中信特钢", code: "000708.SZ", tag: "特钢龙头，轴承钢/齿轮钢市占率第一", description: "中信特钢（000708.SZ）是特种钢领域的代表性上市公司，特钢龙头，轴承钢/齿轮钢市占率第一，在产业链中占据重要位置。" },
      { id: 80405, name: "抚顺特钢", code: "600399.SH", tag: "高温合金+特钢，军工/航发核心供应商", description: "抚顺特钢（600399.SH）是特种钢领域的代表性上市公司，高温合金+特钢，军工/航发核心供应商，在产业链中占据重要位置。" },
      { id: 80406, name: "太钢不锈", code: "000825.SZ", tag: "不锈钢龙头，300系市占率30%，笔尖钢突破", description: "太钢不锈（000825.SZ）是特种钢领域的代表性上市公司，不锈钢龙头，300系市占率30%，笔尖钢突破，在产业链中占据重要位置。" },
    ]},
    { id: 80403, name: "短流程电炉钢", level: "midstream", description: "以废钢为原料的电弧炉炼钢，碳排放仅为长流程的1/4。中国电炉钢占比仅10%（美国70%）【数据仅供参考】，废钢资源不足是主要瓶颈", plainLanguageDescription: "用废钢炼钢的新工艺，像垃圾回收再利用一样环保，碳排放只有传统高炉的四分之一。中国占比还很低", parentId: 804, stockCount: 2, childCount: 0, stocks: [
      { id: 80407, name: "沙钢股份", code: "002075.SZ", tag: "电炉钢比例高，废钢利用领先", description: "沙钢股份（002075.SZ）是短流程电炉钢领域的代表性上市公司，电炉钢比例高，废钢利用领先，在产业链中占据重要位置。" },
      { id: 80408, name: "方大特钢", code: "600507.SH", tag: "弹簧扁钢龙头，电炉冶炼，吨钢成本行业最低", description: "方大特钢（600507.SH）是短流程电炉钢领域的代表性上市公司，弹簧扁钢龙头，电炉冶炼，吨钢成本行业最低，在产业链中占据重要位置。" },
    ]},
  ],
  805: [
    { id: 80501, name: "电解铜", level: "midstream", description: "火法冶炼+电解精炼，将铜精矿加工成99.99%纯铜。冶炼费TC/RC是核心利润指标，2024年TC降至20美元/吨历史低位", plainLanguageDescription: "把铜矿石提纯成纯铜板，像炼金一样把杂质去掉。冶炼厂的利润靠收'加工费'，加工费越低厂子越难受", parentId: 805, stockCount: 3, childCount: 0, stocks: [
      { id: 80501, name: "江西铜业", code: "600362.SH", tag: "阴极铜产能180万吨，国内第一", description: "江西铜业（600362.SH）是电解铜领域的代表性上市公司，阴极铜产能180万吨，国内第一，在产业链中占据重要位置。" },
      { id: 80502, name: "铜陵有色", code: "000630.SZ", tag: "铜箔+铜冶炼，米拉多铜矿投产", description: "铜陵有色（000630.SZ）是电解铜领域的代表性上市公司，铜箔+铜冶炼，米拉多铜矿投产，在产业链中占据重要位置。" },
      { id: 80503, name: "云南铜业", code: "000878.SZ", tag: "铜冶炼specialist，冶炼成本行业最低", description: "云南铜业（000878.SZ）是电解铜领域的代表性上市公司，铜冶炼specialist，冶炼成本行业最低，在产业链中占据重要位置。" },
    ]},
    { id: 80502, name: "电解铝", level: "midstream", description: "拜耳法溶出+霍尔-埃鲁特电解，吨电耗1.35万度。自备电厂/水电铝是核心竞争力，云南/新疆/内蒙古是主产区", plainLanguageDescription: "把铝土矿变成纯铝锭，特别费电，一吨要耗1.3万度电。有自备电厂或水电的铝厂才有竞争力", parentId: 805, stockCount: 3, childCount: 0, stocks: [
      { id: 80504, name: "中国铝业", code: "601600.SH", tag: "电解铝龙头，产能400万吨，全产业链", description: "中国铝业（601600.SH）是电解铝领域的代表性上市公司，电解铝龙头，产能400万吨，全产业链，在产业链中占据重要位置。" },
      { id: 80505, name: "云铝股份", code: "000807.SZ", tag: "水电铝specialist，云南绿电铝，碳排放仅为煤电铝1/5", description: "云铝股份（000807.SZ）是电解铝领域的代表性上市公司，水电铝specialist，云南绿电铝，碳排放仅为煤电铝1/5，在产业链中占据重要位置。" },
      { id: 80506, name: "神火股份", code: "000933.SZ", tag: "电解铝+煤炭双轮，新疆自备电厂", description: "神火股份（000933.SZ）是电解铝领域的代表性上市公司，电解铝+煤炭双轮，新疆自备电厂，在产业链中占据重要位置。" },
    ]},
    { id: 80503, name: "锌铅镍冶炼", level: "midstream", description: "湿法炼锌/火法炼铅/镍铁-电解镍工艺。锌用于镀锌钢板，铅用于蓄电池，镍用于不锈钢和三元电池", plainLanguageDescription: "把锌矿铅矿镍矿分别提纯。锌用来镀锌防锈，铅做汽车电瓶，镍做不锈钢和电动车电池", parentId: 805, stockCount: 3, childCount: 0, stocks: [
      { id: 80507, name: "驰宏锌锗", code: "600497.SH", tag: "锌铅锗综合，锗产量全球龙头", description: "驰宏锌锗（600497.SH）是锌铅镍冶炼领域的代表性上市公司，锌铅锗综合，锗产量全球龙头，在产业链中占据重要位置。" },
      { id: 80508, name: "华友钴业", code: "603799.SH", tag: "钴镍锂全链条，镍产量全球前十", description: "华友钴业（603799.SH）是锌铅镍冶炼领域的代表性上市公司，钴镍锂全链条，镍产量全球前十，在产业链中占据重要位置。" },
      { id: 80509, name: "格林美", code: "002340.SZ", tag: "镍钴回收+前驱体，城市矿山模式", description: "格林美（002340.SZ）是锌铅镍冶炼领域的代表性上市公司，镍钴回收+前驱体，城市矿山模式，在产业链中占据重要位置。" },
    ]},
  ],
  806: [
    { id: 80601, name: "板材/管材/型材", level: "midstream", description: "热轧/冷轧板材、焊接钢管、型钢等基础加工产品。板材用于汽车和家电，钢管用于油气和建筑，型材用于钢结构", plainLanguageDescription: "把钢锭压成钢板、钢管、工字钢。钢板造汽车，钢管铺油管，工字钢搭厂房", parentId: 806, stockCount: 3, childCount: 0, stocks: [
      { id: 80601, name: "宝钢股份", code: "600019.SH", tag: "汽车板/家电板龙头，高端板材市占率第一", description: "宝钢股份（600019.SH）是板材/管材/型材领域的代表性上市公司，汽车板/家电板龙头，高端板材市占率第一，在产业链中占据重要位置。" },
      { id: 80602, name: "鞍钢股份", code: "000898.SZ", tag: "板材+管线钢，鞍本重组协同", description: "鞍钢股份（000898.SZ）是板材/管材/型材领域的代表性上市公司，板材+管线钢，鞍本重组协同，在产业链中占据重要位置。" },
      { id: 80603, name: "河钢股份", code: "000709.SZ", tag: "建筑钢+板材，雄安建设核心供应商", description: "河钢股份（000709.SZ）是板材/管材/型材领域的代表性上市公司，建筑钢+板材，雄安建设核心供应商，在产业链中占据重要位置。" },
    ]},
    { id: 80602, name: "精密加工/箔材", level: "midstream", description: "铜管、铜板带、铝箔、电磁线等高精度加工产品。电池铝箔/锂电铜箔是新能源核心材料，技术壁垒高", plainLanguageDescription: "把铜铝加工成很薄很精密的材料。电池铝箔和铜箔是新能源车电池的关键材料，越薄越值钱", parentId: 806, stockCount: 3, childCount: 0, stocks: [
      { id: 80604, name: "海亮股份", code: "002203.SZ", tag: "铜管龙头，全球市占率15%【数据仅供参考】", description: "海亮股份（002203.SZ）是精密加工/箔材领域的代表性上市公司，铜管龙头，全球市占率15%【数据仅供参考】，在产业链中占据重要位置。" },
      { id: 80605, name: "楚江新材", code: "002171.SZ", tag: "铜板带龙头+碳纤维，军工/新能源双驱", description: "楚江新材（002171.SZ）是精密加工/箔材领域的代表性上市公司，铜板带龙头+碳纤维，军工/新能源双驱，在产业链中占据重要位置。" },
      { id: 80606, name: "鼎胜新材", code: "603876.SH", tag: "电池铝箔龙头，市占率40%【数据仅供参考】，宁德时代核心供应商", description: "鼎胜新材（603876.SH）是精密加工/箔材领域的代表性上市公司，电池铝箔龙头，市占率40%【数据仅供参考】，宁德时代核心供应商，在产业链中占据重要位置。" },
    ]},
    { id: 80603, name: "合金与新材料", level: "midstream", description: "高温合金、硬质合金、磁性材料、钛合金等高性能金属材料。高温合金用于航空发动机，磁性材料用于新能源电机", plainLanguageDescription: "给金属加'特殊技能'，高温合金耐高温做飞机发动机，磁性材料让电机更强。越高端越值钱", parentId: 806, stockCount: 3, childCount: 0, stocks: [
      { id: 80607, name: "钢研高纳", code: "300034.SZ", tag: "高温合金龙头，航发核心供应商", description: "钢研高纳（300034.SZ）是合金与新材料领域的代表性上市公司，高温合金龙头，航发核心供应商，在产业链中占据重要位置。" },
      { id: 80608, name: "图南股份", code: "300855.SZ", tag: "高温合金+特种不锈钢，航发/燃气轮机", description: "图南股份（300855.SZ）是合金与新材料领域的代表性上市公司，高温合金+特种不锈钢，航发/燃气轮机，在产业链中占据重要位置。" },
      { id: 80609, name: "中科三环", code: "000970.SZ", tag: "烧结钕铁硼龙头，特斯拉核心供应商", description: "中科三环（000970.SZ）是合金与新材料领域的代表性上市公司，烧结钕铁硼龙头，特斯拉核心供应商，在产业链中占据重要位置。" },
    ]},
  ],
  807: [
    { id: 80701, name: "钢筋/钢结构", level: "downstream", description: "螺纹钢用于钢筋混凝土，钢结构用于厂房/桥梁/体育场馆。建筑用钢占中国钢材消费55%+【数据仅供参考】，房地产景气度是核心变量", plainLanguageDescription: "盖楼修桥用的钢筋和钢架结构。房地产火的时候钢厂赚大钱，房地产冷的时候钢厂亏损", parentId: 807, stockCount: 3, childCount: 0, stocks: [
      { id: 80701, name: "八一钢铁", code: "600581.SH", tag: "新疆钢筋龙头，区域市占率第一", description: "八一钢铁（600581.SH）是钢筋/钢结构领域的代表性上市公司，新疆钢筋龙头，区域市占率第一，在产业链中占据重要位置。" },
      { id: 80702, name: "杭萧钢构", code: "600477.SH", tag: "钢结构住宅龙头，技术授权模式", description: "杭萧钢构（600477.SH）是钢筋/钢结构领域的代表性上市公司，钢结构住宅龙头，技术授权模式，在产业链中占据重要位置。" },
      { id: 80703, name: "鸿路钢构", code: "002541.SZ", tag: "钢结构加工产能第一，400万吨+", description: "鸿路钢构（002541.SZ）是钢筋/钢结构领域的代表性上市公司，钢结构加工产能第一，400万吨+，在产业链中占据重要位置。" },
    ]},
    { id: 80702, name: "钢管/型材", level: "downstream", description: "焊接钢管用于给排水/油气输送，型材用于钢结构和机械制造。油气管网建设是重要需求来源", plainLanguageDescription: "输送水、油、气的钢管和盖厂房用的型钢。国家铺油气管网的时候钢管厂订单爆满", parentId: 807, stockCount: 3, childCount: 0, stocks: [
      { id: 80704, name: "友发集团", code: "601686.SH", tag: "焊接钢管龙头，产能1500万吨", description: "友发集团（601686.SH）是钢管/型材领域的代表性上市公司，焊接钢管龙头，产能1500万吨，在产业链中占据重要位置。" },
      { id: 80705, name: "金洲管道", code: "002443.SZ", tag: "油气管道specialist，中俄东线供应商", description: "金洲管道（002443.SZ）是钢管/型材领域的代表性上市公司，油气管道specialist，中俄东线供应商，在产业链中占据重要位置。" },
      { id: 80706, name: "常宝股份", code: "002478.SZ", tag: "油井管+锅炉管，海外市场占比40%", description: "常宝股份（002478.SZ）是钢管/型材领域的代表性上市公司，油井管+锅炉管，海外市场占比40%，在产业链中占据重要位置。" },
    ]},
  ],
  808: [
    { id: 80801, name: "汽车用钢", level: "downstream", description: "汽车车身、底盘、发动机用高强度钢和特种钢。新能源车单车用铝量150-200kg（比燃油车多30%），汽车轻量化趋势加速", plainLanguageDescription: "造汽车用的钢板，从车身到发动机都要用钢。新能源车为了轻量化开始大量用铝，用钢量在下降", parentId: 808, stockCount: 3, childCount: 0, stocks: [
      { id: 80801, name: "宝钢股份", code: "600019.SH", tag: "汽车板市占率50%+【数据仅供参考】，超高强钢量产", description: "宝钢股份（600019.SH）是汽车用钢领域的代表性上市公司，汽车板市占率50%+【数据仅供参考】，超高强钢量产，在产业链中占据重要位置。" },
      { id: 80802, name: "首钢股份", code: "000959.SZ", tag: "汽车板+电工钢，新能源车电机材料", description: "首钢股份（000959.SZ）是汽车用钢领域的代表性上市公司，汽车板+电工钢，新能源车电机材料，在产业链中占据重要位置。" },
      { id: 80803, name: "华菱钢铁", code: "000932.SZ", tag: "汽车板+硅钢，湖南钢铁龙头", description: "华菱钢铁（000932.SZ）是汽车用钢领域的代表性上市公司，汽车板+硅钢，湖南钢铁龙头，在产业链中占据重要位置。" },
    ]},
    { id: 80802, name: "电子电器用金属", level: "downstream", description: "铜管/铜棒用于空调和制冷，铜板带用于连接器和引线框架，电磁线用于电机和变压器。家电和电子是铜消费的重要领域", plainLanguageDescription: "造空调、冰箱、电线用的铜材。空调里的铜管、电线里的铜芯、电机里的电磁线都属于这个领域", parentId: 808, stockCount: 3, childCount: 0, stocks: [
      { id: 80804, name: "海亮股份", code: "002203.SZ", tag: "铜管/铜棒用于空调/制冷，全球龙头", description: "海亮股份（002203.SZ）是电子电器用金属领域的代表性上市公司，铜管/铜棒用于空调/制冷，全球龙头，在产业链中占据重要位置。" },
      { id: 80805, name: "精达股份", code: "600577.SH", tag: "电磁线龙头，新能源车扁线放量，市占率35%【数据仅供参考】", description: "精达股份（600577.SH）是电子电器用金属领域的代表性上市公司，电磁线龙头，新能源车扁线放量，市占率35%【数据仅供参考】，在产业链中占据重要位置。" },
      { id: 80806, name: "博威合金", code: "601137.SH", tag: "连接器/引线框架材料，5G/新能源车双驱", description: "博威合金（601137.SH）是电子电器用金属领域的代表性上市公司，连接器/引线框架材料，5G/新能源车双驱，在产业链中占据重要位置。" },
    ]},
    { id: 80803, name: "新能源用金属", level: "downstream", description: "光伏支架/风电塔筒用钢，锂电池用锂/镍/钴，电池铝箔/铜箔。新能源是金属需求增长最快的领域，年均增速20%+【数据仅供参考】", plainLanguageDescription: "光伏支架、风电塔筒、电池材料用的金属。新能源是金属需求增长最快的领域，锂镍钴价格涨得比火箭还快", parentId: 808, stockCount: 3, childCount: 0, stocks: [
      { id: 80807, name: "鼎胜新材", code: "603876.SH", tag: "电池铝箔龙头，宁德时代/比亚迪核心供应商", description: "鼎胜新材（603876.SH）是新能源用金属领域的代表性上市公司，电池铝箔龙头，宁德时代/比亚迪核心供应商，在产业链中占据重要位置。" },
      { id: 80808, name: "博威合金", code: "601137.SH", tag: "光伏焊带材料，HJT电池银浆替代", description: "博威合金（601137.SH）是新能源用金属领域的代表性上市公司，光伏焊带材料，HJT电池银浆替代，在产业链中占据重要位置。" },
      { id: 80809, name: "西藏矿业", code: "000762.SZ", tag: "锂矿+铬铁矿，扎布耶盐湖锂资源", description: "西藏矿业（000762.SZ）是新能源用金属领域的代表性上市公司，锂矿+铬铁矿，扎布耶盐湖锂资源，在产业链中占据重要位置。" },
    ]},
  ],
};

// === 连接关系 ===
const connections: LocalConnection[] = [
  // === 上游→中游（原材料供给）===
  { id: 80001, fromNodeId: 80001, toNodeId: 80401, label: "铁矿石供给" },
  { id: 80002, fromNodeId: 80002, toNodeId: 80401, label: "锰矿供给" },
  { id: 80003, fromNodeId: 80002, toNodeId: 80402, label: "铬矿供给" },
  { id: 80004, fromNodeId: 80101, toNodeId: 80501, label: "铜矿供给" },
  { id: 80005, fromNodeId: 80102, toNodeId: 80502, label: "铝土矿供给" },
  { id: 80006, fromNodeId: 80103, toNodeId: 80503, label: "锌铅矿供给" },
  { id: 80007, fromNodeId: 80201, toNodeId: 80603, label: "稀土供给" },
  { id: 80008, fromNodeId: 80202, toNodeId: 80603, label: "钨钼供给" },
  { id: 80009, fromNodeId: 80301, toNodeId: 80401, label: "焦炭供给" },
  { id: 80010, fromNodeId: 80301, toNodeId: 80502, label: "电力供给" },
  { id: 80011, fromNodeId: 80302, toNodeId: 80401, label: "耐火材料供给" },
  { id: 80012, fromNodeId: 80301, toNodeId: 80403, label: "电力供给" },
  // === 中游→上游（原材料采购）===
  { id: 80013, fromNodeId: 80401, toNodeId: 80001, label: "铁矿石采购" },
  { id: 80014, fromNodeId: 80401, toNodeId: 80002, label: "锰矿采购" },
  { id: 80015, fromNodeId: 80402, toNodeId: 80002, label: "铬矿采购" },
  { id: 80016, fromNodeId: 80501, toNodeId: 80101, label: "铜矿采购" },
  { id: 80017, fromNodeId: 80502, toNodeId: 80102, label: "铝土矿采购" },
  { id: 80018, fromNodeId: 80503, toNodeId: 80103, label: "锌铅矿采购" },
  { id: 80019, fromNodeId: 80603, toNodeId: 80201, label: "稀土采购" },
  { id: 80020, fromNodeId: 80603, toNodeId: 80202, label: "钨钼采购" },
  { id: 80021, fromNodeId: 80401, toNodeId: 80301, label: "焦炭采购" },
  { id: 80022, fromNodeId: 80502, toNodeId: 80301, label: "电力采购" },
  { id: 80023, fromNodeId: 80401, toNodeId: 80302, label: "耐火材料采购" },
  { id: 80024, fromNodeId: 80403, toNodeId: 80301, label: "电力采购" },
  // === 中游→中游（加工转化）===
  { id: 80025, fromNodeId: 80401, toNodeId: 80402, label: "粗钢精炼" },
  { id: 80026, fromNodeId: 80401, toNodeId: 80601, label: "粗钢轧制" },
  { id: 80027, fromNodeId: 80501, toNodeId: 80602, label: "铜材压延" },
  { id: 80028, fromNodeId: 80502, toNodeId: 80602, label: "铝材压延" },
  { id: 80029, fromNodeId: 80503, toNodeId: 80602, label: "锌铅压延" },
  { id: 80030, fromNodeId: 80402, toNodeId: 80603, label: "特钢深加工" },
  { id: 80031, fromNodeId: 80403, toNodeId: 80601, label: "电炉钢轧制" },
  // === 中游→中游（原料回流）===
  { id: 80032, fromNodeId: 80402, toNodeId: 80401, label: "粗钢采购" },
  { id: 80033, fromNodeId: 80601, toNodeId: 80401, label: "粗钢采购" },
  { id: 80034, fromNodeId: 80602, toNodeId: 80501, label: "电解铜采购" },
  { id: 80035, fromNodeId: 80602, toNodeId: 80502, label: "电解铝采购" },
  { id: 80036, fromNodeId: 80602, toNodeId: 80503, label: "锌铅采购" },
  { id: 80037, fromNodeId: 80603, toNodeId: 80402, label: "特钢采购" },
  { id: 80038, fromNodeId: 80601, toNodeId: 80403, label: "电炉钢采购" },
  // === 中游→下游（产品供给）===
  { id: 80039, fromNodeId: 80401, toNodeId: 80701, label: "钢筋供应" },
  { id: 80040, fromNodeId: 80402, toNodeId: 80801, label: "汽车用钢供应" },
  { id: 80041, fromNodeId: 80601, toNodeId: 80701, label: "建筑板材供应" },
  { id: 80042, fromNodeId: 80601, toNodeId: 80702, label: "建筑型材供应" },
  { id: 80043, fromNodeId: 80601, toNodeId: 80801, label: "汽车板材供应" },
  { id: 80044, fromNodeId: 80602, toNodeId: 80802, label: "铜材供应" },
  { id: 80045, fromNodeId: 80602, toNodeId: 80803, label: "电池箔材供应" },
  { id: 80046, fromNodeId: 80603, toNodeId: 80801, label: "高温合金供应" },
  { id: 80047, fromNodeId: 80603, toNodeId: 80803, label: "磁材供应" },
  { id: 80048, fromNodeId: 80601, toNodeId: 80803, label: "结构材料供应" },
  // === 下游→中游（产品采购）===
  { id: 80049, fromNodeId: 80701, toNodeId: 80401, label: "钢筋采购" },
  { id: 80050, fromNodeId: 80801, toNodeId: 80402, label: "特钢采购" },
  { id: 80051, fromNodeId: 80701, toNodeId: 80601, label: "板材采购" },
  { id: 80052, fromNodeId: 80702, toNodeId: 80601, label: "型材采购" },
  { id: 80053, fromNodeId: 80801, toNodeId: 80601, label: "板材采购" },
  { id: 80054, fromNodeId: 80802, toNodeId: 80602, label: "铜材采购" },
  { id: 80055, fromNodeId: 80803, toNodeId: 80602, label: "铝箔采购" },
  { id: 80056, fromNodeId: 80801, toNodeId: 80603, label: "合金采购" },
  { id: 80057, fromNodeId: 80803, toNodeId: 80603, label: "磁材采购" },
  { id: 80058, fromNodeId: 80803, toNodeId: 80601, label: "结构材料采购" },
  // === 根节点骨架连接（根视图可见）===
  { id: 80072, fromNodeId: 800, toNodeId: 804, label: "黑色金属矿产供给" },
  { id: 80073, fromNodeId: 801, toNodeId: 805, label: "有色金属矿产供给" },
  { id: 80074, fromNodeId: 802, toNodeId: 806, label: "稀有金属供给" },
  { id: 80075, fromNodeId: 803, toNodeId: 804, label: "冶炼能源供给" },
  { id: 80076, fromNodeId: 803, toNodeId: 805, label: "冶炼能源供给" },
  { id: 80077, fromNodeId: 804, toNodeId: 806, label: "黑色金属加工" },
  { id: 80078, fromNodeId: 805, toNodeId: 806, label: "有色金属加工" },
  { id: 80079, fromNodeId: 806, toNodeId: 807, label: "金属产品供应" },
  { id: 80080, fromNodeId: 806, toNodeId: 808, label: "金属产品供应" },
  // === 跨产业连接（双向）===
  // 金属→半导体
  { id: 80059, fromNodeId: 80201, toNodeId: 7, label: "稀土磁材需求" },
  { id: 80060, fromNodeId: 80602, toNodeId: 10, label: "金属材料供给" },
  { id: 80061, fromNodeId: 80603, toNodeId: 7, label: "磁性材料需求" },
  { id: 80081, fromNodeId: 80602, toNodeId: 1105, label: "铜材/铝材供给" },
  // 金属→电力
  { id: 80062, fromNodeId: 80502, toNodeId: 610, label: "电解铝耗电" },
  { id: 80063, fromNodeId: 80401, toNodeId: 602, label: "钢材供给" },
  // 金属→电网设备
  { id: 80064, fromNodeId: 80602, toNodeId: 704, label: "电磁线供给" },
  { id: 80065, fromNodeId: 80501, toNodeId: 706, label: "铜材供给" },
  // 反向：半导体/电力/电网→金属
  { id: 80066, fromNodeId: 7, toNodeId: 80201, label: "稀土磁材采购" },
  { id: 80067, fromNodeId: 10, toNodeId: 80602, label: "金属材料采购" },
  { id: 80068, fromNodeId: 610, toNodeId: 80502, label: "电力销售" },
  { id: 80069, fromNodeId: 602, toNodeId: 80401, label: "钢材采购" },
  { id: 80070, fromNodeId: 704, toNodeId: 80602, label: "电磁线采购" },
  { id: 80071, fromNodeId: 706, toNodeId: 80501, label: "铜材采购" },
];

// === 导出产业数据 ===
export const metalData: IndustryData = {
  slug: "metal",
  name: "金属",
  icon: "Pickaxe",
  description: "金属产业链涵盖黑色/有色/稀有金属矿产上游、冶炼加工中游、建筑/制造/新能源下游，是现代工业的基础材料产业。",
  plainLanguageDescription: "金属产业链就是从矿山挖出铁矿石、铜矿石，烧炼成钢铁、铜铝，再加工成钢板、电线、电池材料，最后盖楼造车的全过程。没有金属，现代工业全部停摆。",
  overviewSummary: `金属是工业的"骨骼"，从摩天大楼的钢筋到手机里的芯片引线，从高铁轨道到新能源车的锂电池——每一种金属都在支撑现代生活。中国是全球最大的金属生产国和消费国。

随着新能源转型，传统"铁公基"（钢铁水泥）需求趋稳，而与新能源、半导体、军工相关的小金属（锂、钴、稀土、钨等）成为新的战略焦点。一条"黑色金属→有色金属→稀有/战略金属"的价值链正在重塑。`,
  overviewArchitecture: `本图谱按照"上游→中游→下游"三层架构组织：

• 上游——矿产资源：铁矿石是钢铁的原料，中国进口依赖度超 80%；铜矿是电力和电子的基础导体；铝土矿提炼成铝，轻量化之王；稀土是"工业味精"，从手机到导弹都离不开；锂/钴/镍是新能源电池的金属原料
• 中游——冶炼与加工：钢铁冶炼（高炉转炉）和铜铝电解是能耗大户也是技术密集环节；特种合金（高温合金、钛合金）是航空航天的"肌肉"；贵金属精炼用于催化剂和电子
• 下游——终端应用：建筑用钢和汽车用钢是最大消费；电力电缆用铜和铝；电池用锂、钴、镍；半导体和军工用稀土和钨钼`,
  overviewHighlights: [
    "中国钢铁产量占全球 54%，年产超 10 亿吨，世界第一钢铁大国",
    "中国稀土储量占全球 37%，精炼产量占 90%，是'稀土王国'",
    "新能源转型驱动铜需求激增：一辆电动车用铜量是燃油车的 4 倍",
    "锂被称为'白色石油'，全球锂资源争夺已被列为国家战略竞争",
    "高温合金是航空发动机的核心材料，中国正加速国产替代",
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
