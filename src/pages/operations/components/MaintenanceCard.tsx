interface MaintenanceCardProps {
  maintenance: {
    id: string;
    vehiclePlate: string;
    vehicleModel: string;
    maintenanceType: string;
    currentOdo: number;
    scheduledOdo: number;
    remainingKm: number;
    dueDate: string;
    status: 'upcoming' | 'urgent' | 'overdue';
    priority: 'low' | 'medium' | 'high' | 'critical';
    estimatedCost: number;
    notes: string;
  };
}

export default function MaintenanceCard({ maintenance }: MaintenanceCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'urgent':
        return 'bg-amber-100 text-amber-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Sắp tới';
      case 'urgent':
        return 'Khẩn cấp';
      case 'overdue':
        return 'Quá hạn';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600';
      case 'high':
        return 'text-orange-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-slate-600';
      default:
        return 'text-slate-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getProgressPercentage = () => {
    const total = maintenance.scheduledOdo - (maintenance.scheduledOdo - maintenance.currentOdo);
    return Math.min((maintenance.currentOdo / maintenance.scheduledOdo) * 100, 100);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-slate-900">#{maintenance.id}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(maintenance.status)}`}>
              {getStatusText(maintenance.status)}
            </span>
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">{maintenance.vehiclePlate}</h3>
          <p className="text-sm text-slate-600">{maintenance.vehicleModel}</p>
        </div>
        <div className={`text-right ${getPriorityColor(maintenance.priority)}`}>
          <i className="ri-alert-line text-xl"></i>
        </div>
      </div>

      <div className="mb-4 p-3 bg-slate-50 rounded-lg">
        <p className="text-sm font-semibold text-slate-900 mb-1">{maintenance.maintenanceType}</p>
        <p className="text-xs text-slate-600">{maintenance.notes}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500 mb-1">Số km hiện tại</p>
          <p className="text-sm font-semibold text-slate-900">{maintenance.currentOdo.toLocaleString()} km</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Số km bảo dưỡng</p>
          <p className="text-sm font-semibold text-slate-900">{maintenance.scheduledOdo.toLocaleString()} km</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-slate-500">Còn lại</p>
          <p className="text-sm font-semibold text-slate-900">{maintenance.remainingKm.toLocaleString()} km</p>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              maintenance.status === 'overdue'
                ? 'bg-red-500'
                : maintenance.status === 'urgent'
                ? 'bg-amber-500'
                : 'bg-teal-500'
            }`}
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
        <div>
          <p className="text-xs text-slate-500 mb-1">Ngày dự kiến</p>
          <p className="text-sm font-medium text-slate-900">{formatDate(maintenance.dueDate)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Chi phí ước tính</p>
          <p className="text-sm font-semibold text-teal-600">{formatCurrency(maintenance.estimatedCost)}</p>
        </div>
      </div>
    </div>
  );
}