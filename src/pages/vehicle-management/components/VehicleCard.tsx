interface Vehicle {
  id: string;
  licensePlate: string;
  model: string;
  status: string;
  batteryHealth: number;
  odometer: number;
  location: string;
  image: string;
  currentDriver?: string;
  registrationExpiry: string;
  insuranceExpiry: string;
  nextMaintenance: string;
  tasksCompleted: number;
  totalTasks: number;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

const statusConfig = {
  available: { label: 'Xe trống', color: 'bg-emerald-100 text-emerald-700', icon: 'ri-checkbox-circle-line' },
  rented: { label: 'Đang thuê', color: 'bg-blue-100 text-blue-700', icon: 'ri-steering-2-line' },
  maintenance: { label: 'Bảo dưỡng', color: 'bg-amber-100 text-amber-700', icon: 'ri-tools-line' },
  reserved: { label: 'Giữ chỗ', color: 'bg-cyan-100 text-cyan-700', icon: 'ri-bookmark-line' }
};

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const status = statusConfig[vehicle.status as keyof typeof statusConfig];

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
      <div className="relative h-48 w-full">
        <img 
          src={vehicle.image} 
          alt={vehicle.model}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color} whitespace-nowrap flex items-center gap-1`}>
            <i className={status.icon}></i>
            {status.label}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{vehicle.licensePlate}</h3>
            <p className="text-sm text-gray-600">{vehicle.model}</p>
          </div>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <i className="ri-more-2-fill text-xl text-gray-600"></i>
          </button>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-2">
              <i className="ri-task-line text-base"></i>
              Task hỗ trợ
            </span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    vehicle.tasksCompleted === vehicle.totalTasks ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${(vehicle.tasksCompleted / vehicle.totalTasks) * 100}%` }}
                ></div>
              </div>
              <span className={`font-medium ${
                vehicle.tasksCompleted === vehicle.totalTasks ? 'text-emerald-600' : 'text-amber-600'
              }`}>
                {vehicle.tasksCompleted}/{vehicle.totalTasks}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-2">
              <i className="ri-speed-line text-base"></i>
              ODO
            </span>
            <span className="font-medium text-gray-900">{vehicle.odometer.toLocaleString()} km</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-2">
              <i className="ri-map-pin-line text-base"></i>
              Vị trí
            </span>
            <span className="font-medium text-gray-900">{vehicle.location}</span>
          </div>

          {vehicle.currentDriver && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center gap-2">
                <i className="ri-user-line text-base"></i>
                Tài xế
              </span>
              <span className="font-medium text-gray-900">{vehicle.currentDriver}</span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button className="w-full py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-eye-line mr-2"></i>
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}