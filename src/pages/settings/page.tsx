import { useState } from 'react';
import {
  pricingConfig,
  notificationSettings,
  userAccounts,
  handoverConfig,
  systemInfo
} from '../../mocks/settings';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'pricing' | 'notifications' | 'users' | 'handover' | 'system'>('pricing');
  const [editingPrice, setEditingPrice] = useState<number | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleSave = () => {
    alert('Đã lưu cấu hình thành công!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cấu hình hệ thống</h1>
          <p className="text-sm text-gray-600 mt-1">Quản lý cài đặt và tùy chỉnh hệ thống</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
        >
          <i className="ri-save-line"></i>
          Lưu thay đổi
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'pricing'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="ri-price-tag-3-line mr-2"></i>
              Bảng giá
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'notifications'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="ri-notification-line mr-2"></i>
              Thông báo
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'users'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="ri-user-settings-line mr-2"></i>
              Người dùng
            </button>
            <button
              onClick={() => setActiveTab('handover')}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'handover'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="ri-exchange-line mr-2"></i>
              Bàn giao xe
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'system'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="ri-settings-3-line mr-2"></i>
              Hệ thống
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cấu hình bảng giá thuê xe</h3>
                <p className="text-sm text-gray-600 mb-6">Thiết lập giá thuê theo ngày, tuần, tháng cho từng dòng xe</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Dòng xe</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Giá ngày</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Giá tuần</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Giá tháng</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Tiền cọc</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Trạng thái</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingConfig.map((price) => (
                      <tr key={price.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <span className="text-sm font-medium text-gray-900">{price.model}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-sm text-gray-900">{formatCurrency(price.dailyRate)}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-sm text-gray-900">{formatCurrency(price.weeklyRate)}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-sm text-gray-900">{formatCurrency(price.monthlyRate)}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-sm font-medium text-gray-900">{formatCurrency(price.deposit)}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={price.active} className="sr-only peer" readOnly />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                          </label>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => setEditingPrice(price.id)}
                            className="text-teal-600 hover:text-teal-700 text-sm font-medium whitespace-nowrap"
                          >
                            <i className="ri-edit-line mr-1"></i>
                            Chỉnh sửa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors whitespace-nowrap">
                  <i className="ri-add-line"></i>
                  Thêm dòng xe mới
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cấu hình thông báo và cảnh báo</h3>
                <p className="text-sm text-gray-600 mb-6">Thiết lập các loại thông báo tự động cho hệ thống</p>
              </div>

              <div className="space-y-4">
                {/* Document Expiry */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Cảnh báo hết hạn giấy tờ</h4>
                      <p className="text-xs text-gray-600">Nhắc nhở trước khi giấy tờ xe hết hạn</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notificationSettings.documentExpiry.enabled} className="sr-only peer" readOnly />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Nhắc trước (ngày)</label>
                      <input
                        type="number"
                        value={notificationSettings.documentExpiry.advanceDays}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Kênh thông báo</label>
                      <div className="flex gap-2">
                        {notificationSettings.documentExpiry.channels.map((channel) => (
                          <span key={channel} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium whitespace-nowrap">
                            {channel === 'email' ? 'Email' : channel === 'push' ? 'Push' : 'SMS'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Reminder */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Nhắc thanh toán</h4>
                      <p className="text-xs text-gray-600">Nhắc tài xế thanh toán tiền thuê định kỳ</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notificationSettings.paymentReminder.enabled} className="sr-only peer" readOnly />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Nhắc trước (ngày)</label>
                      <input
                        type="number"
                        value={notificationSettings.paymentReminder.advanceDays}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Kênh thông báo</label>
                      <div className="flex gap-2">
                        {notificationSettings.paymentReminder.channels.map((channel) => (
                          <span key={channel} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium whitespace-nowrap">
                            {channel === 'email' ? 'Email' : channel === 'push' ? 'Push' : 'SMS'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Maintenance Reminder */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Nhắc bảo dưỡng</h4>
                      <p className="text-xs text-gray-600">Nhắc lịch bảo dưỡng định kỳ theo số km</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notificationSettings.maintenanceReminder.enabled} className="sr-only peer" readOnly />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Nhắc trước (km)</label>
                      <input
                        type="number"
                        value={notificationSettings.maintenanceReminder.advanceKm}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Kênh thông báo</label>
                      <div className="flex gap-2">
                        {notificationSettings.maintenanceReminder.channels.map((channel) => (
                          <span key={channel} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium whitespace-nowrap">
                            {channel === 'email' ? 'Email' : channel === 'push' ? 'Push' : 'SMS'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overdue Debt */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Cảnh báo nợ quá hạn</h4>
                      <p className="text-xs text-gray-600">Thông báo khi tài xế nợ quá hạn thanh toán</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notificationSettings.overdueDebt.enabled} className="sr-only peer" readOnly />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Tần suất nhắc</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        <option value="daily">Hàng ngày</option>
                        <option value="weekly">Hàng tuần</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Kênh thông báo</label>
                      <div className="flex gap-2">
                        {notificationSettings.overdueDebt.channels.map((channel) => (
                          <span key={channel} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium whitespace-nowrap">
                            {channel === 'email' ? 'Email' : channel === 'push' ? 'Push' : 'SMS'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Incident Alert */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Cảnh báo sự cố</h4>
                      <p className="text-xs text-gray-600">Thông báo ngay khi có vi phạm hoặc tai nạn</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notificationSettings.incidentAlert.enabled} className="sr-only peer" readOnly />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-xs text-gray-700">
                        <input type="checkbox" checked={notificationSettings.incidentAlert.immediateNotify} className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" readOnly />
                        Thông báo ngay lập tức
                      </label>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Kênh thông báo</label>
                      <div className="flex gap-2">
                        {notificationSettings.incidentAlert.channels.map((channel) => (
                          <span key={channel} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium whitespace-nowrap">
                            {channel === 'email' ? 'Email' : channel === 'push' ? 'Push' : 'SMS'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Quản lý tài khoản người dùng</h3>
                  <p className="text-sm text-gray-600">Danh sách tài khoản Admin, Sale, Vận hành</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap">
                  <i className="ri-user-add-line"></i>
                  Thêm người dùng
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Họ tên</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Số điện thoại</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Vai trò</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Đăng nhập cuối</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Trạng thái</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userAccounts.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <span className="text-sm font-medium text-gray-900">{user.name}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-700">{user.email}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-700">{user.phone}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            user.role === 'Admin' ? 'bg-red-100 text-red-700' :
                            user.role === 'Sale' ? 'bg-teal-100 text-teal-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-700">{user.lastLogin}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button className="text-teal-600 hover:text-teal-700 text-sm whitespace-nowrap">
                              <i className="ri-edit-line"></i>
                            </button>
                            <button className="text-red-600 hover:text-red-700 text-sm whitespace-nowrap">
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Handover Tab */}
          {activeTab === 'handover' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cấu hình quy trình bàn giao xe</h3>
                <p className="text-sm text-gray-600 mb-6">Thiết lập yêu cầu và checklist khi bàn giao xe</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Photo Requirements */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Yêu cầu chụp ảnh</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Số ảnh tối thiểu</label>
                      <input
                        type="number"
                        value={handoverConfig.minimumPhotos}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Các ảnh bắt buộc</label>
                      <div className="space-y-2">
                        {handoverConfig.requiredPhotos.map((photo, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                            <i className="ri-checkbox-circle-fill text-teal-600"></i>
                            {photo}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reminder Settings */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Cài đặt nhắc nhở</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" checked={handoverConfig.autoReminder} className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" readOnly />
                        Tự động nhắc nhở
                      </label>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Nhắc trước khi trả xe (giờ)</label>
                      <input
                        type="number"
                        value={handoverConfig.reminderBeforeReturn}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Checklist bàn giao</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {handoverConfig.checklist.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-line text-teal-600 mt-0.5"></i>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin hệ thống</h3>
                <p className="text-sm text-gray-600 mb-6">Chi tiết về phiên bản và cấu hình hệ thống</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* System Info */}
                <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Thông tin phiên bản</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phiên bản:</span>
                    <span className="font-medium text-gray-900">{systemInfo.version}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ngày build:</span>
                    <span className="font-medium text-gray-900">{systemInfo.buildDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Môi trường:</span>
                    <span className="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                      {systemInfo.environment}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Database:</span>
                    <span className="font-medium text-gray-900">{systemInfo.database}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Storage:</span>
                    <span className="font-medium text-gray-900">{systemInfo.storage}</span>
                  </div>
                </div>

                {/* System Status */}
                <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Trạng thái hệ thống</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Uptime:</span>
                    <span className="font-medium text-green-600">{systemInfo.uptime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Backup cuối:</span>
                    <span className="font-medium text-gray-900">{systemInfo.lastBackup}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tổng người dùng:</span>
                    <span className="font-medium text-gray-900">{systemInfo.totalUsers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tổng xe:</span>
                    <span className="font-medium text-gray-900">{systemInfo.totalVehicles}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tổng tài xế:</span>
                    <span className="font-medium text-gray-900">{systemInfo.totalDrivers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tổng hợp đồng:</span>
                    <span className="font-medium text-gray-900">{systemInfo.totalContracts}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Thao tác hệ thống</h4>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
                    <i className="ri-download-cloud-line"></i>
                    Backup dữ liệu
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
                    <i className="ri-upload-cloud-line"></i>
                    Restore dữ liệu
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
                    <i className="ri-file-download-line"></i>
                    Xuất log hệ thống
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap">
                    <i className="ri-delete-bin-line"></i>
                    Xóa cache
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}