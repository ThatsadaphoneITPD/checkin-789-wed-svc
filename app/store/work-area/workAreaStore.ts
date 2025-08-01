import {create} from 'zustand';
import { initialState } from '@/config/constants-api';
import axiosClient from '@/config/axiosClient';
import { Checkin } from '@/types';


// create interface for the store
type WorkAreaStore = {
    dataworkarea: Checkin.WorkArea[];
    getzWorkAreaData: () => Promise<void>;
    getzWorkAreaByLocationId: (location_id: number) => Promise<void>;
    addWorkArea: (newWorkArea: any) => Promise<void>;
    updateWorkArea: (updatedWorkArea: any, work_area_id: number) => Promise<void>;
    deleteWorkArea: (work_area_id: number) => Promise<void>;
};

// create the store
export const useWorkAreaStore = create<WorkAreaStore, []>((set, get) => ({
    ...initialState,
    dataworkarea: [],
    getzWorkAreaData: async () => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get( '/api/WorkArea/GetAll');
            // console.log("api-data",response )
            set({ ...initialState, success: true, dataworkarea: response.status === 200 ? response.data : [] });
        } catch (error) {
            console.error('Error fetching data:', error);
            set({ ...initialState, error: true });
        }
    },
    getzWorkAreaByLocationId: async (location_id) => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get(`/api/WorkArea/GetAll?location_Id=${location_id}`);
            // console.log("api-data",response )
            set({ ...initialState, success: true, dataworkarea: response.status === 200 ? response.data : [] });
        } catch (error) {
            console.error('Error fetching data:', error);
            set({ ...initialState, error: true });
        }
    },
    addWorkArea: async (newWorkArea) => {
        try {
            // Make API call to add a new center on the server
            const response = await axiosClient.post( '/api/WorkArea/PostWorkArea', newWorkArea);
            // console.log("add", response)
            // Check if the API call was successful (status code 201)
            if (response.status === 200) {
                // Update the local state with the new center
                set((state) => ({ dataworkarea: [...state.dataworkarea, response?.data?.data] }));

                return {status: response.status, sms: `ເພີ່ມສຳເລັດ`, };
            } else {
                console.error('Failed to add center. Status:', response.status);
                return {status: response.status, sms: response?.data?.message };
            }
        } catch (error) {
            console.error('Error adding center:', error);
            return {status: error?.status, sms: error?.message };
        }
    },
    updateWorkArea: async (updatedWorkArea, work_area_id) => {
        try {
            // Make API call to update the center on the server
            const response = await axiosClient.put( `/api/WorkArea/UpdateWorkArea/${work_area_id}`, updatedWorkArea);
            // Check if the API call was successful (status code 200)
            // console.log("update", response)
            if (response.status === 200) {
                // Update the local state with the updated center
                set((state) => ({
                    dataworkarea: state.dataworkarea.map((center) =>
                        center.work_area_id === work_area_id ? response?.data?.data : center
                    ),
                }));
                return {status: response.status, sms: `${response?.data?.message } ${work_area_id}`, };
            } else {
                console.error('Failed to update center. Status:', response.status);
                return {status: response.status, sms: response?.data?.message };
            }
        } catch (error) {
            console.error('Error updating center:', error);
            return {status: error?.status, sms: error?.message };
        }
    },
    deleteWorkArea: async (work_area_id) => {
        try {
            // Make API call to delete the center on the server
            const response = await axiosClient.delete( `/${work_area_id}`);
            // Check if the API call was successful (status code 200)
            if (response.status === 200) {
                // Update the local state by removing the deleted center
                set((state) => ({
                    dataworkarea: state.dataworkarea.filter((center) => center.work_area_id !== work_area_id),
                }));
                return {status: response.status, sms: `ລົບ ${work_area_id} ສຳເລັດ `, };
            } else {
                console.error('Failed to delete center. Status:', response.status);
                return {status: response.status, sms: `ມີປັນຫາໃນການລົບ ${work_area_id}`, };
            }
        } catch (error) {
            console.error('Error deleting center:', error);
            return {status: error?.status, sms: error?.message };
        }
    }
}));

