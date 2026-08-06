import api from "./api";

const volunteerService = {

    getProfile: async () => {
        const response = await api.get("/volunteer/profile");
        return response.data;
    },

    updateProfile: async (data) => {
        const response = await api.put("/volunteer/profile", data);
        return response.data;
    },

    getDashboard: async () => {
        const response = await api.get("/volunteer/dashboard");
        return response.data;
    },

    getDeliveries: async () => {
        const response = await api.get("/volunteer/deliveries");
        return response.data;
    },

    getDeliveryDetails: async (deliveryId) => {
        const response = await api.get(
            `/volunteer/deliveries/${deliveryId}`
        );
        return response.data;
    },

    updateAvailability: async (available) => {
        const response = await api.put(
            "/volunteer/availability",
            { available }
        );
        return response.data;
    },

    markPickup: async (deliveryId) => {
        const response = await api.put(
            `/volunteer/deliveries/${deliveryId}/pickup`
        );
        return response.data;
    },

    markInTransit: async (deliveryId) => {
        const response = await api.put(
            `/volunteer/deliveries/${deliveryId}/transit`
        );
        return response.data;
    },

    markDelivered: async (deliveryId) => {
        const response = await api.put(
            `/volunteer/deliveries/${deliveryId}/delivered`
        );
        return response.data;
    },

    getDeliveryHistory: async () => {
        const response = await api.get("/volunteer/history");
        return response.data;
    },
};

export default volunteerService;