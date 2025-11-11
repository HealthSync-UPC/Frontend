import { useState } from 'react';
import GroupIcon from '@mui/icons-material/Group';
import { Badge, Chip, SectionCard } from '../navbar/ui';


type UserStatus = 'Active' | 'Inactive';
type UserRole = 'Administrator' | 'Supervisor' | 'Operator' | 'Technician';

type UserItem = {
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    status: UserStatus;
};



export function UsersSection() {
    // mock users (como el mock de tu imagen)
    const [users] = useState<UserItem[]>([
        { firstName: 'Dr. John', lastName: 'Smith', email: 'j.smith@hospital.com', role: 'Administrator', status: 'Active' },
        { firstName: 'Nurse Jane', lastName: 'Doe', email: 'j.doe@hospital.com', role: 'Operator', status: 'Active' },
        { firstName: 'Tech Mike', lastName: 'Johnson', email: 'm.johnson@hospital.com', role: 'Technician', status: 'Inactive' },
        { firstName: 'Supervisor Anna', lastName: 'Wilson', email: 'a.wilson@hospital.com', role: 'Supervisor', status: 'Active' },
    ]);



    return (
        <div className="flex flex-col gap-8">
            {/* User Management */}
            <SectionCard>
                <div className="flex items-center gap-2">
                    <GroupIcon fontSize="small" />
                    <p className="text-base sm:text-lg font-semibold">User Management</p>
                </div>
                <p className="text-sm text-[#67737C] mt-1">Manage user accounts, roles, and permissions</p>

                <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                        <p className="font-medium">Active Users</p>
                        <button className="h-9 rounded-md bg-[#1E6B8F] text-white px-4 text-sm hover:bg-[#155972]">Add User</button>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white divide-y">
                        {users.map((u, idx) => (
                            <div key={`${u.email}-${idx}`} className="flex items-center justify-between px-4 py-4">
                                <div className="min-w-0">
                                    <p className="font-medium truncate">{u.firstName} {u.lastName}</p>
                                    <p className="text-sm text-[#67737C] truncate">{u.email}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Badge status={u.status} />
                                    <Chip>{u.role}</Chip>
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
