import { create } from 'zustand';
import { initialState } from '@/config/constants-api';
import axiosClient from '@/config/axiosClient';
import { Checkin } from '@/types';


// create interface for the store
type CheckinManualStore = {
    manunalEmployee: string;
    getzManualEmps: (EmpCode: string) => Promise<void>;
    clearManualEmps: () => Promise<void>;
    dataCheckinManual: Checkin.CheckinManual[];
    getzCheckinManualData: (EmpCode: string) => Promise<void>;
    addCheckinManaul: (ManaulCheckIn: any) => Promise<void>;
};

// create the store
export const useCheckinManualStore = create<CheckinManualStore, []>((set, get) => ({
    ...initialState,
    manunalEmployee: '',
    dataCheckinManual: [],
    getzManualEmps: async (empCode?: string) => {
        try {
            const res = await axiosClient.get(`api/UserAccount/GetFullname/${empCode}`,);
            console.log("getzManualEmps", res)
            set({ manunalEmployee: res?.data?.fullname });
        } catch (error) {
            console.error('getUsersData error', error);
        }
    },
    clearManualEmps: async () => {
        set({ manunalEmployee: '' });
    },
    getzCheckinManualData: async (EmpCode: string) => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get(`/api/CheckIn/GetByEmpCode/${EmpCode}`);
            console.log("api-CheckinManual", response);
            if (response.status === 200) {
                set({ ...initialState, success: true, dataCheckinManual: response.data || [] });
            } else {
                set({ ...initialState, error: true, dataCheckinManual: [] });
            }
        } catch (error: any) {
            console.error('Error fetching data:', error);
            if (error.response?.status === 404) {
                console.warn('No data found for this EmpCode');
                set({ ...initialState, error: false, success: true, dataCheckinManual: [] });
            } else {
                set({ ...initialState, error: true, dataCheckinManual: [] });
            }
        }
    },
    addCheckinManaul: async (ManaulCheckIn) => {
        try {
            // Make API call to add a new center on the server
            const response = await axiosClient.post('/api/CheckIn/ManaulCheckIn', ManaulCheckIn);
            console.log("add", response)
            // Check if the API call was successful (status code 201)
            if (response.status === 200 || 201) {
                // Update the local state with the new center
                set((state) => ({ dataCheckinManual: [...state.dataCheckinManual, response?.data?.data] }));

                return { status: response.status, sms: `ເພີ່ມສຳເລັດ`, };
            } else {
                console.error('Failed to add center. Status:', response.status);
                return { status: response.status, sms: response?.data?.message };
            }
        } catch (error) {
            console.error('Error adding center:', error);
            return { status: error?.status, sms: error?.message };
        }
    },
}));

