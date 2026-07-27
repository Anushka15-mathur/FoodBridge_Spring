import api from "./api";

const authService = {

    // ---------- AUTH ----------

    register: async (data) => {
        const response = await api.post("/auth/register", data);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post("/auth/login", credentials);
        return response.data;
    },

    logout: async () => {
        return true;
    },

    // ---------- PROFILE ----------

    completeProfile: async (role, data) => {

        switch (role) {

            case "DONOR":
                return (await api.post("/profile/donor", data)).data;

            case "RESTAURANT":
                return (await api.post("/profile/restaurant", data)).data;

            case "NGO":
                return (await api.post("/profile/ngo", data)).data;

            case "VOLUNTEER":
                return (await api.post("/profile/volunteer", data)).data;

            default:
                throw new Error("Invalid role");
        }
    },

    // ---------- PASSWORD ----------

    sendOtp: async (email) => {
        return (await api.post("/auth/forgot-password", { email })).data;
    },

    verifyOtp: async (email, otp) => {
        return (await api.post("/auth/verify-otp", {
            email,
            otp,
        })).data;
    },

    resetPassword: async (email, otp, newPassword) => {
        return (
            await api.post("/auth/reset-password", {
                email,
                otp,
                newPassword,
            })
        ).data;
    }

};

export default authService;