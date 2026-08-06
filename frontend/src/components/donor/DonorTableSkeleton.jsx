import { Skeleton } from "../ui/skeleton";

export default function DonorTableSkeleton({
                                               rows = 5,
                                               columns = 6,
                                           }) {

    return (

        <div className="space-y-3 p-6">

            {Array.from({ length: rows }).map((_, rowIndex) => (

                <div
                    key={rowIndex}
                    className="flex items-center gap-4"
                >

                    {Array.from({ length: columns }).map((__, colIndex) => (
                        <Skeleton
                            key={colIndex}
                            className="h-8 flex-1"
                        />
                    ))}

                </div>

            ))}

        </div>
    );
}
