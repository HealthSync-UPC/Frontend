import React from 'react';

// ---- Base Card
export const SectionCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm ${className || ''}`}>
        {children}
    </div>
);

// ---- Chips/Tags
export const Chip = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
        {children}
    </span>
);

export const SoftTag = ({ color, children }: { color: 'yellow' | 'red' | 'gray'; children: React.ReactNode }) => {
    const styles =
        color === 'yellow'
            ? 'bg-[#FFF8D6] text-[#7A5E00]'
            : color === 'red'
                ? 'bg-[#FBE5E5] text-[#8E1A1A]'
                : 'bg-gray-100 text-gray-700';
    return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs ${styles}`}>{children}</span>;
};

// ---- Date helpers
export function daysUntil(dateISO: string) {
    const ms = new Date(dateISO).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0);
    return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function expiryLabel(dateISO: string) {
    const d = daysUntil(dateISO);
    if (d > 0) return `${d} days left`;
    if (d === 0) return 'Expires today';
    return `Expired ${Math.abs(d)} days ago`;
}
