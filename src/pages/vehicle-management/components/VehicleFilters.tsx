interface VehicleFiltersProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function VehicleFilters({ 
  statusFilter, 
  setStatusFilter, 
  searchQuery, 
  setSearchQuery 
}: VehicleFiltersProps) {
  const filters = [
    { value: 'all', label: 'Tất cả', icon: 'ri-list-check' },
    { value: 'available', label: 'Xe trống', icon: 'ri-checkbox-circle-line' },
    { value: 'rented', label: 'Đang thuê', icon: 'ri-steering-2-line' },
    { value: 'maintenance', label: 'Bảo dưỡng', icon: 'ri-tools-line' },
    { value: 'reserved', label: 'Giữ chỗ', icon: 'ri-bookmark-line' }
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === filter.value
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i className={`${filter.icon} mr-2`}></i>
              {filter.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
          <input
            type="text"
            placeholder="Tìm theo biển số hoặc dòng xe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}