interface StatsCardProps {
  title: string;
  value: string;
  unit?: string;
  icon: string;
  color: 'teal' | 'emerald' | 'cyan' | 'blue' | 'amber' | 'rose';
  trend?: string;
  trendUp?: boolean;
  alert?: boolean;
  subtitle?: string;
}

const colorClasses = {
  teal: 'bg-teal-50 text-teal-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  cyan: 'bg-cyan-50 text-cyan-600',
  blue: 'bg-blue-50 text-blue-600',
  amber: 'bg-amber-50 text-amber-600',
  rose: 'bg-rose-50 text-rose-600'
};

export default function StatsCard({ title, value, unit, icon, color, trend, trendUp, alert, subtitle }: StatsCardProps) {
  const isTrendDown = trendUp === false;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${colorClasses[color]}`}>
          <i className={`${icon} text-2xl`}></i>
        </div>
        {alert && (
          <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full whitespace-nowrap">
            Cần xử lý
          </span>
        )}
      </div>

      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {unit && <span className="text-sm text-gray-500">{unit}</span>}
      </div>

      {subtitle && (
        <div className="mt-3">
          <span className="text-sm text-gray-500">{subtitle}</span>
        </div>
      )}

      {trend && (
        <div className="mt-3 flex items-center gap-1">
          <i className={`ri-arrow-${isTrendDown ? 'down' : 'up'}-line text-sm ${isTrendDown ? 'text-rose-600' : 'text-emerald-600'}`}></i>
          <span className={`text-sm font-medium ${isTrendDown ? 'text-rose-600' : 'text-emerald-600'}`}>{trend}</span>
          <span className="text-xs text-gray-500 ml-1">so với tháng trước</span>
        </div>
      )}
    </div>
  );
}