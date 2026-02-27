import { useState } from 'react';

interface Props {
  onClose: () => void;
  onAdd: (tx: any) => void;
  bankAccounts: any[];
}

interface FormState {
  date: string;
  time: string;
  source: string;
  direction: 'in' | 'out';
  amount: string;
  description: string;
  reference: string;
  note: string;
}

export default function AddTransactionModal({ onClose, onAdd, bankAccounts }: Props) {
  const [form, setForm] = useState<FormState>({
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    source: bankAccounts[0]?.id || '',
    direction: 'in',
    amount: '',
    description: '',
    reference: '',
    note: '',
  });

  /** Format raw input into a locale‑aware string (e.g. "1 000") */
  const formatAmountInput = (val: string) => {
    const num = val.replace(/\D/g, '');
    return num ? parseInt(num, 10).toLocaleString('vi-VN') : '';
  };

  /** Safely parse the formatted amount back to a number */
  const parseAmount = (formatted: string) => {
    const num = formatted.replace(/\D/g, '');
    return num ? parseInt(num, 10) : 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.amount || !form.description || !form.source) {
      return;
    }

    const src = bankAccounts.find(b => b.id === form.source);
    if (!src) {
      console.error(`Source account "${form.source}" not found.`);
      return;
    }

    const newTx = {
      ...form,
      amount: parseAmount(form.amount),
      sourceName: src.name,
    };

    try {
      onAdd(newTx);
      onClose();
    } catch (err) {
      console.error('Failed to add transaction:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Thêm giao dịch thủ công</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <i className="ri-close-line text-lg text-gray-500"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Ngày</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Giờ</label>
              <input
                type="time"
                value={form.time}
                onChange={e => setForm({ ...form, time: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Nguồn tiền</label>
            <select
              value={form.source}
              onChange={e => setForm({ ...form, source: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
            >
              {bankAccounts.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name} {b.type === 'bank' ? `(${b.account_number})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Loại giao dịch</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, direction: 'in' })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                  form.direction === 'in'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <i className="ri-arrow-down-circle-line mr-1"></i> Tiền vào
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, direction: 'out' })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                  form.direction === 'out'
                    ? 'bg-red-50 border-red-400 text-red-700'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <i className="ri-arrow-up-circle-line mr-1"></i> Tiền ra
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Số tiền (VNĐ)</label>
            <input
              type="text"
              value={form.amount}
              onChange={e => setForm({ ...form, amount: formatAmountInput(e.target.value) })}
              placeholder="0"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Nội dung chuyển khoản</label>
            <input
              type="text"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Nhập nội dung giao dịch..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Mã tham chiếu</label>
            <input
              type="text"
              value={form.reference}
              onChange={e => setForm({ ...form, reference: e.target.value })}
              placeholder="Số bút toán, mã giao dịch ngân hàng..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Ghi chú</label>
            <textarea
              value={form.note}
              onChange={e => setForm({ ...form, note: e.target.value })}
              placeholder="Ghi chú thêm..."
              rows={2}
              maxLength={500}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              Thêm giao dịch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
