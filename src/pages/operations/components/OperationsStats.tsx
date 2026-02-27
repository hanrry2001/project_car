interface OperationsStatsProps {
  handoverSessions: any[];
  maintenanceSchedule: any[];
}

export default function OperationsStats({ handoverSessions, maintenanceSchedule }: OperationsStatsProps) {
  const completedHandovers = handoverSessions.filter(s => s.status === 'completed').length;
  const inProgressHandovers = handoverSessions.filter(s => s.status === 'in-progress').length;
  const pendingHandovers = handoverSessions.filter(s => s.status === 'pending').length;
  
  const urgentMaintenance = maintenanceSchedule.filter(m => m.status === 'urgent' || m.status === 'overdue').length;
  const upcomingMaintenance = maintenanceSchedule.filter(m => m.status === 'upcoming').length;

  const stats = [
    {
      label: 'Tổng phiên bàn giao',
      value: handoverSessions.length,
      icon: 'ri-exchange-line',
      color: 'bg-blue-50 text-blue-600',
      bgColor: 'bg-blue-500'
    },
    {
      label: 'Hoàn thành',
      value: completedHandovers,
      icon: 'ri-checkbox-circle-line',
      color: 'bg-emerald-50 text-emerald-600',
      bgColor: 'bg-emerald-500'
    },
    {
      label: 'Đang thực hiện',
      value: inProgressHandovers,
      icon: 'ri-time-line',
      color: 'bg-amber-50 text-amber-600',
      bgColor: 'bg-amber-500'
    },
    {
      label: 'Chờ xử lý',
      value: pendingHandovers,
      icon: 'ri-hourglass-line',
      color: 'bg-slate-50 text-slate-600',
      bgColor: 'bg-slate-500'
    },
    {
      label: 'Bảo dưỡng khẩn cấp',
      value: urgentMaintenance,
      icon: 'ri-alert-line',
      color: 'bg-red-50 text-red-600',
      bgColor: 'bg-red-500'
    },
    {
      label: 'Bảo dưỡng sắp tới',
      value: upcomingMaintenance,
      icon: 'ri-tools-line',
      color: 'bg-teal-50 text-teal-600',
      bgColor: 'bg-teal-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${stat.color}`}>
              <i className={`${stat.icon} text-xl`}></i>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
          <p className="text-xs text-slate-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}