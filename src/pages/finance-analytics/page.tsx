
import { useState } from 'react';
import {
  analyticsStats,
  monthlyChartData,
  vehicleAnalytics,
  driverAnalytics
} from '../../mocks/finance';

type TimeFilter = 'month' | 'quarter' | 'year';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value);

const formatMillions = (value: number) => {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
  return value.toString();
};

export default function FinanceAnalyticsPage() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('month');

  const maxBarValue = Math.max(...monthlyChartData.map(d => d.revenue));

  const stats = [
    {
      label: 'Tổng Doanh Thu',
      value: formatCurrency(analyticsStats.totalRevenue),
      icon: 'ri-arrow-up-circle-line',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      sub: '+12.5% so tháng trước'
    },
    {
      label: 'Tổng Chi Phí',
      value: formatCurrency(analyticsStats.totalExpenses),
      icon: 'ri-arrow-down-circle-line',
      color: 'text-rose-500',
      bg: 'bg-rose-50',
      sub: '+5.2% so tháng trước'
    },
    {
      label: 'Lợi Nhuận Ròng',
      value: formatCurrency(analyticsStats.netProfit),
      icon: 'ri-funds-line',
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      sub: '+18.3% so tháng trước'
    },
    {
      label: 'Tỷ Suất Lợi Nhuận',
      value: `${analyticsStats.profitMargin}%`,
      icon: 'ri-percent-line',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      sub: 'Tháng này'
    }
  ];

  const timeOptions: { key: TimeFilter; label: string }[] = [
    { key: 'month', label: 'Tháng này' },
    { key: 'quarter', label: 'Quý này' },
    { key: 'year', label: 'Năm này' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Báo Cáo & Phân Tích</h1>
          <p className="text-sm text-gray-500 mt-0.5">Tổng hợp hiệu suất tài chính toàn hệ thống</p>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {timeOptions.map(opt => (
            <button
              key={opt.key}
              onClick={() => setTimeFilter(opt.key)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                timeFilter === opt.key
                  ? 'bg-white text-teal-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${s.bg}`}>
                <i className={`${s.icon} text-xl ${s.color}`}></i>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-gray-800">Doanh Thu vs Chi Phí (6 tháng gần nhất)</h2>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-teal-500 inline-block"></span>Doanh thu
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-rose-400 inline-block"></span>Chi phí
            </span>
          </div>
        </div>
        <div className="flex items-end gap-4 h-52">
          {monthlyChartData.map((d) => {
            const revH = Math.round((d.revenue / maxBarValue) * 180);
            const expH = Math.round((d.expenses / maxBarValue) * 180);
            return (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="flex items-end gap-1 w-full justify-center" style={{ height: 180 }}>
                  <div className="group relative flex-1 max-w-[28px]">
                    <div
                      className="w-full bg-teal-500 rounded-t-md transition-all duration-300 hover:bg-teal-600 cursor-pointer"
                      style={{ height: revH }}
                    ></div>
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {formatMillions(d.revenue)}đ
                    </div>
                  </div>
                  <div className="group relative flex-1 max-w-[28px]">
                    <div
                      className="w-full bg-rose-400 rounded-t-md transition-all duration-300 hover:bg-rose-500 cursor-pointer"
                      style={{ height: expH }}
                    ></div>
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {formatMillions(d.expenses)}đ
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{d.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two tables side by side */}
      <div className="grid grid-cols-2 gap-5">
        {/* Vehicle Analytics */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center bg-teal-50 rounded-lg">
              <i className="ri-car-line text-teal-600 text-base"></i>
            </div>
            <h2 className="text-sm font-semibold text-gray-800">Phân Tích Theo Xe</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500">
                  <th className="text-left px-4 py-3 font-medium">Biển số</th>
                  <th className="text-right px-4 py-3 font-medium">Tổng thu</th>
                  <th className="text-right px-4 py-3 font-medium">Tổng chi</th>
                  <th className="text-right px-4 py-3 font-medium">Lợi nhuận</th>
                  <th className="text-right px-4 py-3 font-medium">Hiệu suất</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {vehicleAnalytics.map((v) => (
                  <tr key={v.vehicleNumber} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{v.vehicleNumber}</td>
                    <td className="px-4 py-3 text-right text-emerald-600 font-medium">
                      {formatMillions(v.totalRevenue)}đ
                    </td>
                    <td className="px-4 py-3 text-right text-rose-500">
                      {formatMillions(v.totalExpenses)}đ
                    </td>
                    <td className="px-4 py-3 text-right text-teal-600 font-semibold">
                      {formatMillions(v.profit)}đ
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        v.efficiency >= 70 ? 'bg-emerald-50 text-emerald-700' :
                        v.efficiency >= 60 ? 'bg-amber-50 text-amber-700' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {v.efficiency}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Driver Analytics */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center bg-amber-50 rounded-lg">
              <i className="ri-user-line text-amber-600 text-base"></i>
            </div>
            <h2 className="text-sm font-semibold text-gray-800">Phân Tích Theo Tài Xế</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500">
                  <th className="text-left px-4 py-3 font-medium">Tài xế</th>
                  <th className="text-right px-4 py-3 font-medium">Doanh thu</th>
                  <th className="text-right px-4 py-3 font-medium">Công nợ</th>
                  <th className="text-right px-4 py-3 font-medium">Chuyến</th>
                  <th className="text-right px-4 py-3 font-medium">Đánh giá</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {driverAnalytics.map((d) => (
                  <tr key={d.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 text-xs font-semibold">
                          {d.name.split(' ').pop()?.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800 text-xs whitespace-nowrap">{d.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-emerald-600 font-medium">
                      {formatMillions(d.revenueContribution)}đ
                    </td>
                    <td className="px-4 py-3 text-right">
                      {d.remainingDebt > 0 ? (
                        <span className="text-rose-500 font-medium">{formatMillions(d.remainingDebt)}đ</span>
                      ) : (
                        <span className="text-gray-400 text-xs">Không có</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">{d.trips}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                        d.rating >= 4.7 ? 'text-emerald-600' :
                        d.rating >= 4.4 ? 'text-amber-600' :
                        'text-rose-500'
                      }`}>
                        <i className="ri-star-fill text-amber-400"></i>
                        {d.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Profit breakdown bar */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">Phân Bổ Lợi Nhuận Theo Xe</h2>
        <div className="space-y-3">
          {vehicleAnalytics
            .sort((a, b) => b.profit - a.profit)
            .map((v) => {
              const maxProfit = Math.max(...vehicleAnalytics.map(x => x.profit));
              const pct = Math.round((v.profit / maxProfit) * 100);
              return (
                <div key={v.vehicleNumber} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-600 w-24 shrink-0">{v.vehicleNumber}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-semibold text-teal-600 w-20 text-right shrink-0">
                    {formatMillions(v.profit)}đ
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
