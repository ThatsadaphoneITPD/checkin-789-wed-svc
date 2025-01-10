import {create} from 'zustand';
import { initialState } from '@/config/constants-api';
import axiosClient from '@/config/axiosClient';
import { Basics } from '@/types';


// create interface for the store
type DivisionStore = {
    data: Basics.Division[];
    getDivisionData: () => Promise<void>;
    getDivisionByDepatmentId: (DivisionId: number) => Promise<void>;
    getDivisionById: (DivisionId: number) => any;
    addDivision: (newBranch: Basics.Division) => void;
    updateDivision: (updatedBranch: Basics.Division) => void;
    deleteDivision: (DivisionId: number) => void;
};

// create the store
export const useDivisionStore = create<DivisionStore, []>((set, get) => ({
    ...initialState,
    data: [],
    getDivisionData: async () => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get( '/api/divisions');
            console.log("api-data",response )
            set({ ...initialState, success: true, data: response.status === 200 ? response.data : [] });
        } catch (error) {
            console.error('Error fetching data:', error);
            set({ ...initialState, error: true });
        }
    },
    getDivisionByDivisionId: async (DivisionId) => { 
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get('/Division/byDivision/' + DivisionId);
            set({ ...initialState, success: true, data: response.status === 200 ? response.data : [] });
        } catch (error) {
            console.error('Error fetching data by province ID:', error);
            set({ ...initialState, error: true });
        }
    },
    getDivisionById: async (DivisionId) => {
        try {
            // Make API call to get center details by ID from the server
            const response = await axiosClient.get( `/Division/byId/${DivisionId}`);
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
    addDivision: async (newBranch) => {
        try {
            // Make API call to add a new center on the server
            const response = await axiosClient.post( '/Division/add', newBranch);
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
    updateDivision: async (updatedBranch) => {
        try {
            // Make API call to update the center on the server
            const response = await axiosClient.put( `/Division/update`, updatedBranch);
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
    deleteDivision: async (DivisionId) => {
        try {
            // Make API call to delete the center on the server
            const response = await axiosClient.delete( `/Division/del/${DivisionId}`);
            // Check if the API call was successful (status code 200)
            if (response.status === 200) {
                // Update the local state by removing the deleted center
                set((state) => ({
                    data: state.data.filter((center) => center.id !== DivisionId),
                }));
            } else {
                console.error('Failed to delete center. Status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting center:', error);
        }
    }
}));

