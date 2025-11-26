import GroupIcon from '@mui/icons-material/Group';
import { useState } from 'react';
import { Pagination } from '@mui/material';
import { useGlobalStore } from '../../../shared/stores/globalstore';
import { Chip, SectionCard } from '../navbar/ui';
import { AddUserForm } from './AddUserForm';
import { ModalQR } from './ModalQR';

export function UsersSection() {
    const [showAddUser, setShowAddUser] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const { profiles } = useGlobalStore();
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const totalPages = Math.max(1, Math.ceil(profiles.length / pageSize));
    if (page > totalPages) setPage(1);
    const visibleProfiles = profiles.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="flex flex-col gap-8">
            <SectionCard>
                <div className="flex items-center gap-2">
                    <GroupIcon fontSize="small" />
                    <p className="text-base sm:text-lg font-semibold">User Management</p>
                </div>
                <p className="text-sm text-[#67737C] mt-1">Manage user accounts, roles, and permissions</p>

                <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                        <p className="font-medium">Active Users</p>
                        <button
                            className="h-9 rounded-md bg-[#1E6B8F] text-white px-4 text-sm hover:bg-[#155972]"
                            onClick={() => setShowAddUser(true)}
                        >
                            Add User
                        </button>
                    </div>

                    <AddUserForm open={showAddUser} onClose={() => setShowAddUser(false)} />

                    <div className="rounded-xl border border-gray-200 bg-white divide-y">
                        <div className="h-120 flex flex-col gap-5 overflow-y-auto">
                            {visibleProfiles.map((u, idx) => (
                                <div key={`${u.email}-${idx}`} className="flex items-center justify-between px-4 py-4 border-gray-200">
                                    <div className="min-w-0">
                                        <p className="font-medium truncate">{u.firstName} {u.lastName}</p>
                                        <p className="text-sm text-[#67737C] truncate">{u.email}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Chip>{u.position}</Chip>
                                        <button
                                            className="py-1 rounded-md bg-[#1E6B8F] text-white px-4 text-xs hover:bg-[#155972]"
                                            onClick={() => setShowQR(true)}
                                        >
                                            View QR
                                        </button>
                                        <ModalQR open={showQR} onClose={() => setShowQR(false)} qrCode={u.qr} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-3 flex justify-center">
                        <Pagination count={totalPages} page={page} onChange={(_, value) => setPage(value)} />
                    </div>
                </div>
            </SectionCard>
        </div>
    );
}
