import { useState } from 'react';
import Layout from '../../components/feature/Layout';
import { handoverSessions, maintenanceSchedule } from '../../mocks/operations';
import HandoverCard from './components/HandoverCard';
import MaintenanceCard from './components/MaintenanceCard';
import OperationsStats from './components/OperationsStats';

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState<'handover' | 'maintenance'>('handover');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredHandovers = handoverSessions.filter(session => {
    const matchesSearch = session.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;
    const matchesType = typeFilter === 'all' || session.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const filteredMaintenance = maintenanceSchedule.filter(maintenance => {
    const matchesSearch = maintenance.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         maintenance.maintenanceType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || maintenance.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Vận hành & Ảnh bàn giao</h1>
          <p className="text-sm text-slate-600">Quản lý bàn giao xe và lịch bảo dưỡng</p>
        </div>

        <OperationsStats handoverSessions={handoverSessions} maintenanceSchedule={maintenanceSchedule} />

        <div className="bg-white rounded-lg border border-slate-200 mb-6">
          <div className="border-b border-slate-200">
            <div className="flex items-center gap-1 p-1">
              <button
                onClick={() => {
                  setActiveTab('handover');
                  setStatusFilter('all');
                  setTypeFilter('all');
                }}
                className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'handover'
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <i className="ri-exchange-line mr-2"></i>
                Bàn giao xe
              </button>
              <button
                onClick={() => {
                  setActiveTab('maintenance');
                  setStatusFilter('all');
                  setTypeFilter('all');
                }}
                className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'maintenance'
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <i className="ri-tools-line mr-2"></i>
                Lịch bảo dưỡng
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <div className="flex-1 relative">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  type="text"
                  placeholder={activeTab === 'handover' ? 'Tìm theo biển số hoặc tên tài xế...' : 'Tìm theo biển số hoặc loại bảo dưỡng...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {activeTab === 'handover' && (
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                >
                  <option value="all">Tất cả loại</option>
                  <option value="check-out">Giao xe</option>
                  <option value="check-in">Nhận xe</option>
                </select>
              )}

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
              >
                <option value="all">Tất cả trạng thái</option>
                {activeTab === 'handover' ? (
                  <>
                    <option value="completed">Hoàn thành</option>
                    <option value="in-progress">Đang thực hiện</option>
                    <option value="pending">Chờ xử lý</option>
                  </>
                ) : (
                  <>
                    <option value="upcoming">Sắp tới</option>
                    <option value="urgent">Khẩn cấp</option>
                    <option value="overdue">Quá hạn</option>
                  </>
                )}
              </select>
            </div>

            {activeTab === 'handover' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredHandovers.length > 0 ? (
                  filteredHandovers.map((session) => (
                    <HandoverCard key={session.id} session={session} />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12">
                    <i className="ri-inbox-line text-5xl text-slate-300 mb-3"></i>
                    <p className="text-slate-500">Không tìm thấy phiên bàn giao nào</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredMaintenance.length > 0 ? (
                  filteredMaintenance.map((maintenance) => (
                    <MaintenanceCard key={maintenance.id} maintenance={maintenance} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <i className="ri-inbox-line text-5xl text-slate-300 mb-3"></i>
                    <p className="text-slate-500">Không tìm thấy lịch bảo dưỡng nào</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
