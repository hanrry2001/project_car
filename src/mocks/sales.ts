export const salesStaff = [
  {
    id: 'SALE001',
    name: 'Nguyễn Thị Hoa',
    phone: '0901234567',
    email: 'hoa.nguyen@company.com',
    totalContracts: 12,
    activeContracts: 8,
    totalCommission: 18500000,
    thisMonthCommission: 4200000,
    avatar: 'https://readdy.ai/api/search-image?query=professional%20vietnamese%20female%20sales%20representative%20in%20business%20attire%20smiling%20confidently%20with%20modern%20office%20background%20clean%20portrait&width=200&height=200&seq=sale001&orientation=squarish'
  },
  {
    id: 'SALE002',
    name: 'Trần Văn Minh',
    phone: '0912345678',
    email: 'minh.tran@company.com',
    totalContracts: 15,
    activeContracts: 10,
    totalCommission: 22800000,
    thisMonthCommission: 5600000,
    avatar: 'https://readdy.ai/api/search-image?query=professional%20vietnamese%20male%20sales%20representative%20in%20business%20suit%20smiling%20warmly%20with%20modern%20office%20background%20clean%20portrait&width=200&height=200&seq=sale002&orientation=squarish'
  },
  {
    id: 'SALE003',
    name: 'Lê Thị Mai',
    phone: '0923456789',
    email: 'mai.le@company.com',
    totalContracts: 9,
    activeContracts: 6,
    totalCommission: 14200000,
    thisMonthCommission: 3100000,
    avatar: 'https://readdy.ai/api/search-image?query=professional%20vietnamese%20female%20sales%20consultant%20in%20elegant%20business%20attire%20smiling%20friendly%20with%20modern%20office%20background%20clean%20portrait&width=200&height=200&seq=sale003&orientation=squarish'
  },
  {
    id: 'SALE004',
    name: 'Phạm Văn Tùng',
    phone: '0934567890',
    email: 'tung.pham@company.com',
    totalContracts: 18,
    activeContracts: 12,
    totalCommission: 28900000,
    thisMonthCommission: 6800000,
    avatar: 'https://readdy.ai/api/search-image?query=professional%20vietnamese%20male%20sales%20manager%20in%20formal%20business%20attire%20smiling%20confidently%20with%20modern%20office%20background%20clean%20portrait&width=200&height=200&seq=sale004&orientation=squarish'
  }
];

export const availableVehicles = [
  {
    id: 'VEH001',
    plate: '29A-99999',
    model: 'VF5 Plus',
    location: 'Bãi xe Quận 1',
    batteryLevel: 95,
    odometer: 12500,
    lastMaintenance: '2025-01-10',
    status: 'available',
    dailyRate: 450000,
    monthlyRate: 10000000
  },
  {
    id: 'VEH002',
    plate: '30B-88888',
    model: 'VFe34',
    location: 'Bãi xe Quận 1',
    batteryLevel: 88,
    odometer: 8200,
    lastMaintenance: '2025-01-12',
    status: 'available',
    dailyRate: 400000,
    monthlyRate: 9000000
  },
  {
    id: 'VEH003',
    plate: '31C-77777',
    model: 'VF8',
    location: 'Bãi xe Quận 3',
    batteryLevel: 92,
    odometer: 15800,
    lastMaintenance: '2025-01-08',
    status: 'available',
    dailyRate: 650000,
    monthlyRate: 15000000
  },
  {
    id: 'VEH004',
    plate: '32D-66666',
    model: 'VF5 Plus',
    location: 'Bãi xe Quận 7',
    batteryLevel: 100,
    odometer: 5200,
    lastMaintenance: '2025-01-15',
    status: 'available',
    dailyRate: 450000,
    monthlyRate: 10000000
  },
  {
    id: 'VEH005',
    plate: '33E-55555',
    model: 'VF9',
    location: 'Bãi xe Quận 3',
    batteryLevel: 85,
    odometer: 22100,
    lastMaintenance: '2025-01-05',
    status: 'available',
    dailyRate: 850000,
    monthlyRate: 20000000
  },
  {
    id: 'VEH006',
    plate: '34F-44444',
    model: 'VFe34',
    location: 'Bãi xe Quận 7',
    batteryLevel: 78,
    odometer: 18900,
    lastMaintenance: '2025-01-11',
    status: 'reserved',
    dailyRate: 400000,
    monthlyRate: 9000000,
    reservedBy: 'SALE002',
    reservedUntil: '2025-01-22T15:30:00'
  }
];

export const commissionRules = {
  newContract: {
    rate: 0.05,
    description: 'Hoa hồng 5% trên giá trị hợp đồng mới'
  },
  renewal: {
    rate: 0.03,
    description: 'Hoa hồng 3% khi khách gia hạn'
  },
  minContractValue: 5000000
};

export const commissionHistory = [
  {
    id: 'COM001',
    saleId: 'SALE004',
    saleName: 'Phạm Văn Tùng',
    date: '2025-01-20',
    type: 'new',
    vehiclePlate: '29A-12345',
    driverName: 'Nguyễn Văn An',
    contractValue: 10000000,
    commissionRate: 0.05,
    commissionAmount: 500000,
    status: 'paid'
  },
  {
    id: 'COM002',
    saleId: 'SALE002',
    saleName: 'Trần Văn Minh',
    date: '2025-01-21',
    type: 'new',
    vehiclePlate: '30B-67890',
    driverName: 'Trần Thị Bình',
    contractValue: 9000000,
    commissionRate: 0.05,
    commissionAmount: 450000,
    status: 'paid'
  },
  {
    id: 'COM003',
    saleId: 'SALE001',
    saleName: 'Nguyễn Thị Hoa',
    date: '2025-01-22',
    type: 'renewal',
    vehiclePlate: '31C-11111',
    driverName: 'Lê Văn Cường',
    contractValue: 15000000,
    commissionRate: 0.03,
    commissionAmount: 450000,
    status: 'pending'
  },
  {
    id: 'COM004',
    saleId: 'SALE004',
    saleName: 'Phạm Văn Tùng',
    date: '2025-01-23',
    type: 'new',
    vehiclePlate: '32D-22222',
    driverName: 'Phạm Thị Dung',
    contractValue: 10000000,
    commissionRate: 0.05,
    commissionAmount: 500000,
    status: 'paid'
  },
  {
    id: 'COM005',
    saleId: 'SALE003',
    saleName: 'Lê Thị Mai',
    date: '2025-01-18',
    type: 'renewal',
    vehiclePlate: '33E-33333',
    driverName: 'Hoàng Văn Em',
    contractValue: 20000000,
    commissionRate: 0.03,
    commissionAmount: 600000,
    status: 'paid'
  },
  {
    id: 'COM006',
    saleId: 'SALE002',
    saleName: 'Trần Văn Minh',
    date: '2025-01-19',
    type: 'new',
    vehiclePlate: '34F-44444',
    driverName: 'Vũ Thị Phượng',
    contractValue: 9000000,
    commissionRate: 0.05,
    commissionAmount: 450000,
    status: 'paid'
  }
];

export const salesStats = {
  totalSales: 4,
  totalContracts: 54,
  activeContracts: 36,
  totalCommission: 84400000,
  thisMonthCommission: 19700000,
  availableVehicles: 5,
  reservedVehicles: 1
};