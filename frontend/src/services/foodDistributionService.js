import api from './api';

export const getAllDonations = () => api.get('/admin/donations').then(r => r.data);

export const getDonationRequests = () => api.get('/admin/allocations/requests').then(r => r.data);

export const getAllocationHistory = () => api.get('/admin/allocations/history').then(r => r.data);

export const allocateDonation = (payload) => api.post('/admin/allocations', payload).then(r => r.data);

export const assignDelivery = (payload) => api.post('/deliveries/assign', payload).then(r => r.data);

export const getDelivery = (id) => api.get(`/deliveries/${id}`).then(r => r.data);

export default {
    getAllDonations,
    getDonationRequests,
    getAllocationHistory,
    allocateDonation,
    assignDelivery,
    getDelivery
};
