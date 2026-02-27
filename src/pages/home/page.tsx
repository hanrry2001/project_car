
import Layout from '../../components/feature/Layout';
import StatsCard from './components/StatsCard';
import RevenueChart from './components/RevenueChart';
import AlertsList from './components/AlertsList';
import RecentActivities from './components/RecentActivities';
import { dashboardStats, upcomingAlerts, recentActivities } from '../../mocks/dashboard';

export default function HomePage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer">
            <i className="ri-download-line"></i>
            Xuất báo cáo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <AlertsList alerts={upcomingAlerts} />
          </div>
        </div>

        <RecentActivities activities={recentActivities} />
      </div>
    </Layout>
  );
}
