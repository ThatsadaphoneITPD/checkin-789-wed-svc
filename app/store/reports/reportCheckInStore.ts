import {create} from 'zustand';
import { initialState } from '@/config/constants-api';
import axiosClient from '@/config/axiosClient';
import { Checkin } from '@/types';


// create interface for the store
type reportCheckInStore = {
    loading: boolean;
    emplpyeedata: Checkin.EmployeeReport[];
    monthlydata: Checkin.MonthlyReport[];
    attendance: Checkin.Attendance[];
    getEmployeeReportData: (empCode: string) => Promise<void>;
    getMonthyReportData: (month: string, year: string) => Promise<void>;
    getAttendance: (month: string, year: string) => Promise<void>;
};

// create the store
export const usereportCheckInStore = create<reportCheckInStore, []>((set, get) => ({
    ...initialState,
    emplpyeedata: [],
    monthlydata:[],
    attendance: [],
    getEmployeeReportData: async (empCode: string) => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get(`api/IclockTransaction/GetPunchTimeDaily/${empCode}`);
            // console.log("EmployeeReportk-data",response )
            set({ ...initialState, success: true, emplpyeedata: Array.isArray(response?.data) && response?.data.length ? response?.data : [] });
        } catch (error) {
            console.error('Error fetching data:', error);
            set({ ...initialState, error: true });
        }
    },
    getMonthyReportData: async (month: string, year: string) => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get(`api/IclockTransaction/GetTimeAttendance?month=${month}&year=${year}`);
            // console.log("month-data",response )
            set({ ...initialState, success: true, monthlydata: Array.isArray(response?.data) && response?.data.length ? response?.data : [] });
        } catch (error) {
            console.error('Error fetching data:', error);
            set({ ...initialState, error: true });
        }
    },
    getAttendance: async (month: string, year: string) => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClient.get(`api/SumAttendance/GetTimeAttendance?month=${month}&year=${year}`);
            // console.log("attend-data",response )
            set({ ...initialState, success: true, attendance: Array.isArray(response?.data) && response?.data.length ? response?.data : [] });
        } catch (error) {
            console.error('Error fetching data:', error);
            set({ ...initialState, error: true });
        }
    },
}));

