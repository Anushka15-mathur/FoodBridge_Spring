import { useEffect, useState } from "react";
import { toast } from "sonner";

import adminService from "../../services/adminService";

import PendingUsersTable from "../../components/admin/PendingUsersTable";
import UserTableSkeleton from "../../components/admin/UserTableSkeleton";
import EmptyState from "../../components/admin/EmptyState";

export default function PendingUsers() {

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

  const fetchPendingUsers = async (page = 0) => {

    try {

      setLoading(true);

      const response = await adminService.getPendingUsers(page);

      setPageData(response);

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Unable to load pending users."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchPendingUsers();

  }, []);

  if (loading) {
    return <UserTableSkeleton />;
  }

  if (pageData.content.length === 0) {
    return (
      <EmptyState
        title="No Pending Users"
        description="Every registration request has been processed."
      />
    );
  }

  return (
    <PendingUsersTable
      pageData={pageData}
      setPageData={setPageData}
      refreshUsers={fetchPendingUsers}
    />
  );
}