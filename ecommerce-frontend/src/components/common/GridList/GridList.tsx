import { LottiesHandler } from "@components/feedback";

type GridListProps<T> = {
    records: T[];
    renderItem: (record: T) => React.ReactNode;
    emptyMessage?: string;
}
export default function GridList<T,>({ records, renderItem, emptyMessage }: GridListProps<T>) {
    const ItemsList = records.length > 0 ?
        records.map((record) => (
            renderItem(record)
        )) : (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <LottiesHandler type="empty" message={emptyMessage || "No records found."} />
            </div>
        );

    return (
        <div>
            {ItemsList}
        </div>
    )
}
