interface Driver {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  idCard: string;
  driverLicense: string;
  licenseExpiry: string;
  address: string;
  status: string;
  currentVehicle: string | null;
  rentStartDate: string | null;
  totalDebt: number;
  avatar: string;
  joinDate: string;
  totalRentals: number;
  violations: number;
  lastViolation?: string;
  contractEndDate?: string;
  depositPaid: number;
  depositTotal: number;
  workType: string | null;
  paymentMethod: string | null;
  tasksCompleted: number;
  tasksTotal: number;
}

interface DriverCardProps {
  driver: Driver;
}

const statusConfig = {
  active: { label: 'Đang thuê', color: 'bg-emerald-100 text-emerald-700', icon: 'ri-user-follow-line' },
  inactive: { label: 'Không hoạt động', color: 'bg-gray-100 text-gray-700', icon: 'ri-user-unfollow-line' },
  pending: { label: 'Chờ duyệt', color: 'bg-amber-100 text-amber-700', icon: 'ri-time-line' }
};

function getContractInfo(contractEndDate?: string | null) {
  if (!contractEndDate) return { display: 'Chưa có', isWarning: false };
  
  const end = new Date(contractEndDate);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const dateStr = end.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  
  if (diffDays < 0) {
    return { display: `${dateStr} (Quá hạn ${Math.abs(diffDays)} ngày)`, isWarning: true };
  }
  
  if (diffDays === 0) {
    return { display: `${dateStr} (Hết hạn hôm nay)`, isWarning: true };
  }
  
  const isWarning = diffDays <= 60;
  return { display: `${dateStr} (Còn ${diffDays} ngày)`, isWarning };
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount);
}

export default function DriverCard({ driver }: DriverCardProps) {
  const status = statusConfig[driver.status as keyof typeof statusConfig];

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16">
              <img 
                src={driver.avatar} 
                alt={driver.fullName}
                className="w-full h-full object-cover object-top rounded-full"
              />
            </div>
            {driver.violations > 0 && (
              <div className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
                {driver.violations}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{driver.fullName}</h3>
            <p className="text-sm text-gray-600 mb-2">{driver.phone}</p>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.color} whitespace-nowrap`}>
              <i className={status.icon}></i>
              {status.label}
            </span>
          </div>

          <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer flex-shrink-0">
            <i className="ri-more-2-fill text-xl text-gray-600"></i>
          </button>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-2">
              <i className="ri-money-dollar-circle-line text-base"></i>
              Tiền cọc
            </span>
            <span className="font-medium text-gray-900">
              {driver.depositTotal > 0 ? `${formatCurrency(driver.depositPaid)}/${formatCurrency(driver.depositTotal)}` : 'Chưa có'}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-2">
              <i className="ri-steering-2-line text-base"></i>
              Hình thức chạy
            </span>
            <span className="font-medium text-gray-900">{driver.workType || 'Chưa có'}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-2">
              <i className="ri-wallet-3-line text-base"></i>
              Thu tiền
            </span>
            <span className="font-medium text-gray-900">{driver.paymentMethod || 'Chưa có'}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-2">
              <i className="ri-task-line text-base"></i>
              Task hỗ trợ
            </span>
            {driver.tasksTotal > 0 ? (
              <div className="flex items-center gap-2">
                <span className={`font-medium ${driver.tasksCompleted < driver.tasksTotal ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {driver.tasksCompleted}/{driver.tasksTotal}
                </span>
                <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${driver.tasksCompleted >= driver.tasksTotal ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{ width: `${(driver.tasksCompleted / driver.tasksTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <span className="font-medium text-gray-400">Không có</span>
            )}
          </div>

          {driver.currentVehicle && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center gap-2">
                <i className="ri-car-line text-base"></i>
                Xe đang thuê
              </span>
              <span className="font-medium text-gray-900">{driver.currentVehicle}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-2">
              <i className="ri-calendar-line text-base"></i>
              Thời hạn HĐ
            </span>
            {(() => {
              const info = getContractInfo(driver.contractEndDate);
              return (
                <span className={`font-medium ${info.isWarning ? 'text-red-600' : 'text-gray-900'}`}>
                  {info.display}
                </span>
              );
            })()}
          </div>

          {driver.totalDebt > 0 && (
            <div className="flex items-center justify-between text-sm p-3 bg-red-50 rounded-lg">
              <span className="text-red-700 flex items-center gap-2 font-medium">
                <i className="ri-alert-line text-base"></i>
                Công nợ
              </span>
              <span className="font-bold text-red-700">{(driver.totalDebt / 1000000).toFixed(1)}M VNĐ</span>
            </div>
          )}

          {driver.lastViolation && (
            <div className="text-xs text-red-600 bg-red-50 p-2 rounded-lg">
              <i className="ri-error-warning-line mr-1"></i>
              {driver.lastViolation}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-200 flex gap-2">
          <button className="flex-1 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-eye-line mr-2"></i>
            Chi tiết
          </button>
          {driver.status === 'pending' && (
            <button className="flex-1 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-check-line mr-2"></i>
              Duyệt
            </button>
          )}
        </div>
      </div>
    </div>
  );
}