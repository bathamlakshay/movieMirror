import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


function SkeletonCard() {
    return (
        <div>
            <div className="rounded-xl overflow-hidden mb-2 `aspect-[2/3]`">
            <Skeleton height="100%" baseColor="#1f2937" highlightColor="#374151" />
            </div>
            <Skeleton width="80%" baseColor="#1f2937" highlightColor="#374151" />
            <Skeleton width="40%" baseColor="#1f2937" highlightColor="#374151" />
        </div>
    )
}


export default SkeletonCard