import { useState } from 'react';
import {
  monthlyRevenue,
  vehiclePerformance,
  debtSummary,
  salesPerformance,
  quarterlyComparison
} from '../../mocks/reports';

export default function ReportsPage() {
  const [reportType, setReportType] = useState<'revenue' | 'vehicle' | 'debt' | 'sales'>('revenue');
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'year'>('month');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const exportReport = () => {
    alert('Chức năng xuất báo cáo đang được phát triển');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Báo cáo tổng hợp</h1>
          <p className="text-sm text-gray-600 mt-1">Phân tích và thống kê hoạt động kinh doanh</p>
        </div>
        <button
          onClick={exportReport}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
        >
          <i className="ri-download-line"></i>
          Xuất báo cáo
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Loại báo cáo</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="revenue">Doanh thu</option>
              <option value="vehicle">Hiệu suất xe</option>
              <option value="debt">Công nợ</option>
              <option value="sales">Hoạt động Sale</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Khoảng thời gian</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="month">Theo tháng</option>
              <option value="quarter">Theo quý</option>
              <option value="year">Theo năm</option>
            </select>
          </div>
        </div>
      </div>

      {/* Revenue Report */}
      {reportType === 'revenue' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng doanh thu</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0))}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-dollar-circle-line text-2xl text-green-600"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng chi phí</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(monthlyRevenue.reduce((sum, m) => sum + m.expenses, 0))}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-wallet-line text-2xl text-red-600"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Lợi nhuận</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(monthlyRevenue.reduce((sum, m) => sum + m.profit, 0))}
                  </p>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <i className="ri-line-chart-line text-2xl text-teal-600"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tỷ suất lợi nhuận</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {((monthlyRevenue.reduce((sum, m) => sum + m.profit, 0) / 
                       monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0)) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-percent-line text-2xl text-blue-600"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Biểu đồ doanh thu 12 tháng</h3>
            <div className="space-y-3">
              {monthlyRevenue.map((item, index) => {
                const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));
                const revenuePercent = (item.revenue / maxRevenue) * 100;
                const profitPercent = (item.profit / maxRevenue) * 100;
                
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.month}</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-green-600">DT: {formatCurrency(item.revenue)}</span>
                        <span className="text-teal-600">LN: {formatCurrency(item.profit)}</span>
                      </div>
                    </div>
                    <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className="absolute h-full bg-green-500 opacity-30 rounded-lg"
                        style={{ width: `${revenuePercent}%` }}
                      ></div>
                      <div
                        className="absolute h-full bg-teal-600 rounded-lg"
                        style={{ width: `${profitPercent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quarterly Comparison */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">So sánh theo quý</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Quý</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Doanh thu</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Hợp đồng</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">TB/Hợp đồng</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Tăng trưởng</th>
                  </tr>
                </thead>
                <tbody>
                  {quarterlyComparison.map((item, index) => {
                    const growth = index > 0 
                      ? ((item.revenue - quarterlyComparison[index - 1].revenue) / quarterlyComparison[index - 1].revenue * 100)
                      : 0;
                    
                    return (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.quarter}</td>
                        <td className="py-3 px-4 text-sm text-right text-gray-900">{formatCurrency(item.revenue)}</td>
                        <td className="py-3 px-4 text-sm text-right text-gray-900">{item.contracts}</td>
                        <td className="py-3 px-4 text-sm text-right text-gray-900">{formatCurrency(item.avgRevenue)}</td>
                        <td className="py-3 px-4 text-sm text-right">
                          {index > 0 && (
                            <span className={growth >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Performance Report */}
      {reportType === 'vehicle' && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tỷ lệ sử dụng TB</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {(vehiclePerformance.reduce((sum, v) => sum + v.utilizationRate, 0) / vehiclePerformance.length).toFixed(1)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <i className="ri-dashboard-line text-2xl text-teal-600"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng doanh thu</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(vehiclePerformance.reduce((sum, v) => sum + v.totalRevenue, 0))}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-dollar-circle-line text-2xl text-green-600"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">TB doanh thu/xe</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(vehiclePerformance.reduce((sum, v) => sum + v.totalRevenue, 0) / vehiclePerformance.length)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-car-line text-2xl text-blue-600"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng ngày thuê</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {vehiclePerformance.reduce((sum, v) => sum + v.totalDays, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-calendar-line text-2xl text-purple-600"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Performance Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Hiệu suất từng xe</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Biển số</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Dòng xe</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Tỷ lệ sử dụng</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Tổng doanh thu</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Số ngày thuê</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">TB/Ngày</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Đánh giá</th>
                  </tr>
                </thead>
                <tbody>
                  {vehiclePerformance.map((vehicle) => (
                    <tr key={vehicle.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <span className="text-sm font-medium text-gray-900">{vehicle.plateNumber}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-700">{vehicle.model}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                vehicle.utilizationRate >= 85 ? 'bg-green-500' :
                                vehicle.utilizationRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${vehicle.utilizationRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{vehicle.utilizationRate}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-sm text-gray-900">{formatCurrency(vehicle.totalRevenue)}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-sm text-gray-900">{vehicle.totalDays}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-sm text-gray-900">{formatCurrency(vehicle.avgRevenuePerDay)}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          vehicle.status === 'Xuất sắc' ? 'bg-green-100 text-green-700' :
                          vehicle.status === 'Tốt' ? 'bg-teal-100 text-teal-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {vehicle.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Debt Report */}
      {reportType === 'debt' && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng công nợ</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(debtSummary.totalDebt)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-file-list-line text-2xl text-orange-600"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Nợ quá hạn</p>
                  <p className="text-2xl font-bold text-red-600 mt-1">
                    {formatCurrency(debtSummary.overdueDebt)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-alarm-warning-line text-2xl text-red-600"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Nợ trong hạn</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {formatCurrency(debtSummary.currentDebt)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-check-line text-2xl text-green-600"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Debt by Driver */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Chi tiết công nợ theo tài xế</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tài xế</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Biển số xe</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Tổng nợ</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Nợ quá hạn</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Thanh toán cuối</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {debtSummary.debtByDriver.map((driver) => (
                    <tr key={driver.driverId} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{driver.driverName}</p>
                          <p className="text-xs text-gray-500">{driver.phone}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">{driver.plateNumber}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(driver.totalDebt)}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={`text-sm font-medium ${driver.overdueDebt > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                          {formatCurrency(driver.overdueDebt)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-700">{driver.lastPayment}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {driver.daysOverdue > 0 ? (
                          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 whitespace-nowrap">
                            Quá hạn {driver.daysOverdue} ngày
                          </span>
                        ) : (
                          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 whitespace-nowrap">
                            Trong hạn
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sales Performance Report */}
      {reportType === 'sales' && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng hợp đồng mới</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {salesPerformance.reduce((sum, s) => sum + s.newContracts, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <i className="ri-file-text-line text-2xl text-teal-600"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Hợp đồng gia hạn</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {salesPerformance.reduce((sum, s) => sum + s.renewalContracts, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-refresh-line text-2xl text-blue-600"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng doanh thu</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(salesPerformance.reduce((sum, s) => sum + s.totalRevenue, 0))}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-dollar-circle-line text-2xl text-green-600"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng hoa hồng</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(salesPerformance.reduce((sum, s) => sum + s.totalCommission, 0))}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-gift-line text-2xl text-orange-600"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Performance Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Hiệu suất từng nhân viên Sale</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nhân viên</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">HĐ mới</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">HĐ gia hạn</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Doanh thu</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">HH mới</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">HH gia hạn</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Tổng HH</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Tỷ lệ chốt</th>
                  </tr>
                </thead>
                <tbody>
                  {salesPerformance.map((sale) => (
                    <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{sale.saleName}</p>
                          <p className="text-xs text-gray-500">{sale.phone}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-sm text-gray-900">{sale.newContracts}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-sm text-gray-900">{sale.renewalContracts}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(sale.totalRevenue)}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-sm text-teal-600">{formatCurrency(sale.newCommission)}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-sm text-teal-600">{formatCurrency(sale.renewalCommission)}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-sm font-semibold text-teal-600">{formatCurrency(sale.totalCommission)}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-teal-500"
                              style={{ width: `${sale.conversionRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{sale.conversionRate}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}