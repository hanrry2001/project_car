import { Link } from 'react-router-dom';

interface NavbarProps {
  currentPath: string;
}

export default function Navbar({ currentPath }: NavbarProps) {
  const navItems = [
    { path: '/', label: 'Trang Chủ' },
    { path: '/vehicle-management', label: 'Quản Lý Tài Sản' },
    { path: '/driver-management', label: 'Quản Lý Tài Xế' }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="https://public.readdy.ai/ai/img_res/16aeefab-f462-4aa1-bc17-ab21f4c5fc24.png" 
              alt="Logo"
              className="h-10 w-auto"
            />
            <span className="text-lg font-semibold text-gray-900">Quản Lý Xe Điện</span>
          </Link>
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  currentPath === item.path
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <i className="ri-notification-3-line text-xl text-gray-700"></i>
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <i className="ri-user-line text-xl text-gray-700"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}