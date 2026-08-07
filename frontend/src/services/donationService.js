import api from "./api";

const donationService = {
    createDonation: async (data) => {
        const response = await api.post("/donations", data);
        return response.data;
    },

    getMyDonations: async () => {
        const response = await api.get("/donations/my");
        return response.data;
    },

    getDonorDashboard: async () => {
        const response = await api.get("/donations/donor-dashboard");
        return response.data;
    },

    getDonationById: async (id) => {
        const response = await api.get(`/donations/${id}`);
        return response.data;
    },

    updateDonation: async (id, data) => {
        const response = await api.put(`/donations/${id}`, data);
        return response.data;
    },

    deleteDonation: async (id) => {
        const response = await api.delete(`/donations/${id}`);
        return response.data;
    },
};

export default donationService;
