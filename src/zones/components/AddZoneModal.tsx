import type { MouseEvent } from 'react';
import { AddZoneForm } from './AddZoneForm';

type Props = {
    open: boolean;
    onClose: () => void;
};

export function AddZoneModal({ open, onClose }: Props) {
    if (!open) return null;

    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={handleBackdropClick}
        >
            <AddZoneForm onCancel={onClose} />
        </div>
    );
}
