import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface MenuItem {
  path: string;
  label: string;
  icon: string;
  children?: { path: string; label: string; icon: string }[];
}

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    { path: '/', label: 'Trang Chủ', icon: 'ri-dashboard-line' },
    { 
      path: '/vehicle-management', 
      label: 'Quản Lý Xe', 
      icon: 'ri-car-line',
      children: [
        { path: '/documents-alerts', label: 'Giấy Tờ & Cảnh Báo', icon: 'ri-file-list-3-line' }
      ]
    },
    { 
      path: '/driver-management', 
      label: 'Quản Lý Tài Xế', 
      icon: 'ri-user-line',
      children: [
        { path: '/incidents', label: 'Vi Phạm & Sự Cố', icon: 'ri-alert-line' }
      ]
    },
    { path: '/operations', label: 'Vận Hành', icon: 'ri-tools-line' },
    { 
      path: '/finance', 
      label: 'Tài Chính', 
      icon: 'ri-money-dollar-circle-line',
      children: [
        { path: '/finance/revenue', label: 'Quản Lý Doanh Thu', icon: 'ri-arrow-up-circle-line' },
        { path: '/finance/expenses', label: 'Quản Lý Chi Phí', icon: 'ri-arrow-down-circle-line' },
        { path: '/finance/wallet', label: 'Ví & Tạm Ứng', icon: 'ri-wallet-3-line' },
        { path: '/finance/analytics', label: 'Báo Cáo & Phân Tích', icon: 'ri-pie-chart-2-line' },
        { path: '/finance/reconciliation', label: 'Giao Dịch Chờ Đối Soát', icon: 'ri-bank-card-2-line' },
      ]
    },
    { path: '/sales-commission', label: 'Sale & Hoa Hồng', icon: 'ri-hand-coin-line' },
    { path: '/reports', label: 'Báo Cáo', icon: 'ri-bar-chart-box-line' },
    { path: '/settings', label: 'Cấu Hình', icon: 'ri-settings-3-line' }
  ];

  // Auto-expand parent menu if a child route is active
  useEffect(() => {
    menuItems.forEach(item => {
      if (item.children) {
        const isChildActive = item.children.some(child => location.pathname === child.path);
        const isParentActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
        if ((isChildActive || isParentActive) && !expandedMenus.includes(item.path)) {
          setExpandedMenus(prev => [...prev, item.path]);
        }
      }
    });
  }, [location.pathname]);

  const toggleExpand = (path: string) => {
    setExpandedMenus(prev => 
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  const isParentActive = (item: MenuItem) => {
    if (location.pathname === item.path) return true;
    if (location.pathname.startsWith(item.path + '/')) return true;
    if (item.children) {
      return item.children.some(child => location.pathname === child.path);
    }
    return false;
  };

  return (
    <>
      <aside className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {!isCollapsed && (
              <Link to="/" className="flex items-center gap-3">
                <img 
                  src="https://public.readdy.ai/ai/img_res/16aeefab-f462-4aa1-bc17-ab21f4c5fc24.png" 
                  alt="Logo"
                  className="h-10 w-auto"
                />
                <span className="text-lg font-semibold text-gray-900">Quản Lý Xe Điện</span>
              </Link>
            )}
            {isCollapsed && (
              <img 
                src="https://public.readdy.ai/ai/img_res/16aeefab-f462-4aa1-bc17-ab21f4c5fc24.png" 
                alt="Logo"
                className="h-10 w-auto mx-auto"
              />
            )}
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <div key={item.path}>
                {/* Parent menu item */}
                {item.children ? (
                  <div>
                    <div className="flex items-center">
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 flex-1 px-6 py-3 transition-colors ${
                          isParentActive(item)
                            ? 'bg-teal-50 text-teal-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        } ${isActive(item.path) ? 'border-r-4 border-teal-600' : ''}`}
                      >
                        <i className={`${item.icon} text-xl w-6 h-6 flex items-center justify-center`}></i>
                        {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
                      </Link>
                      {!isCollapsed && (
                        <button
                          onClick={() => toggleExpand(item.path)}
                          className="pr-4 py-3 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        >
                          <i className={`ri-arrow-down-s-line text-lg transition-transform duration-200 ${expandedMenus.includes(item.path) ? 'rotate-180' : ''}`}></i>
                        </button>
                      )}
                    </div>

                    {/* Children */}
                    {!isCollapsed && expandedMenus.includes(item.path) && (
                      <div className="overflow-hidden">
                        {item.children.map(child => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`flex items-center gap-3 pl-12 pr-6 py-2.5 transition-colors ${
                              isActive(child.path)
                                ? 'bg-teal-50 text-teal-600 border-r-4 border-teal-600'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                            }`}
                          >
                            <i className={`${child.icon} text-base w-5 h-5 flex items-center justify-center`}></i>
                            <span className="text-sm font-medium whitespace-nowrap">{child.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                      isActive(item.path)
                        ? 'bg-teal-50 text-teal-600 border-r-4 border-teal-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <i className={`${item.icon} text-xl w-6 h-6 flex items-center justify-center`}></i>
                    {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="border-t border-gray-200 p-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <i className={`${isCollapsed ? 'ri-menu-unfold-line' : 'ri-menu-fold-line'} text-xl text-gray-700`}></i>
              {!isCollapsed && <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Thu gọn</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsCollapsed(true)}></div>
    </>
  );
}
