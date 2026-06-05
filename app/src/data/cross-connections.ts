// 跨产业连接数据
// 这些连接表示不同产业之间的上下游关联

export interface CrossIndustryConnection {
  id: number;
  fromNodeId: number;
  fromIndustrySlug: string;
  toNodeId: number;
  toIndustrySlug: string;
  label: string;
}

export const crossConnections: CrossIndustryConnection[] = [
  // === 电力 → 电网设备 ===
  { id: 90001, fromNodeId: 610, fromIndustrySlug: 'power', toNodeId: 704, toIndustrySlug: 'grid-equipment', label: '输配电→变压器' },
  { id: 90002, fromNodeId: 610, fromIndustrySlug: 'power', toNodeId: 705, toIndustrySlug: 'grid-equipment', label: '输配电→开关设备' },
  { id: 90003, fromNodeId: 610, fromIndustrySlug: 'power', toNodeId: 706, toIndustrySlug: 'grid-equipment', label: '输配电→输电线路' },
  { id: 90004, fromNodeId: 609, fromIndustrySlug: 'power', toNodeId: 708, toIndustrySlug: 'grid-equipment', label: '储能→无功补偿' },
  { id: 90005, fromNodeId: 612, fromIndustrySlug: 'power', toNodeId: 712, toIndustrySlug: 'grid-equipment', label: '用电→充电桩' },

  // === 电网设备 → 电力 ===
  { id: 90006, fromNodeId: 704, fromIndustrySlug: 'grid-equipment', toNodeId: 610, toIndustrySlug: 'power', label: '变压器→输配电' },
  { id: 90007, fromNodeId: 705, fromIndustrySlug: 'grid-equipment', toNodeId: 610, toIndustrySlug: 'power', label: '开关→输配电' },
  { id: 90008, fromNodeId: 710, fromIndustrySlug: 'grid-equipment', toNodeId: 610, toIndustrySlug: 'power', label: '电网建设→输配电' },
  { id: 90009, fromNodeId: 712, fromIndustrySlug: 'grid-equipment', toNodeId: 612, toIndustrySlug: 'power', label: '充电桩→用电侧' },

  // === 半导体 → 电力 ===
  { id: 90010, fromNodeId: 7, fromIndustrySlug: 'semiconductor', toNodeId: 604, toIndustrySlug: 'power', label: '功率芯片→火电控制' },
  { id: 90011, fromNodeId: 90, fromIndustrySlug: 'semiconductor', toNodeId: 610, toIndustrySlug: 'power', label: '光通信→电网通信' },

  // === 电力 → 半导体 ===
  { id: 90012, fromNodeId: 604, fromIndustrySlug: 'power', toNodeId: 7, toIndustrySlug: 'semiconductor', label: '火电→功率器件' },

  // === 电网设备 → 半导体 ===
  { id: 90013, fromNodeId: 707, fromIndustrySlug: 'grid-equipment', toNodeId: 8, toIndustrySlug: 'semiconductor', label: '智能电表→模拟芯片' },
  { id: 90014, fromNodeId: 709, fromIndustrySlug: 'grid-equipment', toNodeId: 9, toIndustrySlug: 'semiconductor', label: '换流阀→逻辑芯片' },
];
