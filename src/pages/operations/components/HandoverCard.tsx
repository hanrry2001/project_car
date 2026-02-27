import { useState } from 'react';

interface HandoverCardProps {
  session: {
    id: string;
    vehiclePlate: string;
    vehicleModel: string;
    driverName: string;
    driverPhone: string;
    type: 'check-in' | 'check-out';
    status: 'pending' | 'in-progress' | 'completed';
    date: string;
    location: string;
    odoReading: number;
    batteryLevel: number;
    images: string[];
    notes: string;
    operatorName: string;
    signatureUrl: string | null;
  };
}

export default function HandoverCard({ session }: HandoverCardProps) {
  const [showImages, setShowImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700';
      case 'in-progress':
        return 'bg-amber-100 text-amber-700';
      case 'pending':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'in-progress':
        return 'Đang thực hiện';
      case 'pending':
        return 'Chờ xử lý';
      default:
        return status;
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'check-out' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700';
  };

  const getTypeText = (type: string) => {
    return type === 'check-out' ? 'Giao xe' : 'Nhận xe';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-slate-900">#{session.id}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getTypeColor(session.type)}`}>
                {getTypeText(session.type)}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(session.status)}`}>
                {getStatusText(session.status)}
              </span>
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-1">{session.vehiclePlate}</h3>
            <p className="text-sm text-slate-600">{session.vehicleModel}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-500 mb-1">Tài xế</p>
            <p className="text-sm font-medium text-slate-900">{session.driverName}</p>
            <p className="text-xs text-slate-600">{session.driverPhone}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Thời gian</p>
            <p className="text-sm font-medium text-slate-900">{formatDate(session.date)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-500 mb-1">Địa điểm</p>
            <p className="text-sm font-medium text-slate-900">{session.location}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Nhân viên vận hành</p>
            <p className="text-sm font-medium text-slate-900">{session.operatorName}</p>
          </div>
        </div>

        {session.odoReading > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center bg-teal-50 rounded-lg">
                <i className="ri-speed-line text-teal-600 text-lg"></i>
              </div>
              <div>
                <p className="text-xs text-slate-500">Số km</p>
                <p className="text-sm font-semibold text-slate-900">{session.odoReading.toLocaleString()} km</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center bg-emerald-50 rounded-lg">
                <i className="ri-battery-charge-line text-emerald-600 text-lg"></i>
              </div>
              <div>
                <p className="text-xs text-slate-500">Pin</p>
                <p className="text-sm font-semibold text-slate-900">{session.batteryLevel}%</p>
              </div>
            </div>
          </div>
        )}

        {session.notes && (
          <div className="mb-4 p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 mb-1">Ghi chú</p>
            <p className="text-sm text-slate-700">{session.notes}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <i className="ri-image-line text-slate-400"></i>
            <span className="text-sm text-slate-600">{session.images.length}/6 ảnh</span>
            {session.signatureUrl && (
              <>
                <span className="text-slate-300">•</span>
                <i className="ri-checkbox-circle-fill text-emerald-500"></i>
                <span className="text-sm text-emerald-600">Đã ký nhận</span>
              </>
            )}
          </div>
          {session.images.length > 0 && (
            <button
              onClick={() => setShowImages(true)}
              className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Xem ảnh
            </button>
          )}
        </div>
      </div>

      {showImages && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowImages(false)}>
          <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Ảnh bàn giao - {session.vehiclePlate}</h3>
                <p className="text-sm text-slate-600">{session.images.length} ảnh</p>
              </div>
              <button
                onClick={() => setShowImages(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xl text-slate-600"></i>
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {session.images.map((img, index) => (
                <div key={index} className="relative group cursor-pointer" onClick={() => setSelectedImage(img)}>
                  <div className="w-full h-64 rounded-lg overflow-hidden bg-slate-100">
                    <img src={img} alt={`Ảnh ${index + 1}`} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                    <i className="ri-zoom-in-line text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
                  </div>
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {index === 0 && 'Góc trước'}
                    {index === 1 && 'Góc sau'}
                    {index === 2 && 'Góc trái'}
                    {index === 3 && 'Góc phải'}
                    {index === 4 && 'Nội thất'}
                    {index === 5 && 'Đồng hồ'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl text-white"></i>
          </button>
          <img src={selectedImage} alt="Preview" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </>
  );
}