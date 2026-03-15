import React from 'react';
import StatCard from '../components/StatCard';
import PendingCard from './components/PendingCard';

/**
 * Admin Overview Component
 * 
 * Displays a high-level summary of the gym's status.
 * Shows key statistics (total users, revenue), pending approvals, and recent activity (mock).
 * 
 * @param {Object} pendingUsers - List of users waiting for approval
 * @param {Object} approvedUsers - List of active users
 * @param {boolean} loading - Loading state indicator
 * @param {Function} onApprove - Handler for approving a user
 * @param {Function} onReject - Handler for rejecting/deleting a user
 */
const Overview = ({ pendingUsers, approvedUsers, loading, onApprove, onReject }) => (
    <>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
                label="Total Members"
                value={approvedUsers.members.length + pendingUsers.members.length}
                trend="+12%"
                icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
            />
            <StatCard
                label="Total Trainers"
                value={approvedUsers.trainers.length + pendingUsers.trainers.length}
                trend="+2%"
                icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
            />
            <StatCard
                label="Pending Requests"
                value={pendingUsers.members.length + pendingUsers.trainers.length}
                icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
        </section>

        {/* Action Grid */}
        <section className="gap-8">

            {/* Pending Approvals */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">New Registrations</h2>
                    <button className="text-sm text-red-500 hover:text-red-400 font-medium">View All</button>
                </div>

                <div className="bg-white dark:bg-zinc-900/30 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 min-h-[400px]">
                    {loading ? (
                        <div className="h-full flex items-center justify-center text-gray-500 dark:text-zinc-600 animate-pulse">Scanning database...</div>
                    ) : (pendingUsers.members.length === 0 && pendingUsers.trainers.length === 0) ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-zinc-500">
                            <div className="p-4 bg-gray-100 dark:bg-zinc-800/50 rounded-full mb-3">
                                <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <p>All caught up!</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {pendingUsers.trainers.map(t => <PendingCard key={t._id} user={t} role="trainer" onApprove={onApprove} onReject={onReject} />)}
                            {pendingUsers.members.map(m => <PendingCard key={m._id} user={m} role="member" onApprove={onApprove} onReject={onReject} />)}
                        </div>
                    )}
                </div>
            </div>

        </section>
    </>
);

export default Overview;
