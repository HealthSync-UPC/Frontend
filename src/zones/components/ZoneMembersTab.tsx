import type { ZoneMember } from './ZoneDetailsModal';

type Props = {
    members: ZoneMember[];
};

export function ZoneMembersTab({ members }: Props) {
    if (members.length === 0) {
        return (
            <div className="p-4 text-sm text-gray-500">
                No members assigned to this zone yet.
            </div>
        );
    }

    return (
        <div className="space-y-4 p-4">
            {members.map((m) => (
                <div
                    key={m.memberId}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E4288] text-xs font-semibold text-white">
                            {m.initials}
                        </div>
                        <div>
                            <p className="font-medium">{m.name}</p>
                            <p className="text-xs text-gray-500">Member ID: {m.memberId}</p>
                        </div>
                    </div>
                    <button className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}
