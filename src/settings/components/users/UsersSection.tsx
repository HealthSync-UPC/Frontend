import GroupIcon from '@mui/icons-material/Group';
import { useState } from 'react';
import { useGlobalStore } from '../../../shared/stores/globalstore';
import { Chip, SectionCard } from '../navbar/ui';
import { AddUserForm } from './AddUserForm';

export function UsersSection() {
    const [showAddUser, setShowAddUser] = useState(false);
    const { profiles } = useGlobalStore();

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
                        {profiles.map((u, idx) => (
                            <div key={`${u.email}-${idx}`} className="flex items-center justify-between px-4 py-4">
                                <div className="min-w-0">
                                    <p className="font-medium truncate">{u.firstName} {u.lastName}</p>
                                    <p className="text-sm text-[#67737C] truncate">{u.email}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/*      <Badge status={u} /> */}
                                    <Chip>{u.position}</Chip>
                                    <button className="h-8 rounded-md border border-gray-300 px-3 text-sm hover:bg-gray-50">Edit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionCard>
        </div>
    );
}
