import { useState } from 'react';
import { incidentsData, incidentStats } from '../../mocks/incidents';

export default function IncidentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  const filteredIncidents = incidentsData.filter(incident => {
    const matchSearch = incident.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       incident.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       incident.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === 'all' || incident.type === filterType;
    const matchSeverity = filterSeverity === 'all' || incident.severity === filterSeverity;
    const matchStatus = filterStatus === 'all' || incident.status === filterStatus;
    return matchSearch && matchType && matchSeverity && matchStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Nhẹ':
        return 'bg-green-100 text-green-700';
      case 'Trung bình':
        return 'bg-yellow-100 text-yellow-700';
      case 'Nghiêm trọng':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã xử lý':
        return 'bg-green-100 text-green-700';
      case 'Đang xử lý':
        return 'bg-blue-100 text-blue-700';
      case 'Chưa xử lý':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'Vi phạm giao thông' ? 'ri-police-car-line' : 'ri-alarm-warning-line';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vi phạm & Sự cố</h1>
        <p className="text-sm text-gray-600">Quản lý vi phạm giao thông và tai nạn</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng sự cố</p>
              <p className="text-2xl font-bold text-gray-900">{incidentStats.totalIncidents}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-alarm-warning-line text-xl text-red-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Vi phạm GT</p>
              <p className="text-2xl font-bold text-orange-600">{incidentStats.trafficViolations}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-police-car-line text-xl text-orange-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tai nạn</p>
              <p className="text-2xl font-bold text-red-600">{incidentStats.accidents}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-car-line text-xl text-red-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng tiền phạt</p>
              <p className="text-2xl font-bold text-gray-900">{incidentStats.totalFines.toLocaleString('vi-VN')}đ</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-xl text-purple-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Theo trạng thái</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Chưa xử lý</span>
              <span className="text-sm font-semibold text-gray-900">{incidentStats.pending}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Đang xử lý</span>
              <span className="text-sm font-semibold text-blue-600">{incidentStats.processing}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Đã xử lý</span>
              <span className="text-sm font-semibold text-green-600">{incidentStats.resolved}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Theo mức độ</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Nhẹ</span>
              <span className="text-sm font-semibold text-green-600">{incidentStats.severityBreakdown.light}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Trung bình</span>
              <span className="text-sm font-semibold text-yellow-600">{incidentStats.severityBreakdown.medium}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Nghiêm trọng</span>
              <span className="text-sm font-semibold text-red-600">{incidentStats.severityBreakdown.serious}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg p-4 shadow-sm text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Cảnh báo quan trọng</span>
            <i className="ri-notification-3-line text-xl"></i>
          </div>
          <p className="text-2xl font-bold mb-1">{incidentStats.pending + incidentStats.processing}</p>
          <p className="text-xs opacity-90">Sự cố cần xử lý</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                placeholder="Biển số, tài xế, địa điểm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loại sự cố</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">Tất cả</option>
              <option value="Vi phạm giao thông">Vi phạm giao thông</option>
              <option value="Tai nạn">Tai nạn</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mức độ</label>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">Tất cả</option>
              <option value="Nhẹ">Nhẹ</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Nghiêm trọng">Nghiêm trọng</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">Tất cả</option>
              <option value="Chưa xử lý">Chưa xử lý</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Đã xử lý">Đã xử lý</option>
            </select>
          </div>
        </div>
      </div>

      {/* Incidents List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredIncidents.map((incident) => (
          <div key={incident.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${incident.type === 'Vi phạm giao thông' ? 'bg-orange-100' : 'bg-red-100'}`}>
                  <i className={`${getTypeIcon(incident.type)} text-xl ${incident.type === 'Vi phạm giao thông' ? 'text-orange-600' : 'text-red-600'}`}></i>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-semibold text-gray-900">{incident.description}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Biển số xe</p>
                      <p className="text-sm font-semibold text-gray-900">{incident.vehiclePlate}</p>
                      <p className="text-xs text-gray-500">{incident.vehicleModel}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tài xế</p>
                      <p className="text-sm font-medium text-gray-900">{incident.driverName}</p>
                      <p className="text-xs text-gray-500">{incident.driverPhone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Ngày xảy ra</p>
                      <p className="text-sm font-medium text-gray-900">{incident.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tiền phạt</p>
                      <p className="text-sm font-semibold text-red-600">
                        {incident.fine > 0 ? `${incident.fine.toLocaleString('vi-VN')}đ` : 'Không có'}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Địa điểm</p>
                    <p className="text-sm text-gray-700">{incident.location}</p>
                  </div>

                  {incident.notes && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                      <p className="text-xs text-yellow-800">{incident.notes}</p>
                    </div>
                  )}

                  {incident.images && incident.images.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Hình ảnh ({incident.images.length})</p>
                      <div className="flex gap-2 flex-wrap">
                        {incident.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setSelectedIncident({ ...incident, selectedImageIndex: idx })}
                          >
                            <img src={img} alt={`Ảnh ${idx + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button className="w-9 h-9 flex items-center justify-center text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                  <i className="ri-eye-line text-base"></i>
                </button>
                <button className="w-9 h-9 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <i className="ri-edit-line text-base"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredIncidents.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
          <i className="ri-file-search-line text-4xl text-gray-300 mb-3"></i>
          <p className="text-sm text-gray-500">Không tìm thấy sự cố nào</p>
        </div>
      )}

      {/* Image Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setSelectedIncident(null)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Chi tiết sự cố - {selectedIncident.vehiclePlate}</h3>
              <button onClick={() => setSelectedIncident(null)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {selectedIncident.images.map((img: string, idx: number) => (
                  <img key={idx} src={img} alt={`Ảnh ${idx + 1}`} className="w-full rounded-lg" />
                ))}
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Mô tả</p>
                  <p className="text-sm text-gray-900">{selectedIncident.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Địa điểm</p>
                  <p className="text-sm text-gray-900">{selectedIncident.location}</p>
                </div>
                {selectedIncident.notes && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Ghi chú</p>
                    <p className="text-sm text-gray-900">{selectedIncident.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}