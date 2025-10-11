import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { ReactNode } from "react";

interface DashboardCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: ReactNode;
    variant: "green" | "yellow" | "red";
    extraContent: ReactNode;
}

export function DashboardCard({
    title,
    value,
    description,
    icon,
    variant = "green",
    extraContent,
}: DashboardCardProps) {
    const variantStyles: Record<string, string> = {
        green: "bg-[#F0FDF4] border-[#B9F8CF]",
        yellow: "bg-[#FEFCE8] border-[#FFF085]",
        red: "bg-[#FEF2F2] border-[#FFC9C9]",
    };

    return (
        <Card
            className={`shadow-none border ${variantStyles[variant]} rounded-2xl`}
        >
            <CardContent>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center mb-2 text-[#67737C]">
                        <p className="text-lg font-medium">{title}</p>
                        {icon}
                    </div>

                    <p className="text-3xl font-bold text-[#040C13]">{value}</p>
                    <p className="text-sm text-[#67737C]">{description}</p>

                    {extraContent}
                </div>
            </CardContent>
        </Card>
    );
}
