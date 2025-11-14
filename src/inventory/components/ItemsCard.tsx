import React, { useState } from "react";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import dayjs from "dayjs";
import { SectionCard, Chip } from "./ui";
import { useGlobalStore } from "../../shared/stores/globalstore";

type Filters = {
    query: string;
    category: string;
    location: string;
};

type TabKey = "all" | "30d" | "7d" | "expired" | "noexp";

const TABS: { key: TabKey; label: string; className?: string }[] = [
    { key: "all", label: "All Items" },
    { key: "30d", label: "Expiring in 30 days", className: "text-[#C08A00]" },
    { key: "7d", label: "Expiring in 7 days", className: "text-[#C03232]" },
    { key: "expired", label: "Expired" },
    { key: "noexp", label: "No Expiration", className: "text-gray-600" },
];


export function ItemsCard({ filters }: { filters: Filters }) {
    const [tab, setTab] = useState<TabKey>("all");
    const { items } = useGlobalStore();

    const filteredItems = items
        .filter((i) =>
            i.name.toLowerCase().includes(filters.query.toLowerCase()) ||
            i.code?.toLowerCase().includes(filters.query.toLowerCase())
        )
        .filter((i) => filters.category === "All" || i.categoryName === filters.category)
        .filter((i) => filters.location === "All" || i.location === filters.location)
        .filter((i) => {
            const exp = i.expirationDate ? dayjs(i.expirationDate).diff(dayjs(), "day") : null;

            if (tab === "noexp") return exp === null;
            if (tab === "expired") return exp !== null && exp < 0;
            if (tab === "7d") return exp !== null && exp >= 0 && exp <= 7;
            if (tab === "30d") return exp !== null && exp > 7 && exp <= 30;
            return true;
        });


    const ActionButton = ({
        children,
        onClick,
    }: {
        children: React.ReactNode;
        onClick?: () => void;
    }) => (
        <button
            onClick={onClick}
            className="h-9 rounded-md border border-gray-300 px-4 text-sm hover:bg-gray-50"
        >
            {children}
        </button>
    );

    return (
        <SectionCard>
            <div className="flex items-center gap-2 mb-1">
                <Inventory2OutlinedIcon fontSize="small" className="text-gray-700" />
                <p className="font-medium text-base">Inventory Items</p>
            </div>

            <div className="rounded-full bg-gray-100 p-1 inline-flex gap-1 mb-4">
                {TABS.map((t) => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={[
                            "px-4 py-1.5 rounded-full text-sm",
                            tab === t.key ? "bg-white shadow-sm" : "text-gray-600",
                            t.className || "",
                        ].join(" ")}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

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
                            <th className="py-3 pr-2 font-medium">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {filteredItems.map((i) => {
                            const expDate = i.expirationDate ? dayjs(i.expirationDate) : null;
                            const diff = expDate ? expDate.diff(dayjs(), "day") : null;

                            const statusText = !expDate
                                ? "No expiration"
                                : diff! < 0
                                    ? `Expired ${Math.abs(diff!)}d ago`
                                    : diff! <= 7
                                        ? `Expires in ${diff!}d`
                                        : diff! <= 30
                                            ? `Expires in ${diff!}d`
                                            : "Valid";

                            const statusColor = !expDate
                                ? "text-gray-500"
                                : diff! < 0
                                    ? "text-red-600"
                                    : diff! <= 7
                                        ? "text-[#B45309]"
                                        : "text-gray-500";

                            return (
                                <tr key={i.id} className="align-middle">
                                    <td className="py-4 pr-4">
                                        <div className="font-medium">{i.name}</div>
                                        <div className="text-xs text-gray-500">{i.id}</div>
                                    </td>

                                    <td className="py-4 pr-4">
                                        <Chip>{i.categoryName}</Chip>
                                    </td>

                                    <td className="py-4 pr-4 font-mono tracking-wide">{i.code}</td>

                                    <td className="py-4 pr-4">{i.quantity} {i.unit}</td>

                                    <td className="py-4 pr-4">{i.location}</td>

                                    <td className="py-4 pr-4">
                                        <div>{expDate ? expDate.format("YYYY-MM-DD") : "-"}</div>
                                        <div className={`text-xs ${statusColor}`}>{statusText}</div>
                                    </td>

                                    <td className="py-4 pr-2">
                                        <div className="flex gap-2">
                                            <ActionButton onClick={() => { }}>View</ActionButton>
                                            <ActionButton onClick={() => { }}>Update</ActionButton>
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
