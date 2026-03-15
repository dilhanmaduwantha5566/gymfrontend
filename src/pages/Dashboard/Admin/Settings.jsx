import React, { useState } from 'react';
import { Save, User, Shield } from 'lucide-react';
import api from '../../../helpers/api';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isSaving, setIsSaving] = useState(false);

    // Profile State
    const [profile, setProfile] = useState({
        name: localStorage.getItem('username') || 'Admin User',
        email: 'admin@supremefitness.com', // Typically admins have a fixed email or we fetch from context
    });

    // Password State
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleSaveProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await api.put('/admin/profile', { name: profile.name }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.setItem('username', res.data.name);
            alert('Profile saved successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to save profile: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleSavePassword = async () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            return alert('New passwords do not match!');
        }
        if (!passwords.currentPassword || !passwords.newPassword) {
            return alert('Please fill in all password fields.');
        }

        try {
            const token = localStorage.getItem('token');
            await api.put('/admin/password', {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Password updated successfully!');
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            console.error(err);
            alert('Failed to update password: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        if (activeTab === 'profile') {
            await handleSaveProfile();
        } else if (activeTab === 'security') {
            await handleSavePassword();
        }
        setIsSaving(false);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">

            <div className="flex flex-col md:flex-row gap-8">
                {/* Settings Navigation Sidebar */}
                <div className="w-full md:w-64 space-y-2">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile'
                            ? 'bg-red-600 text-white shadow-md'
                            : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
                            }`}
                    >
                        <User size={20} />
                        <span className="font-medium">My Profile</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('security')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'security'
                            ? 'bg-red-600 text-white shadow-md'
                            : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
                            }`}
                    >
                        <Shield size={20} />
                        <span className="font-medium">Security</span>
                    </button>
                </div>

                {/* Settings Content Area */}
                <div className="flex-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-sm">

                    <form onSubmit={handleSave} className="space-y-8">

                        {/* PROFILE SETTINGS */}
                        {activeTab === 'profile' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Admin Profile</h3>
                                    <p className="text-sm text-gray-500 dark:text-zinc-400">Manage your personal admin account details.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Full Name</label>
                                        <input
                                            type="text"
                                            value={profile.name}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-zinc-800 dark:text-white transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Email Address</label>
                                        <input
                                            type="email"
                                            value={profile.email}
                                            readOnly
                                            className="w-full px-4 py-2 border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 text-gray-400 dark:text-zinc-500 rounded-lg cursor-not-allowed transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 bg-gradient-to-tr from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                                            {profile.name.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECURITY SETTINGS */}
                        {activeTab === 'security' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Security & Passwords</h3>
                                    <p className="text-sm text-gray-500 dark:text-zinc-400">Keep your admin account secure.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Current Password</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={passwords.currentPassword}
                                            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                            className="w-full md:w-2/3 px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-zinc-800 dark:text-white transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">New Password</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={passwords.newPassword}
                                            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                            className="w-full md:w-2/3 px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-zinc-800 dark:text-white transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Confirm New Password</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={passwords.confirmPassword}
                                            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                            className="w-full md:w-2/3 px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-zinc-800 dark:text-white transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Save Button Footer */}
                        <div className="pt-6 border-t border-gray-200 dark:border-zinc-800 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-all disabled:opacity-70"
                            >
                                {isSaving ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Saving Changes...
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        Save Settings
                                    </>
                                )}
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default Settings;
