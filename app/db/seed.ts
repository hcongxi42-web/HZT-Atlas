import { getDb } from "../api/queries/connection";
import { industries, chainNodes, stocks, nodeConnections } from "./schema";
import { eq } from "drizzle-orm";

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  // Check if already seeded
  const existing = await db.select().from(industries).where(eq(industries.slug, "semiconductor"));
  if (existing.length > 0) {
    console.log("Semiconductor data already exists, skipping seed.");
    process.exit(0);
  }

  // ===== 1. 插入产业 =====
  const [industryResult] = await db.insert(industries).values({
    name: "半导体",
    slug: "semiconductor",
    icon: "Cpu",
    description: "半导体产业链涵盖上游材料设备、中游设计制造封测、下游终端应用三大环节，是现代信息产业的基石。",
  });
  const industryId = Number(industryResult.insertId);
  console.log("Created industry: semiconductor, id:", industryId);

  // ===== 2. 插入一级概念节点 =====
  const level1Nodes = [
    // 上游 — 材料与设备
    { name: "EDA/IP核", level: "upstream" as const, description: "电子设计自动化工具与知识产权核，芯片设计的基石" },
    { name: "半导体设备", level: "upstream" as const, description: "芯片制造所需的核心设备，包括光刻、刻蚀、薄膜沉积等" },
    { name: "半导体材料", level: "upstream" as const, description: "硅片、光刻胶、电子特气、靶材等基础材料" },
    { name: "晶圆制造（代工）", level: "upstream" as const, description: "晶圆代工是芯片制造的核心环节" },
    // 中游 — 设计与制造
    { name: "芯片设计", level: "midstream" as const, description: "集成电路设计，决定芯片功能和性能" },
    { name: "存储芯片", level: "midstream" as const, description: "DRAM、NAND Flash等存储器芯片" },
    { name: "功率半导体", level: "midstream" as const, description: "IGBT、MOSFET等功率器件" },
    { name: "模拟芯片", level: "midstream" as const, description: "电源管理、信号链等模拟集成电路" },
    { name: "逻辑芯片", level: "midstream" as const, description: "CPU、GPU、FPGA等数字逻辑芯片" },
    // 下游 — 封测与应用
    { name: "封装测试", level: "downstream" as const, description: "芯片封装与测试，产业链后端关键环节" },
    { name: "终端应用", level: "downstream" as const, description: "消费电子、汽车电子、AI服务器等终端市场" },
    { name: "分销渠道", level: "downstream" as const, description: "芯片分销商与贸易商" },
  ];

  const l1Results = await db.insert(chainNodes).values(
    level1Nodes.map((n, i) => ({
      industryId,
      parentId: null,
      name: n.name,
      level: n.level,
      description: n.description,
      sortOrder: i,
    }))
  );

  // Get inserted IDs
  const insertedL1 = await db.select().from(chainNodes).where(eq(chainNodes.industryId, industryId));
  const l1IdMap = new Map(insertedL1.map(n => [n.name, n.id]));

  console.log("Created", insertedL1.length, "level-1 nodes");

  // ===== 3. 插入二级概念节点（子概念） =====
  const level2Data: { parentName: string; name: string; level: string; description: string }[] = [
    // EDA/IP核
    { parentName: "EDA/IP核", name: "EDA工具", level: "upstream", description: "电子设计自动化软件" },
    { parentName: "EDA/IP核", name: "IP授权", level: "upstream", description: "半导体知识产权授权服务" },
    // 半导体设备
    { parentName: "半导体设备", name: "光刻设备", level: "upstream", description: "光刻机及配套系统" },
    { parentName: "半导体设备", name: "刻蚀设备", level: "upstream", description: "干法/湿法刻蚀设备" },
    { parentName: "半导体设备", name: "薄膜沉积", level: "upstream", description: "CVD、PVD等薄膜沉积设备" },
    { parentName: "半导体设备", name: "量测设备", level: "upstream", description: "过程控制与检测设备" },
    // 半导体材料
    { parentName: "半导体材料", name: "硅片", level: "upstream", description: "半导体级硅晶圆" },
    { parentName: "半导体材料", name: "光刻胶", level: "upstream", description: "光刻工艺核心材料" },
    { parentName: "半导体材料", name: "电子特气", level: "upstream", description: "高纯电子特种气体" },
    { parentName: "半导体材料", name: "CMP材料", level: "upstream", description: "化学机械抛光材料" },
    // 芯片设计
    { parentName: "芯片设计", name: "SOC设计", level: "midstream", description: "系统级芯片设计" },
    { parentName: "芯片设计", name: "ASIC设计", level: "midstream", description: "专用集成电路设计" },
    { parentName: "芯片设计", name: "无线通信芯片", level: "midstream", description: "WiFi、蓝牙、5G基带芯片" },
    // 存储芯片
    { parentName: "存储芯片", name: "DRAM内存", level: "midstream", description: "动态随机存取存储器" },
    { parentName: "存储芯片", name: "NAND闪存", level: "midstream", description: "闪存存储器" },
    { parentName: "存储芯片", name: "NOR闪存", level: "midstream", description: "代码型闪存存储器" },
    // 功率半导体
    { parentName: "功率半导体", name: "IGBT", level: "midstream", description: "绝缘栅双极型晶体管" },
    { parentName: "功率半导体", name: "MOSFET", level: "midstream", description: "金属氧化物半导体场效应管" },
    { parentName: "功率半导体", name: "SiC/GaN", level: "midstream", description: "第三代半导体功率器件" },
    // 模拟芯片
    { parentName: "模拟芯片", name: "电源管理", level: "midstream", description: "电源管理芯片PMIC" },
    { parentName: "模拟芯片", name: "信号链", level: "midstream", description: "ADC/DAC等信号链芯片" },
    { parentName: "模拟芯片", name: "射频前端", level: "midstream", description: "射频开关、LNA、滤波器" },
    // 逻辑芯片
    { parentName: "逻辑芯片", name: "CPU", level: "midstream", description: "中央处理器" },
    { parentName: "逻辑芯片", name: "GPU", level: "midstream", description: "图形处理器" },
    { parentName: "逻辑芯片", name: "FPGA", level: "midstream", description: "现场可编程门阵列" },
    // 封装测试
    { parentName: "封装测试", name: "先进封装", level: "downstream", description: "Chiplet、3D封装等先进封装技术" },
    { parentName: "封装测试", name: "传统封装", level: "downstream", description: "QFN、BGA等传统封装" },
    { parentName: "封装测试", name: "测试服务", level: "downstream", description: "晶圆测试与成品测试" },
    // 终端应用
    { parentName: "终端应用", name: "消费电子", level: "downstream", description: "手机、PC、平板等消费电子产品" },
    { parentName: "终端应用", name: "汽车电子", level: "downstream", description: "新能源车功率器件、智能驾驶芯片" },
    { parentName: "终端应用", name: "AI服务器", level: "downstream", description: "AI训练与推理服务器" },
    { parentName: "终端应用", name: "IoT物联网", level: "downstream", description: "物联网终端设备" },
    // 分销渠道
    { parentName: "分销渠道", name: "授权分销", level: "downstream", description: "原厂授权分销商" },
    { parentName: "分销渠道", name: "独立分销", level: "downstream", description: "独立贸易商与现货商" },
  ];

  await db.insert(chainNodes).values(
    level2Data.map((n, i) => ({
      industryId,
      parentId: l1IdMap.get(n.parentName) ?? 0,
      name: n.name,
      level: n.level,
      description: n.description,
      sortOrder: i,
    }))
  );

  const insertedL2 = await db.select().from(chainNodes).where(eq(chainNodes.industryId, industryId));
  const allIdMap = new Map(insertedL2.map(n => [n.name, n.id]));

  console.log("Created", level2Data.length, "level-2 nodes");

  // ===== 4. 插入股票数据 =====
  const stockData: { nodeName: string; name: string; code: string; tag: string }[] = [
    // EDA工具
    { nodeName: "EDA工具", name: "华大九天", code: "301269.SZ", tag: "国产EDA龙头" },
    { nodeName: "EDA工具", name: "概伦电子", code: "688206.SH", tag: "器件建模EDA" },
    { nodeName: "EDA工具", name: "广立微", code: "301095.SZ", tag: "良率提升EDA" },
    // IP授权
    { nodeName: "IP授权", name: "芯原股份", code: "688521.SH", tag: "IP授权龙头" },
    { nodeName: "IP授权", name: "国芯科技", code: "688262.SH", tag: "嵌入式CPU IP" },
    // 光刻设备
    { nodeName: "光刻设备", name: "张江高科", code: "600895.SH", tag: "上海微电子关联" },
    // 刻蚀设备
    { nodeName: "刻蚀设备", name: "中微公司", code: "688012.SH", tag: "刻蚀设备龙头" },
    { nodeName: "刻蚀设备", name: "北方华创", code: "002371.SZ", tag: "半导体设备平台" },
    // 薄膜沉积
    { nodeName: "薄膜沉积", name: "拓荆科技", code: "688072.SH", tag: "CVD设备龙头" },
    { nodeName: "薄膜沉积", name: "北方华创", code: "002371.SZ", tag: "PVD/CVD设备" },
    // 量测设备
    { nodeName: "量测设备", name: "精测电子", code: "300567.SZ", tag: "检测设备" },
    { nodeName: "量测设备", name: "中科飞测", code: "688361.SH", tag: "光学检测设备" },
    // 硅片
    { nodeName: "硅片", name: "沪硅产业", code: "688126.SH", tag: "大硅片龙头" },
    { nodeName: "硅片", name: "立昂微", code: "605358.SH", tag: "硅片+功率器件" },
    { nodeName: "硅片", name: "TCL中环", code: "002129.SZ", tag: "半导体硅片" },
    // 光刻胶
    { nodeName: "光刻胶", name: "南大光电", code: "300346.SZ", tag: "ArF光刻胶" },
    { nodeName: "光刻胶", name: "晶瑞电材", code: "300655.SZ", tag: "光刻胶+电子化学品" },
    { nodeName: "光刻胶", name: "容大感光", code: "300576.SZ", tag: "PCB/显示光刻胶" },
    // 电子特气
    { nodeName: "电子特气", name: "南大光电", code: "300346.SZ", tag: "电子特气" },
    { nodeName: "电子特气", name: "华特气体", code: "688268.SH", tag: "电子特气龙头" },
    { nodeName: "电子特气", name: "凯美特气", code: "002549.SZ", tag: "电子特气" },
    // CMP材料
    { nodeName: "CMP材料", name: "安集科技", code: "688019.SH", tag: "CMP抛光液龙头" },
    // 晶圆制造
    { nodeName: "晶圆制造（代工）", name: "中芯国际", code: "688981.SH", tag: "晶圆代工龙头" },
    { nodeName: "晶圆制造（代工）", name: "华虹公司", code: "688347.SH", tag: "特色工艺代工" },
    // SOC设计
    { nodeName: "SOC设计", name: "瑞芯微", code: "603893.SH", tag: "SoC芯片设计" },
    { nodeName: "SOC设计", name: "全志科技", code: "300458.SZ", tag: "智能终端SoC" },
    { nodeName: "SOC设计", name: "晶晨股份", code: "688099.SH", tag: "智能机顶盒SoC" },
    // ASIC设计
    { nodeName: "ASIC设计", name: "寒武纪", code: "688256.SH", tag: "AI芯片设计" },
    { nodeName: "ASIC设计", name: "海光信息", code: "688041.SH", tag: "DCU/CPU设计" },
    // 无线通信芯片
    { nodeName: "无线通信芯片", name: "紫光展锐", code: "未上市", tag: "通信芯片设计" },
    { nodeName: "无线通信芯片", name: "乐鑫科技", code: "688018.SH", tag: "WiFi MCU" },
    // DRAM内存
    { nodeName: "DRAM内存", name: "兆易创新", code: "603986.SH", tag: "利基型DRAM" },
    { nodeName: "DRAM内存", name: "北京君正", code: "300223.SZ", tag: "车规级DRAM" },
    // NAND闪存
    { nodeName: "NAND闪存", name: "长江存储", code: "未上市", tag: "NAND Flash龙头" },
    { nodeName: "NAND闪存", name: "兆易创新", code: "603986.SH", tag: "NOR+NAND" },
    // NOR闪存
    { nodeName: "NOR闪存", name: "兆易创新", code: "603986.SH", tag: "NOR Flash龙头" },
    { nodeName: "NOR闪存", name: "普冉股份", code: "688766.SH", tag: "NOR Flash" },
    { nodeName: "NOR闪存", name: "东芯股份", code: "688110.SH", tag: "中小容量存储" },
    // IGBT
    { nodeName: "IGBT", name: "斯达半导", code: "603290.SH", tag: "IGBT模块龙头" },
    { nodeName: "IGBT", name: "时代电气", code: "688187.SH", tag: "轨交/车规IGBT" },
    { nodeName: "IGBT", name: "士兰微", code: "600460.SH", tag: "IDM模式功率器件" },
    // MOSFET
    { nodeName: "MOSFET", name: "新洁能", code: "605111.SH", tag: "MOSFET设计" },
    { nodeName: "MOSFET", name: "闻泰科技", code: "600745.SH", tag: "安世半导体" },
    // SiC/GaN
    { nodeName: "SiC/GaN", name: "三安光电", code: "600703.SH", tag: "SiC/GaN衬底+外延" },
    { nodeName: "SiC/GaN", name: "天岳先进", code: "688234.SH", tag: "SiC衬底龙头" },
    { nodeName: "SiC/GaN", name: "晶盛机电", code: "300316.SZ", tag: "SiC设备+材料" },
    // 电源管理
    { nodeName: "电源管理", name: "圣邦股份", code: "300661.SZ", tag: "模拟芯片龙头" },
    { nodeName: "电源管理", name: "韦尔股份", code: "603501.SH", tag: "CIS+电源管理" },
    { nodeName: "电源管理", name: "晶丰明源", code: "688368.SH", tag: "LED驱动IC" },
    // 信号链
    { nodeName: "信号链", name: "思瑞浦", code: "688536.SH", tag: "信号链芯片" },
    { nodeName: "信号链", name: "纳芯微", code: "688052.SH", tag: "隔离芯片+信号链" },
    // 射频前端
    { nodeName: "射频前端", name: "卓胜微", code: "300782.SZ", tag: "射频开关龙头" },
    { nodeName: "射频前端", name: "唯捷创芯", code: "688153.SH", tag: "射频功率放大器" },
    // CPU
    { nodeName: "CPU", name: "海光信息", code: "688041.SH", tag: "国产CPU龙头" },
    { nodeName: "CPU", name: "龙芯中科", code: "688047.SH", tag: "自主架构CPU" },
    // GPU
    { nodeName: "GPU", name: "寒武纪", code: "688256.SH", tag: "AI训练芯片" },
    { nodeName: "GPU", name: "景嘉微", code: "300474.SZ", tag: "国产GPU" },
    // FPGA
    { nodeName: "FPGA", name: "复旦微电", code: "688385.SH", tag: "FPGA设计" },
    { nodeName: "FPGA", name: "紫光国微", code: "002049.SZ", tag: "特种FPGA" },
    { nodeName: "FPGA", name: "安路科技", code: "688107.SH", tag: "民用FPGA" },
    // 先进封装
    { nodeName: "先进封装", name: "长电科技", code: "600584.SH", tag: "封测龙头" },
    { nodeName: "先进封装", name: "通富微电", code: "002156.SZ", tag: "AMD封装核心伙伴" },
    // 传统封装
    { nodeName: "传统封装", name: "华天科技", code: "002185.SZ", tag: "封测三强之一" },
    { nodeName: "传统封装", name: "晶方科技", code: "603005.SH", tag: "WLCSP封装" },
    // 消费电子
    { nodeName: "消费电子", name: "立讯精密", code: "002475.SZ", tag: "苹果供应链龙头" },
    { nodeName: "消费电子", name: "歌尔股份", code: "002241.SZ", tag: "声学+VR/AR" },
    // 汽车电子
    { nodeName: "汽车电子", name: "比亚迪", code: "002594.SZ", tag: "车规半导体IDM" },
    { nodeName: "汽车电子", name: "韦尔股份", code: "603501.SH", tag: "车载CIS龙头" },
    // AI服务器
    { nodeName: "AI服务器", name: "工业富联", code: "601138.SH", tag: "AI服务器代工" },
    { nodeName: "AI服务器", name: "浪潮信息", code: "000977.SZ", tag: "AI服务器龙头" },
    // 授权分销
    { nodeName: "授权分销", name: "中电港", code: "001287.SZ", tag: "电子元器件分销龙头" },
    { nodeName: "授权分销", name: "香农芯创", code: "300475.SZ", tag: "存储分销" },
  ];

  // 批量插入股票
  const stockValues = stockData
    .filter(s => allIdMap.has(s.nodeName))
    .map(s => ({
      nodeId: allIdMap.get(s.nodeName)!,
      name: s.name,
      code: s.code,
      tag: s.tag,
    }));

  // 分批插入，每批100条
  const batchSize = 100;
  for (let i = 0; i < stockValues.length; i += batchSize) {
    const batch = stockValues.slice(i, i + batchSize);
    await db.insert(stocks).values(batch);
  }

  console.log("Created", stockValues.length, "stocks");

  // ===== 5. 插入连接关系（上下游关联） =====
  const connectionData: { from: string; to: string; label: string }[] = [
    // 上游→中游
    { from: "EDA工具", to: "芯片设计", label: "设计工具支撑" },
    { from: "半导体设备", to: "晶圆制造（代工）", label: "制造设备供给" },
    { from: "半导体材料", to: "晶圆制造（代工）", label: "原材料供给" },
    { from: "晶圆制造（代工）", to: "芯片设计", label: "代工制造服务" },
    // 中游内部
    { from: "芯片设计", to: "封装测试", label: "设计→封测" },
    { from: "存储芯片", to: "封装测试", label: "存储→封测" },
    { from: "功率半导体", to: "封装测试", label: "功率→封测" },
    { from: "模拟芯片", to: "封装测试", label: "模拟→封测" },
    { from: "逻辑芯片", to: "封装测试", label: "逻辑→封测" },
    // 中游→下游
    { from: "封装测试", to: "终端应用", label: "封测→终端" },
    { from: "芯片设计", to: "终端应用", label: "芯片→终端" },
    { from: "存储芯片", to: "AI服务器", label: "存储→AI" },
    { from: "功率半导体", to: "汽车电子", label: "功率→汽车" },
    { from: "逻辑芯片", to: "AI服务器", label: "算力芯片→AI" },
    // 分销
    { from: "封装测试", to: "分销渠道", label: "成品分销" },
    { from: "芯片设计", to: "分销渠道", label: "芯片分销" },
  ];

  const connectionValues = connectionData
    .filter(c => allIdMap.has(c.from) && allIdMap.has(c.to))
    .map(c => ({
      industryId,
      fromNodeId: allIdMap.get(c.from)!,
      toNodeId: allIdMap.get(c.to)!,
      label: c.label,
    }));

  if (connectionValues.length > 0) {
    await db.insert(nodeConnections).values(connectionValues);
  }

  console.log("Created", connectionValues.length, "connections");
  console.log("Seed completed successfully!");
  process.exit(0);
}

seed().catch(e => {
  console.error("Seed failed:", e);
  process.exit(1);
});
