import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

type Member = {
    id: number;
    initials: string;
    name: string;
    role: string;
    department: string;
};

type Props = {
    open: boolean;
    zoneName: string;
    initialSelectedIds: number[];
    onClose: () => void;
};

const ALL_MEMBERS: Member[] = [
    { id: 1, initials: 'DSJ', name: 'Dr. Sarah Johnson', role: 'Doctor', department: 'Emergency' },
    { id: 2, initials: 'PMC', name: 'Pharmacist Mike Chen', role: 'Pharmacist', department: 'Pharmacy' },
    { id: 3, initials: 'NER', name: 'Nurse Emily Rodriguez', role: 'Nurse', department: 'ICU' },
    { id: 4, initials: 'LIJS', name: 'Lab Tech John Smith', role: 'Lab Technician', department: 'Laboratory' },
    { id: 5, initials: 'DMG', name: 'Dr. Maria Garcia', role: 'Doctor', department: 'Surgery' },
];

export function AssignMembersModal({ open, zoneName, initialSelectedIds, onClose }: Props) {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        if (open) {
            setSelected(initialSelectedIds);
        }
    }, [open, initialSelectedIds]);

    if (!open) return null;

    const filtered = ALL_MEMBERS.filter(
        (m) =>
            m.name.toLowerCase().includes(query.toLowerCase()) ||
            m.role.toLowerCase().includes(query.toLowerCase()) ||
            m.department.toLowerCase().includes(query.toLowerCase())
    );

    const toggleMember = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const clearAll = () => setSelected([]);

    const save = () => {
        console.log('Members saved:', selected);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative max-h-[85vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 shadow-xl">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100"
                >
                    <CloseIcon fontSize="small" />
                </button>

                {/* Title */}
                <h2 className="mb-1 text-xl font-semibold">Assign Members</h2>
                <p className="mb-4 text-sm text-gray-600">
                    Authorize members to access {zoneName}
                </p>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search members..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="mb-4 w-full rounded-md border px-3 py-2"
                />

                {/* Members List */}
                <div className="max-h-[45vh] overflow-y-auto space-y-3 pr-1">
                    {filtered.map((m) => (
                        <div
                            key={m.id}
                            className="flex items-center gap-3 rounded-xl border p-4"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(m.id)}
                                onChange={() => toggleMember(m.id)}
                                className="h-5 w-5"
                            />

                            {/* Avatar circle */}
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-medium">
                                {m.initials}
                            </div>

                            <div>
                                <p className="font-medium">{m.name}</p>
                                <p className="text-sm text-gray-600">
                                    {m.role} • {m.department}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between border-t pt-4">

                    <div className="text-sm text-gray-500">
                        Selected: {selected.length} members
                    </div>

                    <button
                        onClick={clearAll}
                        className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
                    >
                        Clear All
                    </button>
                </div>

                <div className="mt-3 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={save}
                        className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                    >
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    );
}
