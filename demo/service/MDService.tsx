import { Eoffice } from '@/types';

export const MDDocService = {
    async getAllMDDoc() {
        const res = await fetch('/demo/data/md-doc.json', { headers: { 'Cache-Control': 'no-cache' } });
        const d = await res.json();
        return d.data as Eoffice.MDDocment[];
    },

    async getHistoryExDoc() {
        const res = await fetch('/demo/data/hisory-export-doc.json', { headers: { 'Cache-Control': 'no-cache' } });
        const d = await res.json();
        return d.data as Eoffice.HistoryViewEXportDoc[];
    },

};
