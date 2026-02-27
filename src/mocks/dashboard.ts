export const dashboardStats = [
  {
    title: 'Tổng Doanh Thu',
    value: '285.000.000đ',
    icon: 'ri-money-dollar-circle-line',
    trend: '+12.5%',
    trendUp: true,
    color: 'teal'
  },
  {
    title: 'Doanh Thu Tháng',
    value: '45.000.000đ',
    icon: 'ri-calendar-line',
    trend: '+8.2%',
    trendUp: true,
    color: 'blue'
  },
  {
    title: 'Tổng Số Xe',
    value: '6',
    icon: 'ri-car-line',
    subtitle: '2 xe đang thuê',
    color: 'green'
  },
  {
    title: 'Công Nợ',
    value: '1.500.000đ',
    icon: 'ri-alert-line',
    trend: '-5.3%',
    trendUp: false,
    color: 'orange'
  }
];

export const dashboardStatsData = {
  totalRevenue: 285000000,
  monthlyRevenue: 45000000,
  totalVehicles: 6,
  activeRentals: 2,
  pendingPayments: 1500000,
  maintenanceAlerts: 3
};

export const revenueChartData = [
  { month: 'T6', revenue: 38000000 },
  { month: 'T7', revenue: 42000000 },
  { month: 'T8', revenue: 48000000 },
  { month: 'T9', revenue: 45000000 },
  { month: 'T10', revenue: 52000000 },
  { month: 'T11', revenue: 55000000 },
  { month: 'T12', revenue: 45000000 }
];

export const upcomingAlerts = [
  {
    id: 'AL001',
    type: 'registration',
    vehicle: '29C-11223',
    message: 'Đăng kiểm sắp hết hạn',
    dueDate: '2025-05-10',
    priority: 'high'
  },
  {
    id: 'AL002',
    type: 'maintenance',
    vehicle: '29B-67890',
    message: 'Bảo dưỡng định kỳ',
    dueDate: '2025-02-20',
    priority: 'medium'
  },
  {
    id: 'AL003',
    type: 'payment',
    driver: 'Lê Minh Tuấn',
    message: 'Tiền thuê tháng 12 chưa thanh toán',
    dueDate: '2024-12-25',
    priority: 'high'
  },
  {
    id: 'AL004',
    type: 'insurance',
    vehicle: '29F-77889',
    message: 'Bảo hiểm sắp hết hạn',
    dueDate: '2025-06-30',
    priority: 'medium'
  }
];

export const recentActivities = [
  {
    id: 'ACT001',
    type: 'rental',
    description: 'Xe 29B-67890 được giao cho Nguyễn Văn An',
    timestamp: '2024-12-01 09:30',
    user: 'Admin'
  },
  {
    id: 'ACT002',
    type: 'maintenance',
    description: 'Xe 29C-11223 vào bảo dưỡng',
    timestamp: '2024-12-20 14:15',
    user: 'Vận hành'
  },
  {
    id: 'ACT003',
    type: 'payment',
    description: 'Nguyễn Văn An thanh toán 15.000.000đ',
    timestamp: '2024-12-15 10:20',
    user: 'Kế toán'
  },
  {
    id: 'ACT004',
    type: 'reservation',
    description: 'Xe 29E-55667 được giữ chỗ bởi Sale Trần Thị Bình',
    timestamp: '2024-12-27 16:45',
    user: 'Sale'
  }
];