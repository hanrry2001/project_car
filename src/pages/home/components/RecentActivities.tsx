interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

const activityIcons = {
  rental: 'ri-car-line',
  maintenance: 'ri-tools-line',
  payment: 'ri-money-dollar-circle-line',
  reservation: 'ri-bookmark-line'
};

const activityColors = {
  rental: 'bg-teal-100 text-teal-600',
  maintenance: 'bg-amber-100 text-amber-600',
  payment: 'bg-emerald-100 text-emerald-600',
  reservation: 'bg-blue-100 text-blue-600'
};

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Hoạt Động Gần Đây</h3>
        <button className="text-sm font-medium text-teal-600 hover:text-teal-700 cursor-pointer whitespace-nowrap">
          Xem tất cả
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0 ${activityColors[activity.type as keyof typeof activityColors]}`}>
              <i className={`${activityIcons[activity.type as keyof typeof activityIcons]} text-lg`}></i>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 mb-1">{activity.description}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <i className="ri-time-line"></i>
                  {activity.timestamp}
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-user-line"></i>
                  {activity.user}
                </span>
              </div>
            </div>
            
            {index < activities.length - 1 && (
              <div className="absolute left-[29px] top-[50px] w-0.5 h-12 bg-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}