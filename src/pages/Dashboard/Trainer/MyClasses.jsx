import React, { useState } from 'react';
import api from '../../../helpers/api';

const MyClasses = ({ classes, onAddClassClick, onUpdate }) => {
    const [editingClass, setEditingClass] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleEditSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const token = localStorage.getItem('token');
            // send payload
            await api.put(`/classes/update/${editingClass._id}`, editingClass, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Class updated successfully!");
            setEditingClass(null);
            if (onUpdate) onUpdate(); // Refresh class list
        } catch (err) {
            console.error(err);
            alert("Failed to update class: " + (err.response?.data?.message || err.message));
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Class Management</h2>
                <button onClick={onAddClassClick} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                    + Schedule Class
                </button>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm text-gray-500 dark:text-zinc-400">
                    <thead className="bg-gray-100 dark:bg-zinc-950 text-xs uppercase font-medium text-gray-500 dark:text-zinc-500">
                        <tr>
                            <th className="px-6 py-4">Class Name</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Date & Time</th>
                            <th className="px-6 py-4">Duration</th>
                            <th className="px-6 py-4">Price (LKR)</th>
                            <th className="px-6 py-4">Attendees</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                        {classes.map((cls, i) => (
                            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{cls.name}</td>
                                <td className="px-6 py-4"><span className="bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded text-xs">{cls.type}</span></td>
                                <td className="px-6 py-4">{new Date(cls.date).toLocaleDateString()} at {cls.time}</td>
                                <td className="px-6 py-4">{cls.duration} min</td>
                                <td className="px-6 py-4">{cls.price ? `${cls.price}` : 'Free'}</td>
                                <td className="px-6 py-4">{cls.attendees?.length || 0}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => setEditingClass(cls)}
                                        className="text-blue-500 hover:text-blue-700 font-medium px-2 py-1 bg-blue-50 dark:bg-zinc-800 rounded mx-1 transition-all"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {classes.length === 0 && (
                            <tr><td colSpan="7" className="text-center py-6 text-gray-500 dark:text-zinc-500">No classes found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Editing Modal */}
            {editingClass && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[100]">
                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                            Modify Class
                        </h3>

                        <form onSubmit={handleEditSave} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Class Name</label>
                                    <input
                                        className="w-full border dark:border-zinc-700 p-2 rounded dark:bg-zinc-800 dark:text-white"
                                        required
                                        value={editingClass.name}
                                        onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Type</label>
                                    <select
                                        className="w-full border dark:border-zinc-700 p-2 rounded dark:bg-zinc-800 dark:text-white"
                                        value={editingClass.type}
                                        onChange={(e) => setEditingClass({ ...editingClass, type: e.target.value })}
                                    >
                                        <option value="Yoga">Yoga</option>
                                        <option value="Cardio">Cardio</option>
                                        <option value="Strength Training">Strength Training</option>
                                        <option value="Zumba">Zumba</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full border dark:border-zinc-700 p-2 rounded dark:bg-zinc-800 dark:text-white"
                                        value={editingClass.date ? editingClass.date.split('T')[0] : ''}
                                        onChange={(e) => setEditingClass({ ...editingClass, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Time</label>
                                    <input
                                        type="time"
                                        required
                                        className="w-full border dark:border-zinc-700 p-2 rounded dark:bg-zinc-800 dark:text-white"
                                        value={editingClass.time}
                                        onChange={(e) => setEditingClass({ ...editingClass, time: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-zinc-300">Price (LKR)</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        className="w-full border dark:border-zinc-700 p-2 rounded dark:bg-zinc-800 dark:text-white"
                                        value={editingClass.price}
                                        onChange={(e) => setEditingClass({ ...editingClass, price: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded font-bold disabled:opacity-50 transition"
                                >
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setEditingClass(null)}
                                    className="flex-1 bg-gray-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 py-2 rounded font-bold hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyClasses;
