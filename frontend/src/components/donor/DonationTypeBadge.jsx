import { Badge } from "../ui/badge";

const typeStyles = {

    FOOD:
        "bg-emerald-100 text-emerald-700 border-emerald-300",

    MONEY:
        "bg-violet-100 text-violet-700 border-violet-300",

    CLOTHES:
        "bg-sky-100 text-sky-700 border-sky-300",

};

const typeLabels = {
    FOOD: "Food",
    MONEY: "Money",
    CLOTHES: "Clothes",
};

export default function DonationTypeBadge({ type }) {

    return (

        <Badge
            variant="outline"
            className={
                typeStyles[type] ??
                "bg-gray-100 text-gray-700 border-gray-300"
            }
        >
            {typeLabels[type] ?? type}
        </Badge>

    );

}
