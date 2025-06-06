import React from "react";

interface Tab {
    id: string;
    label: string;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (id: string) => void;
}

export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
    return (
        <nav className="flex gap-6 border-b pb-2 mb-4">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`px-4 py-2 font-semibold transition-colors ${activeTab === tab.id
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600 hover:text-blue-500"
                        }`}
                    onClick={() => onChange(tab.id)}
                    type="button"
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
}
