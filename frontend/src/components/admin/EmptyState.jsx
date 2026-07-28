import { Inbox } from "lucide-react";

export default function EmptyState({
    title,
    description,
}) {

    return (

        <div className="flex h-[60vh] flex-col items-center justify-center">

            <Inbox
                size={60}
                className="mb-4 text-muted-foreground"
            />

            <h2 className="text-2xl font-semibold">
                {title}
            </h2>

            <p className="mt-2 text-muted-foreground">
                {description}
            </p>

        </div>

    );

}