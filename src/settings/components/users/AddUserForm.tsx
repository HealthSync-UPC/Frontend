import { useState } from 'react';

interface User {
    firstName: string;
    lastName: string;
    position: string;
    email: string;
}

interface AddUserFormProps {
    onAddUser: (user: User) => void;
    onCancel: () => void;
}

export function AddUserForm({ onAddUser, onCancel }: AddUserFormProps) {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        position: '',
        email: '',
        password: '',
    });

    const onChange = (k: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setForm((s) => ({ ...s, [k]: e.target.value }));

    const handleSubmit = () => {
        const { firstName, lastName, position, email, password } = form;
        if (!firstName || !lastName || !position || !email || !password) {
            alert('Complete all fields');
            return;
        }
        
        onAddUser({ firstName, lastName, position, email });
        setForm({ firstName: '', lastName: '', position: '', email: '', password: '' });
        onCancel(); // Close the form after adding
    };

    return (
        <div className="bg-white border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New User</h3>
                <button
                    onClick={onCancel}
                    className="text-[#67737C] hover:text-gray-800 text-xl"
                >
                    ×
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-[#67737C] mb-1">
                        First Name
                    </label>
                    <input
                        placeholder="Enter first name"
                        value={form.firstName}
                        onChange={onChange('firstName')}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00648E] focus:border-transparent"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-[#67737C] mb-1">
                        Last Name
                    </label>
                    <input
                        placeholder="Enter last name"
                        value={form.lastName}
                        onChange={onChange('lastName')}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00648E] focus:border-transparent"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-[#67737C] mb-1">
                        Position
                    </label>
                    <input
                        placeholder="Enter position"
                        value={form.position}
                        onChange={onChange('position')}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00648E] focus:border-transparent"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-[#67737C] mb-1">
                        Email
                    </label>
                    <input
                        placeholder="Enter email"
                        type="email"
                        value={form.email}
                        onChange={onChange('email')}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00648E] focus:border-transparent"
                    />
                </div>
                
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#67737C] mb-1">
                        Password
                    </label>
                    <input
                        placeholder="Enter password"
                        type="password"
                        value={form.password}
                        onChange={onChange('password')}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00648E] focus:border-transparent"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <button
                    onClick={onCancel}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-[#00648E] text-white py-2 px-6 rounded-md hover:bg-[#005273] transition-colors"
                >
                    Add User
                </button>
            </div>
        </div>
    );
}