export const incidentsData = [
  {
    id: 'INC001',
    type: 'Vi phạm giao thông',
    severity: 'Nhẹ',
    vehiclePlate: '51F-123.45',
    vehicleModel: 'VF8',
    driverName: 'Nguyễn Văn An',
    driverPhone: '0901234567',
    date: '2024-12-15',
    location: 'Đường Nguyễn Huệ, Q.1, TP.HCM',
    description: 'Vượt đèn đỏ',
    fine: 800000,
    status: 'Chưa xử lý',
    images: [
      'https://readdy.ai/api/search-image?query=traffic%20violation%20red%20light%20camera%20photo%20showing%20electric%20vehicle%20at%20intersection%20with%20red%20traffic%20signal%20in%20Ho%20Chi%20Minh%20City%20Vietnam%20urban%20street%20scene&width=400&height=300&seq=inc001a&orientation=landscape',
      'https://readdy.ai/api/search-image?query=traffic%20police%20citation%20document%20fine%20notice%20for%20red%20light%20violation%20Vietnamese%20text%20official%20government%20form&width=400&height=300&seq=inc001b&orientation=landscape'
    ],
    notes: 'Phạt nguội qua camera, đã thông báo tài xế'
  },
  {
    id: 'INC002',
    type: 'Tai nạn',
    severity: 'Nghiêm trọng',
    vehiclePlate: '51F-234.56',
    vehicleModel: 'VF5 Plus',
    driverName: 'Trần Thị Bình',
    driverPhone: '0912345678',
    date: '2024-12-10',
    location: 'Xa lộ Hà Nội, Q.9, TP.HCM',
    description: 'Va chạm với xe máy, hư hỏng đầu xe và đèn trước',
    fine: 0,
    status: 'Đang xử lý',
    images: [
      'https://readdy.ai/api/search-image?query=car%20accident%20damage%20front%20bumper%20headlight%20broken%20electric%20vehicle%20collision%20scene%20daytime%20urban%20road%20Vietnam%20detailed%20damage%20assessment%20photo&width=400&height=300&seq=inc002a&orientation=landscape',
      'https://readdy.ai/api/search-image?query=motorcycle%20car%20collision%20accident%20scene%20traffic%20incident%20urban%20street%20Vietnam%20police%20investigation%20damaged%20vehicles&width=400&height=300&seq=inc002b&orientation=landscape',
      'https://readdy.ai/api/search-image?query=close%20up%20damaged%20car%20headlight%20broken%20front%20bumper%20electric%20vehicle%20accident%20damage%20detail%20inspection%20photo&width=400&height=300&seq=inc002c&orientation=landscape'
    ],
    notes: 'Đã báo bảo hiểm, chờ định giá sửa chữa. Chi phí sửa chữa ước tính 15 triệu đồng'
  },
  {
    id: 'INC003',
    type: 'Vi phạm giao thông',
    severity: 'Trung bình',
    vehiclePlate: '51F-345.67',
    vehicleModel: 'VFe34',
    driverName: 'Lê Văn Cường',
    driverPhone: '0923456789',
    date: '2024-12-20',
    location: 'Đường Võ Văn Kiệt, Q.5, TP.HCM',
    description: 'Đậu xe sai quy định',
    fine: 300000,
    status: 'Đã xử lý',
    images: [
      'https://readdy.ai/api/search-image?query=illegally%20parked%20electric%20car%20on%20sidewalk%20urban%20street%20Vietnam%20traffic%20violation%20parking%20enforcement%20photo&width=400&height=300&seq=inc003a&orientation=landscape'
    ],
    notes: 'Tài xế đã nộp phạt'
  },
  {
    id: 'INC004',
    type: 'Tai nạn',
    severity: 'Nhẹ',
    vehiclePlate: '51F-456.78',
    vehicleModel: 'VF8',
    driverName: 'Phạm Thị Dung',
    driverPhone: '0934567890',
    date: '2024-12-18',
    location: 'Bãi đỗ xe Vincom, Q.1, TP.HCM',
    description: 'Va chạm nhẹ khi lùi xe, trầy xước cản sau',
    fine: 0,
    status: 'Đã xử lý',
    images: [
      'https://readdy.ai/api/search-image?query=minor%20car%20scratch%20rear%20bumper%20parking%20lot%20accident%20small%20damage%20electric%20vehicle%20close%20up%20detail%20photo&width=400&height=300&seq=inc004a&orientation=landscape',
      'https://readdy.ai/api/search-image?query=scratched%20car%20bumper%20paint%20damage%20minor%20collision%20parking%20area%20inspection%20photo%20electric%20vehicle&width=400&height=300&seq=inc004b&orientation=landscape'
    ],
    notes: 'Tài xế tự thanh toán chi phí sửa chữa 2 triệu đồng'
  },
  {
    id: 'INC005',
    type: 'Vi phạm giao thông',
    severity: 'Trung bình',
    vehiclePlate: '51F-567.89',
    vehicleModel: 'VF9',
    driverName: 'Hoàng Văn Em',
    driverPhone: '0945678901',
    date: '2024-12-22',
    location: 'Cao tốc TP.HCM - Long Thành',
    description: 'Chạy quá tốc độ 20km/h',
    fine: 1200000,
    status: 'Chưa xử lý',
    images: [
      'https://readdy.ai/api/search-image?query=highway%20speed%20camera%20photo%20speeding%20violation%20electric%20vehicle%20on%20expressway%20Vietnam%20traffic%20enforcement%20automated%20system&width=400&height=300&seq=inc005a&orientation=landscape'
    ],
    notes: 'Phạt nguội, đã gửi thông báo cho tài xế'
  },
  {
    id: 'INC006',
    type: 'Tai nạn',
    severity: 'Trung bình',
    vehiclePlate: '51F-678.90',
    vehicleModel: 'VF5 Plus',
    driverName: 'Võ Thị Phương',
    driverPhone: '0956789012',
    date: '2024-12-08',
    location: 'Đường Lê Văn Việt, Q.9, TP.HCM',
    description: 'Bị xe khác đâm từ phía sau khi dừng đèn đỏ',
    fine: 0,
    status: 'Đã xử lý',
    images: [
      'https://readdy.ai/api/search-image?query=rear%20end%20collision%20damage%20car%20trunk%20dented%20electric%20vehicle%20accident%20scene%20traffic%20light%20intersection%20Vietnam&width=400&height=300&seq=inc006a&orientation=landscape',
      'https://readdy.ai/api/search-image?query=damaged%20car%20rear%20bumper%20trunk%20dent%20collision%20impact%20electric%20vehicle%20insurance%20claim%20photo%20detailed%20damage&width=400&height=300&seq=inc006b&orientation=landscape'
    ],
    notes: 'Lỗi của bên thứ 3, bảo hiểm đã chi trả 8 triệu đồng'
  },
  {
    id: 'INC007',
    type: 'Vi phạm giao thông',
    severity: 'Nhẹ',
    vehiclePlate: '51F-789.01',
    vehicleModel: 'VFe34',
    driverName: 'Đặng Văn Giang',
    driverPhone: '0967890123',
    date: '2024-12-25',
    location: 'Đường Trần Hưng Đạo, Q.1, TP.HCM',
    description: 'Không thắt dây an toàn',
    fine: 200000,
    status: 'Chưa xử lý',
    images: [],
    notes: 'CSGT lập biên bản tại chỗ'
  },
  {
    id: 'INC008',
    type: 'Tai nạn',
    severity: 'Nghiêm trọng',
    vehiclePlate: '51F-890.12',
    vehicleModel: 'VF8',
    driverName: 'Bùi Thị Hoa',
    driverPhone: '0978901234',
    date: '2024-12-05',
    location: 'Đường Nguyễn Văn Linh, Q.7, TP.HCM',
    description: 'Va chạm với xe tải, hư hỏng nặng bên hông xe',
    fine: 0,
    status: 'Đang xử lý',
    images: [
      'https://readdy.ai/api/search-image?query=serious%20car%20accident%20side%20damage%20collision%20with%20truck%20electric%20vehicle%20heavily%20damaged%20urban%20road%20Vietnam%20emergency%20scene&width=400&height=300&seq=inc008a&orientation=landscape',
      'https://readdy.ai/api/search-image?query=severe%20car%20side%20panel%20damage%20crushed%20door%20electric%20vehicle%20major%20collision%20accident%20detailed%20damage%20assessment%20photo&width=400&height=300&seq=inc008b&orientation=landscape',
      'https://readdy.ai/api/search-image?query=accident%20scene%20investigation%20police%20traffic%20collision%20truck%20and%20car%20Vietnam%20urban%20street%20damaged%20vehicles&width=400&height=300&seq=inc008c&orientation=landscape',
      'https://readdy.ai/api/search-image?query=car%20interior%20damage%20side%20impact%20collision%20broken%20window%20damaged%20door%20panel%20electric%20vehicle%20accident&width=400&height=300&seq=inc008d&orientation=landscape'
    ],
    notes: 'Đang chờ kết luận điều tra. Chi phí sửa chữa ước tính 45 triệu đồng. Xe đang tại garage'
  }
];

export const incidentStats = {
  totalIncidents: 8,
  trafficViolations: 4,
  accidents: 4,
  pending: 3,
  processing: 2,
  resolved: 3,
  totalFines: 2500000,
  severityBreakdown: {
    light: 3,
    medium: 3,
    serious: 2
  }
};