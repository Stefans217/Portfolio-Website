"use client";

import type { AdminContactMessage } from "@/types/admin";

type ContactMessageListProps = {
    messages: AdminContactMessage[];
    onDelete: (id: string) => void;
};

export default function ContactMessageList({ messages, onDelete }: ContactMessageListProps) {
    const handleDelete = (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;
        onDelete(id);
    };

    return (
        <div className="rounded-lg bg-white p-6 shadow-md flex flex-col h-[600px] max-w-4xl mx-auto">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 flex-shrink-0">Contact Messages</h2>
            <div className="space-y-4 overflow-y-auto flex-grow pr-2">
                {messages.length === 0 ? (
                    <p className="text-gray-500">No messages found.</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="rounded-md border border-gray-200 p-4 flex items-center justify-between">
                            <div className="flex-1">
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900">{msg.name}</h3>
                                        <p className="text-sm text-gray-500">{msg.email}</p>
                                    </div>
                                    <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <button onClick={() => handleDelete(msg.id)} className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
