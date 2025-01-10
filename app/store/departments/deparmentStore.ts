import {create} from 'zustand';
import { initialState } from '@/config/constants-api';
import axiosClient from '@/config/axiosClient';
import { Basics } from '@/types';


// create interface for the store
type DepartmentStore = {
    data: Basics.Department[];
    getDepartmentData: () => Promise<void>;
    getDepartmentByDepartmentId: (departmentId: number) => Promise<void>;
    getDepartmentById: (DepartmentId: number) => any;
    addDepartment: (newBranch: Basics.Department) => void;
    updateDepartment: (updatedBranch: Basics.Department) => void;
    deleteDepartment: (DepartmentId: number) => void;
};

// create the store
export const useDepartmentStore = create<DepartmentStore, []>((set, get) => ({
    ...initialState,
    data: [],
    getDepartmentData: async () => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get('/api/departments');
            console.log("api-data",response )
            set({ ...initialState, success: true, data: response.status === 200 ? response.data : [] });
        } catch (error) {
            console.error('Error fetching data:', error);
            set({ ...initialState, error: true });
        }
    },
    getDepartmentByDepatmentId: async (departmentId) => { 
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get('/Department/byDepartment/' + departmentId);
            set({ ...initialState, success: true, data: response.status === 200 ? response.data : [] });
        } catch (error) {
            console.error('Error fetching data by province ID:', error);
            set({ ...initialState, error: true });
        }
    },
    getDepartmentById: async (DepartmentId) => {
        try {
            // Make API call to get center details by ID from the server
            const response = await axiosClient.get(`/Department/byId/${DepartmentId}`);
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
    addDepartment: async (newBranch) => {
        try {
            // Make API call to add a new center on the server
            const response = await axiosClient.post( '/Department/add', newBranch);
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
    updateDepartment: async (updatedBranch) => {
        try {
            // Make API call to update the center on the server
            const response = await axiosClient.put( `/Department/update`, updatedBranch);
            // Check if the API call was successful (status code 200)
            if (response.status === 200) {
                // Update the local state with the updated center
                set((state) => ({
                    data: state.data.map((center) =>
                        center.id === updatedBranch.id ? updatedBranch : center
                    ),
                }));
            } else {
                console.error('Failed to update center. Status:', response.status);
            }
        } catch (error) {
            console.error('Error updating center:', error);
        }
    },
    deleteDepartment: async (DepartmentId) => {
        try {
            // Make API call to delete the center on the server
            const response = await axiosClient.delete( `/Department/del/${DepartmentId}`);
            // Check if the API call was successful (status code 200)
            if (response.status === 200) {
                // Update the local state by removing the deleted center
                set((state) => ({
                    data: state.data.filter((center) => center.id !== DepartmentId),
                }));
            } else {
                console.error('Failed to delete center. Status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting center:', error);
        }
    }
}));

