import CloseIcon from '@mui/icons-material/Close';
import { Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useZoneStore } from '../../../stores/zone-store';
import { useGlobalStore } from '../../../../shared/stores/globalstore';
import { Member } from '../../../model/member';

type Props = {
    open: boolean;
    onClose: () => void;
};

export function AssignMembersModal({ open, onClose }: Props) {
    const [query, setQuery] = useState('');
    const [original, setOriginal] = useState<number[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const { selectedZone, setSelectedZone, getZoneById } = useZoneStore();
    const { profiles, addMemberToZone, removeMemberFromZone } = useGlobalStore();

    useEffect(() => {
        const assignedMemberIds = profiles.filter(p =>
            selectedZone?.members.some(m => m.id === p.id)
        ).map(p => p.id);

        setOriginal(assignedMemberIds);
        setSelected(assignedMemberIds);
    }, [open]);

    const filteredProfiles = profiles.filter(m =>
        (m.firstName + " " + m.lastName).toLowerCase().includes(query.toLowerCase()) ||
        m.position.toLowerCase().includes(query.toLowerCase())
    );

    const toggle = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const clearAll = () => setSelected([]);

    const handleSave = async () => {
        const added = selected.filter(x => !original.includes(x));
        const removed = original.filter(x => !selected.includes(x));

        if (added.length > 0) {
            for (const memberId of added) {
                const profile = profiles.find(p => p.id === memberId);

                if (profile) {
                    const member = new Member(profile.id, "");
                    await addMemberToZone(selectedZone!, member);
                }
            }
        }

        if (removed.length > 0) {
            for (const memberId of removed) {
                const profile = profiles.find(p => p.id === memberId);

                if (profile) {
                    const member = new Member(profile.id, "");
                    await removeMemberFromZone(selectedZone!, member);
                }
            }
        }

        const updatedZone = await getZoneById(selectedZone!.id);
        setSelectedZone(updatedZone);
        onClose();
    };



    return (
        <Modal open={open} onClose={onClose} className='flex justify-center items-center'>
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
                    Authorize members to access {selectedZone?.name}
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
                    {filteredProfiles.map((m) => (
                        <div
                            key={m.id}
                            className="flex items-center gap-3 rounded-xl border p-4"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(m.id)}
                                onChange={() => toggle(m.id)}
                                className="h-5 w-5"
                            />
                            <div>
                                <p className="font-medium">{m.firstName + " " + m.lastName}</p>
                                <p className="text-sm text-gray-600">{m.position}</p>
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
                        onClick={handleSave}
                        className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                    >
                        Save Changes
                    </button>
                </div>

            </div>
        </Modal>
    );
}
