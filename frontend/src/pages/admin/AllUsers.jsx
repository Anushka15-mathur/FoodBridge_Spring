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

  const fetchUsers = async (page = 0) => {

    try {

      setLoading(true);

      const response = await adminService.getAllUsers(page);

      setPageData(response);

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Unable to load users."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchUsers();

  }, []);

  if (loading) {

    return <UserTableSkeleton />;

  }

  if (pageData.content.length === 0) {

    return (

      <EmptyState
        title="No Users"
        description="No users found."
      />

    );

  }

  return (

    <AllUsersTable
      pageData={pageData}
      setPageData={setPageData}
      refreshUsers={fetchUsers}
    />

  );

}