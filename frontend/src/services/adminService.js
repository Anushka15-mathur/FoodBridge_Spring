import api from "./api";

const adminService = {

  // Dashboard
  getDashboard: async () => {
    const response = await api.get("/admin/dashboard");
    return response.data;
  },

  // Users
  getAllUsers: async (
    page = 0,
    size = 10,
    sortBy = "id",
    direction = "asc"
  ) => {

    const response = await api.get("/admin/users", {
      params: {
        page,
        size,
        sortBy,
        direction,
      },
    });

    return response.data;
  },

  getPendingUsers: async (
    page = 0,
    size = 10,
    sortBy = "id",
    direction = "asc"
  ) => {

    const response = await api.get("/admin/users/pending", {
      params: {
        page,
        size,
        sortBy,
        direction,
      },
    });

    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  approveUser: async (id) => {
  const response = await api.put(`/admin/users/${id}/approve`);
  return response.data;
},

rejectUser: async (id) => {
  const response = await api.put(`/admin/users/${id}/reject`);
  return response.data;
},

suspendUser: async (id) => {
  const response = await api.put(`/admin/users/${id}/suspend`);
  return response.data;
},

  searchUsers: async (
    keyword,
    page = 0,
    size = 10
  ) => {

    const response = await api.get("/admin/users/search", {
      params: {
        keyword,
        page,
        size,
      },
    });

    return response.data;
  },

  filterUsersByRole: async (
    role,
    page = 0,
    size = 10
  ) => {

    const response = await api.get("/admin/users/filter/role", {
      params: {
        role,
        page,
        size,
      },
    });

    return response.data;
  },

  filterUsersByStatus: async (
    status,
    page = 0,
    size = 10
  ) => {

    const response = await api.get("/admin/users/filter/status", {
      params: {
        status,
        page,
        size,
      },
    });

    return response.data;
  },

};

export default adminService;