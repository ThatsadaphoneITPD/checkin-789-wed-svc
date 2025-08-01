import {create} from 'zustand';
import { initialState } from '@/config/constants-api';
import axiosClient from '@/config/axiosClient';
import { Checkin } from '@/types';


// create interface for the store
type LocationStore = {
    dataLocation: Checkin.Location[];
    getzLocationData: () => Promise<void>;
};

// create the store
export const useLocationStore = create<LocationStore, []>((set, get) => ({
    ...initialState,
    dataLocation: [],
    getzLocationData: async () => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get( '/api/Location/GetAll');
            // console.log("api-location",response )
            set({ ...initialState, success: true, dataLocation: response.status === 200 ? response.data : [] });
        } catch (error) {
            console.error('Error fetching data:', error);
            set({ ...initialState, error: true });
        }
    },
}));

