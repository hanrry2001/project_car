export const revenueStats = {
  totalMonth: 245800000,
  today: 8500000,
  transactions: 156,
  growth: 12.5
};

export const revenueTransactions = [
  {
    id: 'REV001',
    vehicleNumber: '29A-12345',
    driver: 'Nguyễn Văn An',
    type: 'Tiền thuê',
    amount: 5500000,
    date: '2024-01-15',
    status: 'Hoàn thành'
  },
  {
    id: 'REV002',
    vehicleNumber: '29B-67890',
    driver: 'Trần Thị Bình',
    type: 'Tiền cọc',
    amount: 10000000,
    date: '2024-01-15',
    status: 'Hoàn thành'
  },
  {
    id: 'REV003',
    vehicleNumber: '29C-11223',
    driver: 'Lê Minh Tuấn',
    type: 'Tiền thuê',
    amount: 5500000,
    date: '2024-01-14',
    status: 'Chờ xử lý'
  },
  {
    id: 'REV004',
    vehicleNumber: '29D-33445',
    driver: 'Phạm Văn Đức',
    type: 'Phí phạt',
    amount: 500000,
    date: '2024-01-14',
    status: 'Hoàn thành'
  },
  {
    id: 'REV005',
    vehicleNumber: '29E-55667',
    driver: 'Hoàng Thị Em',
    type: 'Tiền thuê',
    amount: 5500000,
    date: '2024-01-13',
    status: 'Hoàn thành'
  },
  {
    id: 'REV006',
    vehicleNumber: '29F-77889',
    driver: 'Vũ Văn Phong',
    type: 'Tiền cọc',
    amount: 10000000,
    date: '2024-01-13',
    status: 'Quá hạn'
  },
  {
    id: 'REV007',
    vehicleNumber: '29G-99001',
    driver: 'Đỗ Thị Giang',
    type: 'Tiền thuê',
    amount: 5500000,
    date: '2024-01-12',
    status: 'Hoàn thành'
  },
  {
    id: 'REV008',
    vehicleNumber: '29H-22334',
    driver: 'Bùi Văn Hải',
    type: 'Phí phạt',
    amount: 300000,
    date: '2024-01-12',
    status: 'Hoàn thành'
  },
  {
    id: 'REV009',
    vehicleNumber: '29K-44556',
    driver: 'Ngô Thị Lan',
    type: 'Tiền thuê',
    amount: 5500000,
    date: '2024-01-11',
    status: 'Chờ xử lý'
  },
  {
    id: 'REV010',
    vehicleNumber: '29L-66778',
    driver: 'Trương Văn Long',
    type: 'Tiền cọc',
    amount: 10000000,
    date: '2024-01-11',
    status: 'Hoàn thành'
  },
  {
    id: 'REV011',
    vehicleNumber: '29M-88990',
    driver: 'Lý Thị Mai',
    type: 'Tiền thuê',
    amount: 5500000,
    date: '2024-01-10',
    status: 'Hoàn thành'
  },
  {
    id: 'REV012',
    vehicleNumber: '29N-00112',
    driver: 'Phan Văn Nam',
    type: 'Phí phạt',
    amount: 800000,
    date: '2024-01-10',
    status: 'Quá hạn'
  },
  {
    id: 'REV013',
    vehicleNumber: '29P-33445',
    driver: 'Đinh Thị Oanh',
    type: 'Tiền thuê',
    amount: 5500000,
    date: '2024-01-09',
    status: 'Hoàn thành'
  },
  {
    id: 'REV014',
    vehicleNumber: '29Q-55667',
    driver: 'Võ Văn Phúc',
    type: 'Tiền cọc',
    amount: 10000000,
    date: '2024-01-09',
    status: 'Hoàn thành'
  },
  {
    id: 'REV015',
    vehicleNumber: '29R-77889',
    driver: 'Hồ Thị Quỳnh',
    type: 'Tiền thuê',
    amount: 5500000,
    date: '2024-01-08',
    status: 'Chờ xử lý'
  }
];

