import { useGlobalStore } from "../../shared/stores/globalstore";
import { SectionCard } from "./ui";

export function CategoriesTable() {
    const { categories } = useGlobalStore();

    return (
        <SectionCard>
            <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-base">Categories</p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-600 border-b">
                            <th className="py-3 pr-4 font-medium">Name</th>
                            <th className="py-3 pr-4 font-medium">Description</th>
                            <th className="py-3 pr-4 font-medium">Items Count</th>
                            <th className="py-3 pr-4 font-medium">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {categories.map((c) => (
                            <tr key={c.id} className="align-middle">
                                <td className="py-4 pr-4">
                                    <div className="font-medium">{c.name}</div>
                                    <div className="text-xs text-gray-500">{c.id}</div>
                                </td>

                                <td className="py-4 pr-4 text-gray-700">
                                    {c.description || "-"}
                                </td>

                                <td className="py-4 pr-4 font-medium">
                                    {c.items?.length || 0}
                                </td>

                                <td className="py-4 pr-2">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => { }}
                                            className="h-9 rounded-md border border-gray-300 px-4 text-sm hover:bg-gray-50"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => { }}
                                            className="h-9 rounded-md border border-gray-300 px-4 text-sm hover:bg-gray-50"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </SectionCard>
    );
}
