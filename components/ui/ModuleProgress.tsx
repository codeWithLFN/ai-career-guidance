import React from "react";

interface Module {
    name: string;
    percentage: number; // 0–100
}

interface ModuleProgressProps {
    modules: Module[];
}

const ModuleProgress: React.FC<ModuleProgressProps> = ({ modules }) => {
    if (modules)
        return (
            <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                    Modules from Academic records
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {modules.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                        >
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-black dark:text-white">
                                    {item.name}
                                </span>
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    {item.percentage}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3">
                                <div
                                    className="h-3 rounded-full bg-blue-500 dark:bg-blue-400"
                                    style={{ width: `${item.percentage <= 100 ? item.percentage : 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    return null;
};

export default ModuleProgress;
