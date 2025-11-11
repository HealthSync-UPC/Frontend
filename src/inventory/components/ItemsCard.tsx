import React, { useState } from 'react';
import { SectionCard, Chip, SoftTag, expiryLabel, daysUntil } from './ui';
import type { Filters, InventoryItem, TabKey } from '../model/types';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

const TABS: { key: TabKey; label: string; className?: string }[] = [
    { key: 'all', label: 'All Items' },
    { key: '30d', label: 'Expiring in 30 days', className: 'text-[#C08A00]' },
    { key: '7d', label: 'Expiring in 7 days', className: 'text-[#C03232]' },
    { key: 'expired', label: 'Expired' },
];

export function ItemsCard({ items, filters }: { items: InventoryItem[]; filters: Filters }) {
    const [tab, setTab] = useState<TabKey>('all');

    const ActionButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
        <button
            onClick={onClick}
            className="h-9 rounded-md border border-gray-300 px-4 text-sm hover:bg-gray-50"
        >
            {children}
        </button>
    );

    // --- Filtro directo (sin useMemo) ---
    const filteredItems = items.filter((i) => {
        const q = filters.query.toLowerCase();
        const d = daysUntil(i.expiryDate);

        // Búsqueda
        if (q && !(
            i.name.toLowerCase().includes(q) ||
            i.id.toLowerCase().includes(q) ||
            i.batch.toLowerCase().includes(q)
        )) return false;

        // Categoría / Ubicación
        if (filters.category !== 'All' && i.category !== filters.category) return false;
        if (filters.location !== 'All' && i.location !== filters.location) return false;

        // Tab activo
        if (tab === '30d' && !(d > 0 && d <= 30)) return false;
        if (tab === '7d' && !(d > 0 && d <= 7)) return false;
        if (tab === 'expired' && !(d < 0)) return false;

        return true;
    });

    return (
        <SectionCard>
            <div className="flex items-center gap-2 mb-1">
                <Inventory2OutlinedIcon fontSize="small" className="text-gray-700" />
                <p className="font-medium text-base">Inventory Items</p>
            </div>

            {/* Tabs */}
            <div className="rounded-full bg-gray-100 p-1 inline-flex gap-1 mb-4">
                {TABS.map((t) => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={[
                            'px-4 py-1.5 rounded-full text-sm',
                            tab === t.key ? 'bg-white shadow-sm' : 'text-gray-600',
                            t.className || '',
                        ].join(' ')}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-600 border-b">
                            <th className="py-3 pr-4 font-medium">Item Name</th>
                            <th className="py-3 pr-4 font-medium">Category</th>
                            <th className="py-3 pr-4 font-medium">Batch</th>
                            <th className="py-3 pr-4 font-medium">Quantity</th>
                            <th className="py-3 pr-4 font-medium">Location</th>
                            <th className="py-3 pr-4 font-medium">Expiry Date</th>
                            <th className="py-3 pr-4 font-medium">Status</th>
                            <th className="py-3 pr-2 font-medium">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {filteredItems.map((i) => {
                            const d = daysUntil(i.expiryDate);
                            const isExpired = d < 0;
                            const near7 = d > 0 && d <= 7;
                            const near30 = d > 7 && d <= 30;

                            const tag =
                                isExpired ? <SoftTag color="red">Expired</SoftTag> :
                                    near7 || near30 ? <SoftTag color="yellow">Expiring Soon</SoftTag> :
                                        <SoftTag color="gray">Good</SoftTag>;

                            return (
                                <tr key={i.id} className="align-middle">
                                    {/* Item Name + code */}
                                    <td className="py-4 pr-4">
                                        <div className="font-medium">{i.name}</div>
                                        <div className="text-xs text-gray-500">{i.id}</div>
                                    </td>

                                    {/* Category */}
                                    <td className="py-4 pr-4">
                                        <Chip>{i.category}</Chip>
                                    </td>

                                    {/* Batch */}
                                    <td className="py-4 pr-4 font-mono tracking-wide">{i.batch}</td>

                                    {/* Quantity */}
                                    <td className="py-4 pr-4">{i.quantity} {i.unitLabel}</td>

                                    {/* Location */}
                                    <td className="py-4 pr-4">{i.location}</td>

                                    {/* Expiry Date */}
                                    <td className="py-4 pr-4">
                                        <div>{i.expiryDate}</div>
                                        <div
                                            className={`text-xs ${isExpired ? 'text-red-600' :
                                                near7 ? 'text-[#B45309]' : 'text-gray-500'
                                                }`}
                                        >
                                            {expiryLabel(i.expiryDate)}
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="py-4 pr-4">{tag}</td>

                                    {/* Actions */}
                                    <td className="py-4 pr-2">
                                        <div className="flex gap-2">
                                            <ActionButton onClick={() => alert(`Viewing ${i.id}`)}>View</ActionButton>
                                            <ActionButton onClick={() => alert(`Updating ${i.id}`)}>Update</ActionButton>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </SectionCard>
    );
}
