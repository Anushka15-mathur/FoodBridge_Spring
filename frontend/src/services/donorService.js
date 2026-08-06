import api from "./api";

// Donor module API contract.
// Backend: com.foodbridge.donor.controller.*
// All endpoints require a JWT with ROLE_DONOR and return
// data scoped to the authenticated donor only.
const donorService = {

    // ---------- DASHBOARD ----------

    // GET /api/donor/dashboard
    getDashboard: async () => {
        const response = await api.get("/donor/dashboard");
        return response.data;
    },

    // ---------- FOOD DONATIONS ----------

    getFoodDonations: async (status) => {
        const response = await api.get("/donor/donations/food", {
            params: status ? { status } : undefined,
        });
        return response.data;
    },

    getFoodDonationById: async (id) => {
        const response = await api.get(`/donor/donations/food/${id}`);
        return response.data;
    },

    createFoodDonation: async (data) => {
        const response = await api.post("/donor/donations/food", data);
        return response.data;
    },

    updateFoodDonation: async (id, data) => {
        const response = await api.put(`/donor/donations/food/${id}`, data);
        return response.data;
    },

    deleteFoodDonation: async (id) => {
        const response = await api.delete(`/donor/donations/food/${id}`);
        return response.data;
    },

    // ---------- MONEY DONATIONS ----------

    getMoneyDonations: async (status) => {
        const response = await api.get("/donor/donations/money", {
            params: status ? { status } : undefined,
        });
        return response.data;
    },

    getMoneyDonationById: async (id) => {
        const response = await api.get(`/donor/donations/money/${id}`);
        return response.data;
    },

    createMoneyDonation: async (data) => {
        const response = await api.post("/donor/donations/money", data);
        return response.data;
    },

    updateMoneyDonation: async (id, data) => {
        const response = await api.put(`/donor/donations/money/${id}`, data);
        return response.data;
    },

    deleteMoneyDonation: async (id) => {
        const response = await api.delete(`/donor/donations/money/${id}`);
        return response.data;
    },

    // ---------- CLOTH DONATIONS ----------

    getClothDonations: async (status) => {
        const response = await api.get("/donor/donations/cloth", {
            params: status ? { status } : undefined,
        });
        return response.data;
    },

    getClothDonationById: async (id) => {
        const response = await api.get(`/donor/donations/cloth/${id}`);
        return response.data;
    },

    createClothDonation: async (data) => {
        const response = await api.post("/donor/donations/cloth", data);
        return response.data;
    },

    updateClothDonation: async (id, data) => {
        const response = await api.put(`/donor/donations/cloth/${id}`, data);
        return response.data;
    },

    deleteClothDonation: async (id) => {
        const response = await api.delete(`/donor/donations/cloth/${id}`);
        return response.data;
    },
};

export default donorService;
