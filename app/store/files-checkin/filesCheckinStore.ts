import { create } from 'zustand';
import axiosClient from '@/config/axiosClient';

type FileDocStore = {
    fileBlob: Blob | null;
    fileUrl: string | null;
    getFileCheckin: (
        pathFolder: 'LeaveRequest' | 'FieldWorkRequest' | 'Overtime' | 'WorkOutside',
        fileName: string
    ) => Promise<void>;
    getFile: (pathFolder: 'LeaveRequest' | 'FieldWorkRequest' | 'Overtime' | 'WorkOutside', fileName: string) => Promise<Blob | null>;
};

export const useFileCheckStore = create<FileDocStore>((set) => ({
    fileBlob: null,
    fileUrl: "",
    getFile: async (pathFolder: string, fileName: string): Promise<Blob | null> => {
        try {
            const response = await axiosClient.get(`/api/${pathFolder}/GetFile/get/${fileName}`,{ responseType: 'blob' });
            // ✅ Ensures binary data is returned
            // console.log("📄 api-filedoc:", response);
            return response.data; // ✅ Returns file as Blob
        } catch (error) {
            console.error("❌ Error fetching getDocFile document:", error);
            return null;
        }
    },
    getFileCheckin: async (pathFolder, fileName) => {
        try {
            const response = await axiosClient.get(`/api/${pathFolder}/GetFile/get/${fileName}`,{ responseType: 'blob' });
            const blob = response.data as Blob;

            // Check if it's a valid Blob (not an HTML error page or empty file)
            const isValid = blob && blob.size > 0 && blob.type !== 'text/html';

            if (!isValid) {
                set({ fileBlob: null, fileUrl: null });
                return;
            }

            const url = URL.createObjectURL(blob);
            set({ fileBlob: blob, fileUrl: url });
        } catch (error) {
            console.error(`❌ Error fetching file from ${pathFolder}:`, error);
            set({ fileBlob: null, fileUrl: null });
        }
    },
}));
