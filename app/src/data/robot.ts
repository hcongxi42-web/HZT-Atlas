// 人形机器人产业链数据
// ID段：根节点 1000-1008，子节点 10001-10099，股票 10101-10199，连接 10001-10099

import type { IndustryData, LocalNode, LocalConnection } from "./semiconductor";

// === 根节点 ===
const rootNodes: LocalNode[] = [
  { id: 1000, name: "减速器与传动", level: "upstream", description: "谐波减速器、RV减速器、行星减速器等人形机器人关节核心传动部件。人形机器人单台需10-16个减速器，占整机成本30%+，是国产替代核心环节", plainLanguageDescription: "人形机器人的关节减速器，像人体的膝盖和肘关节。减速器占机器人成本三成，国产替代空间大", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 1001, name: "电机与驱动系统", level: "upstream", description: "无框力矩电机、伺服电机、空心杯电机及配套驱动器。人形机器人单台需40+个电机，特斯拉Optimus使用无框力矩电机+行星滚柱丝杠方案", plainLanguageDescription: "机器人的肌肉，无框力矩电机力量大，空心杯电机灵巧。特斯拉机器人全身40多个电机", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 1002, name: "传感器系统", level: "upstream", description: "力矩传感器、视觉传感器、IMU惯性传感器、触觉传感器。六维力矩传感器单价数万元，是人形机器人实现精细操作的关键", plainLanguageDescription: "机器人的感官系统，眼睛（摄像头）、触觉（压力感应）、平衡感（陀螺仪），让机器人知道自己在哪、摸到的是什么", parentId: null, stockCount: 0, childCount: 4, stocks: [] },
  { id: 1003, name: "丝杠与结构件", level: "upstream", description: "滚珠丝杠、滚柱丝杠、轴承、轻量化结构件。行星滚柱丝杠用于直线关节，国产精度与进口差距正在缩小", plainLanguageDescription: "机器人骨架里的螺丝和轴承。丝杠让机器人手臂能直线伸缩，轴承让关节转得顺滑", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 1004, name: "控制器与AI芯片", level: "upstream", description: "AI芯片、边缘控制器、运动控制软件。人形机器人需要实时处理多传感器数据并做出运动决策，算力要求极高", plainLanguageDescription: "机器人的大脑和神经系统。AI芯片处理视觉和语言，控制器实时指挥每个关节怎么动", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 1005, name: "人形机器人本体", level: "midstream", description: "整机制造、系统集成、运动算法。国内优必选Walker、小米CyberOne、宇树H1等产品已发布，工业场景是率先落地方向", plainLanguageDescription: "把零部件组装成完整的人形机器人。目前国内多家企业已发布产品，但量产和大规模应用还在早期", parentId: null, stockCount: 0, childCount: 2, stocks: [] },
  { id: 1006, name: "工业制造应用", level: "downstream", description: "汽车制造、电子装配、物流仓储等工厂场景。人形机器人可替代重复性、危险性岗位，特斯拉计划Optimus进工厂", plainLanguageDescription: "机器人进工厂拧螺丝、搬箱子、检查产品。汽车厂和电子厂是人形机器人最先落地的地方", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 1007, name: "商业与家庭应用", level: "downstream", description: "商超服务、导览接待、家庭陪伴、教育娱乐、医疗康养。家庭场景是人形机器人的终极市场，但技术成熟度和成本仍是瓶颈", plainLanguageDescription: "机器人在商场指路、在家陪老人聊天、给孩子辅导功课。这是最大的市场，但离成熟还有距离", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
  { id: 1008, name: "特种作业应用", level: "downstream", description: "电力巡检、消防救援、核工业、太空作业等危险环境。人形机器人可进入人类难以到达或危险的场所", plainLanguageDescription: "机器人代替人类做危险工作，比如进核电站检查、去火场救人、在高压线旁巡檢", parentId: null, stockCount: 0, childCount: 3, stocks: [] },
];

// === 子节点 ===
const childNodes: Record<number, LocalNode[]> = {
  1000: [
    { id: 10001, name: "谐波减速器", level: "upstream", description: "谐波减速器精度高、体积小，适用于人形机器人小关节。绿的谐波国内市占率超60%，日本哈默纳科全球龙头", plainLanguageDescription: "小而精的减速器，适合机器人手指和手腕等小关节。绿的谐波是国内龙头", parentId: 1000, stockCount: 3, childCount: 0, stocks: [
      { id: 10101, name: "绿的谐波", code: "688017.SH", tag: "谐波减速器龙头，国内市占率60%+，人形机器人核心供应商", description: "绿的谐波（688017.SH）是谐波减速器领域的代表性上市公司，谐波减速器龙头，国内市占率60%+，人形机器人核心供应商，在产业链中占据重要位置。" },
      { id: 10102, name: "中大力德", code: "002896.SZ", tag: "RV+谐波减速器，工业机器人减速器全系列", description: "中大力德（002896.SZ）是谐波减速器领域的代表性上市公司，RV+谐波减速器，工业机器人减速器全系列，在产业链中占据重要位置。" },
      { id: 10103, name: "丰立智能", code: "301368.SZ", tag: "小模数齿轮+谐波减速器，精密传动", description: "丰立智能（301368.SZ）是谐波减速器领域的代表性上市公司，小模数齿轮+谐波减速器，精密传动，在产业链中占据重要位置。" },
    ]},
    { id: 10002, name: "RV减速器", level: "upstream", description: "RV减速器承载力大、刚度高，适用于人形机器人大关节（髋关节、肩关节）。双环传动国内RV减速器龙头", plainLanguageDescription: "大力气的减速器，适合机器人肩膀和胯部等大关节。双环传动是国内龙头", parentId: 1000, stockCount: 2, childCount: 0, stocks: [
      { id: 10104, name: "双环传动", code: "002472.SZ", tag: "RV减速器龙头，特斯拉机器人潜在供应商", description: "双环传动（002472.SZ）是RV减速器领域的代表性上市公司，RV减速器龙头，特斯拉机器人潜在供应商，在产业链中占据重要位置。" },
      { id: 10105, name: "秦川机床", code: "000837.SZ", tag: "RV减速器+齿轮加工设备，机床龙头", description: "秦川机床（000837.SZ）是RV减速器领域的代表性上市公司，RV减速器+齿轮加工设备，机床龙头，在产业链中占据重要位置。" },
    ]},
    { id: 10003, name: "行星/微型减速器", level: "upstream", description: "行星减速器结构紧凑、成本低，适用于人形机器人手指等微型关节。兆威机电微型传动系统全球领先", plainLanguageDescription: "小巧便宜的减速器，适合机器人手指关节。兆威机电做微型传动很出名", parentId: 1000, stockCount: 1, childCount: 0, stocks: [
      { id: 10106, name: "兆威机电", code: "003021.SZ", tag: "微型传动系统龙头，机器人手指关节潜在供应商", description: "兆威机电（003021.SZ）是行星/微型减速器领域的代表性上市公司，微型传动系统龙头，机器人手指关节潜在供应商，在产业链中占据重要位置。" },
    ]},
  ],
  1001: [
    { id: 10011, name: "无框力矩电机", level: "upstream", description: "无框力矩电机直接嵌入关节，扭矩密度高，是特斯拉Optimus采用的主流方案。步科股份、禾川科技布局人形机器人电机", plainLanguageDescription: "直接嵌在机器人关节里的强力电机，特斯拉机器人用的就是这种。步科股份和禾川科技在做", parentId: 1001, stockCount: 2, childCount: 0, stocks: [
      { id: 10107, name: "步科股份", code: "688160.SH", tag: "无框力矩电机，人形机器人关节电机核心供应商", description: "步科股份（688160.SH）是无框力矩电机领域的代表性上市公司，无框力矩电机，人形机器人关节电机核心供应商，在产业链中占据重要位置。" },
      { id: 10108, name: "禾川科技", code: "688320.SH", tag: "伺服电机+驱动器，工业自动化核心部件", description: "禾川科技（688320.SH）是无框力矩电机领域的代表性上市公司，伺服电机+驱动器，工业自动化核心部件，在产业链中占据重要位置。" },
    ]},
    { id: 10012, name: "伺服电机与驱动", level: "upstream", description: "伺服电机+驱动器实现高精度位置和力矩控制。汇川技术国内伺服龙头，市占率约20%", plainLanguageDescription: "伺服电机是工业机器人的标配，精度高、反应快。汇川技术是国内龙头", parentId: 1001, stockCount: 2, childCount: 0, stocks: [
      { id: 10109, name: "汇川技术", code: "300124.SZ", tag: "伺服系统龙头，国内市占率20%+，人形机器人电机潜在供应商", description: "汇川技术（300124.SZ）是伺服电机与驱动领域的代表性上市公司，伺服系统龙头，国内市占率20%+，人形机器人电机潜在供应商，在产业链中占据重要位置。" },
      { id: 10110, name: "雷赛智能", code: "002979.SZ", tag: "伺服驱动+运动控制，步进电机龙头", description: "雷赛智能（002979.SZ）是伺服电机与驱动领域的代表性上市公司，伺服驱动+运动控制，步进电机龙头，在产业链中占据重要位置。" },
    ]},
    { id: 10013, name: "空心杯电机", level: "upstream", description: "空心杯电机体积小、响应快、控制精度高，适用于人形机器人手指关节。鸣志电器国内龙头，全球份额约10%", plainLanguageDescription: "超级小的电机，适合机器人手指。鸣志电器是国内空心杯电机龙头", parentId: 1001, stockCount: 2, childCount: 0, stocks: [
      { id: 10111, name: "鸣志电器", code: "603728.SH", tag: "空心杯电机龙头，全球份额10%+，机器人手指关节核心", description: "鸣志电器（603728.SH）是空心杯电机领域的代表性上市公司，空心杯电机龙头，全球份额10%+，机器人手指关节核心，在产业链中占据重要位置。" },
      { id: 10112, name: "江苏雷利", code: "300660.SZ", tag: "微型电机+精密减速箱，家电和汽车电机龙头", description: "江苏雷利（300660.SZ）是空心杯电机领域的代表性上市公司，微型电机+精密减速箱，家电和汽车电机龙头，在产业链中占据重要位置。" },
    ]},
  ],
  1002: [
    { id: 10021, name: "力矩传感器", level: "upstream", description: "六维力矩传感器可同时测量三个方向的力和力矩，单价数万元，是人形机器人实现精细操作和走平衡的关键", plainLanguageDescription: "让机器人知道用了多大的力，像人的触觉。六维力传感器一个就卖几万块", parentId: 1002, stockCount: 2, childCount: 0, stocks: [
      { id: 10113, name: "柯力传感", code: "603662.SH", tag: "力学传感器龙头，六维力矩传感器布局人形机器人", description: "柯力传感（603662.SH）是力矩传感器领域的代表性上市公司，力学传感器龙头，六维力矩传感器布局人形机器人，在产业链中占据重要位置。" },
      { id: 10114, name: "汉威科技", code: "300007.SZ", tag: "气体+力学传感器，柔性触觉传感器", description: "汉威科技（300007.SZ）是力矩传感器领域的代表性上市公司，气体+力学传感器，柔性触觉传感器，在产业链中占据重要位置。" },
    ]},
    { id: 10022, name: "视觉传感器", level: "upstream", description: "3D视觉摄像头、激光雷达、深度相机。人形机器人需要实时感知环境、识别物体、规划路径", plainLanguageDescription: "机器人的眼睛，3D摄像头和激光雷达让机器人看到周围的世界", parentId: 1002, stockCount: 2, childCount: 0, stocks: [
      { id: 10115, name: "奥比中光", code: "688322.SH", tag: "3D视觉传感器龙头，服务机器人视觉方案", description: "奥比中光（688322.SH）是视觉传感器领域的代表性上市公司，3D视觉传感器龙头，服务机器人视觉方案，在产业链中占据重要位置。" },
      { id: 10116, name: "凌云光", code: "688400.SH", tag: "机器视觉+工业相机，视觉检测龙头", description: "凌云光（688400.SH）是视觉传感器领域的代表性上市公司，机器视觉+工业相机，视觉检测龙头，在产业链中占据重要位置。" },
    ]},
    { id: 10023, name: "IMU惯性传感器", level: "upstream", description: "惯性测量单元（IMU）检测加速度和角速度，是机器人保持平衡的核心。芯动联科高性能MEMS惯性器件国内领先", plainLanguageDescription: "机器人的平衡感，陀螺仪和加速度计让机器人站稳不摔倒", parentId: 1002, stockCount: 2, childCount: 0, stocks: [
      { id: 10117, name: "芯动联科", code: "688582.SH", tag: "高性能MEMS惯性传感器，机器人姿态控制核心", description: "芯动联科（688582.SH）是IMU惯性传感器领域的代表性上市公司，高性能MEMS惯性传感器，机器人姿态控制核心，在产业链中占据重要位置。" },
      { id: 10118, name: "敏芯股份", code: "688286.SH", tag: "MEMS传感器芯片，加速度计+陀螺仪", description: "敏芯股份（688286.SH）是IMU惯性传感器领域的代表性上市公司，MEMS传感器芯片，加速度计+陀螺仪，在产业链中占据重要位置。" },
    ]},
    { id: 10024, name: "触觉传感器", level: "upstream", description: "柔性触觉传感器让机器人能感知接触物体的形状、质地和温度。目前技术成熟度较低，是人形机器人的前沿方向", plainLanguageDescription: "让机器人手能感知摸到了什么，软的还是硬的。这是前沿技术，还在实验室阶段", parentId: 1002, stockCount: 0, childCount: 0, stocks: [
    ]},
  ],
  1003: [
    { id: 10031, name: "滚珠/滚柱丝杠", level: "upstream", description: "行星滚柱丝杠将旋转运动转换为直线运动，用于机器人直线关节（推杆）。贝斯特、五洲新春、北特科技布局人形机器人丝杠", plainLanguageDescription: "把电机的旋转变成手臂的直线伸缩。行星滚柱丝杠是特斯拉机器人的方案", parentId: 1003, stockCount: 3, childCount: 0, stocks: [
      { id: 10119, name: "贝斯特", code: "300580.SZ", tag: "滚珠丝杠+精密零部件，特斯拉机器人丝杠潜在供应商", description: "贝斯特（300580.SZ）是滚珠/滚柱丝杠领域的代表性上市公司，滚珠丝杠+精密零部件，特斯拉机器人丝杠潜在供应商，在产业链中占据重要位置。" },
      { id: 10120, name: "五洲新春", code: "603667.SH", tag: "轴承+丝杠，汽车零部件跨界机器人", description: "五洲新春（603667.SH）是滚珠/滚柱丝杠领域的代表性上市公司，轴承+丝杠，汽车零部件跨界机器人，在产业链中占据重要位置。" },
      { id: 10121, name: "北特科技", code: "603009.SH", tag: "汽车转向系统+人形机器人丝杠布局", description: "北特科技（603009.SH）是滚珠/滚柱丝杠领域的代表性上市公司，汽车转向系统+人形机器人丝杠布局，在产业链中占据重要位置。" },
    ]},
    { id: 10032, name: "轴承", level: "upstream", description: "精密轴承支撑旋转关节，降低摩擦。国机精工、长盛轴承布局机器人专用轴承", plainLanguageDescription: "让机器人关节转得顺滑的零部件。好轴承能让机器人动作更流畅", parentId: 1003, stockCount: 2, childCount: 0, stocks: [
      { id: 10122, name: "国机精工", code: "002046.SZ", tag: "精密轴承龙头，航天/机器人轴承", description: "国机精工（002046.SZ）是轴承领域的代表性上市公司，精密轴承龙头，航天/机器人轴承，在产业链中占据重要位置。" },
      { id: 10123, name: "长盛轴承", code: "300718.SZ", tag: "自润滑轴承，免维护、长寿命", description: "长盛轴承（300718.SZ）是轴承领域的代表性上市公司，自润滑轴承，免维护、长寿命，在产业链中占据重要位置。" },
    ]},
    { id: 10033, name: "轻量化结构件", level: "upstream", description: "铝合金、镁合金、碳纤维结构件。拓普集团、三花智控为特斯拉Optimus供应结构件和关节执行器", plainLanguageDescription: "机器人的骨架和外壳，要轻又要结实。拓普和三花给特斯拉机器人做结构件", parentId: 1003, stockCount: 2, childCount: 0, stocks: [
      { id: 10124, name: "拓普集团", code: "601689.SH", tag: "特斯拉机器人结构件+执行器核心供应商", description: "拓普集团（601689.SH）是轻量化结构件领域的代表性上市公司，特斯拉机器人结构件+执行器核心供应商，在产业链中占据重要位置。" },
      { id: 10125, name: "三花智控", code: "002050.SZ", tag: "热管理+机器人执行器，特斯拉核心供应商", description: "三花智控（002050.SZ）是轻量化结构件领域的代表性上市公司，热管理+机器人执行器，特斯拉核心供应商，在产业链中占据重要位置。" },
    ]},
  ],
  1004: [
    { id: 10041, name: "AI芯片", level: "upstream", description: "GPU、NPU、FPGA等用于机器人视觉识别、语义理解、运动规划。寒武纪思元系列、瑞芯微RK3588等布局边缘AI", plainLanguageDescription: "机器人的大脑处理器，处理视觉、语言和决策。寒武纪和瑞芯微在做边缘AI芯片", parentId: 1004, stockCount: 3, childCount: 0, stocks: [
      { id: 10126, name: "寒武纪", code: "688256.SH", tag: "AI芯片龙头，思元系列用于边缘推理", description: "寒武纪（688256.SH）是AI芯片领域的代表性上市公司，AI芯片龙头，思元系列用于边缘推理，在产业链中占据重要位置。" },
      { id: 10127, name: "全志科技", code: "300458.SZ", tag: "智能终端SoC，机器人主控芯片", description: "全志科技（300458.SZ）是AI芯片领域的代表性上市公司，智能终端SoC，机器人主控芯片，在产业链中占据重要位置。" },
      { id: 10128, name: "瑞芯微", code: "603893.SH", tag: "AIoT芯片，RK3588用于机器人视觉", description: "瑞芯微（603893.SH）是AI芯片领域的代表性上市公司，AIoT芯片，RK3588用于机器人视觉，在产业链中占据重要位置。" },
    ]},
    { id: 10042, name: "边缘控制器", level: "upstream", description: "实时运动控制器、PLC、工控机。埃斯顿、新时达布局机器人控制器，实现多关节协同控制", plainLanguageDescription: "实时指挥机器人每个关节怎么动的控制器。埃斯顿和新时达在做运动控制", parentId: 1004, stockCount: 2, childCount: 0, stocks: [
      { id: 10129, name: "埃斯顿", code: "002747.SZ", tag: "工业机器人龙头，运动控制器+伺服系统", description: "埃斯顿（002747.SZ）是边缘控制器领域的代表性上市公司，工业机器人龙头，运动控制器+伺服系统，在产业链中占据重要位置。" },
      { id: 10130, name: "新时达", code: "002527.SZ", tag: "电梯控制+机器人控制器，运动控制算法", description: "新时达（002527.SZ）是边缘控制器领域的代表性上市公司，电梯控制+机器人控制器，运动控制算法，在产业链中占据重要位置。" },
    ]},
    { id: 10043, name: "运动控制软件", level: "upstream", description: "运动学算法、动力学仿真、路径规划、平衡控制。软件是人形机器人的灵魂，决定了动作的流畅度和智能程度", plainLanguageDescription: "让机器人走路不摔跤、拿东西不摔碎的软件算法。这是机器人的灵魂", parentId: 1004, stockCount: 0, childCount: 0, stocks: [
    ]},
  ],
  1005: [
    { id: 10051, name: "整机制造", level: "midstream", description: "人形机器人整机设计、组装、测试。国内优必选Walker、小米CyberOne、宇树H1、智元远征A1等产品已发布", plainLanguageDescription: "把零部件组装成完整的人形机器人。国内优必选、小米、宇树等都发布了产品", parentId: 1005, stockCount: 2, childCount: 0, stocks: [
      { id: 10131, name: "机器人", code: "300024.SZ", tag: "新松机器人，国内工业机器人龙头，人形机器人布局", description: "机器人（300024.SZ）是整机制造领域的代表性上市公司，新松机器人，国内工业机器人龙头，人形机器人布局，在产业链中占据重要位置。" },
      { id: 10132, name: "埃夫特", code: "688165.SH", tag: "工业机器人+协作机器人，人形机器人整机潜力", description: "埃夫特（688165.SH）是整机制造领域的代表性上市公司，工业机器人+协作机器人，人形机器人整机潜力，在产业链中占据重要位置。" },
    ]},
    { id: 10052, name: "系统集成", level: "midstream", description: "针对不同场景定制机器人解决方案，整合硬件、软件、算法。系统集成商是连接本体和终端用户的桥梁", plainLanguageDescription: "根据工厂或商场的需求，给机器人装不同的软件和配件，让它能干特定的活", parentId: 1005, stockCount: 1, childCount: 0, stocks: [
      { id: 10133, name: "拓斯达", code: "300607.SZ", tag: "工业机器人集成，智能制造解决方案", description: "拓斯达（300607.SZ）是系统集成领域的代表性上市公司，工业机器人集成，智能制造解决方案，在产业链中占据重要位置。" },
    ]},
  ],
  1006: [
    { id: 10061, name: "汽车制造", level: "downstream", description: "汽车工厂装配线、质检、搬运。特斯拉计划Optimus进工厂，国内汽车厂是人形机器人率先落地的场景", plainLanguageDescription: "机器人在汽车厂拧螺丝、搬运零件、检查焊缝。特斯拉计划让机器人进工厂干活", parentId: 1006, stockCount: 0, childCount: 0, stocks: [
    ]},
    { id: 10062, name: "电子装配", level: "downstream", description: "3C电子产线精密装配、检测。人形机器人手指灵活度接近人类，适合手机等精密电子产品的组装", plainLanguageDescription: "机器人在电子厂组装手机、电脑，用灵巧的手指安装细小零件", parentId: 1006, stockCount: 0, childCount: 0, stocks: [
    ]},
    { id: 10063, name: "物流仓储", level: "downstream", description: "仓库搬运、分拣、装卸。人形机器人可适应不规则货物的搬运，补足传统AGV的不足", plainLanguageDescription: "机器人在仓库搬箱子、分拣快递。比传统AGV更灵活，能处理不规则货物", parentId: 1006, stockCount: 0, childCount: 0, stocks: [
    ]},
  ],
  1007: [
    { id: 10071, name: "商业服务", level: "downstream", description: "商超导览、酒店接待、餐厅服务。人形机器人在商场指路、在酒店送餐，已经有一些试点项目", plainLanguageDescription: "机器人在商场指路、在酒店送餐、在展会讲解。已经有一些试点项目", parentId: 1007, stockCount: 2, childCount: 0, stocks: [
      { id: 10134, name: "科沃斯", code: "603486.SH", tag: "服务机器人龙头，扫地机器人向人形机器人延伸", description: "科沃斯（603486.SH）是商业服务领域的代表性上市公司，服务机器人龙头，扫地机器人向人形机器人延伸，在产业链中占据重要位置。" },
      { id: 10135, name: "石头科技", code: "688169.SH", tag: "智能清洁机器人，SLAM导航技术领先", description: "石头科技（688169.SH）是商业服务领域的代表性上市公司，智能清洁机器人，SLAM导航技术领先，在产业链中占据重要位置。" },
    ]},
    { id: 10072, name: "家庭消费", level: "downstream", description: "家庭陪伴、教育辅导、家务助理。终极市场但技术成熟度低，成本需降至万元级才可能普及", plainLanguageDescription: "机器人在家陪老人聊天、给孩子辅导功课、帮忙做家务。这是最大的市场，但目前太贵", parentId: 1007, stockCount: 1, childCount: 0, stocks: [
      { id: 10136, name: "九号公司", code: "689009.SH", tag: "智能短交通+服务机器人，平衡车技术迁移人形机器人", description: "九号公司（689009.SH）是家庭消费领域的代表性上市公司，智能短交通+服务机器人，平衡车技术迁移人形机器人，在产业链中占据重要位置。" },
    ]},
    { id: 10073, name: "医疗康养", level: "downstream", description: "康复训练、护理辅助、手术辅助。日本已在养老院试点人形机器人陪护", plainLanguageDescription: "机器人帮助病人做康复训练、在养老院照顾老人。日本已经开始试点", parentId: 1007, stockCount: 0, childCount: 0, stocks: [
    ]},
  ],
  1008: [
    { id: 10081, name: "电力巡检", level: "downstream", description: "高压线路巡检、变电站维护。人形机器人可适应复杂地形，比轮式巡检机器人更灵活", plainLanguageDescription: "机器人沿着高压线走路检查、在变电站里巡检设备。比无人机和轮式机器人更灵活", parentId: 1008, stockCount: 2, childCount: 0, stocks: [
      { id: 10137, name: "亿嘉和", code: "603666.SH", tag: "电力巡检机器人龙头，人形巡检布局", description: "亿嘉和（603666.SH）是电力巡检领域的代表性上市公司，电力巡检机器人龙头，人形巡检布局，在产业链中占据重要位置。" },
      { id: 10138, name: "申昊科技", code: "300853.SZ", tag: "智能电网巡检机器人，轨交/电力双轮驱动", description: "申昊科技（300853.SZ）是电力巡检领域的代表性上市公司，智能电网巡检机器人，轨交/电力双轮驱动，在产业链中占据重要位置。" },
    ]},
    { id: 10082, name: "消防救援", level: "downstream", description: "火场侦察、废墟搜救、危化品处置。人形机器人可进入坍塌建筑内部搜索幸存者", plainLanguageDescription: "机器人进火场侦察、在倒塌的楼里搜救幸存者。能代替消防员做最危险的工作", parentId: 1008, stockCount: 1, childCount: 0, stocks: [
      { id: 10139, name: "中信重工", code: "601608.SH", tag: "特种机器人，消防/救援机器人", description: "中信重工（601608.SH）是消防救援领域的代表性上市公司，特种机器人，消防/救援机器人，在产业链中占据重要位置。" },
    ]},
    { id: 10083, name: "核工业/太空", level: "downstream", description: "核设施维护、太空作业。人形机器人可在强辐射环境下工作，未来可能用于月球/火星基地建设", plainLanguageDescription: "机器人代替人类在核反应堆旁工作、在太空修卫星。未来可能去月球和火星建基地", parentId: 1008, stockCount: 0, childCount: 0, stocks: [
    ]},
  ],
};

// === 连接关系 ===
const connections: LocalConnection[] = [
  // === 根节点骨架连接 ===
  { id: 10001, fromNodeId: 1000, toNodeId: 1005, label: "减速器供给" },
  { id: 10002, fromNodeId: 1001, toNodeId: 1005, label: "电机供给" },
  { id: 10003, fromNodeId: 1002, toNodeId: 1005, label: "传感器供给" },
  { id: 10004, fromNodeId: 1003, toNodeId: 1005, label: "结构件供给" },
  { id: 10005, fromNodeId: 1004, toNodeId: 1005, label: "控制器供给" },
  { id: 10006, fromNodeId: 1005, toNodeId: 1006, label: "机器人交付" },
  { id: 10007, fromNodeId: 1005, toNodeId: 1007, label: "机器人交付" },
  { id: 10008, fromNodeId: 1005, toNodeId: 1008, label: "机器人交付" },
  { id: 10009, fromNodeId: 1006, toNodeId: 1007, label: "工业→商业" },
  { id: 10010, fromNodeId: 1007, toNodeId: 1008, label: "商业→特种" },
  { id: 10011, fromNodeId: 10001, toNodeId: 10051, label: "谐波减速器供给" },
  // === 上游→中游（零部件供给） ===
  { id: 10012, fromNodeId: 10002, toNodeId: 10051, label: "RV减速器供给" },
  { id: 10013, fromNodeId: 10003, toNodeId: 10051, label: "行星减速器供给" },
  { id: 10014, fromNodeId: 10011, toNodeId: 10051, label: "无框力矩电机供给" },
  { id: 10015, fromNodeId: 10012, toNodeId: 10051, label: "伺服电机供给" },
  { id: 10016, fromNodeId: 10013, toNodeId: 10051, label: "空心杯电机供给" },
  { id: 10017, fromNodeId: 10021, toNodeId: 10051, label: "力矩传感器供给" },
  { id: 10018, fromNodeId: 10022, toNodeId: 10051, label: "视觉传感器供给" },
  { id: 10019, fromNodeId: 10023, toNodeId: 10051, label: "IMU传感器供给" },
  { id: 10020, fromNodeId: 10024, toNodeId: 10051, label: "触觉传感器供给" },
  { id: 10021, fromNodeId: 10031, toNodeId: 10051, label: "丝杠供给" },
  { id: 10022, fromNodeId: 10032, toNodeId: 10051, label: "轴承供给" },
  { id: 10023, fromNodeId: 10033, toNodeId: 10051, label: "结构件供给" },
  { id: 10024, fromNodeId: 10041, toNodeId: 10051, label: "AI芯片供给" },
  { id: 10025, fromNodeId: 10042, toNodeId: 10051, label: "控制器供给" },
  { id: 10026, fromNodeId: 10043, toNodeId: 10051, label: "控制软件供给" },
  { id: 10027, fromNodeId: 10051, toNodeId: 10001, label: "减速器采购" },
  // === 中游→上游（零部件采购） ===
  { id: 10028, fromNodeId: 10051, toNodeId: 10002, label: "RV减速器采购" },
  { id: 10029, fromNodeId: 10051, toNodeId: 10011, label: "力矩电机采购" },
  { id: 10030, fromNodeId: 10051, toNodeId: 10012, label: "伺服电机采购" },
  { id: 10031, fromNodeId: 10051, toNodeId: 10021, label: "力矩传感器采购" },
  { id: 10032, fromNodeId: 10051, toNodeId: 10022, label: "视觉传感器采购" },
  { id: 10033, fromNodeId: 10051, toNodeId: 10023, label: "IMU采购" },
  { id: 10034, fromNodeId: 10051, toNodeId: 10031, label: "丝杠采购" },
  { id: 10035, fromNodeId: 10051, toNodeId: 10032, label: "轴承采购" },
  { id: 10036, fromNodeId: 10051, toNodeId: 10033, label: "结构件采购" },
  { id: 10037, fromNodeId: 10051, toNodeId: 10041, label: "AI芯片采购" },
  { id: 10038, fromNodeId: 10051, toNodeId: 10042, label: "控制器采购" },
  { id: 10039, fromNodeId: 10051, toNodeId: 10052, label: "整机→集成" },
  // === 中游→中游 ===
  { id: 10040, fromNodeId: 10052, toNodeId: 10051, label: "集成采购" },
  { id: 10041, fromNodeId: 10051, toNodeId: 10061, label: "汽车工厂交付" },
  // === 中游→下游（交付应用） ===
  { id: 10042, fromNodeId: 10051, toNodeId: 10062, label: "电子装配交付" },
  { id: 10043, fromNodeId: 10051, toNodeId: 10063, label: "物流仓储交付" },
  { id: 10044, fromNodeId: 10051, toNodeId: 10071, label: "商业服务交付" },
  { id: 10045, fromNodeId: 10051, toNodeId: 10072, label: "家庭消费交付" },
  { id: 10046, fromNodeId: 10051, toNodeId: 10073, label: "医疗康养交付" },
  { id: 10047, fromNodeId: 10051, toNodeId: 10081, label: "电力巡检交付" },
  { id: 10048, fromNodeId: 10051, toNodeId: 10082, label: "消防救援交付" },
  { id: 10049, fromNodeId: 10051, toNodeId: 10083, label: "核工业交付" },
  { id: 10050, fromNodeId: 10052, toNodeId: 10061, label: "汽车集成" },
  { id: 10051, fromNodeId: 10061, toNodeId: 10051, label: "汽车制造采购" },
  // === 下游→中游（采购） ===
  { id: 10052, fromNodeId: 10062, toNodeId: 10051, label: "电子装配采购" },
  { id: 10053, fromNodeId: 10071, toNodeId: 10051, label: "商业服务采购" },
  { id: 10054, fromNodeId: 10072, toNodeId: 10051, label: "家庭消费采购" },
  { id: 10055, fromNodeId: 10081, toNodeId: 10051, label: "电力巡检采购" },
  { id: 10056, fromNodeId: 10061, toNodeId: 10062, label: "汽车→电子" },
  // === 下游内部 ===
  { id: 10057, fromNodeId: 10062, toNodeId: 10063, label: "电子→物流" },
  { id: 10058, fromNodeId: 10071, toNodeId: 10072, label: "商业→家庭" },
  { id: 10059, fromNodeId: 10072, toNodeId: 10073, label: "家庭→医疗" },
  { id: 10060, fromNodeId: 10081, toNodeId: 10082, label: "电力→消防" },
  { id: 10061, fromNodeId: 10041, toNodeId: 7, label: "AI芯片需求" },
  // === 跨产业连接 ===
  { id: 10061, fromNodeId: 10041, toNodeId: 9, label: "逻辑芯片需求" },
  { id: 10061, fromNodeId: 10022, toNodeId: 7, label: "视觉传感器芯片需求" },
  { id: 10061, fromNodeId: 10023, toNodeId: 8, label: "IMU传感器芯片需求" },
  { id: 10061, fromNodeId: 10033, toNodeId: 80402, label: "结构件钛合金采购" },
  { id: 10061, fromNodeId: 10032, toNodeId: 80401, label: "轴承钢材采购" },
  { id: 10061, fromNodeId: 10012, toNodeId: 610, label: "伺服电机电力需求" },
  { id: 10061, fromNodeId: 10061, toNodeId: 704, label: "工厂变压器需求" },
  { id: 10061, fromNodeId: 7, toNodeId: 10041, label: "功率半导体供应" },
  { id: 10061, fromNodeId: 9, toNodeId: 10041, label: "逻辑芯片供应" },
  { id: 10061, fromNodeId: 80402, toNodeId: 10033, label: "钛合金供应" },
  { id: 10061, fromNodeId: 80401, toNodeId: 10032, label: "轴承钢供应" },
  { id: 10061, fromNodeId: 610, toNodeId: 10012, label: "电力供应" },
  { id: 10061, fromNodeId: 704, toNodeId: 10061, label: "变压器供应" },
];

// === 导出产业数据 ===
export const robotData: IndustryData = {
  slug: "robot",
  name: "人形机器人",
  icon: "Bot",
  description: "人形机器人产业链涵盖减速器/电机/传感器/丝杠/控制器等上游核心零部件、机器人本体中游制造、工业/商业/家庭/特种作业下游应用。特斯拉Optimus、优必选Walker等产品推动产业从实验室走向工厂，工业场景是率先落地方向。",
  plainLanguageDescription: "人形机器人产业链就是造像人一样的机器人的全部过程。上游是做关节减速器、电机、传感器、AI芯片这些核心零件；中游是把零件组装成完整的机器人；下游是让机器人进工厂拧螺丝、去商场指路、在家陪老人。特斯拉和中国企业都在加速布局。",
  rootNodes,
  childNodes,
  connections,
};
