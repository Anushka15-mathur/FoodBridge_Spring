import api from "./api";

const profileService = {

    completeRestaurant: async (formData) => {

        const response = await api.post(
            "/profile/restaurant",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    },

    completeNgo: async (formData) => {

        const response = await api.post(
            "/profile/ngo",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    },

    completeVolunteer: async (formData) => {

        const response = await api.post(
            "/profile/volunteer",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    },

    completeDonor: async (formData) => {

        const response = await api.post(
            "/profile/donor",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    }

};

export default profileService;