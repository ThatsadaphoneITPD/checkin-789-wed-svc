import { create } from 'zustand';
import { initialState } from '@/config/constants-api';
import axiosClient from '@/config/axiosClient';
import { Checkin } from '@/types';


// create interface for the store
type SickLeaveStore = {
    data: Checkin.SickLeave[];
    dataType: Checkin.LeaveType[];
    getSickLeaveData: () => Promise<void>;
    getSickLeavePath: (path?: string, params?: any) => Promise<void>;
    getLeaveTypeData: () => Promise<void>;
    approveSickLeave: (itemAprove: Checkin.ApproveField) => Promise<void>;

};

// create the store
export const useSickLeaveStore = create<SickLeaveStore, []>((set, get) => ({
    ...initialState,
    data: [],
    dataType: [],
    getSickLeaveData: async () => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get('api/LeaveRequest/GetLeaveRequests');
            console.log("SickLeave-data", response)
            set({ ...initialState, success: true, data: Array.isArray(response?.data) && response?.data.length ? response?.data : [] });
        } catch (error) {
            console.error('Error fetching data:', error);
            set({ ...initialState, error: true });
        }
    },
    getSickLeavePath: async (path: string, params: any) => {
        const apiPath = path?.trim() ? path : "GetLeaveRequests";
        set({ ...initialState, loading: true });

        try {
             const queryParams = {};
            if (params?.department_id) queryParams['department_id'] = params.department_id;
            if (params?.division_id) queryParams['division_id'] = params.division_id;

            const response = await axiosClient.get(`api/LeaveRequest/${apiPath}`, {
                params: Object.keys(queryParams).length > 0 ? queryParams : {},
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
    getLeaveTypeData: async () => {
        try {
            const response = await axiosClient.get('api/LeaveType/GetLeaveTypes');
            // console.log("SickLeave-data",response )
            const dataType = Array.isArray(response?.data) && response?.data.length ? response?.data : [];
            set({ dataType });
            // console.log('LeaveType:', dataType);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
    approveSickLeave: async (itemAprove: Checkin.ApproveField) => {
        try {
            // Make API call to update the center on the server
            // console.log("itemAprove", itemAprove)
            const response = await axiosClient.post(`api/LeaveApproval/ApprovalLeaveRequest`, itemAprove);
            // Check if the API call was successful (status code 200)
            if (response.status === 200 || response.status === 201) {
                // console.log('approveSickLeave', response);
                const id = response?.data?.data?.leave_req_id;
                set((state) => ({ data: state.data.map((fw) => fw.leave_req_id === id ? response?.data?.data?.leaveRequest : fw), }));
                return { status: response.status, sms: `ສຳເລັດອະນຸມັດ ເລກທີ ${id}`, approvething: response?.data?.data?.leaveRequest?.status };
            } else {
                console.error('Failed to update center. Status:', response.status);
                return { status: response.status, sms: response?.data?.message };
            }
        } catch (error) {
            console.error('Error updating center:', error);
            return { status: error?.status, sms: error?.message };
        }
    },
}));

