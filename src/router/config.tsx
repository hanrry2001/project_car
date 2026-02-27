import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '../components/feature/Layout';

const HomePage = lazy(() => import('../pages/home/page'));
const VehicleManagementPage = lazy(() => import('../pages/vehicle-management/page'));
const DriverManagementPage = lazy(() => import('../pages/driver-management/page'));
const OperationsPage = lazy(() => import('../pages/operations/page'));
const FinancePage = lazy(() => import('../pages/finance/page'));
const FinanceRevenuePage = lazy(() => import('../pages/finance-revenue/page'));
const FinanceExpensesPage = lazy(() => import('../pages/finance-expenses/page'));
const FinanceWalletPage = lazy(() => import('../pages/finance-wallet/page'));
const FinanceAnalyticsPage = lazy(() => import('../pages/finance-analytics/page'));
const FinanceReconciliationPage = lazy(() => import('../pages/finance-reconciliation/page'));
const SalesCommissionPage = lazy(() => import('../pages/sales-commission/page'));
const DocumentsAlertsPage = lazy(() => import('../pages/documents-alerts/page'));
const IncidentsPage = lazy(() => import('../pages/incidents/page'));
const ReportsPage = lazy(() => import('../pages/reports/page'));
const SettingsPage = lazy(() => import('../pages/settings/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout><HomePage /></Layout>,
  },
  {
    path: '/vehicle-management',
    element: <Layout><VehicleManagementPage /></Layout>,
  },
  {
    path: '/driver-management',
    element: <Layout><DriverManagementPage /></Layout>,
  },
  {
    path: '/operations',
    element: <Layout><OperationsPage /></Layout>,
  },
  {
    path: '/finance',
    element: <Layout><FinancePage /></Layout>,
  },
  {
    path: '/finance/revenue',
    element: <Layout><FinanceRevenuePage /></Layout>,
  },
  {
    path: '/finance/expenses',
    element: <Layout><FinanceExpensesPage /></Layout>,
  },
  {
    path: '/finance/wallet',
    element: <Layout><FinanceWalletPage /></Layout>,
  },
  {
    path: '/finance/analytics',
    element: <Layout><FinanceAnalyticsPage /></Layout>,
  },
  {
    path: '/finance/reconciliation',
    element: <Layout><FinanceReconciliationPage /></Layout>,
  },
  {
    path: '/sales-commission',
    element: <Layout><SalesCommissionPage /></Layout>,
  },
  {
    path: '/documents-alerts',
    element: <Layout><DocumentsAlertsPage /></Layout>,
  },
  {
    path: '/incidents',
    element: <Layout><IncidentsPage /></Layout>,
  },
  {
    path: '/reports',
    element: <Layout><ReportsPage /></Layout>,
  },
  {
    path: '/settings',
    element: <Layout><SettingsPage /></Layout>,
  },
  {
    path: '*',
    element: <Layout><NotFoundPage /></Layout>,
  },
];

export default routes;
