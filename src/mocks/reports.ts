export const monthlyRevenue = [
  { month: 'T1/2024', revenue: 245000000, expenses: 89000000, profit: 156000000 },
  { month: 'T2/2024', revenue: 268000000, expenses: 92000000, profit: 176000000 },
  { month: 'T3/2024', revenue: 289000000, expenses: 95000000, profit: 194000000 },
  { month: 'T4/2024', revenue: 312000000, expenses: 98000000, profit: 214000000 },
  { month: 'T5/2024', revenue: 298000000, expenses: 94000000, profit: 204000000 },
  { month: 'T6/2024', revenue: 325000000, expenses: 101000000, profit: 224000000 },
  { month: 'T7/2024', revenue: 341000000, expenses: 105000000, profit: 236000000 },
  { month: 'T8/2024', revenue: 356000000, expenses: 108000000, profit: 248000000 },
  { month: 'T9/2024', revenue: 378000000, expenses: 112000000, profit: 266000000 },
  { month: 'T10/2024', revenue: 392000000, expenses: 115000000, profit: 277000000 },
  { month: 'T11/2024', revenue: 405000000, expenses: 118000000, profit: 287000000 },
  { month: 'T12/2024', revenue: 428000000, expenses: 122000000, profit: 306000000 }
];

export const vehiclePerformance = [
  {
    id: 1,
    plateNumber: '29A-123.45',
    model: 'VinFast VF5',
    utilizationRate: 92,
    totalRevenue: 48500000,
    totalDays: 330,
    avgRevenuePerDay: 147000,
    status: 'Xuất sắc'
  },
  {
    id: 2,
    plateNumber: '29A-234.56',
    model: 'VinFast VFe34',
    utilizationRate: 88,
    totalRevenue: 52300000,
    totalDays: 315,
    avgRevenuePerDay: 166000,
    status: 'Tốt'
  },
  {
    id: 3,
    plateNumber: '29A-345.67',
    model: 'VinFast VF8',
    utilizationRate: 85,
    totalRevenue: 68900000,
    totalDays: 305,
    avgRevenuePerDay: 226000,
    status: 'Tốt'
  },
  {
    id: 4,
    plateNumber: '29A-456.78',
    model: 'VinFast VF5',
    utilizationRate: 78,
    totalRevenue: 42100000,
    totalDays: 280,
    avgRevenuePerDay: 150000,
    status: 'Trung bình'
  },
  {
    id: 5,
    plateNumber: '29A-567.89',
    model: 'VinFast VFe34',
    utilizationRate: 90,
    totalRevenue: 54800000,
    totalDays: 323,
    avgRevenuePerDay: 170000,
    status: 'Xuất sắc'
  },
  {
    id: 6,
    plateNumber: '29A-678.90',
    model: 'VinFast VF8',
    utilizationRate: 82,
    totalRevenue: 65200000,
    totalDays: 294,
    avgRevenuePerDay: 222000,
    status: 'Tốt'
  }
];

export const debtSummary = {
  totalDebt: 45800000,
  overdueDebt: 18500000,
  currentDebt: 27300000,
  debtByDriver: [
    {
      driverId: 1,
      driverName: 'Nguyễn Văn An',
      phone: '0901234567',
      plateNumber: '29A-123.45',
      totalDebt: 8500000,
      overdueDebt: 3200000,
      lastPayment: '2024-12-15',
      daysOverdue: 18
    },
    {
      driverId: 2,
      driverName: 'Trần Thị Bình',
      phone: '0912345678',
      plateNumber: '29A-234.56',
      totalDebt: 6200000,
      overdueDebt: 0,
      lastPayment: '2024-12-28',
      daysOverdue: 0
    },
    {
      driverId: 3,
      driverName: 'Lê Văn Cường',
      phone: '0923456789',
      plateNumber: '29A-345.67',
      totalDebt: 12300000,
      overdueDebt: 8500000,
      lastPayment: '2024-11-20',
      daysOverdue: 43
    },
    {
      driverId: 4,
      driverName: 'Phạm Thị Dung',
      phone: '0934567890',
      plateNumber: '29A-456.78',
      totalDebt: 4800000,
      overdueDebt: 0,
      lastPayment: '2024-12-25',
      daysOverdue: 0
    },
    {
      driverId: 5,
      driverName: 'Hoàng Văn Em',
      phone: '0945678901',
      plateNumber: '29A-567.89',
      totalDebt: 9200000,
      overdueDebt: 4300000,
      lastPayment: '2024-12-05',
      daysOverdue: 28
    },
    {
      driverId: 6,
      driverName: 'Vũ Thị Phương',
      phone: '0956789012',
      plateNumber: '29A-678.90',
      totalDebt: 4800000,
      overdueDebt: 2500000,
      lastPayment: '2024-12-10',
      daysOverdue: 23
    }
  ]
};

export const salesPerformance = [
  {
    id: 1,
    saleName: 'Nguyễn Minh Tuấn',
    phone: '0967890123',
    newContracts: 12,
    renewalContracts: 8,
    totalRevenue: 156000000,
    newCommission: 7800000,
    renewalCommission: 2400000,
    totalCommission: 10200000,
    conversionRate: 68
  },
  {
    id: 2,
    saleName: 'Trần Thị Hương',
    phone: '0978901234',
    newContracts: 15,
    renewalContracts: 10,
    totalRevenue: 198000000,
    newCommission: 9900000,
    renewalCommission: 3000000,
    totalCommission: 12900000,
    conversionRate: 72
  },
  {
    id: 3,
    saleName: 'Lê Văn Khoa',
    phone: '0989012345',
    newContracts: 9,
    renewalContracts: 6,
    totalRevenue: 118000000,
    newCommission: 5900000,
    renewalCommission: 1800000,
    totalCommission: 7700000,
    conversionRate: 64
  },
  {
    id: 4,
    saleName: 'Phạm Thị Lan',
    phone: '0990123456',
    newContracts: 11,
    renewalContracts: 7,
    totalRevenue: 142000000,
    newCommission: 7100000,
    renewalCommission: 2100000,
    totalCommission: 9200000,
    conversionRate: 70
  }
];

export const quarterlyComparison = [
  { quarter: 'Q1/2024', revenue: 802000000, contracts: 45, avgRevenue: 17822222 },
  { quarter: 'Q2/2024', revenue: 935000000, contracts: 52, avgRevenue: 17980769 },
  { quarter: 'Q3/2024', revenue: 1075000000, contracts: 58, avgRevenue: 18534483 },
  { quarter: 'Q4/2024', revenue: 1225000000, contracts: 64, avgRevenue: 19140625 }
];