export const expenses = [
  {
    id: 'EXP001',
    category: 'Bảo dưỡng xe',
    description: 'Thay dầu và lọc dầu - 29A-12345',
    amount: 850000,
    date: '2024-01-15',
    responsible: 'Nguyễn Văn An',
    status: 'Hoàn thành',
    vehicle: '29A-12345'
  },
  {
    id: 'EXP002',
    category: 'Nhiên liệu',
    description: 'Đổ xăng tháng 1 - Toàn bộ đội xe',
    amount: 15200000,
    date: '2024-01-14',
    responsible: 'Trần Thị Bình',
    status: 'Hoàn thành',
    vehicle: 'Tất cả'
  },
  {
    id: 'EXP003',
    category: 'Lương',
    description: 'Lương tháng 1/2024 - Tài xế',
    amount: 45000000,
    date: '2024-01-10',
    responsible: 'Phạm Văn Cường',
    status: 'Hoàn thành',
    vehicle: '-'
  },
  {
    id: 'EXP004',
    category: 'Bảo hiểm',
    description: 'Gia hạn bảo hiểm xe 29B-67890',
    amount: 3500000,
    date: '2024-01-12',
    responsible: 'Lê Thị Dung',
    status: 'Hoàn thành',
    vehicle: '29B-67890'
  },
  {
    id: 'EXP005',
    category: 'Bảo dưỡng xe',
    description: 'Thay lốp xe - 29C-11223',
    amount: 2400000,
    date: '2024-01-13',
    responsible: 'Nguyễn Văn An',
    status: 'Hoàn thành',
    vehicle: '29C-11223'
  },
  {
    id: 'EXP006',
    category: 'Khác',
    description: 'Mua thiết bị văn phòng',
    amount: 1200000,
    date: '2024-01-11',
    responsible: 'Trần Thị Bình',
    status: 'Hoàn thành',
    vehicle: '-'
  },
  {
    id: 'EXP007',
    category: 'Bảo dưỡng xe',
    description: 'Sửa hệ thống điều hòa - 29D-33445',
    amount: 1800000,
    date: '2024-01-09',
    responsible: 'Nguyễn Văn An',
    status: 'Hoàn thành',
    vehicle: '29D-33445'
  },
  {
    id: 'EXP008',
    category: 'Nhiên liệu',
    description: 'Đổ xăng tuần 2 tháng 1',
    amount: 3800000,
    date: '2024-01-08',
    responsible: 'Trần Thị Bình',
    status: 'Hoàn thành',
    vehicle: 'Tất cả'
  },
  {
    id: 'EXP009',
    category: 'Bảo hiểm',
    description: 'Bảo hiểm trách nhiệm dân sự - 29E-55667',
    amount: 2800000,
    date: '2024-01-16',
    responsible: 'Lê Thị Dung',
    status: 'Chờ xử lý',
    vehicle: '29E-55667'
  },
  {
    id: 'EXP010',
    category: 'Bảo dưỡng xe',
    description: 'Kiểm tra định kỳ - 29F-77889',
    amount: 650000,
    date: '2024-01-07',
    responsible: 'Nguyễn Văn An',
    status: 'Hoàn thành',
    vehicle: '29F-77889'
  },
  {
    id: 'EXP011',
    category: 'Khác',
    description: 'Chi phí rửa xe tháng 1',
    amount: 1500000,
    date: '2024-01-06',
    responsible: 'Trần Thị Bình',
    status: 'Hoàn thành',
    vehicle: 'Tất cả'
  },
  {
    id: 'EXP012',
    category: 'Lương',
    description: 'Thưởng tết nhân viên',
    amount: 12000000,
    date: '2024-01-17',
    responsible: 'Phạm Văn Cường',
    status: 'Chờ xử lý',
    vehicle: '-'
  },
  {
    id: 'EXP013',
    category: 'Bảo dưỡng xe',
    description: 'Thay phanh xe - 29G-99001',
    amount: 1950000,
    date: '2024-01-05',
    responsible: 'Nguyễn Văn An',
    status: 'Hoàn thành',
    vehicle: '29G-99001'
  },
  {
    id: 'EXP014',
    category: 'Nhiên liệu',
    description: 'Đổ xăng tuần 1 tháng 1',
    amount: 3600000,
    date: '2024-01-04',
    responsible: 'Trần Thị Bình',
    status: 'Hoàn thành',
    vehicle: 'Tất cả'
  },
  {
    id: 'EXP015',
    category: 'Khác',
    description: 'Chi phí đào tạo tài xế mới',
    amount: 2500000,
    date: '2024-01-18',
    responsible: 'Phạm Văn Cường',
    status: 'Chờ xử lý',
    vehicle: '-'
  }
];

