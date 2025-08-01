import {create} from 'zustand';
import { initialState } from '@/config/constants-api';
import axiosClient from '@/config/axiosClient';
import { Basics } from '@/types';


// create interface for the store
type OfficeStore = {
    data: Basics.Office[];
    getOfficeData: () => Promise<void>;
    getOfficeByOfficeId: (OfficeId: number) => Promise<void>;
    getOfficeById: (OfficeId: number) => any;
    addOffice: (newBranch: Basics.Office) => void;
    updateOffice: (updatedBranch: Basics.Office) => void;
    deleteOffice: (OfficeId: number) => void;
};

// create the store
export const useOfficeStore = create<OfficeStore, []>((set, get) => ({
    ...initialState,
    data: [],
    getOfficeData: async () => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get( '/api/offices');
            // console.log("api-data",response )
            set({ ...initialState, success: true, data: response.status === 200 ? response.data : [] });
        } catch (error) {
            console.error('Error fetching data:', error);
            set({ ...initialState, error: true });
        }
    },
    getOfficeByOfficeId: async (OfficeId) => { 
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get('/Office/byOffice/' + OfficeId);
            set({ ...initialState, success: true, data: response.status === 200 ? response.data : [] });
        } catch (error) {
            console.error('Error fetching data by province ID:', error);
            set({ ...initialState, error: true });
        }
    },
    getOfficeById: async (OfficeId) => {
        try {
            // Make API call to get center details by ID from the server
            const response = await axiosClient.get( `/Office/byId/${OfficeId}`);
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
    addOffice: async (newBranch) => {
        try {
            // Make API call to add a new center on the server
            const response = await axiosClient.post( '/Office/add', newBranch);
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
    updateOffice: async (updatedBranch) => {
        try {
            // Make API call to update the center on the server
            const response = await axiosClient.put( `/Office/update`, updatedBranch);
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
    deleteOffice: async (OfficeId) => {
        try {
            // Make API call to delete the center on the server
            const response = await axiosClient.delete( `/Office/del/${OfficeId}`);
            // Check if the API call was successful (status code 200)
            if (response.status === 200) {
                // Update the local state by removing the deleted center
                set((state) => ({
                    data: state.data.filter((center) => center.id !== OfficeId),
                }));
            } else {
                console.error('Failed to delete center. Status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting center:', error);
        }
    }
}));

