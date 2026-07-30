import api from "./api";

// NOTE: These endpoints do not exist on the backend yet
// (there is no RestaurantController in the backend). They
// are written to follow the same convention as the other
// services (e.g. adminService) so the backend can be built
// to match this contract.
const restaurantService = {

    // GET /api/restaurant/profile
    // Expected response shape:
    // {
    //   restaurantName, licenseNumber, address, city, state,
    //   pincode, logoUrl, fssaiCertificateUrl
    // }
    getProfile: async () => {
        const response = await api.get("/restaurant/profile");
        return response.data;
    },

};

export default restaurantService;