export const expensesByCategory = {
  'Bảo dưỡng xe': 8650000,
  'Nhiên liệu': 22600000,
  'Lương': 57000000,
  'Bảo hiểm': 6300000,
  'Khác': 5200000
};

export const walletStats = {
  totalBalance: 125000000,
  totalAdvanced: 45000000,
  pendingRefund: 12000000,
  employeesWithAdvance: 8
};

export const employeeWallets = [
  {
    id: 'EMP001',
    name: 'Nguyễn Văn An',
    role: 'Tài xế',
    balance: 8500000,
    advanceLimit: 15000000,
    advancedAmount: 5000000,
    status: 'Bình thường',
    lastTransaction: '2024-01-15'
  },
  {
    id: 'EMP002',
    name: 'Trần Thị Bình',
    role: 'Tài xế',
    balance: 12000000,
    advanceLimit: 15000000,
    advancedAmount: 8000000,
    status: 'Cần hoàn ứng',
    lastTransaction: '2024-01-14'
  },
  {
    id: 'EMP003',
    name: 'Lê Minh Tuấn',
    role: 'Tài xế',
    balance: 6500000,
    advanceLimit: 15000000,
    advancedAmount: 3000000,
    status: 'Bình thường',
    lastTransaction: '2024-01-15'
  },
  {
    id: 'EMP004',
    name: 'Phạm Văn Đức',
    role: 'Tài xế',
    balance: 9200000,
    advanceLimit: 15000000,
    advancedAmount: 6000000,
    status: 'Cần hoàn ứng',
    lastTransaction: '2024-01-13'
  },
  {
    id: 'EMP005',
    name: 'Hoàng Thị Em',
    role: 'Tài xế',
    balance: 15000000,
    advanceLimit: 15000000,
    advancedAmount: 0,
    status: 'Bình thường',
    lastTransaction: '2024-01-12'
  },
  {
    id: 'EMP006',
    name: 'Vũ Văn Phong',
    role: 'Tài xế',
    balance: 4500000,
    advanceLimit: 15000000,
    advancedAmount: 10000000,
    status: 'Quá hạn',
    lastTransaction: '2024-01-10'
  },
  {
    id: 'EMP007',
    name: 'Đỗ Thị Giang',
    role: 'Tài xế',
    balance: 11000000,
    advanceLimit: 15000000,
    advancedAmount: 4000000,
    status: 'Bình thường',
    lastTransaction: '2024-01-14'
  },
  {
    id: 'EMP008',
    name: 'Bùi Văn Hải',
    role: 'Tài xế',
    balance: 7800000,
    advanceLimit: 15000000,
    advancedAmount: 7000000,
    status: 'Cần hoàn ứng',
    lastTransaction: '2024-01-11'
  },
  {
    id: 'EMP009',
    name: 'Ngô Thị Lan',
    role: 'Nhân viên vận hành',
    balance: 5500000,
    advanceLimit: 10000000,
    advancedAmount: 2000000,
    status: 'Bình thường',
    lastTransaction: '2024-01-15'
  },
  {
    id: 'EMP010',
    name: 'Trương Văn Long',
    role: 'Nhân viên vận hành',
    balance: 8000000,
    advanceLimit: 10000000,
    advancedAmount: 0,
    status: 'Bình thường',
    lastTransaction: '2024-01-13'
  }
];

