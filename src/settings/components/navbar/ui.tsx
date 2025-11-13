import React from 'react';

export const SectionCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm ${className || ''}`}>{children}</div>
);

export const Chip = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
        {children}
    </span>
);

export const Badge = ({ status }: { status: 'Active' | 'Inactive' }) => (
    <span
        className={[
            'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
            status === 'Active' ? 'bg-[#1E6B8F] text-white' : 'bg-gray-200 text-gray-700',
        ].join(' ')}
    >
        {status}
    </span>
);
