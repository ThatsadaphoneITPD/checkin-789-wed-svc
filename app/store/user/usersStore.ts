import { create } from 'zustand';
import { initialState } from '@/config/constants-api';
import axiosClient from '@/config/axiosClient';
import { Checkin, Users } from '@/types';
import axiosClientEoffice from '@/config/axiosClientOffice';


// create interface for the store
type UsersStore = {
    success: boolean;
    error: boolean;
    totalCount: number
    page: number
    pageSize: number
    totalPages: number
    loading: boolean;
    dataUser: Checkin.MobileUser[];
    userLogin: Users.UserLogin;
    loginEoffice: (userLogin: any) => Promise<void>;
    loginUser: (userLogin: any) => Promise<void>;
    getUsersData: (params?: { empCode?: string; division_id?: string; department_id?: string; page?: number; pageSize?: number; }) => Promise<void>;
    resetDeviceId: (user_id: number) => Promise<void>;
};

// create the store
export const useUsersStore = create<UsersStore, []>((set, get) => ({
    ...initialState,
    dataUser: [],
    loading: false,
    loginUser: async (userLogin) => {
        try {
            const response = await axiosClient.post('/api/Auth/login', userLogin);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    loginEoffice: async (userLogin) => { 
        try {
            const response = await axiosClientEoffice.post('/api/login', userLogin);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    // Inside useUsersStore definition
    getUsersData: async (params?: {
        empCode?: string;
        division_id?: string;
        department_id?: string;
        page?: number;
        pageSize?: number;
    }) => {
        const {
            empCode = '',
            division_id = '',
            department_id = '',
            page = 1,
            pageSize = 10,
        } = params || {};

        set({ loading: true });

        try {
            // Build query parameters dynamically
            const queryParams: any = {};

            // Priority: If empCode exists, use ONLY empCode (ignore others)
            if (empCode) {
                queryParams.empCode = empCode;
            } else {
                if (division_id) queryParams.division_id = division_id;
                if (department_id) queryParams.department_id = department_id;

                const hasFilters = division_id || department_id;
                if (!hasFilters) {
                    queryParams.page = page;
                    queryParams.pageSize = pageSize;
                }
            }


            const res = await axiosClient.get('api/UserAccount/GetEmployees/filter', {
                params: queryParams,
            });

            const { items, totalCount, totalPages } = res.data || {};

            set({
                dataUser: Array.isArray(items) ? items : [],
                totalCount: totalCount || 0,
                totalPages: totalPages || 0,
                page,
                pageSize,
                loading: false,
            });
        } catch (error) {
            console.error('getUsersData error', error);
            set({ loading: false });
        }
    },
    resetDeviceId: async (user_id: number) => {
        try {
            const response = await axiosClient.put(`api/UserAccount/ResetDeviceID/${user_id}`);

            if (response.status === 200 && response.data?.message === 'Reset Successful!') {
                set((state) => ({
                    dataUser: state.dataUser.map((user) =>
                        user.user_id === user_id ? { ...user, device_id: '' } : user
                    ),
                }));

                return {
                    status: response.status,
                    sms: `${response.data?.message} ${response.data?.fullname} ${response.data?.empCode}`,
                };
            } else {
                return {
                    status: response.status,
                    sms: response?.data?.message
                };
            }
        } catch (error: any) {
            console.error('Error resetting device ID:', error);

            const status = error.response?.status || 500;
            const message = error.response?.data?.message || error.message || 'Unknown error';

            return { status, sms: message };
        }
    },

}));


// getUserByUserId: (UserId: number) => Promise<void>;
// getUserById: (UserId: number) => any;
// addUser: (newUser: Users.User) => void;
// updateUser: (updatedUser: Users.User) => void;
// deleteUser: (UserId: number) => void;


// getUserByUserId: async (UserId) => {
//     set({ ...initialState, loading: true });
//     try {
//         const response = await axiosClient.get('/Users/byUsers/' + UserId);
//         set({ ...initialState, success: true, dataUser: response.status === 200 ? response.data : [] });
//     } catch (error) {
//         console.error('Error fetching data by province ID:', error);
//         set({ ...initialState, error: true });
//     }
// },
// getUserById: async (UserId) => {
//     try {
//         // Make API call to get center details by ID from the server
//         const response = await axiosClient.get(`/Users/byId/${UserId}`);
//         // Check if the API call was successful (status code 200)
//         if (response.status === 200) {
//             // Return the retrieved news details
//             return response.data.data;
//         } else {
//             console.error('Failed to fetch news details. Status:', response.status);
//             return null;
//         }
//     } catch (error) {
//         console.error('Error fetching news details:', error);
//         return null;
//     }
// },
// addUser: async (newUser) => {
//     try {
//         // Make API call to add a new center on the server
//         const response = await axiosClient.post( '/Users/add', newUser);
//         // Check if the API call was successful (status code 201)
//         if (response.status === 200) {
//             // Update the local state with the new center
//             set((state) => ({ dataUser: [...state.dataUser, response.data] }));
//         } else {
//             console.error('Failed to add center. Status:', response.status);
//         }
//     } catch (error) {
//         console.error('Error adding center:', error);
//     }
// },
// updateUser: async (updatedUser) => {
//     try {
//         // Make API call to update the center on the server
//         const response = await axiosClient.put( `/Users/update`, updatedUser);
//         // Check if the API call was successful (status code 200)
//         if (response.status === 200) {
//             // Update the local state with the updated center
//             set((state) => ({
//                 dataUser: state.dataUser.map((center) =>
//                     center.id === updatedUser.id ? updatedUser : center
//                 ),
//             }));
//         } else {
//             console.error('Failed to update center. Status:', response.status);
//         }
//     } catch (error) {
//         console.error('Error updating center:', error);
//     }
// },
// deleteUser: async (UserId) => {
//     try {
//         // Make API call to delete the center on the server
//         const response = await axiosClient.delete( `/Users/del/${UserId}`);
//         // Check if the API call was successful (status code 200)
//         if (response.status === 200) {
//             // Update the local state by removing the deleted center
//             set((state) => ({
//                 dataUser: state.dataUser.filter((center) => center.id !== UserId),
//             }));
//         } else {
//             console.error('Failed to delete center. Status:', response.status);
//         }
//     } catch (error) {
//         console.error('Error deleting center:', error);
//     }
// }