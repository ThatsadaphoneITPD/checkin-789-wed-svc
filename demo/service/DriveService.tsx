import { Eoffice } from '@/types';

export const DriveService = {
    async getAllDriveFile() {
        const res = await fetch('/demo/data/drive-doc.json', { headers: { 'Cache-Control': 'no-cache' } });
        const d = await res.json();
        return d.data as Eoffice.File[];
    },
};
