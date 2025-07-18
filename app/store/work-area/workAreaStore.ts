import {create} from 'zustand';
import { initialState } from '@/config/constants-api';
import axiosClient from '@/config/axiosClient';
import { Basics } from '@/types';


// create interface for the store
type WorkAreaStore = {
    dataworkarea: Basics.WorkArea[];
    getzWorkAreaData: () => Promise<void>;
    addWorkArea: (newWorkArea: Basics.WorkArea) => void;
    updateWorkArea: (updatedWorkArea: Basics.WorkArea) => void;
    deleteWorkArea: (work_area_id: number) => void;
};

// create the store
export const useWorkAreaStore = create<WorkAreaStore, []>((set, get) => ({
    ...initialState,
    dataworkarea: [],
    getzWorkAreaData: async () => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get( '/api/WorkArea/GetAll');
            console.log("api-data",response )
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
            // Check if the API call was successful (status code 201)
            if (response.status === 200) {
                // Update the local state with the new center
                set((state) => ({ dataworkarea: [...state.dataworkarea, response.data] }));
            } else {
                console.error('Failed to add center. Status:', response.status);
            }
        } catch (error) {
            console.error('Error adding center:', error);
        }
    },
    updateWorkArea: async (updatedWorkArea) => {
        try {
            // Make API call to update the center on the server
            const response = await axiosClient.put( `/api/WorkArea/UpdateWorkArea/${updatedWorkArea.work_area_id}`, updatedWorkArea);
            // Check if the API call was successful (status code 200)
            if (response.status === 200) {
                // Update the local state with the updated center
                set((state) => ({
                    dataworkarea: state.dataworkarea.map((center) =>
                        center.work_area_id === updatedWorkArea.work_area_id ? updatedWorkArea : center
                    ),
                }));
            } else {
                console.error('Failed to update center. Status:', response.status);
            }
        } catch (error) {
            console.error('Error updating center:', error);
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
            } else {
                console.error('Failed to delete center. Status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting center:', error);
        }
    }
}));