export const walletTransactions = [
  {
    id: 'WT001',
    employeeId: 'EMP001',
    employeeName: 'Nguyễn Văn An',
    type: 'Nạp ví',
    amount: 5000000,
    date: '2024-01-15',
    description: 'Nạp ví từ doanh thu',
    status: 'Hoàn thành'
  },
  {
    id: 'WT002',
    employeeId: 'EMP002',
    employeeName: 'Trần Thị Bình',
    type: 'Tạm ứng',
    amount: 8000000,
    date: '2024-01-14',
    description: 'Tạm ứng chi phí sửa xe',
    status: 'Chờ hoàn ứng'
  },
  {
    id: 'WT003',
    employeeId: 'EMP003',
    employeeName: 'Lê Minh Tuấn',
    type: 'Hoàn ứng',
    amount: 3000000,
    date: '2024-01-15',
    description: 'Hoàn ứng tạm ứng tháng trước',
    status: 'Hoàn thành'
  },
  {
    id: 'WT004',
    employeeId: 'EMP004',
    employeeName: 'Phạm Văn Đức',
    type: 'Tạm ứng',
    amount: 6000000,
    date: '2024-01-13',
    description: 'Tạm ứng chi phí nhiên liệu',
    status: 'Chờ hoàn ứng'
  },
  {
    id: 'WT005',
    employeeId: 'EMP005',
    employeeName: 'Hoàng Thị Em',
    type: 'Nạp ví',
    amount: 10000000,
    date: '2024-01-12',
    description: 'Nạp ví từ doanh thu',
    status: 'Hoàn thành'
  },
  {
    id: 'WT006',
    employeeId: 'EMP006',
    employeeName: 'Vũ Văn Phong',
    type: 'Tạm ứng',
    amount: 10000000,
    date: '2024-01-10',
    description: 'Tạm ứng khẩn cấp',
    status: 'Quá hạn'
  },
  {
    id: 'WT007',
    employeeId: 'EMP007',
    employeeName: 'Đỗ Thị Giang',
    type: 'Rút ví',
    amount: 2000000,
    date: '2024-01-14',
    description: 'Rút tiền về tài khoản',
    status: 'Hoàn thành'
  },
  {
    id: 'WT008',
    employeeId: 'EMP008',
    employeeName: 'Bùi Văn Hải',
    type: 'Tạm ứng',
    amount: 7000000,
    date: '2024-01-11',
    description: 'Tạm ứng chi phí bảo dưỡng',
    status: 'Chờ hoàn ứng'
  },
  {
    id: 'WT009',
    employeeId: 'EMP009',
    employeeName: 'Ngô Thị Lan',
    type: 'Nạp ví',
    amount: 3000000,
    date: '2024-01-15',
    description: 'Nạp ví lương tháng',
    status: 'Hoàn thành'
  },
  {
    id: 'WT010',
    employeeId: 'EMP010',
    employeeName: 'Trương Văn Long',
    type: 'Nạp ví',
    amount: 5000000,
    date: '2024-01-13',
    description: 'Nạp ví lương tháng',
    status: 'Hoàn thành'
  },
  {
    id: 'WT011',
    employeeId: 'EMP001',
    employeeName: 'Nguyễn Văn An',
    type: 'Hoàn ứng',
    amount: 5000000,
    date: '2024-01-12',
    description: 'Hoàn ứng tạm ứng',
    status: 'Hoàn thành'
  },
  {
    id: 'WT012',
    employeeId: 'EMP003',
    employeeName: 'Lê Minh Tuấn',
    type: 'Tạm ứng',
    amount: 3000000,
    date: '2024-01-11',
    description: 'Tạm ứng chi phí vận hành',
    status: 'Hoàn thành'
  },
  {
    id: 'WT013',
    employeeId: 'EMP007',
    employeeName: 'Đỗ Thị Giang',
    type: 'Nạp ví',
    amount: 6000000,
    date: '2024-01-10',
    description: 'Nạp ví từ doanh thu',
    status: 'Hoàn thành'
  },
  {
    id: 'WT014',
    employeeId: 'EMP009',
    employeeName: 'Ngô Thị Lan',
    type: 'Tạm ứng',
    amount: 2000000,
    date: '2024-01-09',
    description: 'Tạm ứng chi phí văn phòng',
    status: 'Hoàn thành'
  },
  {
    id: 'WT015',
    employeeId: 'EMP005',
    employeeName: 'Hoàng Thị Em',
    type: 'Rút ví',
    amount: 5000000,
    date: '2024-01-08',
    description: 'Rút tiền về tài khoản',
    status: 'Hoàn thành'
  }
];

export const analyticsStats = {
  totalRevenue: 245800000,
  totalExpenses: 99750000,
  netProfit: 146050000,
  profitMargin: 59.4
};

export const monthlyChartData = [
  { month: 'Th8/2024', revenue: 198000000, expenses: 82000000 },
  { month: 'Th9/2024', revenue: 215000000, expenses: 88000000 },
  { month: 'Th10/2024', revenue: 228000000, expenses: 91000000 },
  { month: 'Th11/2024', revenue: 210000000, expenses: 85000000 },
  { month: 'Th12/2024', revenue: 235000000, expenses: 95000000 },
  { month: 'Th1/2025', revenue: 245800000, expenses: 99750000 }
];

