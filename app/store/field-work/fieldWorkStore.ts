import { create } from 'zustand';
import { initialState } from '@/config/constants-api';
import axiosClient from '@/config/axiosClient';
import { Checkin } from '@/types';


// create interface for the store
type FieldWorkStore = {
    data: Checkin.FieldWork[];
    getFieldWorkData: () => Promise<void>;
    getFieldWorkPath: (path?: string, params?: any) => Promise<void>;
    getFieldWorkByFieldWorkId: (FieldWorkId: number) => Promise<void>;
    getFieldWorkById: (FieldWorkId: number) => any;
    addFieldWork: (newBranch: Checkin.FieldWork) => void;
    updateFieldWork: (updatedBranch: Checkin.FieldWork) => void;
    approveFieldWork: (itemAprove: Checkin.ApproveField) => Promise<void>;
    deleteFieldWork: (FieldWorkId: number) => void;
};

// create the store
export const useFieldWorkStore = create<FieldWorkStore, []>((set, get) => ({
    ...initialState,
    data: [],
    getFieldWorkData: async () => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get('api/FieldWorkRequest/GetFieldWorkRequests');
            // console.log("FieldWork-data",response )
            set({ ...initialState, success: true, data: Array.isArray(response?.data) && response?.data.length ? response?.data : [] });
        } catch (error) {
            console.error('Error fetching data:', error);
            set({ ...initialState, error: true });
        }
    },
    getFieldWorkByFieldWorkId: async (FieldWorkId) => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get('/FieldWork/byFieldWork/' + FieldWorkId);
            set({ ...initialState, success: true, data: response.status === 200 ? response.data : [] });
        } catch (error) {
            console.error('Error fetching data by province ID:', error);
            set({ ...initialState, error: true });
        }
    },
    getFieldWorkPath: async (path: string, params: any) => {
        const apiPath = path?.trim() ? path : "GetFieldWorkRequests";
        set({ ...initialState, loading: true });

        try {
            const response = await axiosClient.get(`api/FieldWorkRequest/${apiPath}`, {
                params: params?.division_id ? { department_id: params?.department_id, division_id: params?.division_id } : {},
            });

            const data = Array.isArray(response?.data) ? response.data : [];

            set({ ...initialState, success: true, data: data.length > 0 ? data : [], });
        } catch (error: any) {
            console.error("❌ Error fetching data:", error);
            // If 404 or any error, treat it as empty data
            const status = error?.response?.status;
            if (status === 404) {
                set({ ...initialState, success: true, data: [], });
            } else {
                set({ ...initialState, error: true, data: [], });
            }
        }
    },
    getFieldWorkById: async (FieldWorkId) => {
        try {
            // Make API call to get center details by ID from the server
            const response = await axiosClient.get(`/FieldWork/byId/${FieldWorkId}`);
            // Check if the API call was successful (status code 200)
            if (response.status === 200) {
                // Return the retrieved news details
                return response.data.data;
            } else {
                console.error('Failed to fetch news details. Status:', response.status);
                return null;
            }
        } catch (error) {
            console.error('Error fetching news details:', error);
            return null;
        }
    },
    addFieldWork: async (newBranch) => {
        try {
            // Make API call to add a new center on the server
            const response = await axiosClient.post('/FieldWork/add', newBranch);
            // Check if the API call was successful (status code 201)
            if (response.status === 200) {
                // Update the local state with the new center
                set((state) => ({ data: [...state.data, response.data] }));
            } else {
                console.error('Failed to add center. Status:', response.status);
            }
        } catch (error) {
            console.error('Error adding center:', error);
        }
    },
    updateFieldWork: async (updatedBranch) => {
        try {
            // Make API call to update the center on the server
            const response = await axiosClient.put(`/FieldWork/update`, updatedBranch);
            // Check if the API call was successful (status code 200)
            if (response.status === 200) {
                // Update the local state with the updated center
                set((state) => ({
                    data: state.data.map((center) =>
                        center.fw_req_id === updatedBranch.fw_req_id ? updatedBranch : center
                    ),
                }));
            } else {
                console.error('Failed to update center. Status:', response.status);
            }
        } catch (error) {
            console.error('Error updating center:', error);
        }
    },
    approveFieldWork: async (itemAprove: Checkin.ApproveField) => {
        try {
            // Make API call to update the center on the server
            // console.log("itemAprove", itemAprove)
            const response = await axiosClient.post(`api/FieldWorkApproval/ApprovalFieldWorkRequest`, itemAprove);
            // Check if the API call was successful (status code 200)
            if (response.status === 200 || response.status === 201) {
                // console.log('approveFieldWork', response);
                const id = response?.data?.data?.fw_req_id;
                set((state) => ({ data: state.data.map((fw) => fw.fw_req_id === id ? response?.data?.data?.fieldWorkRequest : fw), }));
                return { status: response.status, sms: `ສຳເລັດອະນຸມັດ ເລກທີ ${id}`, approvething: response?.data?.data?.fieldWorkRequest?.status };
            } else {
                console.error('Failed to update center. Status:', response.status);
                return { status: response.status, sms: response?.data?.message };
            }
        } catch (error) {
            console.error('Error updating center:', error);
            return { status: error?.status, sms: error?.message };
        }
    },
    deleteFieldWork: async (FieldWorkId) => {
        try {
            // Make API call to delete the center on the server
            const response = await axiosClient.delete(`/FieldWork/del/${FieldWorkId}`);
            // Check if the API call was successful (status code 200)
            if (response.status === 200) {
                // Update the local state by removing the deleted center
                set((state) => ({
                    data: state.data.filter((center) => center.fw_req_id !== FieldWorkId),
                }));
            } else {
                console.error('Failed to delete center. Status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting center:', error);
        }
    }
}));

