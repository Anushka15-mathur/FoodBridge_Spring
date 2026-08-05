import api from "./api";

const ngoService = {

  getDashboard: async () => {
    const response = await api.get("/ngo/dashboard");
    return response.data;
  },

  getAvailableDonations: async () => {
    const response = await api.get("/ngo/donations");
    return response.data;
  },

  getDonationDetails: async (id) => {
    const response = await api.get(`/ngo/donations/${id}`);
    return response.data;
  },

  getMyRequests: async () => {
    const response = await api.get("/ngo/requests");
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/ngo/profile");
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put("/ngo/profile", data);
    return response.data;
  },

  requestDonation: async (id, data) => {
    const response = await api.post(
      `/ngo/donations/${id}/request`,
      data
    );
    return response.data;
  },

  cancelRequest: async (id) => {
    const response = await api.put(
      `/ngo/requests/${id}/cancel`
    );
    return response.data;
  },

};

export default ngoService;