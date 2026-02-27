interface Alert {
  id: string;
  type: string;
  vehicle?: string;
  driver?: string;
  message: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

interface AlertsListProps {
  alerts: Alert[];
}

const priorityColors = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-blue-100 text-blue-700 border-blue-200'
};

const typeIcons = {
  registration: 'ri-file-list-3-line',
  maintenance: 'ri-tools-line',
  payment: 'ri-money-dollar-circle-line',
  insurance: 'ri-shield-check-line'
};

export default function AlertsList({ alerts }: AlertsListProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Cảnh Báo & Nhắc Nhở</h3>
        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full whitespace-nowrap">
          {alerts.length} thông báo
        </span>
      </div>
      
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className={`p-4 rounded-lg border ${priorityColors[alert.priority]} cursor-pointer hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                <i className={`${typeIcons[alert.type as keyof typeof typeIcons]} text-lg`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium mb-1">{alert.message}</p>
                <p className="text-xs opacity-80">
                  {alert.vehicle || alert.driver} • Hạn: {new Date(alert.dueDate).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 text-sm font-medium text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
        Xem tất cả thông báo
      </button>
    </div>
  );
}