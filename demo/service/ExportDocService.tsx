import { Eoffice } from '@/types';

export const ExportDocService = {
    async getAllExportDoc() {
        const res = await fetch('/demo/data/export-doc.json', { headers: { 'Cache-Control': 'no-cache' } });
        const d = await res.json();
        return d.data as Eoffice.ExportDocment[];
    },

    async getHistoryExDoc() {
        const res = await fetch('/demo/data/hisory-export-doc.json', { headers: { 'Cache-Control': 'no-cache' } });
        const d = await res.json();
        return d.data as Eoffice.HistoryViewEXportDoc[];
    },
    async getAllExporExternaltDoc() {
        const res = await fetch('/demo/data/export-external-doc.json', { headers: { 'Cache-Control': 'no-cache' } });
        const d = await res.json();
        return d.data as Eoffice.ImportExternalDocment[];
    },
    async getAllExporInternaltDoc() {
        const res = await fetch('/demo/data/export-internal-doc.json', { headers: { 'Cache-Control': 'no-cache' } });
        const d = await res.json();
        return d.data as Eoffice.ImportInternalDocment[];
    },

};
