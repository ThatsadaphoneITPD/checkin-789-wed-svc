import {create} from 'zustand';
import { initialState } from '@/config/constants-api';
import { Basics } from '@/types';
import axiosClientEoffice from '@/config/axiosClientOffice';


// create interface for the store
type DepartmentStore = {
    datadep: Basics.Department[];
    getDepartmentData: () => Promise<void>;
};

// create the store
export const useDepartmentStore = create<DepartmentStore, []>((set, get) => ({
    ...initialState,
    datadep: [],
    getDepartmentData: async () => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClientEoffice.get('/api/departments');
            console.log("api-eoffice-dep",response )
            set({ ...initialState, success: true, datadep: response.status === 200 ? response.data : [] });
        } catch (error) {
            console.error('Error fetching data:', error);
            set({ ...initialState, error: true });
        }
    },
}));

