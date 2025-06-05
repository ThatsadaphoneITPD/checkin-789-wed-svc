import {create} from 'zustand';
import { initialState } from '@/config/constants-api';
import axiosClient from '@/config/axiosClient';
import { Checkin } from '@/types';


// create interface for the store
type OvertimeStore = {
    data: Checkin.Overtime[];
    getOvertimeData: () => Promise<void>;
    getOvertimeByOvertimeId: (OvertimeId: number) => Promise<void>;
    getOvertimeById: (OvertimeId: number) => any;
    addOvertime: (newBranch: Checkin.Overtime) => void;
    updateOvertime: (updatedBranch: Checkin.Overtime) => void;
    approveOvertime: (itemAprove: Checkin.ApproveOvertime) => Promise<void>;
    deleteOvertime: (OvertimeId: number) => void;
};

// create the store
export const useOvertimeStore = create<OvertimeStore, []>((set, get) => ({
    ...initialState,
    data: [],
    getOvertimeData: async () => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get('api/Overtime/GetOvertimes');
            // console.log("Overtime-data",response )
            set({ ...initialState, success: true, data: Array.isArray(response?.data) && response?.data.length ? response?.data : [] });
        } catch (error) {
            console.error('Error fetching data:', error);
            set({ ...initialState, error: true });
        }
    },
    approveOvertime: async (itemAprove: Checkin.ApproveOvertime) => {
        try {
            // Make API call to update the center on the server
            // console.log("itemAprove", itemAprove)
            const response = await axiosClient.post( `api/OvertimeApproval/ApprovalOvertime`, itemAprove);
            // Check if the API call was successful (status code 200)
            if (response.status === 200 || response.status === 201) {
                console.log('approveOvertime', response);
                const id = response?.data?.data?.otid;
                set((state) => ({data: state?.data.map((outwork) => outwork?.ot_id === id ?  response?.data?.data?.workOutside : outwork ),}));
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

