import { EDLStucture } from '@/types';

export const HRMSVC = {
    // demo/data/edl-department.json
    // fetch('/demo/data/edl-department.json', { headers: { 'Cache-Control': 'no-cache' } })
    // fetch('https://uat-api.edl.com.la/api_v1/organization-svc/department/get', { headers: { 'Cache-Control': 'no-cache' } })
    getDepartments() {
        return fetch('/demo/data/edl-department.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as EDLStucture.Departments[] );
    },
};
