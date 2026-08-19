

type GridListProps<T> = {
    records: T[];
    renderItem: (record: T) => React.ReactNode;
}
export default function GridList<T,>({ records, renderItem }: GridListProps<T>) {
    const ItemsList = records.length > 0 ?
        records.map((record) => (
            renderItem(record)
        )) : "There is no items to show";

    return (
        <div>
            {ItemsList}
        </div>
    )
}
