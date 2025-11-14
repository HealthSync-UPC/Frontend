import type { ZoneItem } from './ZoneDetailsModal';

type Props = {
    items: ZoneItem[];
};

export function ZoneItemsTab({ items }: Props) {
    if (items.length === 0) {
        return (
            <div className="p-4 text-sm text-gray-500">
                No items assigned to this zone yet.
            </div>
        );
    }

    return (
        <div className="p-4">
            <table className="min-w-full text-sm">
                <thead>
                    <tr className="border-b text-left text-gray-600">
                        <th className="py-2 pr-4 font-medium">Code</th>
                        <th className="py-2 pr-4 font-medium">Name</th>
                        <th className="py-2 pr-4 font-medium">Quantity</th>
                        <th className="py-2 pr-4 font-medium">Unit</th>
                        <th className="py-2 pr-2 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {items.map((it) => (
                        <tr key={it.code}>
                            <td className="py-3 pr-4 font-medium">{it.code}</td>
                            <td className="py-3 pr-4">{it.name}</td>
                            <td className="py-3 pr-4">{it.quantity}</td>
                            <td className="py-3 pr-4">{it.unit}</td>
                            <td className="py-3 pr-2">
                                <span className="rounded-full bg-[#E6F4FF] px-3 py-1 text-xs font-medium text-[#0B63A9]">
                                    {it.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