export const vehicleAnalytics = [
  { vehicleNumber: '29A-12345', totalRevenue: 38500000, totalExpenses: 12500000, profit: 26000000, efficiency: 67.5 },
  { vehicleNumber: '29B-67890', totalRevenue: 42000000, totalExpenses: 15800000, profit: 26200000, efficiency: 62.4 },
  { vehicleNumber: '29C-11223', totalRevenue: 35000000, totalExpenses: 9200000, profit: 25800000, efficiency: 73.7 },
  { vehicleNumber: '29D-33445', totalRevenue: 40500000, totalExpenses: 13100000, profit: 27400000, efficiency: 67.7 },
  { vehicleNumber: '29E-55667', totalRevenue: 33000000, totalExpenses: 8900000, profit: 24100000, efficiency: 73.0 },
  { vehicleNumber: '29F-77889', totalRevenue: 28500000, totalExpenses: 11200000, profit: 17300000, efficiency: 60.7 },
  { vehicleNumber: '29G-99001', totalRevenue: 36800000, totalExpenses: 10500000, profit: 26300000, efficiency: 71.5 },
  { vehicleNumber: '29H-22334', totalRevenue: 31500000, totalExpenses: 9550000, profit: 21950000, efficiency: 69.7 }
];

export const driverAnalytics = [
  { name: 'Nguyễn Văn An', revenueContribution: 38500000, remainingDebt: 0, rating: 4.8, trips: 142 },
  { name: 'Trần Thị Bình', revenueContribution: 42000000, remainingDebt: 8000000, rating: 4.6, trips: 158 },
  { name: 'Lê Minh Tuấn', revenueContribution: 35000000, remainingDebt: 0, rating: 4.9, trips: 131 },
  { name: 'Phạm Văn Đức', revenueContribution: 40500000, remainingDebt: 6000000, rating: 4.5, trips: 149 },
  { name: 'Hoàng Thị Em', revenueContribution: 33000000, remainingDebt: 0, rating: 4.7, trips: 125 },
  { name: 'Vũ Văn Phong', revenueContribution: 28500000, remainingDebt: 10000000, rating: 4.2, trips: 108 },
  { name: 'Đỗ Thị Giang', revenueContribution: 36800000, remainingDebt: 0, rating: 4.8, trips: 138 },
  { name: 'Bùi Văn Hải', revenueContribution: 31500000, remainingDebt: 7000000, rating: 4.4, trips: 119 }
];

export const pricingPlans = [
  {
    id: 'PLAN001',
    vehicleModel: 'VinFast VF e34',
    dailyRate: 800000,
    weeklyRate: 5000000,
    monthlyRate: 18000000,
    deposit: 20000000
  },
  {
    id: 'PLAN002',
    vehicleModel: 'VinFast VF 5 Plus',
    dailyRate: 600000,
    weeklyRate: 3800000,
    monthlyRate: 14000000,
    deposit: 15000000
  },
  {
    id: 'PLAN003',
    vehicleModel: 'VinFast VF 8',
    dailyRate: 1200000,
    weeklyRate: 7500000,
    monthlyRate: 28000000,
    deposit: 30000000
  },
  {
    id: 'PLAN004',
    vehicleModel: 'VinFast VF 9',
    dailyRate: 1500000,
    weeklyRate: 9500000,
    monthlyRate: 35000000,
    deposit: 40000000
  }
];

