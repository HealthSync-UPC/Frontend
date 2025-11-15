import React from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import type { Severity, Status } from '../model/types';


export const SectionCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm ${className || ''}`}>{children}</div>
);

export const Chip = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
        {children}
    </span>
);

export function SeverityBadge({ level }: { level: Severity }) {
    const base = 'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium';
    if (level === 'Critical') {
        return (
            <span className={`${base} bg-[#FFC9C9] text-[#DC2626]`}>
                <ErrorOutlineIcon fontSize="inherit" />
                Critical
            </span>
        );
    }
    return (
        <span className={`${base} bg-[#F8EFC6] text-[#835E00]`}>
            <WarningAmberIcon fontSize="inherit" />
            Warning
        </span>
    );
}

export function StatusBadge({ status }: { status: Status }) {
    const base = 'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium';
    if (status === 'Active') {
        return (
            <span className={`${base} bg-[#FBE5E5] text-[#d40c23]`}>
                <ReportProblemOutlinedIcon fontSize="inherit" />
                Active
            </span>
        );
    }
    if (status === 'Acknowledged') {
        return (
            <span className={`${base} bg-[#FFF5D6] text-[#8A6B00]`}>
                <AccessTimeIcon fontSize="inherit" />
                Acknowledged
            </span>
        );
    }
    return (
        <span className={`${base} bg-[#E3F3E6] text-[#216E3A]`}>
            <CheckCircleOutlineIcon fontSize="inherit" />
            Closed
        </span>
    );
}
