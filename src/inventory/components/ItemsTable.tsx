import type { Filters } from "../components/FiltersCard";
import { ItemsCard } from "../components/ItemsCard";
import { SummaryCards } from "../components/SummaryCards";
import { FiltersCard } from "../components/FiltersCard";

interface Props {
    filters: Filters;
    setFilters: (v: Filters) => void;
}

export function ItemsTable({ filters, setFilters }: Props) {
    return (
        <>
            <SummaryCards />
            <FiltersCard filters={filters} onChange={setFilters} />
            <ItemsCard filters={filters} />
        </>
    );
}
