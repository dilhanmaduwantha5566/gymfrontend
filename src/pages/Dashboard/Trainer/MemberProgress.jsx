import React, { useEffect, useState } from "react";
import api from "../../../helpers/api";

const MemberProgress = () => {

    const [progressData, setProgressData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchProgress();
    }, []);

    const fetchProgress = async () => {
        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/progress/all", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProgressData(res.data);

        } catch (error) {
            console.error("Error fetching progress:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredData = progressData.filter((item) =>
        item.member?.name?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="p-10 text-center text-gray-500 text-lg">
                Loading member progress...
            </div>
        );
    }

    return (

        <div className="h-screen overflow-y-auto bg-gray-50">

            <div className="p-8 space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                    <div>
                        <h2 className="text-3xl font-bold text-red-600">
                            Member Progress
                        </h2>
                        <p className="text-gray-500">
                            Monitor your members fitness improvements
                        </p>
                    </div>

                    {/* Search */}
                    <div className="mt-4 md:mt-0">
                        <input
                            type="text"
                            placeholder="Search member..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border rounded-full px-5 py-2 w-64 shadow-sm focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>

                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {filteredData.length > 0 ? (

                        filteredData.map((item) => (

                            <div
                                key={item._id}
                                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
                            >

                                {/* Member Profile */}
                                <div className="flex items-center gap-4 mb-5">

                                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">
                                        {item.member?.name?.charAt(0)}
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {item.member?.name}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            {item.member?.email}
                                        </p>
                                    </div>

                                </div>

                                {/* Progress Details */}
                                <div className="space-y-3 text-sm">

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Weight</span>
                                        <span className="font-semibold">{item.weight} kg</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Height</span>
                                        <span className="font-semibold">{item.height} cm</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">BMI</span>

                                        <span
                                            className={`px-3 py-1 text-xs rounded-full font-semibold
                                            ${item.bmi < 18.5
                                                ? "bg-blue-100 text-blue-600"
                                                : item.bmi < 25
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                        >
                                            {item.bmi}
                                        </span>

                                    </div>

                                </div>

                                {/* Date */}
                                <div className="mt-5 pt-4 border-t text-xs text-gray-400">
                                    Updated on {new Date(item.date).toLocaleDateString()}
                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="text-gray-400 text-center col-span-3">
                            No members found
                        </div>

                    )}

                </div>

            </div>

        </div>

    );
};

export default MemberProgress;
