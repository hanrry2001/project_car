import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ReconciliationStats from './components/ReconciliationStats';
import AddTransactionModal from './components/AddTransactionModal';
import MatchTransactionModal from './components/MatchTransactionModal';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Chờ đối soát', color: 'text-amber-700', bg: 'bg-amber-100' },
  partial: { label: 'Chờ đối soát', color: 'text-amber-700', bg: 'bg-amber-100' },
  matched: { label: 'Đã đối soát', color: 'text-emerald-700', bg: 'bg-emerald-100' },
  unmatched: { label: 'Không khớp', color: 'text-red-700', bg: 'bg-red-100' },
};

export default function FinanceReconciliationPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [matchingTx, setMatchingTx] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [filterDirection, setFilterDirection] = useState('all');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Tải dữ liệu từ Supabase
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Tải danh sách tài khoản ngân hàng
      const { data: accounts, error: accountsError } = await supabase
        .from('bank_accounts')
        .select('*')
        .order('name');

      if (accountsError) throw accountsError;
      setBankAccounts(accounts || []);

      // Tải giao dịch đối soát
      const { data: txData, error: txError } = await supabase
        .from('reconciliation_transactions')
        .select('*')
        .order('date', { ascending: false })
        .order('time', { ascending: false });

      if (txError) throw txError;

      // Format dữ liệu để hiển thị
      const formattedTx = (txData || []).map((tx: any) => {
        const account = accounts?.find(a => a.id === tx.bank_account_id);
        return {
          id: tx.id,
          date: new Date(tx.date).toLocaleDateString('vi-VN'),
          time: tx.time,
          source: tx.bank_account_id,
          sourceName: account?.name || 'Không xác định',
          direction: tx.direction,
          amount: parseFloat(tx.amount),
          description: tx.description || '',
          reference: tx.reference_code || '',
          status: tx.status,
          matchedCodes: tx.matched_codes || [],
          remainingAmount: tx.remaining_amount ? parseFloat(tx.remaining_amount) : 0,
          note: tx.note || '',
        };
      });

      setTransactions(formattedTx);
    } catch (error) {
      console.error('Error loading data:', error);
      showToast('Lỗi khi tải dữ liệu!');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (tx: any) => {
    try {
      const { data, error } = await supabase
        .from('reconciliation_transactions')
        .insert([
          {
            date: tx.date,
            time: tx.time,
            bank_account_id: tx.source,
            direction: tx.direction,
            amount: tx.amount,
            description: tx.description,
            reference_code: tx.reference,
            status: 'pending',
            matched_codes: [],
            remaining_amount: 0,
            note: tx.note,
          },
        ])
        .select()
        .maybeSingle();

      if (error) throw error;

      // Reload data
      await loadData();
      showToast('Đã thêm giao dịch thành công!');
    } catch (error) {
      console.error('Error adding transaction:', error);
      showToast('Lỗi khi thêm giao dịch!');
    }
  };

  const handleMatch = async (
    txId: string,
    matches: Array<{code: string, type: string, amount: number}>,
    note: string
  ) => {
    try {
      const tx = transactions.find(t => t.id === txId);
      if (!tx) return;

      const totalRevenue = matches.filter(m => m.type === 'revenue').reduce((s, m) => s + m.amount, 0);
      const totalExpense = matches.filter(m => m.type === 'expense').reduce((s, m) => s + m.amount, 0);
      const netAmount = totalRevenue - totalExpense;
      const difference = tx.amount - netAmount;

      // Trường hợp 1: giao dịch > số tiền ròng → chưa hoàn thành, giữ pending
      let newStatus = 'matched';
      let remainingAmount = 0;
      let finalNote = note || `Đã đối soát với ${matches.length} mã`;

      if (difference > 1000) {
        newStatus = 'pending';
        remainingAmount = difference;
        finalNote = note || `Đã nối ${matches.length} mã, còn thiếu ${formatCurrency(difference)}`;
      }

      const { error } = await supabase
        .from('reconciliation_transactions')
        .update({
          status: newStatus,
          matched_codes: matches,
          remaining_amount: remainingAmount,
          note: finalNote,
          updated_at: new Date().toISOString(),
        })
        .eq('id', txId);

      if (error) throw error;

      // Reload data
      await loadData();
      showToast(`Đã xác nhận đối soát với ${matches.length} mã!`);
    } catch (error) {
      console.error('Error matching transaction:', error);
      showToast('Lỗi khi đối soát!');
    }
  };

  const handleUnmatch = async (txId: string) => {
    try {
      const { error } = await supabase
        .from('reconciliation_transactions')
        .update({
          status: 'pending',
          matched_codes: [],
          remaining_amount: 0,
          note: '',
          updated_at: new Date().toISOString(),
        })
        .eq('id', txId);

      if (error) throw error;

      // Reload data
      await loadData();
      showToast('Đã hủy đối soát giao dịch.');
    } catch (error) {
      console.error('Error unmatching transaction:', error);
      showToast('Lỗi khi hủy đối soát!');
    }
  };

  const handleMarkUnmatched = async (txId: string) => {
    try {
      const { error } = await supabase
        .from('reconciliation_transactions')
        .update({
          status: 'unmatched',
          note: 'Không tìm thấy mã tương ứng',
          updated_at: new Date().toISOString(),
        })
        .eq('id', txId);

      if (error) throw error;

      // Reload data
      await loadData();
      showToast('Đã đánh dấu không khớp.');
    } catch (error) {
      console.error('Error marking unmatched:', error);
      showToast('Lỗi khi đánh dấu!');
    }
  };

  const filtered = transactions.filter(t => {
    const matchStatus = filterStatus === 'all' || t.status === filterStatus;
    const matchSource = filterSource === 'all' || t.source === filterSource;
    const matchDir = filterDirection === 'all' || t.direction === filterDirection;
    const matchSearch =
      !search ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.reference.toLowerCase().includes(search.toLowerCase()) ||
      (t.matchedCodes && t.matchedCodes.some((m: any) => m.code.toLowerCase().includes(search.toLowerCase())));
    return matchStatus && matchSource && matchDir && matchSearch;
  });

  const pendingCount = transactions.filter(t => t.status === 'pending').length;
  const matchedCount = transactions.filter(t => t.status === 'matched').length;
  const unmatchedCount = transactions.filter(t => t.status === 'unmatched').length;

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-4xl text-teal-600 animate-spin"></i>
          <p className="text-sm text-gray-500 mt-3">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-teal-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 animate-fade-in">
          <i className="ri-checkbox-circle-line text-lg"></i>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Giao Dịch Chờ Đối Soát</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Tổng hợp giao dịch từ ngân hàng & quỹ tiền mặt · Đối soát với mã doanh thu / chi phí
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              loadData();
              showToast('Đang đồng bộ dữ liệu từ ngân hàng...');
            }}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-refresh-line text-base"></i>
            Đồng bộ API
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line text-base"></i>
            Thêm thủ công
          </button>
        </div>
      </div>

      {/* Stats */}
      <ReconciliationStats />

      {/* Progress bar */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Tiến độ đối soát tháng này</span>
          <span className="text-sm font-semibold text-teal-600">
            {matchedCount}/{transactions.length} giao dịch
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-2.5 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-500"
            style={{
              width: `${transactions.length ? (matchedCount / transactions.length) * 100 : 0}%`,
            }}
          ></div>
        </div>
        <div className="flex gap-4 mt-2">
          <span className="text-xs text-amber-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
            {pendingCount} chờ đối soát
          </span>
          <span className="text-xs text-emerald-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
            {matchedCount} đã đối soát
          </span>
          <span className="text-xs text-red-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span>
            {unmatchedCount} không khớp
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm nội dung, mã tham chiếu, mã đối soát..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ đối soát</option>
          <option value="matched">Đã đối soát</option>
          <option value="unmatched">Không khớp</option>
        </select>

        <select
          value={filterDirection}
          onChange={e => setFilterDirection(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
        >
          <option value="all">Tiền vào & ra</option>
          <option value="in">Tiền vào</option>
          <option value="out">Tiền ra</option>
        </select>

        <select
          value={filterSource}
          onChange={e => setFilterSource(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
        >
          <option value="all">Tất cả nguồn</option>
          {bankAccounts.map(b => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <span className="text-xs text-gray-400 whitespace-nowrap">{filtered.length} kết quả</span>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                  Ngày / Giờ
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                  Nguồn tiền
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                  Nội dung
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                  Mã tham chiếu
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                  Số tiền
                </th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                  Trạng thái
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                  Mã đối soát
                </th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-sm text-gray-400">
                    <i className="ri-inbox-line text-3xl block mb-2 text-gray-300"></i>
                    Không có giao dịch nào
                  </td>
                </tr>
              ) : (
                filtered.map(tx => (
                  <tr key={tx.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-800">{tx.date}</p>
                      <p className="text-xs text-gray-400">{tx.time}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 flex items-center justify-center rounded-lg ${
                            bankAccounts.find(b => b.id === tx.source)?.type === 'cash'
                              ? 'bg-amber-50'
                              : 'bg-teal-50'
                          }`}
                        >
                          <i
                            className={`${
                              bankAccounts.find(b => b.id === tx.source)?.type === 'cash'
                                ? 'ri-money-cny-circle-line text-amber-600'
                                : 'ri-bank-line text-teal-600'
                            } text-sm`}
                          ></i>
                        </div>
                        <span className="text-sm text-gray-700 whitespace-nowrap">{tx.sourceName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 max-w-xs">
                      <p className="text-sm text-gray-800 truncate">{tx.description}</p>
                      {tx.note && (
                        <p className="text-xs text-gray-400 truncate mt-0.5">{tx.note}</p>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {tx.reference || '-'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <span
                        className={`text-sm font-bold ${
                          tx.direction === 'in' ? 'text-emerald-600' : 'text-red-600'
                        }`}
                      >
                        {tx.direction === 'in' ? '+' : '-'}
                        {formatCurrency(tx.amount)}
                      </span>
                      <div className="flex items-center justify-end gap-1 mt-0.5">
                        <i
                          className={`${
                            tx.direction === 'in'
                              ? 'ri-arrow-down-circle-fill text-emerald-400'
                              : 'ri-arrow-up-circle-fill text-red-400'
                          } text-xs`}
                        ></i>
                        <span className="text-xs text-gray-400">
                          {tx.direction === 'in' ? 'Vào' : 'Ra'}
                        </span>
                      </div>
                      {tx.remainingAmount > 0 && (
                        <div className="mt-1 flex items-center justify-end gap-1">
                          <i className="ri-time-line text-amber-500 text-xs"></i>
                          <span className="text-xs font-semibold text-amber-600 whitespace-nowrap">
                            Còn {formatCurrency(tx.remainingAmount)}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          statusConfig[tx.status]?.bg
                        } ${statusConfig[tx.status]?.color}`}
                      >
                        {statusConfig[tx.status]?.label}
                      </span>
                      {tx.remainingAmount > 0 && (
                        <div className="mt-1">
                          <span className="text-xs text-amber-600 font-medium">Đối soát một phần</span>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      {tx.matchedCodes && tx.matchedCodes.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {tx.matchedCodes.map((match: any, idx: number) => (
                            <span
                              key={idx}
                              className={`text-xs font-semibold px-2 py-0.5 rounded ${
                                match.type === 'revenue'
                                  ? 'bg-teal-100 text-teal-700'
                                  : 'bg-orange-100 text-orange-700'
                              }`}
                            >
                              {match.code}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-center gap-1">
                        {tx.status === 'pending' && (
                          <>
                            <button
                              onClick={() => setMatchingTx(tx)}
                              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                                tx.matchedCodes && tx.matchedCodes.length > 0
                                  ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                                  : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                              }`}
                              title={tx.matchedCodes && tx.matchedCodes.length > 0 ? 'Tiếp tục đối soát' : 'Đối soát'}
                            >
                              <i className={`${tx.matchedCodes && tx.matchedCodes.length > 0 ? 'ri-add-line' : 'ri-link'} text-sm`}></i>
                              {tx.matchedCodes && tx.matchedCodes.length > 0 ? 'Thêm mã' : 'Đối soát'}
                            </button>
                            <button
                              onClick={() => handleMarkUnmatched(tx.id)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                              title="Đánh dấu không khớp"
                            >
                              <i className="ri-close-circle-line text-base"></i>
                            </button>
                          </>
                        )}
                        {tx.status === 'matched' && (
                          <button
                            onClick={() => handleUnmatch(tx.id)}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                            title="Hủy đối soát"
                          >
                            <i className="ri-link-unlink text-sm"></i>
                            Hủy
                          </button>
                        )}
                        {tx.status === 'unmatched' && (
                          <button
                            onClick={() => setMatchingTx({ ...tx, status: 'pending' })}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-100 transition-colors cursor-pointer whitespace-nowrap"
                          >
                            <i className="ri-refresh-line text-sm"></i>
                            Thử lại
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddTransactionModal 
          onClose={() => setShowAddModal(false)} 
          onAdd={handleAddTransaction}
          bankAccounts={bankAccounts}
        />
      )}
      {matchingTx && (
        <MatchTransactionModal
          transaction={matchingTx}
          onClose={() => setMatchingTx(null)}
          onMatch={handleMatch}
        />
      )}
    </div>
  );
}
