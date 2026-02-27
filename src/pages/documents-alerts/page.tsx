import { useState } from 'react';
import { documentsData, documentStats } from '../../mocks/documents';

export default function DocumentsAlertsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredDocuments = documentsData.filter(doc => {
    const matchSearch = doc.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       doc.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === 'all' || doc.documentType === filterType;
    const matchStatus = filterStatus === 'all' || doc.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Còn hạn':
        return 'bg-green-100 text-green-700';
      case 'Sắp hết hạn':
        return 'bg-yellow-100 text-yellow-700';
      case 'Đã hết hạn':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Còn hạn':
        return 'ri-checkbox-circle-line';
      case 'Sắp hết hạn':
        return 'ri-error-warning-line';
      case 'Đã hết hạn':
        return 'ri-close-circle-line';
      default:
        return 'ri-information-line';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Giấy tờ & Cảnh báo</h1>
        <p className="text-sm text-gray-600">Quản lý giấy tờ pháp lý và nhắc nhở hết hạn</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng giấy tờ</p>
              <p className="text-2xl font-bold text-gray-900">{documentStats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-file-list-3-line text-xl text-blue-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Còn hạn</p>
              <p className="text-2xl font-bold text-green-600">{documentStats.valid}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-checkbox-circle-line text-xl text-green-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Sắp hết hạn</p>
              <p className="text-2xl font-bold text-yellow-600">{documentStats.expiringSoon}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-error-warning-line text-xl text-yellow-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Đã hết hạn</p>
              <p className="text-2xl font-bold text-red-600">{documentStats.expired}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-close-circle-line text-xl text-red-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                placeholder="Biển số, dòng xe, số giấy tờ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loại giấy tờ</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">Tất cả</option>
              <option value="Đăng kiểm">Đăng kiểm</option>
              <option value="Phù hiệu xe hợp đồng">Phù hiệu xe hợp đồng</option>
              <option value="Bảo hiểm dân sự">Bảo hiểm dân sự</option>
              <option value="Bảo hiểm tự nguyện">Bảo hiểm tự nguyện</option>
              <option value="Lệnh vận chuyển">Lệnh vận chuyển</option>
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
              <option value="Còn hạn">Còn hạn</option>
              <option value="Sắp hết hạn">Sắp hết hạn</option>
              <option value="Đã hết hạn">Đã hết hạn</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Biển số xe</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Loại giấy tờ</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Số giấy tờ</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ngày cấp</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ngày hết hạn</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nơi cấp</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{doc.vehiclePlate}</div>
                      <div className="text-xs text-gray-500">{doc.vehicleModel}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{doc.documentType}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-gray-700">{doc.documentNumber}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{doc.issueDate}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{doc.expiryDate}</div>
                      {doc.daysUntilExpiry > 0 && doc.daysUntilExpiry <= 30 && (
                        <div className="text-xs text-yellow-600">Còn {doc.daysUntilExpiry} ngày</div>
                      )}
                      {doc.daysUntilExpiry < 0 && (
                        <div className="text-xs text-red-600">Quá hạn {Math.abs(doc.daysUntilExpiry)} ngày</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      <i className={`${getStatusIcon(doc.status)} text-sm`}></i>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{doc.issuedBy}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 flex items-center justify-center text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                        <i className="ri-eye-line text-base"></i>
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <i className="ri-edit-line text-base"></i>
                      </button>
                      {doc.status === 'Đã hết hạn' || doc.status === 'Sắp hết hạn' ? (
                        <button className="w-8 h-8 flex items-center justify-center text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                          <i className="ri-refresh-line text-base"></i>
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-file-search-line text-4xl text-gray-300 mb-3"></i>
            <p className="text-sm text-gray-500">Không tìm thấy giấy tờ nào</p>
          </div>
        )}
      </div>
    </div>
  );
}