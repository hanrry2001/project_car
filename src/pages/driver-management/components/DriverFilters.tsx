interface DriverFiltersProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function DriverFilters({ 
  statusFilter, 
  setStatusFilter, 
  searchQuery, 
  setSearchQuery 
}: DriverFiltersProps) {
  const filters = [
    { value: 'all', label: 'Tất cả', icon: 'ri-list-check' },
    { value: 'active', label: 'Đang thuê', icon: 'ri-user-follow-line' },
    { value: 'inactive', label: 'Không hoạt động', icon: 'ri-user-unfollow-line' },
    { value: 'pending', label: 'Chờ duyệt', icon: 'ri-time-line' }
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
            placeholder="Tìm theo tên, SĐT hoặc biển số xe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}