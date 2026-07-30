import api from "./api";

// NOTE: These endpoints do not exist on the backend yet
// (the "donation" package only has an entity + repository,
// no controller/service). They are written to follow the
// same convention as the other services (e.g. adminService)
// so the backend can be built to match this contract.
const donationService = {

    // POST /api/donations
    // payload: { foodName, quantity, foodType, expiryTime, pickupAddress, description }
    createDonation: async (data) => {
        const response = await api.post("/donations", data);
        return response.data;
    },

    // GET /api/donations/my
    // Expected response shape: array of donations belonging to the logged-in restaurant
    getMyDonations: async () => {
        const response = await api.get("/donations/my");
        return response.data;
    },

    // GET /api/donations/:id
    getDonationById: async (id) => {
        const response = await api.get(`/donations/${id}`);
        return response.data;
    },

    // PUT /api/donations/:id
    updateDonation: async (id, data) => {
        const response = await api.put(`/donations/${id}`, data);
        return response.data;
    },

    // DELETE /api/donations/:id
    deleteDonation: async (id) => {
        const response = await api.delete(`/donations/${id}`);
        return response.data;
    },

};

export default donationService;
