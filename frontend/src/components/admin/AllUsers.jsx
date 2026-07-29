import { useEffect, useState } from "react";
import { toast } from "sonner";

import adminService from "../../services/adminService";

import AllUsersTable from "../../components/admin/AllUsersTable";
import UserTableSkeleton from "../../components/admin/UserTableSkeleton";
import EmptyState from "../../components/admin/EmptyState";

export default function AllUsers() {
    const [pageData, setPageData] = useState({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true,
    });

    const [loading, setLoading] = useState(true);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [selectedRole, setSelectedRole] = useState("ALL");

    const [selectedStatus, setSelectedStatus] = useState("ALL");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchKeyword);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchKeyword]);

    const fetchUsers = async (page = 0) => {
        try {
            setLoading(true);

            let response;

            if (debouncedSearch.trim()) {

                response = await adminService.searchUsers(
                    debouncedSearch,
                    page
                );

            } else if (selectedRole !== "ALL") {

                response = await adminService.filterUsersByRole(
                    selectedRole,
                    page
                );

            } else if (selectedStatus !== "ALL") {

                response = await adminService.filterUsersByStatus(
                    selectedStatus,
                    page
                );

            } else {

                response = await adminService.getAllUsers(page);

            }

            setPageData(response);
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to load users."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(0);
    }, [debouncedSearch, selectedRole, selectedStatus]);


    if (loading) {
        return <UserTableSkeleton />;
    }

    if (pageData.content.length === 0) {
        return (
            <EmptyState
                title="No Users Found"
                description="There are currently no registered users."
            />
        );
    }

    return (
        <AllUsersTable
            pageData={pageData}
            setPageData={setPageData}
            refreshUsers={fetchUsers}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
        />
    );
}