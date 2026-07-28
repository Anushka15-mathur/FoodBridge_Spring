import { Skeleton } from "../ui/skeleton";

export default function UserTableSkeleton() {

    return (

        <div className="space-y-4 p-6">

            <Skeleton className="h-10 w-60" />

            {[1,2,3,4,5].map((row) => (

                <Skeleton
                    key={row}
                    className="h-14 w-full"
                />

            ))}

        </div>

    );

}