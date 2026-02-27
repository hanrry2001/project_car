
import { useState } from 'react';
import { expenses, expensesByCategory } from '../../mocks/finance';

export default function FinanceExpensesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const maintenanceExpenses = expenses
    .filter(e => e.category === 'Bảo dưỡng xe')
    .reduce((sum, exp) => sum + exp.amount, 0);
  const operatingExpenses = expenses
    .filter(e => e.category === 'Nhiên liệu' || e.category === 'Lương')
    .reduce((sum, exp) => sum + exp.amount, 0);
  const otherExpenses = expenses
    .filter(e => e.category === 'Bảo hiểm' || e.category === 'Khác')
    .reduce((sum, exp) => sum + exp.amount, 0);

  const filteredExpenses = expenses.filter(expense => {
    const matchSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       expense.responsible.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       expense.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = categoryFilter === 'all' || expense.category === categoryFilter;
    const matchStatus = statusFilter === 'all' || expense.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const totalCategoryAmount = Object.values(expensesByCategory).reduce((sum, val) => sum + val, 0);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Chi Phí</h1>
          <p className="text-sm text-gray-500 mt-1">Theo dõi và quản lý các khoản chi</p>
        </div>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer">
          <i className="ri-add-line"></i>
          Thêm Chi Phí
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Tổng Chi Phí Tháng</span>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-arrow-down-circle-line text-xl text-red-600"></i>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {(totalExpenses / 1000000).toFixed(1)}tr
          </div>
          <div className="text-xs text-gray-500 mt-1">Tháng 1/2024</div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Chi Phí Vận Hành</span>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-gas-station-line text-xl text-blue-600"></i>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {(operatingExpenses / 1000000).toFixed(1)}tr
          </div>
          <div className="text-xs text-gray-500 mt-1">Nhiên liệu & Lương</div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Chi Phí Bảo Dưỡng</span>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-tools-line text-xl text-orange-600"></i>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {(maintenanceExpenses / 1000000).toFixed(1)}tr
          </div>
          <div className="text-xs text-gray-500 mt-1">Sửa chữa & Bảo trì</div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Chi Phí Khác</span>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-more-2-line text-xl text-purple-600"></i>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {(otherExpenses / 1000000).toFixed(1)}tr
          </div>
          <div className="text-xs text-gray-500 mt-1">Bảo hiểm & Khác</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Phân Bổ Chi Phí Theo Hạng Mục</h2>
        <div className="space-y-3">
          {Object.entries(expensesByCategory).map(([category, amount]) => {
            const percentage = (amount / totalCategoryAmount) * 100;
            const colors: Record<string, string> = {
              'Lương': 'bg-blue-500',
              'Nhiên liệu': 'bg-orange-500',
              'Bảo dưỡng xe': 'bg-teal-500',
              'Bảo hiểm': 'bg-purple-500',
              'Khác': 'bg-gray-500'
            };
            return (
              <div key={category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {(amount / 1000000).toFixed(1)}tr ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${colors[category]}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-5 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm theo mô tả, người phụ trách, biển số..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">Tất cả hạng mục</option>
              <option value="Bảo dưỡng xe">Bảo dưỡng xe</option>
              <option value="Nhiên liệu">Nhiên liệu</option>
              <option value="Lương">Lương</option>
              <option value="Bảo hiểm">Bảo hiểm</option>
              <option value="Khác">Khác</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Chờ xử lý">Chờ xử lý</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Mã Chi Phí
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Hạng Mục
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Mô Tả
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Biển Số
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Số Tiền
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Ngày
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Người Phụ Trách
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Trạng Thái
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{expense.id}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{expense.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-700">{expense.description}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{expense.vehicle}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-red-600">
                      {expense.amount.toLocaleString('vi-VN')}đ
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{expense.date}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{expense.responsible}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                        expense.status === 'Hoàn thành'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {expense.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredExpenses.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-file-list-3-line text-5xl text-gray-300 mb-3"></i>
            <p className="text-gray-500">Không tìm thấy chi phí nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
