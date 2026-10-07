
import ContentLoader from "react-content-loader";

export default function categorySkeleton() {
    const skeletons = Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="skeleton-item">
            <ContentLoader
                speed={2}
                width={200}
                height={200}
                viewBox="0 0 200 200"
                backgroundColor="#f0f0f0"
                foregroundColor="#ffffff"
            >
                <rect x="61" y="179" rx="3" ry="3" width="85" height="6" />
                <circle cx="104" cy="84" r="84" />
            </ContentLoader>
        </div>
    ));
    return (
        <div>
            {skeletons}
        </div>
    )


}
