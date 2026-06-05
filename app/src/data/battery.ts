// 锂电产业链数据
// ID段：根节点 1100-1108，子节点 11001-11099，股票 11101-11199，连接 11001-11099

import type { IndustryData, LocalNode, LocalConnection } from "./semiconductor";

// === 根节点 ===
const rootNodes: LocalNode[] = [
  { id: 1100, name: "矿产资源", level: "upstream", description: "锂矿、镍钴矿、磷矿、石墨等锂电上游原材料。锂资源集中度极高，澳洲/智利/中国占全球产量80%+；镍钴主要依赖印尼/刚果金", plainLanguageDescription: "挖锂矿、镍矿、磷矿和石墨。锂是电池的灵魂，但全球好的锂矿集中在澳洲和南美，中国主要靠盐湖和锂云母", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 1101, name: "锂化工材料", level: "upstream", description: "碳酸锂、氢氧化锂、六氟磷酸锂、PVDF、隔膜基材等电池关键化工材料。碳酸锂价格从60万/吨跌至10万/吨，产能严重过剩", plainLanguageDescription: "把锂矿提纯成电池能用的材料。碳酸锂是核心，价格波动极大，从60万一吨跌到10万，上游厂商盈亏波动剧烈", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 1102, name: "正极材料", level: "midstream", description: "三元正极（NCM/NCA）、磷酸铁锂正极（LFP）、钴酸锂、锰酸锂。磷酸铁锂凭借成本和安全性优势，国内动力电池装机占比超70%", plainLanguageDescription: "电池的正极材料，决定电池的能量密度和安全性。磷酸铁锂便宜安全但续航短，三元材料能量高但贵且不稳定", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 1103, name: "负极材料", level: "midstream", description: "人造石墨、天然石墨、硅基负极。人造石墨占负极出货80%+，硅基负极理论容量是石墨10倍但膨胀问题待解", plainLanguageDescription: "电池的负极材料，储存锂离子。人造石墨是主流，硅基负极容量大但容易膨胀损坏", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 1104, name: "电解液与隔膜", level: "midstream", description: "电解液（溶质+溶剂+添加剂）、隔膜（湿法/干法/涂覆）。电解液成本中六氟磷酸锂占40%+；隔膜是技术壁垒最高的环节，恩捷股份全球龙头", plainLanguageDescription: "电解液是电池的血液，隔膜是电池的安全阀。隔膜技术最难，恩捷股份全球第一", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 1105, name: "电芯与Pack", level: "midstream", description: "动力电池电芯、储能电池电芯、电池Pack/BMS/热管理。宁德时代全球市占率37%，比亚迪刀片电池技术领先", plainLanguageDescription: "把正负极材料和电解液卷起来做成电池芯，再组装成电池包。宁德时代和比亚迪是全球两强", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 1106, name: "新能源汽车", level: "downstream", description: "新能源乘用车、新能源商用车。中国新能源车渗透率超35%，全球第一；比亚迪国内市占率30%+", plainLanguageDescription: "装锂电池的电动汽车。中国每卖3辆车就有1辆是新能源，比亚迪是国内老大", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 1107, name: "储能与其他", level: "downstream", description: "发电侧/电网侧储能、用户侧储能、消费电子电池、两轮车电池。储能是锂电第二增长曲线，年均增速50%+", plainLanguageDescription: "除了汽车，锂电池还用在储能电站、手机、笔记本电脑、电动自行车上。储能是增长最快的市场", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 1108, name: "设备与回收", level: "downstream", description: "锂电生产设备、电池回收与梯次利用。设备投资占产线投资60%+；回收可提取锂/镍/钴，减少资源依赖", plainLanguageDescription: "造电池用的设备和电池报废后的回收。回收能提取有价值的金属，减少挖矿", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
];

// === 子节点 ===
const childNodes: Record<number, LocalNode[]> = {
  1100: [
    { id: 11001, name: "锂矿", level: "upstream", description: "盐湖提锂、锂辉石、锂云母。澳洲Greenbushes、智利Atacama、中国青海/西藏盐湖是全球三大锂资源基地。盐湖提锂成本低至3-5万元/吨", plainLanguageDescription: "从盐湖、矿石里提取锂。澳洲的锂辉石最好，青海的盐湖锂最多，西藏盐湖品质最高", parentId: 1100, stockCount: 4, childCount: 0, stocks: [
      { id: 11101, name: "天齐锂业", code: "002466.SZ", tag: "锂矿龙头，Greenbushes矿权，碳酸锂产能全球前三", description: "天齐锂业（002466.SZ）是锂矿领域的代表性上市公司，锂矿龙头，Greenbushes矿权，碳酸锂产能全球前三，在产业链中占据重要位置。" },
      { id: 11102, name: "赣锋锂业", code: "002460.SZ", tag: "锂盐龙头，全球布局锂资源，氢氧化锂龙头", description: "赣锋锂业（002460.SZ）是锂矿领域的代表性上市公司，锂盐龙头，全球布局锂资源，氢氧化锂龙头，在产业链中占据重要位置。" },
      { id: 11103, name: "盐湖股份", code: "000792.SZ", tag: "盐湖提锂龙头，察尔汗盐湖资源量全国第一", description: "盐湖股份（000792.SZ）是锂矿领域的代表性上市公司，盐湖提锂龙头，察尔汗盐湖资源量全国第一，在产业链中占据重要位置。" },
      { id: 11104, name: "永兴材料", code: "002756.SZ", tag: "锂云母提锂龙头，宜春锂云母资源", description: "永兴材料（002756.SZ）是锂矿领域的代表性上市公司，锂云母提锂龙头，宜春锂云母资源，在产业链中占据重要位置。" },
    ]},
    { id: 11002, name: "镍钴矿", level: "upstream", description: "红土镍矿、硫化镍矿、钴矿。印尼占全球镍产量50%+；刚果金占钴产量70%+。华友钴业、格林美布局印尼镍资源", plainLanguageDescription: "镍和钴是三元电池的关键材料。印尼的镍最多，刚果金的钴最多，中国企业都去那边投资开矿", parentId: 1100, stockCount: 3, childCount: 0, stocks: [
      { id: 11105, name: "华友钴业", code: "603799.SH", tag: "镍钴锂全链条，印尼镍资源布局，三元前驱体龙头", description: "华友钴业（603799.SH）是镍钴矿领域的代表性上市公司，镍钴锂全链条，印尼镍资源布局，三元前驱体龙头，在产业链中占据重要位置。" },
      { id: 11106, name: "洛阳钼业", code: "603993.SH", tag: "钴产量全球第二，TFM铜钴矿，镍资源布局", description: "洛阳钼业（603993.SH）是镍钴矿领域的代表性上市公司，钴产量全球第二，TFM铜钴矿，镍资源布局，在产业链中占据重要位置。" },
      { id: 11107, name: "格林美", code: "002340.SZ", tag: "镍钴回收+前驱体，城市矿山模式，印尼镍项目", description: "格林美（002340.SZ）是镍钴矿领域的代表性上市公司，镍钴回收+前驱体，城市矿山模式，印尼镍项目，在产业链中占据重要位置。" },
    ]},
    { id: 11003, name: "磷矿/石墨", level: "upstream", description: "磷矿用于磷酸铁锂正极，石墨用于负极。云南/贵州/湖北占中国磷矿产量70%+；黑龙江/内蒙古石墨资源丰富", plainLanguageDescription: "磷矿做磷酸铁锂，石墨做电池负极。中国的磷矿和石墨资源都很丰富", parentId: 1100, stockCount: 3, childCount: 0, stocks: [
      { id: 11108, name: "云天化", code: "600096.SH", tag: "磷矿龙头，磷酸铁锂前驱体布局", description: "云天化（600096.SH）是磷矿/石墨领域的代表性上市公司，磷矿龙头，磷酸铁锂前驱体布局，在产业链中占据重要位置。" },
      { id: 11109, name: "兴发集团", code: "600141.SH", tag: "磷化工龙头，磷酸铁锂一体化", description: "兴发集团（600141.SH）是磷矿/石墨领域的代表性上市公司，磷化工龙头，磷酸铁锂一体化，在产业链中占据重要位置。" },
      { id: 11110, name: "贝特瑞", code: "835185.BJ", tag: "负极材料龙头，天然石墨+人造石墨+硅基", description: "贝特瑞（835185.BJ）是磷矿/石墨领域的代表性上市公司，负极材料龙头，天然石墨+人造石墨+硅基，在产业链中占据重要位置。" },
    ]},
  ],
  1101: [
    { id: 11011, name: "碳酸锂/氢氧化锂", level: "upstream", description: "碳酸锂主要用于磷酸铁锂电池，氢氧化锂用于三元高镍电池。2024年碳酸锂价格跌至10万元/吨以下，逼近部分矿山成本线", plainLanguageDescription: "把锂矿进一步提纯成碳酸锂和氢氧化锂。碳酸锂配磷酸铁锂，氢氧化锂配三元电池", parentId: 1101, stockCount: 2, childCount: 0, stocks: [
      { id: 11111, name: "雅化集团", code: "002497.SZ", tag: "氢氧化锂龙头，特斯拉核心供应商", description: "雅化集团（002497.SZ）是碳酸锂/氢氧化锂领域的代表性上市公司，氢氧化锂龙头，特斯拉核心供应商，在产业链中占据重要位置。" },
      { id: 11112, name: "盛新锂能", code: "002240.SZ", tag: "锂盐specialist，碳酸锂+氢氧化锂双轮", description: "盛新锂能（002240.SZ）是碳酸锂/氢氧化锂领域的代表性上市公司，锂盐specialist，碳酸锂+氢氧化锂双轮，在产业链中占据重要位置。" },
    ]},
    { id: 11012, name: "六氟磷酸锂/LiFSI", level: "upstream", description: "六氟磷酸锂是电解液核心溶质，占电解液成本40%+。多氟多、天赐材料产能全球领先；LiFSI是新型溶质，性能更优", plainLanguageDescription: "电解液里的核心材料，占电解液成本四成。多氟多和天赐材料是全球龙头", parentId: 1101, stockCount: 3, childCount: 0, stocks: [
      { id: 11113, name: "天赐材料", code: "002709.SZ", tag: "电解液+六氟磷酸锂全球龙头，市占率30%+", description: "天赐材料（002709.SZ）是六氟磷酸锂/LiFSI领域的代表性上市公司，电解液+六氟磷酸锂全球龙头，市占率30%+，在产业链中占据重要位置。" },
      { id: 11114, name: "多氟多", code: "002407.SZ", tag: "六氟磷酸锂龙头，产能全球前三", description: "多氟多（002407.SZ）是六氟磷酸锂/LiFSI领域的代表性上市公司，六氟磷酸锂龙头，产能全球前三，在产业链中占据重要位置。" },
      { id: 11115, name: "天际股份", code: "002759.SZ", tag: "六氟磷酸锂specialist，产能扩张中", description: "天际股份（002759.SZ）是六氟磷酸锂/LiFSI领域的代表性上市公司，六氟磷酸锂specialist，产能扩张中，在产业链中占据重要位置。" },
    ]},
    { id: 11013, name: "PVDF/隔膜基材", level: "upstream", description: "PVDF用于正极粘结剂和隔膜涂覆；隔膜基材为PP/PE。PVDF价格从50万/吨回落至10万/吨，产能释放导致过剩", plainLanguageDescription: "PVDF是粘结剂和隔膜涂层材料，PP/PE是隔膜基材。价格大起大落，现在产能过剩", parentId: 1101, stockCount: 2, childCount: 0, stocks: [
      { id: 11116, name: "东阳光", code: "600673.SH", tag: "PVDF+铝箔，电池材料平台", description: "东阳光（600673.SH）是PVDF/隔膜基材领域的代表性上市公司，PVDF+铝箔，电池材料平台，在产业链中占据重要位置。" },
      { id: 11117, name: "联创股份", code: "300343.SZ", tag: "PVDF龙头，宁德时代核心供应商", description: "联创股份（300343.SZ）是PVDF/隔膜基材领域的代表性上市公司，PVDF龙头，宁德时代核心供应商，在产业链中占据重要位置。" },
    ]},
  ],
  1102: [
    { id: 11021, name: "三元正极", level: "midstream", description: "NCM523/622/811、NCA。高镍化是趋势，NCM811能量密度超300Wh/kg。容百科技、当升科技国内龙头", plainLanguageDescription: "三元材料能量密度高，适合高端电动车。镍含量越高续航越长，但安全性越低", parentId: 1102, stockCount: 3, childCount: 0, stocks: [
      { id: 11118, name: "容百科技", code: "688005.SH", tag: "三元正极龙头，高镍NCM811全球市占率第一", description: "容百科技（688005.SH）是三元正极领域的代表性上市公司，三元正极龙头，高镍NCM811全球市占率第一，在产业链中占据重要位置。" },
      { id: 11119, name: "当升科技", code: "300073.SZ", tag: "三元正极龙头，海外客户占比高", description: "当升科技（300073.SZ）是三元正极领域的代表性上市公司，三元正极龙头，海外客户占比高，在产业链中占据重要位置。" },
      { id: 11120, name: "长远锂科", code: "688779.SH", tag: "三元正极+磷酸铁锂，五矿集团旗下", description: "长远锂科（688779.SH）是三元正极领域的代表性上市公司，三元正极+磷酸铁锂，五矿集团旗下，在产业链中占据重要位置。" },
    ]},
    { id: 11022, name: "磷酸铁锂正极", level: "midstream", description: "LFP正极成本低、安全性好、循环寿命长。国内动力电池装机占比超70%，刀片电池/CTP技术提升能量密度", plainLanguageDescription: "磷酸铁锂便宜安全，适合中低端电动车和储能。刀片电池让磷酸铁锂也能跑600公里", parentId: 1102, stockCount: 3, childCount: 0, stocks: [
      { id: 11121, name: "德方纳米", code: "300769.SZ", tag: "磷酸铁锂正极龙头，液相法技术领先", description: "德方纳米（300769.SZ）是磷酸铁锂正极领域的代表性上市公司，磷酸铁锂正极龙头，液相法技术领先，在产业链中占据重要位置。" },
      { id: 11122, name: "湖南裕能", code: "301358.SZ", tag: "磷酸铁锂正极龙头，宁德时代/比亚迪核心供应商", description: "湖南裕能（301358.SZ）是磷酸铁锂正极领域的代表性上市公司，磷酸铁锂正极龙头，宁德时代/比亚迪核心供应商，在产业链中占据重要位置。" },
      { id: 11123, name: "万润新能", code: "688275.SH", tag: "磷酸铁锂正极，湖北万润系", description: "万润新能（688275.SH）是磷酸铁锂正极领域的代表性上市公司，磷酸铁锂正极，湖北万润系，在产业链中占据重要位置。" },
    ]},
    { id: 11023, name: "其他正极", level: "midstream", description: "钴酸锂用于消费电子，锰酸锂用于两轮车/储能。钴酸锂能量密度高但成本高、安全性差", plainLanguageDescription: "钴酸锂用于手机电池，锰酸锂用于电动自行车。市场占比小但不可或缺", parentId: 1102, stockCount: 2, childCount: 0, stocks: [
      { id: 11124, name: "厦钨新能", code: "688778.SH", tag: "钴酸锂龙头，3C电池正极第一", description: "厦钨新能（688778.SH）是其他正极领域的代表性上市公司，钴酸锂龙头，3C电池正极第一，在产业链中占据重要位置。" },
      { id: 11125, name: "湘潭电化", code: "002125.SZ", tag: "锰酸锂+电解二氧化锰", description: "湘潭电化（002125.SZ）是其他正极领域的代表性上市公司，锰酸锂+电解二氧化锰，在产业链中占据重要位置。" },
    ]},
  ],
  1103: [
    { id: 11031, name: "人造石墨", level: "midstream", description: "人造石墨循环性能好、膨胀率低，占负极出货80%+。璞泰来、杉杉股份、中科电气国内龙头", plainLanguageDescription: "人造石墨是负极主流，性能稳定。璞泰来是龙头，做负极+隔膜涂覆一体化", parentId: 1103, stockCount: 3, childCount: 0, stocks: [
      { id: 11126, name: "璞泰来", code: "603659.SH", tag: "人造石墨负极+涂覆隔膜龙头", description: "璞泰来（603659.SH）是人造石墨领域的代表性上市公司，人造石墨负极+涂覆隔膜龙头，在产业链中占据重要位置。" },
      { id: 11127, name: "中科电气", code: "300035.SZ", tag: "负极材料specialist，石墨化产能扩张", description: "中科电气（300035.SZ）是人造石墨领域的代表性上市公司，负极材料specialist，石墨化产能扩张，在产业链中占据重要位置。" },
      { id: 11128, name: "尚太科技", code: "001301.SZ", tag: "负极材料新秀，一体化成本优势", description: "尚太科技（001301.SZ）是人造石墨领域的代表性上市公司，负极材料新秀，一体化成本优势，在产业链中占据重要位置。" },
    ]},
    { id: 11032, name: "天然石墨/硅基", level: "midstream", description: "天然石墨成本低但循环性能差；硅基负极理论容量4200mAh/g是石墨10倍，但膨胀问题制约应用", plainLanguageDescription: "天然石墨便宜但用不久，硅基负极容量大但容易膨胀坏掉，是技术攻关方向", parentId: 1103, stockCount: 2, childCount: 0, stocks: [
      { id: 11129, name: "杉杉股份", code: "600884.SH", tag: "负极材料+偏光片，天然石墨+人造石墨", description: "杉杉股份（600884.SH）是天然石墨/硅基领域的代表性上市公司，负极材料+偏光片，天然石墨+人造石墨，在产业链中占据重要位置。" },
      { id: 11130, name: "硅宝科技", code: "300019.SZ", tag: "硅基负极材料，有机硅龙头", description: "硅宝科技（300019.SZ）是天然石墨/硅基领域的代表性上市公司，硅基负极材料，有机硅龙头，在产业链中占据重要位置。" },
    ]},
  ],
  1104: [
    { id: 11041, name: "电解液", level: "midstream", description: "溶质（六氟磷酸锂/LiFSI）+溶剂（DMC/EMC/EC）+添加剂（VC/FEC）。天赐材料、新宙邦全球龙头", plainLanguageDescription: "电解液是电池的血液，负责在正负极之间运送锂离子。天赐材料和新宙邦是全球龙头", parentId: 1104, stockCount: 3, childCount: 0, stocks: [
      { id: 11131, name: "新宙邦", code: "300037.SZ", tag: "电解液龙头，海外客户占比高", description: "新宙邦（300037.SZ）是电解液领域的代表性上市公司，电解液龙头，海外客户占比高，在产业链中占据重要位置。" },
      { id: 11132, name: "瑞泰新材", code: "301238.SZ", tag: "电解液specialist，LiFSI布局", description: "瑞泰新材（301238.SZ）是电解液领域的代表性上市公司，电解液specialist，LiFSI布局，在产业链中占据重要位置。" },
      { id: 11133, name: "石大胜华", code: "603026.SH", tag: "电解液溶剂龙头，DMC全球市占率领先", description: "石大胜华（603026.SH）是电解液领域的代表性上市公司，电解液溶剂龙头，DMC全球市占率领先，在产业链中占据重要位置。" },
    ]},
    { id: 11042, name: "隔膜", level: "midstream", description: "湿法隔膜占主流（70%+），涂覆隔膜提升安全性。恩捷股份全球市占率35%+，技术壁垒最高的锂电材料环节", plainLanguageDescription: "隔膜是电池的安全阀，防止正负极短路。恩捷股份全球第一，技术门槛极高", parentId: 1104, stockCount: 3, childCount: 0, stocks: [
      { id: 11134, name: "恩捷股份", code: "002812.SZ", tag: "隔膜全球龙头，湿法隔膜市占率35%+", description: "恩捷股份（002812.SZ）是隔膜领域的代表性上市公司，隔膜全球龙头，湿法隔膜市占率35%+，在产业链中占据重要位置。" },
      { id: 11135, name: "星源材质", code: "300568.SZ", tag: "隔膜龙二，干法+湿法双轮", description: "星源材质（300568.SZ）是隔膜领域的代表性上市公司，隔膜龙二，干法+湿法双轮，在产业链中占据重要位置。" },
      { id: 11136, name: "中材科技", code: "002080.SZ", tag: "隔膜+玻纤，央企背景", description: "中材科技（002080.SZ）是隔膜领域的代表性上市公司，隔膜+玻纤，央企背景，在产业链中占据重要位置。" },
    ]},
  ],
  1105: [
    { id: 11051, name: "动力电池电芯", level: "midstream", description: "方形/圆柱/软包动力电池。宁德时代全球市占率37%，比亚迪刀片电池、亿纬锂能大圆柱是技术亮点", plainLanguageDescription: "动力电池是新能源车的心脏。宁德时代全球第一，比亚迪刀片电池安全性突出", parentId: 1105, stockCount: 4, childCount: 0, stocks: [
      { id: 11137, name: "宁德时代", code: "300750.SZ", tag: "动力电池全球龙头，市占率37%，麒麟电池/神行电池", description: "宁德时代（300750.SZ）是动力电池电芯领域的代表性上市公司，动力电池全球龙头，市占率37%，麒麟电池/神行电池，在产业链中占据重要位置。" },
      { id: 11138, name: "亿纬锂能", code: "300014.SZ", tag: "动力电池+储能电池，大圆柱电池技术领先", description: "亿纬锂能（300014.SZ）是动力电池电芯领域的代表性上市公司，动力电池+储能电池，大圆柱电池技术领先，在产业链中占据重要位置。" },
      { id: 11139, name: "国轩高科", code: "002074.SZ", tag: "动力电池龙三，大众入股，铁锂技术领先", description: "国轩高科（002074.SZ）是动力电池电芯领域的代表性上市公司，动力电池龙三，大众入股，铁锂技术领先，在产业链中占据重要位置。" },
      { id: 11140, name: "欣旺达", code: "300207.SZ", tag: "动力电池+消费电池，快充技术", description: "欣旺达（300207.SZ）是动力电池电芯领域的代表性上市公司，动力电池+消费电池，快充技术，在产业链中占据重要位置。" },
    ]},
    { id: 11052, name: "储能电池电芯", level: "midstream", description: "发电侧/电网侧/用户侧储能电芯。磷酸铁锂是储能主流路线，循环寿命要求6000次以上", plainLanguageDescription: "储能电池比动力电池寿命更长，要充放电6000次以上。磷酸铁锂是储能首选", parentId: 1105, stockCount: 2, childCount: 0, stocks: [
      { id: 11141, name: "鹏辉能源", code: "300438.SZ", tag: "储能电池龙头，户储+大储双轮", description: "鹏辉能源（300438.SZ）是储能电池电芯领域的代表性上市公司，储能电池龙头，户储+大储双轮，在产业链中占据重要位置。" },
      { id: 11142, name: "派能科技", code: "688063.SH", tag: "户用储能电池龙头，海外占比高", description: "派能科技（688063.SH）是储能电池电芯领域的代表性上市公司，户用储能电池龙头，海外占比高，在产业链中占据重要位置。" },
    ]},
    { id: 11053, name: "电池Pack/BMS", level: "midstream", description: "电池模组、电池管理系统（BMS）、热管理系统。Pack占电池系统成本30%+，BMS是电池安全的大脑", plainLanguageDescription: "把电池芯组装成电池包，加上管理系统和热管理。BMS是电池安全的大脑", parentId: 1105, stockCount: 1, childCount: 0, stocks: [
      { id: 11143, name: "比亚迪", code: "002594.SZ", tag: "刀片电池+整车一体化，电池Pack自研自制", description: "比亚迪（002594.SZ）是电池Pack/BMS领域的代表性上市公司，刀片电池+整车一体化，电池Pack自研自制，在产业链中占据重要位置。" },
    ]},
  ],
  1106: [
    { id: 11061, name: "新能源乘用车", level: "downstream", description: "纯电动/插混乘用车。比亚迪国内市占率30%+，特斯拉中国第二；理想/蔚来/小鹏新势力三强", plainLanguageDescription: "装锂电池的电动汽车。比亚迪是国内老大，特斯拉是外资老大，理想蔚来小鹏是新势力", parentId: 1106, stockCount: 3, childCount: 0, stocks: [
      { id: 11144, name: "比亚迪", code: "002594.SZ", tag: "新能源车全球龙头，刀片电池+DM-i双轮驱动", description: "比亚迪（002594.SZ）是新能源乘用车领域的代表性上市公司，新能源车全球龙头，刀片电池+DM-i双轮驱动，在产业链中占据重要位置。" },
      { id: 11145, name: "赛力斯", code: "601127.SH", tag: "问界系列，华为智选车模式", description: "赛力斯（601127.SH）是新能源乘用车领域的代表性上市公司，问界系列，华为智选车模式，在产业链中占据重要位置。" },
      { id: 11146, name: "江淮汽车", code: "600418.SH", tag: "蔚来代工+自有品牌，华为合作", description: "江淮汽车（600418.SH）是新能源乘用车领域的代表性上市公司，蔚来代工+自有品牌，华为合作，在产业链中占据重要位置。" },
    ]},
    { id: 11062, name: "新能源商用车", level: "downstream", description: "电动公交、电动物流车、电动重卡。商用车电动化渗透率低于乘用车，但政策推动加速", plainLanguageDescription: "电动公交车、物流车、重卡。比乘用车电动化慢，但政策在推", parentId: 1106, stockCount: 0, childCount: 0, stocks: [
    ]},
  ],
  1107: [
    { id: 11071, name: "发电侧/电网侧储能", level: "downstream", description: "光伏电站配储、风电配储、电网调峰调频。强制配储政策推动，2024年中国新型储能装机超50GWh", plainLanguageDescription: "给风电光伏配的巨型充电宝，没风没太阳的时候放电。政策强制要求配储", parentId: 1107, stockCount: 2, childCount: 0, stocks: [
      { id: 11147, name: "阳光电源", code: "300274.SZ", tag: "储能逆变器+系统集成全球龙头", description: "阳光电源（300274.SZ）是发电侧/电网侧储能领域的代表性上市公司，储能逆变器+系统集成全球龙头，在产业链中占据重要位置。" },
      { id: 11148, name: "科华数据", code: "002335.SZ", tag: "储能系统+UPS，数据中心+储能双轮", description: "科华数据（002335.SZ）是发电侧/电网侧储能领域的代表性上市公司，储能系统+UPS，数据中心+储能双轮，在产业链中占据重要位置。" },
    ]},
    { id: 11072, name: "用户侧储能", level: "downstream", description: "户用储能、工商业储能、便携式储能。欧洲能源危机推动户储爆发，中国工商业储能在峰谷电价差大的地区快速渗透", plainLanguageDescription: "家里和工厂用的储能系统，晚上充电白天用，省电费。欧洲家用储能很火", parentId: 1107, stockCount: 1, childCount: 0, stocks: [
      { id: 11149, name: "德业股份", code: "605117.SH", tag: "户用储能逆变器龙头，海外占比高", description: "德业股份（605117.SH）是用户侧储能领域的代表性上市公司，户用储能逆变器龙头，海外占比高，在产业链中占据重要位置。" },
    ]},
    { id: 11073, name: "消费电子电池", level: "downstream", description: "手机、笔记本、平板、TWS耳机电池。消费电池市场增速放缓，但AI手机/PC可能带来换机潮和电池升级", plainLanguageDescription: "手机、笔记本电脑用的电池。市场增长放缓，但AI手机和电脑可能带来新需求", parentId: 1107, stockCount: 2, childCount: 0, stocks: [
      { id: 11150, name: "珠海冠宇", code: "688772.SH", tag: "消费电池龙头，笔记本电池全球第二", description: "珠海冠宇（688772.SH）是消费电子电池领域的代表性上市公司，消费电池龙头，笔记本电池全球第二，在产业链中占据重要位置。" },
      { id: 11151, name: "德赛电池", code: "000049.SZ", tag: "消费电池Pack龙头，苹果供应商", description: "德赛电池（000049.SZ）是消费电子电池领域的代表性上市公司，消费电池Pack龙头，苹果供应商，在产业链中占据重要位置。" },
    ]},
  ],
  1108: [
    { id: 11081, name: "锂电设备", level: "downstream", description: "涂布机、卷绕机、叠片机、化成分容设备。设备投资占产线投资60%+，先导智能、杭可科技国内龙头", plainLanguageDescription: "造电池用的机器设备，占工厂投资六成。先导智能和杭可科技是龙头", parentId: 1108, stockCount: 4, childCount: 0, stocks: [
      { id: 11152, name: "先导智能", code: "300450.SZ", tag: "锂电设备全球龙头，整线解决方案", description: "先导智能（300450.SZ）是锂电设备领域的代表性上市公司，锂电设备全球龙头，整线解决方案，在产业链中占据重要位置。" },
      { id: 11153, name: "杭可科技", code: "688006.SH", tag: "化成分容设备龙头，后段设备核心", description: "杭可科技（688006.SH）是锂电设备领域的代表性上市公司，化成分容设备龙头，后段设备核心，在产业链中占据重要位置。" },
      { id: 11154, name: "赢合科技", code: "300457.SZ", tag: "涂布机+卷绕机，前段设备龙头", description: "赢合科技（300457.SZ）是锂电设备领域的代表性上市公司，涂布机+卷绕机，前段设备龙头，在产业链中占据重要位置。" },
      { id: 11155, name: "利元亨", code: "688499.SH", tag: "锂电设备+光伏设备，整线方案", description: "利元亨（688499.SH）是锂电设备领域的代表性上市公司，锂电设备+光伏设备，整线方案，在产业链中占据重要位置。" },
    ]},
    { id: 11082, name: "电池回收", level: "downstream", description: "退役电池梯次利用、再生回收提取金属。回收可提取锂/镍/钴/锰，减少资源依赖，降低碳排放", plainLanguageDescription: "电池用完了回收提取有价值的金属。格林美是龙头，回收能减少挖矿", parentId: 1108, stockCount: 2, childCount: 0, stocks: [
      { id: 11156, name: "天奇股份", code: "002009.SZ", tag: "电池回收+汽车拆解，梯次利用布局", description: "天奇股份（002009.SZ）是电池回收领域的代表性上市公司，电池回收+汽车拆解，梯次利用布局，在产业链中占据重要位置。" },
      { id: 11157, name: "光华科技", code: "002741.SZ", tag: "电池回收+磷酸铁锂，湿法回收技术", description: "光华科技（002741.SZ）是电池回收领域的代表性上市公司，电池回收+磷酸铁锂，湿法回收技术，在产业链中占据重要位置。" },
    ]},
  ],
};

// === 连接关系 ===
const connections: LocalConnection[] = [
  // === 根节点骨架连接 ===
  { id: 11001, fromNodeId: 1100, toNodeId: 1102, label: "矿产→正极" },
  { id: 11002, fromNodeId: 1100, toNodeId: 1103, label: "矿产→负极" },
  { id: 11003, fromNodeId: 1101, toNodeId: 1102, label: "锂化工→正极" },
  { id: 11004, fromNodeId: 1101, toNodeId: 1104, label: "锂化工→电解液" },
  { id: 11005, fromNodeId: 1102, toNodeId: 1105, label: "正极→电芯" },
  { id: 11006, fromNodeId: 1103, toNodeId: 1105, label: "负极→电芯" },
  { id: 11007, fromNodeId: 1104, toNodeId: 1105, label: "电解液/隔膜→电芯" },
  { id: 11008, fromNodeId: 1105, toNodeId: 1106, label: "电芯→新能源车" },
  { id: 11009, fromNodeId: 1105, toNodeId: 1107, label: "电芯→储能" },
  { id: 11010, fromNodeId: 1105, toNodeId: 1108, label: "电芯→设备/回收" },
  { id: 11011, fromNodeId: 1106, toNodeId: 1107, label: "车→储能" },
  // === 上游→中游（原材料供给） ===
  { id: 11012, fromNodeId: 11001, toNodeId: 11011, label: "锂矿→锂盐" },
  { id: 11013, fromNodeId: 11001, toNodeId: 11012, label: "锂矿→六氟磷酸锂" },
  { id: 11014, fromNodeId: 11002, toNodeId: 11021, label: "镍钴→三元正极" },
  { id: 11015, fromNodeId: 11003, toNodeId: 11022, label: "磷矿→磷酸铁锂" },
  { id: 11016, fromNodeId: 11003, toNodeId: 11032, label: "石墨→负极" },
  { id: 11017, fromNodeId: 11011, toNodeId: 11021, label: "碳酸锂→三元正极" },
  { id: 11018, fromNodeId: 11011, toNodeId: 11022, label: "碳酸锂→磷酸铁锂" },
  { id: 11019, fromNodeId: 11012, toNodeId: 11041, label: "六氟磷酸锂→电解液" },
  { id: 11020, fromNodeId: 11013, toNodeId: 11042, label: "PVDF→隔膜涂覆" },
  { id: 11021, fromNodeId: 11013, toNodeId: 11021, label: "PVDF→正极粘结剂" },
  { id: 11022, fromNodeId: 11021, toNodeId: 11002, label: "三元正极→镍钴采购" },
  // === 中游→上游（原材料采购） ===
  { id: 11023, fromNodeId: 11022, toNodeId: 11003, label: "磷酸铁锂→磷矿采购" },
  { id: 11024, fromNodeId: 11031, toNodeId: 11003, label: "人造石墨→石墨采购" },
  { id: 11025, fromNodeId: 11041, toNodeId: 11012, label: "电解液→六氟磷酸锂采购" },
  { id: 11026, fromNodeId: 11042, toNodeId: 11013, label: "隔膜→PVDF采购" },
  { id: 11027, fromNodeId: 11021, toNodeId: 11011, label: "三元正极→碳酸锂采购" },
  { id: 11028, fromNodeId: 11022, toNodeId: 11011, label: "磷酸铁锂→碳酸锂采购" },
  { id: 11029, fromNodeId: 11021, toNodeId: 11051, label: "三元正极→动力电池" },
  { id: 11030, fromNodeId: 11022, toNodeId: 11051, label: "磷酸铁锂→动力电池" },
  // === 中游→中游（材料→电芯） ===
  { id: 11031, fromNodeId: 11023, toNodeId: 11051, label: "钴酸锂→消费电子电池" },
  { id: 11032, fromNodeId: 11031, toNodeId: 11051, label: "人造石墨→动力电池" },
  { id: 11033, fromNodeId: 11032, toNodeId: 11051, label: "天然石墨→动力电池" },
  { id: 11034, fromNodeId: 11041, toNodeId: 11051, label: "电解液→动力电池" },
  { id: 11035, fromNodeId: 11042, toNodeId: 11051, label: "隔膜→动力电池" },
  { id: 11036, fromNodeId: 11041, toNodeId: 11052, label: "电解液→储能电池" },
  { id: 11037, fromNodeId: 11042, toNodeId: 11052, label: "隔膜→储能电池" },
  { id: 11038, fromNodeId: 11051, toNodeId: 11021, label: "动力电池→正极采购" },
  { id: 11039, fromNodeId: 11051, toNodeId: 11031, label: "动力电池→负极采购" },
  // === 中游→中游反向 ===
  { id: 11040, fromNodeId: 11051, toNodeId: 11041, label: "动力电池→电解液采购" },
  { id: 11041, fromNodeId: 11051, toNodeId: 11042, label: "动力电池→隔膜采购" },
  { id: 11042, fromNodeId: 11051, toNodeId: 11061, label: "动力电池→乘用车" },
  { id: 11043, fromNodeId: 11051, toNodeId: 11062, label: "动力电池→商用车" },
  // === 中游→下游（电芯→应用） ===
  { id: 11044, fromNodeId: 11052, toNodeId: 11071, label: "储能电池→发电侧储能" },
  { id: 11045, fromNodeId: 11052, toNodeId: 11072, label: "储能电池→用户侧储能" },
  { id: 11046, fromNodeId: 11051, toNodeId: 11073, label: "动力电池→消费电子" },
  { id: 11047, fromNodeId: 11051, toNodeId: 11081, label: "电芯→设备需求" },
  { id: 11048, fromNodeId: 11051, toNodeId: 11082, label: "退役电池→回收" },
  { id: 11049, fromNodeId: 11061, toNodeId: 11051, label: "乘用车→电池采购" },
  { id: 11050, fromNodeId: 11071, toNodeId: 11052, label: "储能→电池采购" },
  { id: 11051, fromNodeId: 11073, toNodeId: 11051, label: "消费电子→电池采购" },
  // === 下游→中游（采购） ===
  { id: 11052, fromNodeId: 11061, toNodeId: 11062, label: "乘用车→商用车" },
  { id: 11053, fromNodeId: 11071, toNodeId: 11072, label: "发电侧→用户侧" },
  { id: 11054, fromNodeId: 11081, toNodeId: 11082, label: "设备→回收配套" },
  // === 下游内部 ===
  { id: 11055, fromNodeId: 11053, toNodeId: 7, label: "BMS芯片需求" },
  { id: 11056, fromNodeId: 11053, toNodeId: 7, label: "功率半导体需求" },
  { id: 11057, fromNodeId: 11051, toNodeId: 80501, label: "铜箔采购" },
  // === 跨产业连接 ===
  { id: 11058, fromNodeId: 11021, toNodeId: 80503, label: "镍钴采购" },
  { id: 11059, fromNodeId: 11071, toNodeId: 610, label: "储能电力并网" },
  { id: 11060, fromNodeId: 11071, toNodeId: 704, label: "储能变压器需求" },
  { id: 11061, fromNodeId: 7, toNodeId: 11053, label: "半导体芯片供应" },
  { id: 11062, fromNodeId: 80501, toNodeId: 11051, label: "铜箔供应" },
  { id: 11063, fromNodeId: 80503, toNodeId: 11021, label: "镍钴供应" },
  { id: 11064, fromNodeId: 610, toNodeId: 11071, label: "电力供应" },
  { id: 11065, fromNodeId: 704, toNodeId: 11071, label: "变压器供应" },
];

// === 导出产业数据 ===
export const batteryData: IndustryData = {
  slug: "battery",
  name: "锂电",
  icon: "Battery",
  description: "锂电产业链涵盖锂/镍/钴/磷矿上游资源、碳酸锂/电解液/正极/负极/隔膜中游材料、动力电池/储能电池中游制造、新能源汽车/储能/消费电子下游应用。中国锂电产业链全球领先，宁德时代市占率37%。",
  plainLanguageDescription: "锂电产业链就是造锂电池的全过程。从挖矿（锂矿镍矿）到做材料（正负极电解液隔膜），再到做电池芯，最后装到电动车和储能电站里。中国在这个产业链上全球最强。",
  rootNodes,
  childNodes,
  connections,
};
