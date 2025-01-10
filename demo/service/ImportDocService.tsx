import { Eoffice } from '@/types';

export const ImportDocService = {
    async getAllInporExternaltDoc() {
        const res = await fetch('/demo/data/import-external-doc.json', { headers: { 'Cache-Control': 'no-cache' } });
        const d = await res.json();
        return d.data as Eoffice.ImportExternalDocment[];
    },
    async getAllInporInternaltDoc() {
        const res = await fetch('/demo/data/import-internal-doc.json', { headers: { 'Cache-Control': 'no-cache' } });
        const d = await res.json();
        return d.data as Eoffice.ImportInternalDocment[];
    },

    async getHistoryExDoc() {
        const res = await fetch('/demo/data/hisory-export-doc.json', { headers: { 'Cache-Control': 'no-cache' } });
        const d = await res.json();
        return d.data as Eoffice.HistoryViewEXportDoc[];
    },

};
