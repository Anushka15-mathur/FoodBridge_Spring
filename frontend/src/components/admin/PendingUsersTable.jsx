import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import UserRowActions from "./UserRowActions";
import UserStatusBadge from "./UserStatusBadge";
import UserRoleBadge from "./UserRoleBadge";
import PaginationBar from "./PaginationBar";

export default function PendingUsersTable({
  pageData,
  setPageData,
  refreshUsers,
}) {
  return (
    <div className="rounded-xl border bg-card shadow-sm">

      {/* Header */}
      <div className="border-b p-6">

        <h2 className="text-2xl font-bold">
          Pending User Requests
        </h2>

        <p className="mt-1 text-muted-foreground">
          Users waiting for admin approval.
        </p>

        <p className="mt-3 text-sm text-muted-foreground">
          Total Pending Users:{" "}
          <span className="font-semibold text-foreground">
            {pageData.totalElements}
          </span>
        </p>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead className="w-[35%]">
                Full Name
              </TableHead>

              <TableHead>
                Role
              </TableHead>

              <TableHead>
                Status
              </TableHead>

              <TableHead className="text-right">
                Actions
              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {pageData.content.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={4}
                  className="h-32 text-center text-muted-foreground"
                >
                  No pending users found.
                </TableCell>

              </TableRow>

            ) : (

              pageData.content.map((user) => (

                <TableRow
                  key={user.id}
                  className="hover:bg-muted/40 transition-colors"
                >

                  <TableCell className="font-medium">
                    {user.fullName}
                  </TableCell>

                  <TableCell>

                    <UserRoleBadge
                      role={user.role}
                    />

                  </TableCell>

                  <TableCell>

                    <UserStatusBadge
                      status={user.status}
                    />

                  </TableCell>

                  <TableCell className="text-right">

                    <UserRowActions
                      user={user}
                      pageData={pageData}
                      setPageData={setPageData}
                      refreshUsers={refreshUsers}
                    />

                  </TableCell>

                </TableRow>

              ))

            )}

          </TableBody>

        </Table>

      </div>

      {/* Pagination */}

      <PaginationBar
        page={pageData.page}
        totalPages={pageData.totalPages}
        first={pageData.first}
        last={pageData.last}
        onPrevious={() =>
          refreshUsers(pageData.page - 1)
        }
        onNext={() =>
          refreshUsers(pageData.page + 1)
        }
      />

    </div>
  );
}