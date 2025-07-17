import {create} from 'zustand';
import { initialState } from '@/config/constants-api';
import { Basics } from '@/types';
import axiosClientEoffice from '@/config/axiosClientOffice';


// create interface for the store
type DivisionStore = {
    datadiv: Basics.Division[];
    getDivisionData: () => Promise<void>;
    getDivisionByDepId: (DepId: number) => Promise<void>;
    getDivisionById: (DivId: number) => any;
    addDivision: (newBranch: Basics.Division) => void;
    updateDivision: (updatedBranch: Basics.Division) => void;
    deleteDivision: (DivisionId: number) => void;
};

// create the store
export const useDivisionStore = create<DivisionStore, []>((set, get) => ({
    ...initialState,
    datadiv: [],
    getDivisionData: async () => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClientEoffice.get( '/api/divisions');
            console.log("api-div",response )
            set({ ...initialState, success: true, datadiv: response.status === 200 ? response.data : [] });
        } catch (error) {
            console.error('Error fetching data:', error);
            set({ ...initialState, error: true });
        }
    },
    getDivisionByDepId: async (DepId) => { 
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClientEoffice.get(`/api/divisions?departmentId=${DepId}`);
            console.log('divbyDep', response.data )
            set({ ...initialState, success: true, datadiv: response.status === 200 ? response.data : [] });
        } catch (error) {
            console.error('Error fetching data by province ID:', error);
            set({ ...initialState, error: true });
        }
    },
    getDivisionById: async (DivId) => {
        try {
            // Make API call to get center details by ID from the server
            const response = await axiosClientEoffice.get( `/Division/byId/${DivId}`);
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
            const response = await axiosClientEoffice.post( '/Division/add', newBranch);
            // Check if the API call was successful (status code 201)
            if (response.status === 200) {
                // Update the local state with the new center
                set((state) => ({ datadiv: [...state.datadiv, response.data] }));
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
            const response = await axiosClientEoffice.put( `/Division/update`, updatedBranch);
            // Check if the API call was successful (status code 200)
            if (response.status === 200) {
                // Update the local state with the updated center
                set((state) => ({
                    datadiv: state.datadiv.map((center) =>
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
            const response = await axiosClientEoffice.delete( `/Division/del/${DivisionId}`);
            // Check if the API call was successful (status code 200)
            if (response.status === 200) {
                // Update the local state by removing the deleted center
                set((state) => ({
                    datadiv: state.datadiv.filter((center) => center.id !== DivisionId),
                }));
            } else {
                console.error('Failed to delete center. Status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting center:', error);
        }
    }
}));