export const transactions = [
  {
    id: 'TXN001',
    vehiclePlate: '29A-12345',
    driverName: 'Nguyễn Văn An',
    type: 'rental',
    amount: 18000000,
    date: '2024-01-15',
    status: 'completed',
    description: 'Thanh toán tiền thuê tháng 1/2024'
  },
  {
    id: 'TXN002',
    vehiclePlate: '29B-67890',
    driverName: 'Trần Thị Bình',
    type: 'deposit',
    amount: 20000000,
    date: '2024-01-14',
    status: 'completed',
    description: 'Tiền cọc xe VinFast VF e34'
  },
  {
    id: 'TXN003',
    vehiclePlate: '29C-11223',
    driverName: 'Lê Minh Tuấn',
    type: 'rental',
    amount: 18000000,
    date: '2024-01-13',
    status: 'pending',
    description: 'Thanh toán tiền thuê tháng 1/2024'
  },
  {
    id: 'TXN004',
    vehiclePlate: '29D-33445',
    driverName: 'Phạm Văn Đức',
    type: 'fine',
    amount: 500000,
    date: '2024-01-12',
    status: 'completed',
    description: 'Phạt vi phạm giao thông'
  },
  {
    id: 'TXN005',
    vehiclePlate: '29E-55667',
    driverName: 'Hoàng Thị Em',
    type: 'rental',
    amount: 14000000,
    date: '2024-01-11',
    status: 'completed',
    description: 'Thanh toán tiền thuê tháng 1/2024'
  },
  {
    id: 'TXN006',
    vehiclePlate: '29F-77889',
    driverName: 'Vũ Văn Phong',
    type: 'rental',
    amount: 18000000,
    date: '2024-01-05',
    status: 'overdue',
    description: 'Thanh toán tiền thuê tháng 1/2024 - Quá hạn 10 ngày'
  },
  {
    id: 'TXN007',
    vehiclePlate: '29G-99001',
    driverName: 'Đỗ Thị Giang',
    type: 'deposit',
    amount: 15000000,
    date: '2024-01-10',
    status: 'completed',
    description: 'Tiền cọc xe VinFast VF 5 Plus'
  },
  {
    id: 'TXN008',
    vehiclePlate: '29H-22334',
    driverName: 'Bùi Văn Hải',
    type: 'fine',
    amount: 300000,
    date: '2024-01-09',
    status: 'completed',
    description: 'Phạt trả xe trễ'
  },
  {
    id: 'TXN009',
    vehiclePlate: '29K-44556',
    driverName: 'Ngô Thị Lan',
    type: 'rental',
    amount: 28000000,
    date: '2024-01-08',
    status: 'pending',
    description: 'Thanh toán tiền thuê tháng 1/2024'
  },
  {
    id: 'TXN010',
    vehiclePlate: '29L-66778',
    driverName: 'Trương Văn Long',
    type: 'deposit',
    amount: 30000000,
    date: '2024-01-07',
    status: 'completed',
    description: 'Tiền cọc xe VinFast VF 8'
  }
];

export const debts = [
  {
    id: 'DEBT001',
    vehiclePlate: '29F-77889',
    driverName: 'Vũ Văn Phong',
    driverPhone: '0901234567',
    totalDebt: 18500000,
    dueDate: '2024-01-05',
    status: 'overdue',
    overdueDays: 10,
    details: [
      { type: 'Tiền thuê tháng 1/2024', amount: 18000000, dueDate: '2024-01-05' },
      { type: 'Phí phạt trễ hạn', amount: 500000, dueDate: '2024-01-05' }
    ]
  },
  {
    id: 'DEBT002',
    vehiclePlate: '29C-11223',
    driverName: 'Lê Minh Tuấn',
    driverPhone: '0902345678',
    totalDebt: 18000000,
    dueDate: '2024-01-20',
    status: 'upcoming',
    overdueDays: 0,
    details: [
      { type: 'Tiền thuê tháng 1/2024', amount: 18000000, dueDate: '2024-01-20' }
    ]
  },
  {
    id: 'DEBT003',
    vehiclePlate: '29K-44556',
    driverName: 'Ngô Thị Lan',
    driverPhone: '0903456789',
    totalDebt: 28000000,
    dueDate: '2024-01-18',
    status: 'pending',
    overdueDays: 0,
    details: [
      { type: 'Tiền thuê tháng 1/2024', amount: 28000000, dueDate: '2024-01-18' }
    ]
  },
  {
    id: 'DEBT004',
    vehiclePlate: '29M-88990',
    driverName: 'Lý Thị Mai',
    driverPhone: '0904567890',
    totalDebt: 36500000,
    dueDate: '2023-12-25',
    status: 'critical',
    overdueDays: 21,
    details: [
      { type: 'Tiền thuê tháng 12/2023', amount: 35000000, dueDate: '2023-12-25' },
      { type: 'Phí phạt trễ hạn', amount: 1500000, dueDate: '2023-12-25' }
    ]
  },
  {
    id: 'DEBT005',
    vehiclePlate: '29N-00112',
    driverName: 'Phan Văn Nam',
    driverPhone: '0905678901',
    totalDebt: 14800000,
    dueDate: '2024-01-10',
    status: 'overdue',
    overdueDays: 5,
    details: [
      { type: 'Tiền thuê tháng 1/2024', amount: 14000000, dueDate: '2024-01-10' },
      { type: 'Phí phạt vi phạm', amount: 800000, dueDate: '2024-01-10' }
    ]
  }
];

export const financialStats = {
  totalRevenue: 245800000,
  totalExpense: 99750000,
  totalDebt: 115800000,
  overdueDebt: 69800000,
  monthlyRevenue: 245800000,
  depositHeld: 125000000
};
