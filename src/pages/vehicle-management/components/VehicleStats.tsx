interface VehicleStatsProps {
  stats: {
    total: number;
    available: number;
    rented: number;
    maintenance: number;
    reserved: number;
  };
}

export default function VehicleStats({ stats }: VehicleStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
            <i className="ri-car-line text-xl text-gray-700"></i>
          </div>
          <span className="text-2xl font-bold text-gray-900">{stats.total}</span>
        </div>
        <p className="text-sm text-gray-600">Tổng số xe</p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 flex items-center justify-center bg-emerald-100 rounded-lg">
            <i className="ri-checkbox-circle-line text-xl text-emerald-600"></i>
          </div>
          <span className="text-2xl font-bold text-emerald-600">{stats.available}</span>
        </div>
        <p className="text-sm text-gray-600">Xe trống</p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
            <i className="ri-steering-2-line text-xl text-blue-600"></i>
          </div>
          <span className="text-2xl font-bold text-blue-600">{stats.rented}</span>
        </div>
        <p className="text-sm text-gray-600">Đang thuê</p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-lg">
            <i className="ri-tools-line text-xl text-amber-600"></i>
          </div>
          <span className="text-2xl font-bold text-amber-600">{stats.maintenance}</span>
        </div>
        <p className="text-sm text-gray-600">Bảo dưỡng</p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 flex items-center justify-center bg-cyan-100 rounded-lg">
            <i className="ri-bookmark-line text-xl text-cyan-600"></i>
          </div>
          <span className="text-2xl font-bold text-cyan-600">{stats.reserved}</span>
        </div>
        <p className="text-sm text-gray-600">Đang giữ chỗ</p>
      </div>
    </div>
  );
}