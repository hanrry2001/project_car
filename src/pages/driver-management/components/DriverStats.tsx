interface DriverStatsProps {
  stats: {
    total: number;
    active: number;
    inactive: number;
    pending: number;
    totalDebt: number;
  };
}

export default function DriverStats({ stats }: DriverStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
            <i className="ri-user-line text-xl text-gray-700"></i>
          </div>
          <span className="text-2xl font-bold text-gray-900">{stats.total}</span>
        </div>
        <p className="text-sm text-gray-600">Tổng tài xế</p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 flex items-center justify-center bg-emerald-100 rounded-lg">
            <i className="ri-user-follow-line text-xl text-emerald-600"></i>
          </div>
          <span className="text-2xl font-bold text-emerald-600">{stats.active}</span>
        </div>
        <p className="text-sm text-gray-600">Đang thuê</p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
            <i className="ri-user-unfollow-line text-xl text-gray-600"></i>
          </div>
          <span className="text-2xl font-bold text-gray-600">{stats.inactive}</span>
        </div>
        <p className="text-sm text-gray-600">Không hoạt động</p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-lg">
            <i className="ri-time-line text-xl text-amber-600"></i>
          </div>
          <span className="text-2xl font-bold text-amber-600">{stats.pending}</span>
        </div>
        <p className="text-sm text-gray-600">Chờ duyệt</p>
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-lg">
            <i className="ri-money-dollar-circle-line text-xl text-red-600"></i>
          </div>
          <span className="text-2xl font-bold text-red-600">{(stats.totalDebt / 1000000).toFixed(1)}M</span>
        </div>
        <p className="text-sm text-gray-600">Tổng công nợ</p>
      </div>
    </div>
  );
}