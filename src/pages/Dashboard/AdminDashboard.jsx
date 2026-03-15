import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../helpers/api";


// Sub-components
import Overview from "./Admin/Overview";
import UserManagement from "./Admin/UserManagement";
import Reports from "./Admin/Reports";
import Payments from "./Admin/Payments";
import Subscriptions from "./Admin/Subscriptions";
import Feedback from "./Admin/Feedback";
import Settings from "./Admin/Settings";

/**
 * AdminDashboard Component
 * 
 * This is the main container for the Admin Dashboard.
 * It manages the global state for admin-related data such as users, payments, and reports.
 * It also handles navigation between different admin views (Overview, User Management, etc.).
 */
export default function AdminDashboard() {
  // State for active tab navigation
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State for storing user data
  const [pendingUsers, setPendingUsers] = useState({ members: [], trainers: [] });
  const [approvedUsers, setApprovedUsers] = useState({ members: [], trainers: [] });

  // State for payments and financial reports
  const [payments, setPayments] = useState([]);
  const [reports, setReports] = useState({ stats: {}, charts: { attendance: [], revenue: { labels: [], data: [] } } });

  // Loading state
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /**
   * Fetches all necessary data for the admin dashboard.
   * Calls multiple API endpoints in parallel to populate the dashboard.
   */
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const [pendingRes, approvedRes, paymentsRes, reportsRes] = await Promise.all([
        api.get("/admin/pending-users", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/admin/approved-users", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/admin/payments", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/admin/reports", { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setPendingUsers(pendingRes.data);
      setApprovedUsers(approvedRes.data);
      setPayments(paymentsRes.data);
      setReports(reportsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const approveUser = async (role, id) => {
    if (!window.confirm(`Approve this ${role}?`)) return;
    try {
      const token = localStorage.getItem("token");
      await api.post(`/admin/approve/${role}/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      fetchUsers();
    } catch {
      alert("Failed to approve");
    }
  };

  const rejectUser = async (role, id) => {
    if (!window.confirm(`Reject this ${role}?`)) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/admin/reject/${role}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchUsers();
    } catch {
      alert("Failed to reject");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const SidebarItem = ({ icon, label, id }) => (
    <button
      onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === id
        ? "bg-red-600 text-white shadow-lg shadow-red-900/20"
        : "text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-white"
        }`}
    >
      <div className={`p-1 ${activeTab === id ? "text-white" : "text-gray-400 dark:text-zinc-400 group-hover:text-red-500 dark:group-hover:text-white"}`}>{icon}</div>
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white font-sans transition-colors duration-300 overflow-x-hidden">

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`w-72 bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-900 p-6 flex flex-col fixed h-full z-50 md:z-10 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="flex items-center gap-3 mb-10 px-2">
          <img src="/logo.jpg" alt="Logo" className="h-10 w-10 rounded-lg object-cover border-2 border-red-600" />
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Supreme<span className="text-red-600">Admin</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem
            id="overview"
            label="Overview"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
          />
          <SidebarItem
            id="reports"
            label="Reports"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          />
          <SidebarItem
            id="users"
            label="Manage Users"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
          />
          <SidebarItem
            id="payments"
            label="Payments"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <SidebarItem
            id="subscriptions"
            label="Subscriptions"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>}
          />
          <SidebarItem
            id="feedback"
            label="Feedback"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>}
          />
        </nav>

        <div className="pt-6 border-t border-gray-200 dark:border-zinc-900 space-y-2">
          <SidebarItem
            id="settings"
            label="Settings"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
          />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-red-500 group"
          >
            <div className="p-1 text-gray-400 dark:text-zinc-400 group-hover:text-red-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </div>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 p-4 md:p-8 w-full max-w-full">
        <header className="flex justify-between items-center mb-6 md:mb-8">
          <div className="flex items-center gap-3 md:gap-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 text-gray-500 hover:text-red-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
                {activeTab === 'overview' && 'Hello, Admin'}
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'reports' && 'Analytics & Reports'}
                {activeTab === 'payments' && 'Payment Gateway'}
                {activeTab === 'subscriptions' && 'Plan Management'}
                {activeTab === 'feedback' && 'Member Reviews'}
                {activeTab === 'settings' && 'System Settings'}
              </h1>
              <p className="text-gray-500 dark:text-zinc-500 mt-1 text-sm md:text-base">Manage everything from one centralized dashboard.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-600 border-2 border-zinc-800 shadow-sm"></div>
          </div>
        </header>

        {activeTab === 'overview' && <Overview pendingUsers={pendingUsers} approvedUsers={approvedUsers} loading={loading} onApprove={approveUser} onReject={rejectUser} />}
        {activeTab === 'users' && <UserManagement approvedUsers={approvedUsers} onRefresh={fetchUsers} />}
        {activeTab === 'reports' && <Reports reports={reports} />}
        {activeTab === 'payments' && <Payments payments={payments} />}
        {activeTab === 'subscriptions' && <Subscriptions />}
        {activeTab === 'feedback' && <Feedback />}
        {activeTab === 'settings' && <Settings />}

      </main>
    </div>
  );
}