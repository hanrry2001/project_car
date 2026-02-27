
import { useState } from 'react';
import Layout from '../../components/feature/Layout';
import DriverStats from './components/DriverStats';
import DriverFilters from './components/DriverFilters';
import DriverCard from './components/DriverCard';
import { drivers, driverStats } from '../../mocks/drivers';

export default function DriverManagementPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDrivers = drivers.filter(driver => {
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    const matchesSearch = driver.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         driver.phone.includes(searchQuery) ||
                         (driver.currentVehicle && driver.currentVehicle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Tài xế</h1>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer">
            <i className="ri-add-line"></i>
            Thêm tài xế
          </button>
        </div>

        <DriverStats stats={driverStats} />

        <DriverFilters 
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrivers.map((driver) => (
            <DriverCard key={driver.id} driver={driver} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
