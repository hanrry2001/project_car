
import React from 'react';
import { reconciliationStats } from '../../../mocks/reconciliation';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

/**
 * Safely extracts a numeric value from the stats mock.
 * If the value is undefined or not a number, it falls back to 0.
 */
const safeNumber = (value: unknown): number => {
  const num = Number(value);
  return Number.isNaN(num) ? 0 : num;
};

export default function ReconciliationStats() {
  // Guard against missing or malformed mock data
  const totalPending = safeNumber(reconciliationStats?.totalPending);
  const totalMatched = safeNumber(reconciliationStats?.totalMatched);
  const totalUnmatched = safeNumber(reconciliationStats?.totalUnmatched);
  const totalInflow = safeNumber(reconciliationStats?.totalInflow);
  const totalOutflow = safeNumber(reconciliationStats?.totalOutflow);

  const stats = [
    {
      label: 'Chờ đối soát',
      value: totalPending,
      unit: 'giao dịch',
      icon: 'ri-time-line',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
    {
      label: 'Đã đối soát',
      value: totalMatched,
      unit: 'giao dịch',
      icon: 'ri-checkbox-circle-line',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
    {
      label: 'Không khớp',
      value: totalUnmatched,
      unit: 'giao dịch',
      icon: 'ri-error-warning-line',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
    },
    {
      label: 'Tổng tiền vào',
      value: formatCurrency(totalInflow),
      unit: '',
      icon: 'ri-arrow-down-circle-line',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
    {
      label: 'Tổng tiền ra',
      value: formatCurrency(totalOutflow),
      unit: '',
      icon: 'ri-arrow-up-circle-line',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`bg-white rounded-xl border ${s.border} p-4 flex items-center gap-3`}
        >
          <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${s.bg}`}>
            <i className={`${s.icon} text-xl ${s.color}`}></i>
          </div>
          <div>
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className={`text-base font-bold ${s.color}`}>
              {s.value}
              {s.unit ? (
                <span className="text-xs font-normal text-gray-400 ml-1">{s.unit}</span>
              ) : null}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
