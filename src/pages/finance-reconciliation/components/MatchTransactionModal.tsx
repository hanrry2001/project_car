
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

interface MatchItem {
  code: string;
  type: 'revenue' | 'expense';
  amount: number;
  label?: string;
}

interface Props {
  transaction: any;
  onClose: () => void;
  onMatch: (txId: string, matches: MatchItem[], note: string) => void;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

export default function MatchTransactionModal({ transaction, onClose, onMatch }: Props) {
  const [matchType, setMatchType] = useState<'revenue' | 'expense'>(
    transaction.direction === 'in' ? 'revenue' : 'expense'
  );

  // Khởi tạo selectedMatches từ matchedCodes đã lưu (nếu có)
  const [selectedMatches, setSelectedMatches] = useState<MatchItem[]>(() => {
    const existing = transaction.matchedCodes;
    if (!existing || !Array.isArray(existing) || existing.length === 0) return [];
    return existing.map((m: any) => ({
      code: m.code ?? m.id ?? String(m),
      type: m.type ?? 'revenue',
      amount: typeof m.amount === 'number' ? m.amount : parseFloat(m.amount ?? '0'),
      label: m.label ?? '',
    }));
  });

  const [note, setNote] = useState(transaction.note || '');
  const [search, setSearch] = useState('');
  const [revenueList, setRevenueList] = useState<any[]>([]);
  const [expenseList, setExpenseList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const { data: revenueData, error: revenueError } = await supabase
        .from('revenue_transactions')
        .select('id, type, description, amount, date, status, vehicle_id, driver_id')
        .eq('status', 'pending')
        .order('date', { ascending: false });

      if (revenueError) throw revenueError;
      setRevenueList(revenueData || []);

      const { data: expenseData, error: expenseError } = await supabase
        .from('expenses')
        .select('id, category, description, amount, date, status, responsible_person')
        .eq('status', 'pending')
        .order('date', { ascending: false });

      if (expenseError) throw expenseError;
      setExpenseList(expenseData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRevenue = revenueList.filter(r => {
    const q = search.toLowerCase();
    return (
      r.id.toLowerCase().includes(q) ||
      (r.description && r.description.toLowerCase().includes(q)) ||
      (r.type && r.type.toLowerCase().includes(q))
    );
  });

  const filteredExpense = expenseList.filter(e => {
    const q = search.toLowerCase();
    return (
      e.id.toLowerCase().includes(q) ||
      (e.description && e.description.toLowerCase().includes(q)) ||
      (e.category && e.category.toLowerCase().includes(q)) ||
      (e.responsible_person && e.responsible_person.toLowerCase().includes(q))
    );
  });

  const totalRevenue = selectedMatches
    .filter(m => m.type === 'revenue')
    .reduce((s, m) => s + m.amount, 0);
  const totalExpense = selectedMatches
    .filter(m => m.type === 'expense')
    .reduce((s, m) => s + m.amount, 0);
  const netAmount = totalRevenue - totalExpense;
  const difference = transaction.amount - netAmount;

  const toggleMatch = (code: string, type: 'revenue' | 'expense', amount: number, label: string) => {
    const exists = selectedMatches.find(m => m.code === code);
    if (exists) {
      setSelectedMatches(prev => prev.filter(m => m.code !== code));
    } else {
      setSelectedMatches(prev => [...prev, { code, type, amount, label }]);
    }
  };

  const handleSubmit = () => {
    if (selectedMatches.length === 0) return;
    onMatch(transaction.id, selectedMatches, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Đối soát giao dịch</h3>
            <p className="text-xs text-gray-500 mt-0.5">Nối giao dịch với mã doanh thu / chi phí</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <i className="ri-close-line text-lg text-gray-500"></i>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4 overflow-hidden flex-1">
          {/* Transaction info */}
          <div
            className={`rounded-xl p-4 border ${
              transaction.direction === 'in' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i
                  className={`${
                    transaction.direction === 'in' ? 'ri-arrow-down-circle-fill text-emerald-600' : 'ri-arrow-up-circle-fill text-red-600'
                  } text-xl`}
                ></i>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{transaction.description}</p>
                  <p className="text-xs text-gray-500">
                    {transaction.sourceName} · {transaction.date} {transaction.time}
                  </p>
                </div>
              </div>
              <span
                className={`text-lg font-bold ${transaction.direction === 'in' ? 'text-emerald-600' : 'text-red-600'}`}
              >
                {transaction.direction === 'in' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </span>
            </div>
          </div>

          {/* Selected matches summary */}
          {selectedMatches.length > 0 && (
            <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-700">
                  Đã chọn {selectedMatches.length} mã
                </p>
                <button
                  onClick={() => setSelectedMatches([])}
                  className="text-xs text-red-600 hover:text-red-700 cursor-pointer"
                >
                  Xóa tất cả
                </button>
              </div>
              <div className="space-y-1.5 mb-3 max-h-28 overflow-y-auto">
                {selectedMatches.map(m => (
                  <div
                    key={m.code}
                    className="flex items-center justify-between text-xs bg-white rounded-lg px-3 py-1.5 border border-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          m.type === 'revenue' ? 'bg-teal-500' : 'bg-orange-500'
                        }`}
                      ></span>
                      <span className={`font-medium ${m.type === 'revenue' ? 'text-teal-700' : 'text-orange-700'}`}>
                        {m.label || m.code}
                      </span>
                      <span className="text-gray-400">
                        ({m.type === 'revenue' ? 'Doanh thu' : 'Chi phí'})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          m.type === 'revenue' ? 'text-emerald-600 font-semibold' : 'text-red-600 font-semibold'
                        }
                      >
                        {m.type === 'revenue' ? '+' : '-'}
                        {formatCurrency(m.amount)}
                      </span>
                      <button
                        onClick={() => setSelectedMatches(prev => prev.filter(x => x.code !== m.code))}
                        className="text-gray-300 hover:text-red-400 cursor-pointer"
                      >
                        <i className="ri-close-line text-sm"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-gray-200 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Tổng doanh thu:</span>
                  <span className="font-semibold text-emerald-600">
                    +{formatCurrency(totalRevenue)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Tổng chi phí:</span>
                  <span className="font-semibold text-red-600">
                    -{formatCurrency(totalExpense)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold pt-1">
                  <span className="text-gray-800">Số tiền ròng:</span>
                  <span className={netAmount >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                    {netAmount >= 0 ? '+' : ''}
                    {formatCurrency(netAmount)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold pt-2 border-t border-gray-300">
                  <span className="text-gray-800">Chênh lệch:</span>
                  <span
                    className={
                      Math.abs(difference) < 1000
                        ? 'text-emerald-600'
                        : difference > 0
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }
                  >
                    {difference >= 0 ? '+' : ''}
                    {formatCurrency(difference)}
                  </span>
                </div>
                {Math.abs(difference) >= 1000 && (
                  <p
                    className={`text-xs mt-2 px-2 py-1 rounded ${
                      difference > 0 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {difference > 0
                      ? `⚠️ Còn thiếu ${formatCurrency(difference)} chưa đối soát`
                      : `⚠️ Vượt quá ${formatCurrency(Math.abs(difference))} — Cần kiểm tra lại`}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Match type selector */}
          <div>
            <p className="text-xs font-medium text-gray-600 mb-2">Chọn loại mã để thêm</p>
            <div className="flex gap-3">
              <button
                onClick={() => setMatchType('revenue')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                  matchType === 'revenue'
                    ? 'bg-teal-50 border-teal-400 text-teal-700'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <i className="ri-arrow-down-circle-line mr-1"></i>
                Mã Doanh Thu
                {revenueList.length > 0 && (
                  <span className="ml-1.5 text-xs bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded-full">
                    {revenueList.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMatchType('expense')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                  matchType === 'expense'
                    ? 'bg-orange-50 border-orange-400 text-orange-700'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <i className="ri-arrow-up-circle-line mr-1"></i>
                Mã Chi Phí
                {expenseList.length > 0 && (
                  <span className="ml-1.5 text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full">
                    {expenseList.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={
                matchType === 'revenue'
                  ? 'Tìm theo mô tả, loại doanh thu...'
                  : 'Tìm theo danh mục, mô tả, người phụ trách...'
              }
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1 border border-gray-100 rounded-xl divide-y divide-gray-50 min-h-0">
            {loading ? (
              <div className="p-8 text-center text-sm text-gray-400">
                <i className="ri-loader-4-line text-2xl animate-spin block mb-2"></i>
                Đang tải dữ liệu...
              </div>
            ) : matchType === 'revenue' ? (
              filteredRevenue.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-400">
                  <i className="ri-inbox-line text-3xl block mb-2 text-gray-300"></i>
                  Không có mã doanh thu nào đang chờ xử lý
                </div>
              ) : (
                filteredRevenue.map(r => {
                  const isSelected = selectedMatches.some(m => m.code === r.id);
                  const label = r.description || r.type || 'Doanh thu';
                  return (
                    <div
                      key={r.id}
                      onClick={() => toggleMatch(r.id, 'revenue', parseFloat(r.amount), label)}
                      className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                        isSelected ? 'bg-teal-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 flex items-center justify-center rounded-full border-2 flex-shrink-0 ${
                            isSelected ? 'border-teal-500 bg-teal-500' : 'border-gray-300'
                          }`}
                        >
                          {isSelected && <i className="ri-check-line text-white text-xs"></i>}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{r.type || 'Doanh thu'}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {r.description || '—'} · {new Date(r.date).toLocaleDateString('vi-VN')}
                          </p>
                          <p className="text-xs text-gray-400 font-mono mt-0.5">{r.id.slice(0, 8)}...</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="text-sm font-semibold text-emerald-600">
                          {formatCurrency(parseFloat(r.amount))}
                        </p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                          Chờ xử lý
                        </span>
                      </div>
                    </div>
                  );
                })
              )
            ) : filteredExpense.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-400">
                <i className="ri-inbox-line text-3xl block mb-2 text-gray-300"></i>
                Không có mã chi phí nào đang chờ xử lý
              </div>
            ) : (
              filteredExpense.map(e => {
                const isSelected = selectedMatches.some(m => m.code === e.id);
                const label = e.category || e.description || 'Chi phí';
                return (
                  <div
                    key={e.id}
                    onClick={() => toggleMatch(e.id, 'expense', parseFloat(e.amount), label)}
                    className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                      isSelected ? 'bg-orange-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 flex items-center justify-center rounded-full border-2 flex-shrink-0 ${
                          isSelected ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                        }`}
                      >
                        {isSelected && <i className="ri-check-line text-white text-xs"></i>}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{e.category || 'Chi phí'}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {e.description || '—'} · {e.responsible_person || ''} ·{' '}
                          {new Date(e.date).toLocaleDateString('vi-VN')}
                        </p>
                        <p className="text-xs text-gray-400 font-mono mt-0.5">{e.id.slice(0, 8)}...</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-sm font-semibold text-red-600">
                        {formatCurrency(parseFloat(e.amount))}
                      </p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                        Chờ xử lý
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Note */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Ghi chú đối soát</label>
            <input
              type="text"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Ghi chú thêm về việc đối soát..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedMatches.length === 0}
              className="flex-1 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Xác nhận đối soát ({selectedMatches.length} mã)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
