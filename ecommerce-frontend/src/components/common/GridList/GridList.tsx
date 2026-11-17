import { LottiesHandler } from "@components/feedback";
import styles from "./gridList.module.css";

type GridListProps<T> = {
    records: T[];
    renderItem: (record: T) => React.ReactNode;
    emptyMessage?: string;
};

export default function GridList<T>({
    records,
    renderItem,
    emptyMessage,
}: GridListProps<T>) {
    const isEmpty = records.length === 0;

    if (isEmpty) {
        return (
            <div className={styles.grid__empty}>
                <LottiesHandler
                    type="empty"
                    message={emptyMessage || "No records found."}
                />
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {records.map((record, idx) => (
                <div className={styles.grid__item} key={idx}>
                    {renderItem(record)}
                </div>
            ))}
        </div>
    );
}