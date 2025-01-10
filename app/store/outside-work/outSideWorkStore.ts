import {create} from 'zustand';
import { initialState } from '@/config/constants-api';
import axiosClient from '@/config/axiosClient';
import { Checkin } from '@/types';


// create interface for the store
type OutSideWorkStore = {
    data: Checkin.OutSideWork[];
    getOutSideWorkData: () => Promise<void>;
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
    approveOutSideWork: async (itemAprove: Checkin.ApproveOutSideWork) => {
        try {
            // Make API call to update the center on the server
            // console.log("itemAprove", itemAprove)
            const response = await axiosClient.post( `api/WorkOutsideApproval/ApprovalWorkOutside`, itemAprove);
            // Check if the API call was successful (status code 200)
            if (response.status === 200 || response.status === 201) {
                console.log('approveOutSideWork', response);
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

