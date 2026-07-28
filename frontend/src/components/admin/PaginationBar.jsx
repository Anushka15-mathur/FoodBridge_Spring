import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationBar({
  page,
  totalPages,
  first,
  last,
  onPrevious,
  onNext,
}) {

  if (totalPages <= 1) {
    return null;
  }

  return (

    <div className="flex items-center justify-between border-t px-6 py-4">

      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={first}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>

      <div className="text-sm text-muted-foreground">

        Page{" "}
        <span className="font-semibold text-foreground">
          {page + 1}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-foreground">
          {totalPages}
        </span>

      </div>

      <Button
        variant="outline"
        onClick={onNext}
        disabled={last}
      >
        Next
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>

    </div>

  );

}