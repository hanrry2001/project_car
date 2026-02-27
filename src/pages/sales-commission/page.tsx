import { useState } from 'react';
import { salesStaff, availableVehicles, commissionHistory, salesStats, commissionRules } from '../../mocks/sales';

export default function SalesCommissionPage() {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'sales' | 'commission'>('vehicles');
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [reservationTime, setReservationTime] = useState<number>(30);

  const locations = ['Bãi xe Quận 1', 'Bãi xe Quận 3', 'Bãi xe Quận 7'];

  const filteredVehicles = availableVehicles.filter(vehicle => {
    const matchesLocation = filterLocation === 'all' || vehicle.location === filterLocation;
    const matchesStatus = filterStatus === 'all' || vehicle.status === filterStatus;
    const matchesSearch = vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLocation && matchesStatus && matchesSearch;
  });

  const filteredCommissions = commissionHistory.filter(com => {
    const matchesSearch = com.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         com.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         com.saleName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-100 text-emerald-700';
      case 'reserved':
        return 'bg-amber-100 text-amber-700';
      case 'paid':
        return 'bg-emerald-100 text-emerald-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Sẵn sàng';
      case 'reserved':
        return 'Đang giữ chỗ';
      case 'paid':
        return 'Đã thanh toán';
      case 'pending':
        return 'Chờ thanh toán';
      default:
        return status;
    }
  };

  const getTypeText = (type: string) => {
    return type === 'new' ? 'Hợp đồng mới' : 'Gia hạn';
  };

  const getTypeColor = (type: string) => {
    return type === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700';
  };

  const handleReserveVehicle = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
  };

  const confirmReservation = () => {
    alert(`Đã giữ xe thành công trong ${reservationTime} phút!`);
    setSelectedVehicle(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sale & Hoa hồng</h1>
        <p className="text-sm text-gray-600 mt-1">Quản lý xe trống, booking và hoa hồng sale</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Tổng Sale</p>
              <p className="text-xl font-bold text-gray-900">{salesStats.totalSales}</p>
            </div>
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <i className="ri-team-line text-lg text-teal-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Tổng HĐ</p>
              <p className="text-xl font-bold text-gray-900">{salesStats.totalContracts}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-file-text-line text-lg text-blue-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">HĐ đang chạy</p>
              <p className="text-xl font-bold text-gray-900">{salesStats.activeContracts}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <i className="ri-checkbox-circle-line text-lg text-emerald-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Xe sẵn sàng</p>
              <p className="text-xl font-bold text-gray-900">{salesStats.availableVehicles}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-car-line text-lg text-green-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Đang giữ chỗ</p>
              <p className="text-xl font-bold text-gray-900">{salesStats.reservedVehicles}</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-lg text-amber-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Hoa hồng tháng</p>
              <p className="text-lg font-bold text-teal-600">{formatCurrency(salesStats.thisMonthCommission)}</p>
            </div>
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-lg text-teal-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Tổng hoa hồng</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(salesStats.totalCommission)}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-wallet-line text-lg text-purple-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 p-1">
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === 'vehicles'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-car-line mr-2"></i>
              Xe trống & Booking
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === 'sales'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-team-line mr-2"></i>
              Nhân viên Sale
            </button>
            <button
              onClick={() => setActiveTab('commission')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === 'commission'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-money-dollar-circle-line mr-2"></i>
              Lịch sử hoa hồng
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder={activeTab === 'vehicles' ? 'Tìm theo biển số, dòng xe...' : activeTab === 'sales' ? 'Tìm theo tên sale...' : 'Tìm theo biển số, tài xế, sale...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            {activeTab === 'vehicles' && (
              <>
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="all">Tất cả vị trí</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="available">Sẵn sàng</option>
                  <option value="reserved">Đang giữ chỗ</option>
                </select>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === 'vehicles' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-5 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{vehicle.plate}</h3>
                      <p className="text-sm text-gray-600">{vehicle.model}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(vehicle.status)}`}>
                      {getStatusText(vehicle.status)}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <i className="ri-map-pin-line text-gray-400 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span className="text-gray-600">{vehicle.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <i className="ri-battery-charge-line text-gray-400 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span className="text-gray-600">Pin: {vehicle.batteryLevel}%</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <i className="ri-dashboard-line text-gray-400 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span className="text-gray-600">ODO: {vehicle.odometer.toLocaleString()} km</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <i className="ri-tools-line text-gray-400 mr-2 w-4 h-4 flex items-center justify-center"></i>
                      <span className="text-gray-600">BĐ: {new Date(vehicle.lastMaintenance).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3 mb-4">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-gray-600">Giá ngày:</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(vehicle.dailyRate)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Giá tháng:</span>
                      <span className="font-bold text-teal-600">{formatCurrency(vehicle.monthlyRate)}</span>
                    </div>
                  </div>

                  {vehicle.status === 'available' ? (
                    <button
                      onClick={() => handleReserveVehicle(vehicle.id)}
                      className="w-full bg-teal-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-time-line mr-2"></i>
                      Giữ xe
                    </button>
                  ) : (
                    <div className="bg-amber-50 rounded-lg p-3 text-sm">
                      <p className="text-amber-700 font-medium mb-1">Đang giữ chỗ</p>
                      <p className="text-xs text-amber-600">
                        Bởi: {vehicle.reservedBy} <br />
                        Đến: {vehicle.reservedUntil ? new Date(vehicle.reservedUntil).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : ''}
                      </p>
                    </div>
                  )}
                </div>
              ))}
              {filteredVehicles.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <i className="ri-car-line text-4xl text-gray-300 mb-3"></i>
                  <p className="text-gray-500">Không tìm thấy xe nào</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'sales' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {salesStaff.map((sale) => (
                <div key={sale.id} className="bg-gradient-to-br from-teal-50 to-white rounded-lg p-5 border border-teal-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={sale.avatar}
                      alt={sale.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-teal-200"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">{sale.name}</h3>
                      <p className="text-xs text-gray-600">{sale.phone}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Tổng HĐ:</span>
                      <span className="font-semibold text-gray-900">{sale.totalContracts}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">HĐ đang chạy:</span>
                      <span className="font-semibold text-emerald-600">{sale.activeContracts}</span>
                    </div>
                  </div>

                  <div className="border-t border-teal-200 pt-3">
                    <div className="mb-2">
                      <p className="text-xs text-gray-600 mb-1">Hoa hồng tháng này</p>
                      <p className="text-lg font-bold text-teal-600">{formatCurrency(sale.thisMonthCommission)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Tổng hoa hồng</p>
                      <p className="text-base font-semibold text-gray-900">{formatCurrency(sale.totalCommission)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'commission' && (
            <div>
              {/* Commission Rules */}
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-5 mb-6 border border-teal-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                  <i className="ri-information-line mr-2 text-teal-600"></i>
                  Quy định hoa hồng
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className="ri-file-add-line text-blue-600"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Hợp đồng mới</p>
                        <p className="text-2xl font-bold text-blue-600">{(commissionRules.newContract.rate * 100)}%</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{commissionRules.newContract.description}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <i className="ri-refresh-line text-purple-600"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Gia hạn</p>
                        <p className="text-2xl font-bold text-purple-600">{(commissionRules.renewal.rate * 100)}%</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{commissionRules.renewal.description}</p>
                  </div>
                </div>
              </div>

              {/* Commission History */}
              <div className="space-y-3">
                {filteredCommissions.map((com) => (
                  <div key={com.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-gray-900">{com.id}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getTypeColor(com.type)}`}>
                            {getTypeText(com.type)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(com.status)}`}>
                            {getStatusText(com.status)}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Sale: </span>
                            <span className="font-medium text-gray-900">{com.saleName}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Biển số: </span>
                            <span className="font-medium text-gray-900">{com.vehiclePlate}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Tài xế: </span>
                            <span className="font-medium text-gray-900">{com.driverName}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Ngày: </span>
                            <span className="font-medium text-gray-900">{new Date(com.date).toLocaleDateString('vi-VN')}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Giá trị HĐ: </span>
                            <span className="font-semibold text-gray-900">{formatCurrency(com.contractValue)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-xs text-gray-600 mb-1">Hoa hồng ({(com.commissionRate * 100)}%)</p>
                        <p className="text-xl font-bold text-teal-600">{formatCurrency(com.commissionAmount)}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredCommissions.length === 0 && (
                  <div className="text-center py-12">
                    <i className="ri-money-dollar-circle-line text-4xl text-gray-300 mb-3"></i>
                    <p className="text-gray-500">Không tìm thấy hoa hồng nào</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reservation Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Giữ xe</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Xe: <span className="font-semibold text-gray-900">
                  {availableVehicles.find(v => v.id === selectedVehicle)?.plate}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Dòng xe: <span className="font-semibold text-gray-900">
                  {availableVehicles.find(v => v.id === selectedVehicle)?.model}
                </span>
              </p>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thời gian giữ xe (phút)
              </label>
              <select
                value={reservationTime}
                onChange={(e) => setReservationTime(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
              >
                <option value={30}>30 phút</option>
                <option value={45}>45 phút</option>
                <option value={60}>60 phút</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedVehicle(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={confirmReservation}
                className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}