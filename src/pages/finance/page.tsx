import { useState } from 'react';
import { pricingPlans, transactions, debts, financialStats } from '../../mocks/finance';

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<'pricing' | 'transactions' | 'debts'>('transactions');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(txn => {
    const matchesStatus = filterStatus === 'all' || txn.status === filterStatus;
    const matchesSearch = txn.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         txn.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredDebts = debts.filter(debt => {
    const matchesStatus = filterStatus === 'all' || debt.status === filterStatus;
    const matchesSearch = debt.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         debt.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'paid':
        return 'bg-emerald-100 text-emerald-700';
      case 'pending':
      case 'upcoming':
        return 'bg-amber-100 text-amber-700';
      case 'overdue':
        return 'bg-orange-100 text-orange-700';
      case 'critical':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'pending':
        return 'Chờ thanh toán';
      case 'overdue':
        return 'Quá hạn';
      case 'critical':
        return 'Nghiêm trọng';
      case 'upcoming':
        return 'Sắp đến hạn';
      case 'paid':
        return 'Đã thanh toán';
      default:
        return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'Tiền cọc';
      case 'rental':
        return 'Tiền thuê';
      case 'fine':
        return 'Phí phạt';
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'bg-blue-100 text-blue-700';
      case 'rental':
        return 'bg-teal-100 text-teal-700';
      case 'fine':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tài chính & Công nợ</h1>
        <p className="text-sm text-gray-600 mt-1">Quản lý thu chi, công nợ và bảng giá</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Tổng thu</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(financialStats.totalRevenue)}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <i className="ri-arrow-up-line text-lg text-emerald-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Tổng chi</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(financialStats.totalExpense)}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-arrow-down-line text-lg text-red-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Công nợ chờ thu</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(financialStats.totalDebt)}</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-lg text-amber-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Nợ quá hạn</p>
              <p className="text-xl font-bold text-red-600">{formatCurrency(financialStats.overdueDebt)}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-alert-line text-lg text-red-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Doanh thu tháng</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(financialStats.monthlyRevenue)}</p>
            </div>
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <i className="ri-calendar-line text-lg text-teal-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Tiền cọc đang giữ</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(financialStats.depositHeld)}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-safe-line text-lg text-blue-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 p-1">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === 'transactions'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-exchange-line mr-2"></i>
              Giao dịch
            </button>
            <button
              onClick={() => setActiveTab('debts')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === 'debts'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-file-list-line mr-2"></i>
              Công nợ
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === 'pricing'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-price-tag-3-line mr-2"></i>
              Bảng giá
            </button>
          </div>
        </div>

        {/* Filters */}
        {activeTab !== 'pricing' && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <div className="relative">
                  <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Tìm theo biển số, tên tài xế..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
              >
                <option value="all">Tất cả trạng thái</option>
                {activeTab === 'transactions' ? (
                  <>
                    <option value="completed">Hoàn thành</option>
                    <option value="pending">Chờ thanh toán</option>
                    <option value="overdue">Quá hạn</option>
                  </>
                ) : (
                  <>
                    <option value="upcoming">Sắp đến hạn</option>
                    <option value="pending">Chờ thanh toán</option>
                    <option value="overdue">Quá hạn</option>
                    <option value="critical">Nghiêm trọng</option>
                  </>
                )}
              </select>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {activeTab === 'pricing' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pricingPlans.map((plan) => (
                <div key={plan.id} className="bg-gradient-to-br from-teal-50 to-white rounded-lg p-5 border border-teal-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{plan.vehicleModel}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Theo ngày</span>
                      <span className="text-base font-semibold text-gray-900">{formatCurrency(plan.dailyRate)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Theo tuần</span>
                      <span className="text-base font-semibold text-gray-900">{formatCurrency(plan.weeklyRate)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Theo tháng</span>
                      <span className="text-base font-semibold text-teal-600">{formatCurrency(plan.monthlyRate)}</span>
                    </div>
                    <div className="pt-3 border-t border-teal-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Tiền cọc</span>
                        <span className="text-base font-bold text-gray-900">{formatCurrency(plan.deposit)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-3">
              {filteredTransactions.map((txn) => (
                <div key={txn.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-gray-900">{txn.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getTypeColor(txn.type)}`}>
                          {getTypeText(txn.type)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(txn.status)}`}>
                          {getStatusText(txn.status)}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">Biển số: </span>
                          <span className="font-medium text-gray-900">{txn.vehiclePlate}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Tài xế: </span>
                          <span className="font-medium text-gray-900">{txn.driverName}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Ngày: </span>
                          <span className="font-medium text-gray-900">{new Date(txn.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Số tiền: </span>
                          <span className="font-bold text-teal-600">{formatCurrency(txn.amount)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{txn.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredTransactions.length === 0 && (
                <div className="text-center py-12">
                  <i className="ri-file-list-line text-4xl text-gray-300 mb-3"></i>
                  <p className="text-gray-500">Không tìm thấy giao dịch nào</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'debts' && (
            <div className="space-y-3">
              {filteredDebts.map((debt) => (
                <div key={debt.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-gray-900">{debt.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(debt.status)}`}>
                          {getStatusText(debt.status)}
                        </span>
                        {debt.overdueDays > 0 && (
                          <span className="text-xs text-red-600 font-medium">
                            Quá hạn {debt.overdueDays} ngày
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">Biển số: </span>
                          <span className="font-medium text-gray-900">{debt.vehiclePlate}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Tài xế: </span>
                          <span className="font-medium text-gray-900">{debt.driverName}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">SĐT: </span>
                          <span className="font-medium text-gray-900">{debt.driverPhone}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Hạn thanh toán: </span>
                          <span className="font-medium text-gray-900">{new Date(debt.dueDate).toLocaleDateString('vi-VN')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xs text-gray-600 mb-1">Tổng nợ</p>
                      <p className="text-xl font-bold text-red-600">{formatCurrency(debt.totalDebt)}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">Chi tiết công nợ:</p>
                    <div className="space-y-2">
                      {debt.details.map((detail, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{detail.type}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500">
                              Hạn: {new Date(detail.dueDate).toLocaleDateString('vi-VN')}
                            </span>
                            <span className="font-semibold text-gray-900">{formatCurrency(detail.amount)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {filteredDebts.length === 0 && (
                <div className="text-center py-12">
                  <i className="ri-file-list-line text-4xl text-gray-300 mb-3"></i>
                  <p className="text-gray-500">Không tìm thấy công nợ nào</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}