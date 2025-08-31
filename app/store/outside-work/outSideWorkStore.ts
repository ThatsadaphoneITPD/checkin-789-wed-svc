import {create} from 'zustand';
import { initialState } from '@/config/constants-api';
import axiosClient from '@/config/axiosClient';
import { Checkin } from '@/types';


// create interface for the store
type OutSideWorkStore = {
    data: Checkin.OutSideWork[];
    getOutSideWorkData: () => Promise<void>;
    getOutSideWorkPath: (path?: string, params?: any) => Promise<void>;
    getOutSideWorkByOutSideWorkId: (OutSideWorkId: number) => Promise<void>;
    getOutSideWorkById: (OutSideWorkId: number) => any;
    addOutSideWork: (newBranch: Checkin.OutSideWork) => void;
    updateOutSideWork: (updatedBranch: Checkin.OutSideWork) => void;
    approveOutSideWork: (itemAprove: Checkin.ApproveOutSideWork) => Promise<void>;
    deleteOutSideWork: (OutSideWorkId: number) => void;
};

// create the store
export const useOutSideWorkStore = create<OutSideWorkStore, []>((set, get) => ({
    ...initialState,
    data: [],
    getOutSideWorkData: async () => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get('api/WorkOutside/GetWorkOutsides');
            // console.log("OutSideWork-data",response )
            set({ ...initialState, success: true, data: Array.isArray(response?.data) && response?.data.length ? response?.data : [] });
        } catch (error) {
            console.error('Error fetching data:', error);
            set({ ...initialState, error: true });
        }
    },
    getOutSideWorkPath: async (path: string, params: any) => {
        const apiPath = path?.trim() ? path : "GetWorkOutsides";
        set({ ...initialState, loading: true });

        try {
            const response = await axiosClient.get(`api/WorkOutside/${apiPath}`, {
                params: params?.division_id ? { department_id: params?.department_id, division_id: params?.division_id } : {},
            });

            const data = Array.isArray(response?.data) ? response.data : [];

            set({ ...initialState, success: true, data: data.length > 0 ? data : [],});
        } catch (error: any) {
            console.error("❌ Error fetching data:", error);
            // If 404 or any error, treat it as empty data
            const status = error?.response?.status;
            if (status === 404) {
                set({ ...initialState, success: true, data: [],});
            } else {
                set({ ...initialState, error: true, data: [],});
            }
        }
    },
    approveOutSideWork: async (itemAprove: Checkin.ApproveOutSideWork) => {
        try {
            // Make API call to update the center on the server
            // console.log("itemAprove", itemAprove)
            const response = await axiosClient.post( `api/WorkOutsideApproval/ApprovalWorkOutside`, itemAprove);
            // Check if the API call was successful (status code 200)
            if (response.status === 200 || response.status === 201) {
                // console.log('approveOutSideWork', response);
                const id = response?.data?.data?.work_out_id;
                set((state) => ({data: state?.data.map((outwork) => outwork?.work_out_id === id ?  response?.data?.data?.workOutside : outwork ),}));
                return {status: response.status, sms: `ສຳເລັດອະນຸມັດ ເລກທີ ${id}`, approvething: response?.data?.data?.workOutside?.status };
            } else {
                console.error('Failed to update center. Status:', response.status);
                return {status: response.status, sms: response?.data?.message };
            }
        } catch (error) {
            console.error('Error updating center:', error);
            return {status: error?.status, sms: error?.message };
        }
    },
}));

