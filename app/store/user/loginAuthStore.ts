import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

type User = {
    user_id: number;
    department_name: string;
    fullname: string;
    position_name: string;
    username: string;
    role: string;
    department_id: string;
    division_id: string;
    location: string;
};

type Store = {
    authData: User | null; // User data, initially null
    setAuthData: (data: User) => void; // Method to update auth data
    clearAuthData: () => void; // Method to clear auth data
};

export const authenStore = create<Store>()(
    devtools(
        persist(
            (set) => ({
                authData: null,
                setAuthData: (data) => {
                    set(() => ({ authData: data })); // Update auth data with new values
                },
                clearAuthData: () => {
                    set(() => ({
                        authData: null // Clear the state
                    }));
                }
            }),
            { name: 'authStore' } // Persist store with the name 'authStore'
        )
    )
);
