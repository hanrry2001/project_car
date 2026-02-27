export const pricingConfig = [
  {
    id: 1,
    model: 'VinFast VF5',
    dailyRate: 450000,
    weeklyRate: 2800000,
    monthlyRate: 10500000,
    deposit: 15000000,
    active: true
  },
  {
    id: 2,
    model: 'VinFast VFe34',
    dailyRate: 550000,
    weeklyRate: 3500000,
    monthlyRate: 13000000,
    deposit: 20000000,
    active: true
  },
  {
    id: 3,
    model: 'VinFast VF8',
    dailyRate: 750000,
    weeklyRate: 4800000,
    monthlyRate: 18000000,
    deposit: 30000000,
    active: true
  },
  {
    id: 4,
    model: 'VinFast VF9',
    dailyRate: 950000,
    weeklyRate: 6000000,
    monthlyRate: 22000000,
    deposit: 40000000,
    active: false
  }
];

export const notificationSettings = {
  documentExpiry: {
    enabled: true,
    advanceDays: 30,
    channels: ['email', 'push', 'sms']
  },
  paymentReminder: {
    enabled: true,
    advanceDays: 3,
    channels: ['email', 'push', 'sms']
  },
  maintenanceReminder: {
    enabled: true,
    advanceKm: 500,
    channels: ['email', 'push']
  },
  overdueDebt: {
    enabled: true,
    reminderFrequency: 'daily',
    channels: ['email', 'push', 'sms']
  },
  incidentAlert: {
    enabled: true,
    immediateNotify: true,
    channels: ['email', 'push', 'sms']
  }
};

export const userAccounts = [
  {
    id: 1,
    name: 'Nguyễn Văn Admin',
    email: 'admin@evrent.vn',
    phone: '0901111111',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-02 09:15:00',
    createdAt: '2023-01-15'
  },
  {
    id: 2,
    name: 'Trần Thị Quản lý',
    email: 'manager@evrent.vn',
    phone: '0902222222',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-02 08:30:00',
    createdAt: '2023-02-20'
  },
  {
    id: 3,
    name: 'Nguyễn Minh Tuấn',
    email: 'tuan.sale@evrent.vn',
    phone: '0967890123',
    role: 'Sale',
    status: 'active',
    lastLogin: '2024-01-01 18:45:00',
    createdAt: '2023-03-10'
  },
  {
    id: 4,
    name: 'Trần Thị Hương',
    email: 'huong.sale@evrent.vn',
    phone: '0978901234',
    role: 'Sale',
    status: 'active',
    lastLogin: '2024-01-02 07:20:00',
    createdAt: '2023-03-15'
  },
  {
    id: 5,
    name: 'Lê Văn Khoa',
    email: 'khoa.sale@evrent.vn',
    phone: '0989012345',
    role: 'Sale',
    status: 'active',
    lastLogin: '2024-01-01 16:30:00',
    createdAt: '2023-04-01'
  },
  {
    id: 6,
    name: 'Phạm Văn Kho',
    email: 'kho.ops@evrent.vn',
    phone: '0903333333',
    role: 'Vận hành',
    status: 'active',
    lastLogin: '2024-01-02 06:00:00',
    createdAt: '2023-02-25'
  },
  {
    id: 7,
    name: 'Hoàng Thị Bảo dưỡng',
    email: 'baoduong.ops@evrent.vn',
    phone: '0904444444',
    role: 'Vận hành',
    status: 'active',
    lastLogin: '2024-01-01 17:00:00',
    createdAt: '2023-03-05'
  },
  {
    id: 8,
    name: 'Vũ Văn Cũ',
    email: 'old.user@evrent.vn',
    phone: '0905555555',
    role: 'Sale',
    status: 'inactive',
    lastLogin: '2023-11-15 10:00:00',
    createdAt: '2023-01-20'
  }
];

export const handoverConfig = {
  minimumPhotos: 6,
  requiredPhotos: [
    'Góc trước',
    'Góc sau',
    'Góc trái',
    'Góc phải',
    'Nội thất',
    'Đồng hồ ODO & Pin'
  ],
  checklist: [
    'Kiểm tra ngoại thất (trầy xước, móp méo)',
    'Kiểm tra nội thất (ghế, vô lăng, màn hình)',
    'Kiểm tra đèn (pha, hậu, xi nhan)',
    'Kiểm tra lốp xe (độ mòn, áp suất)',
    'Kiểm tra mức pin (SOC)',
    'Kiểm tra số km (ODO)',
    'Kiểm tra giấy tờ xe',
    'Kiểm tra phụ kiện (dây sạc, bộ sơ cứu)',
    'Chụp ảnh CCCD & Bằng lái tài xế',
    'Ký biên bản bàn giao'
  ],
  autoReminder: true,
  reminderBeforeReturn: 24
};

export const systemInfo = {
  version: '1.0.0',
  buildDate: '2024-01-01',
  environment: 'Production',
  database: 'PostgreSQL 15.2',
  storage: 'AWS S3',
  lastBackup: '2024-01-02 03:00:00',
  uptime: '99.8%',
  totalUsers: 8,
  totalVehicles: 6,
  totalDrivers: 5,
  totalContracts: 219
};