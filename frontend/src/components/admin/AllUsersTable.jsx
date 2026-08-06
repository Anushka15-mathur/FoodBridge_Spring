import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

import UserRowActions from "./UserRowActions";
import UserStatusBadge from "./UserStatusBadge";
import UserRoleBadge from "./UserRoleBadge";
import PaginationBar from "./PaginationBar";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function AllUsersTable({
    pageData,
    setPageData,
    refreshUsers,
    searchKeyword,
    setSearchKeyword,
    selectedRole,
    setSelectedRole,
    selectedStatus,
    setSelectedStatus,
}) {
    return (
        <div className="rounded-xl border bg-card shadow-sm">

            {/* Header */}
            <div className="border-b p-6">

                <h2 className="text-2xl font-bold">
                    All Users
                </h2>

                <p className="mt-1 text-muted-foreground">
                    Manage all registered users in FoodBridge.
                </p>

                <p className="mt-3 text-sm text-muted-foreground">
                    Total Users:{" "}
                    <span className="font-semibold text-foreground">
                        {pageData.totalElements}
                    </span>
                </p>

            </div>

            <div className="border-b p-6">

                <div className="flex flex-col gap-4 lg:flex-row">

                    {/* Search */}

                    <div className="relative flex-1">

                        <Search
                            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                        />

                        <Input
                            placeholder="Search users..."
                            value={searchKeyword}
                            onChange={(e) =>
                                setSearchKeyword(e.target.value)
                            }
                            className="pl-10"
                        />

                    </div>

                    {/* Role Filter */}

                    <Select
                        value={selectedRole}
                        onValueChange={setSelectedRole}
                    >

                        <SelectTrigger className="w-full lg:w-48">

                            <SelectValue placeholder="Role" />

                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="ALL">
                                All Roles
                            </SelectItem>

                            <SelectItem value="ADMIN">
                                Admin
                            </SelectItem>

                            <SelectItem value="DONOR">
                                Donor
                            </SelectItem>

                            <SelectItem value="NGO">
                                NGO
                            </SelectItem>

                            <SelectItem value="RESTAURANT">
                                Restaurant
                            </SelectItem>

                            <SelectItem value="VOLUNTEER">
                                Volunteer
                            </SelectItem>

                        </SelectContent>

                    </Select>

                    {/* Status Filter */}

                    <Select
                        value={selectedStatus}
                        onValueChange={setSelectedStatus}
                    >

                        <SelectTrigger className="w-full lg:w-48">

                            <SelectValue placeholder="Status" />

                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="ALL">
                                All Status
                            </SelectItem>

                            <SelectItem value="PENDING">
                                Pending
                            </SelectItem>

                            <SelectItem value="APPROVED">
                                Approved
                            </SelectItem>

                            <SelectItem value="REJECTED">
                                Rejected
                            </SelectItem>

                            <SelectItem value="SUSPENDED">
                                Suspended
                            </SelectItem>

                        </SelectContent>

                    </Select>

                </div>

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
                                    No users found.
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
                                        <UserRoleBadge role={user.role} />
                                    </TableCell>

                                    <TableCell>
                                        <UserStatusBadge status={user.status} />
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