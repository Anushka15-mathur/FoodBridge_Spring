import { Eye, Check, X } from "lucide-react";

import { Button } from "../ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import ConfirmActionDialog from "./ConfirmActionDialog";

export default function UserActionButtons({
  user,
  refreshUsers,
}) {

  return (

    <div className="flex justify-end gap-2">

      <TooltipProvider>

        <Tooltip>

          <TooltipTrigger asChild>

            <Button
              size="icon"
              variant="outline"
            >
              <Eye size={18} />
            </Button>

          </TooltipTrigger>

          <TooltipContent>
            View Details
          </TooltipContent>

        </Tooltip>

      </TooltipProvider>

      <ConfirmActionDialog
        user={user}
        action="approve"
        refreshUsers={refreshUsers}
      >

        <Button
          size="icon"
          className="bg-green-600 hover:bg-green-700"
        >
          <Check size={18} />
        </Button>

      </ConfirmActionDialog>

      <ConfirmActionDialog
        user={user}
        action="reject"
        refreshUsers={refreshUsers}
      >

        <Button
          size="icon"
          variant="destructive"
        >
          <X size={18} />
        </Button>

      </ConfirmActionDialog>

    </div>

  );

}