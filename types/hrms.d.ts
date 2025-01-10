/* FullCalendar Types */
import { EventApi, EventInput } from '@fullcalendar/core';

/* Chart.js Types */
import { ChartData, ChartOptions } from 'chart.js';

declare namespace EDLStucture {
    interface User {
        id: number;
        f_name: string;
        l_name: string;
        position: string;
        permission: Array[any];
        image: string;
        status: string;
        inActive: string;
    }

    type Departments = {
        department_id: number,
        department_name: string,
        department_code: string,
        department_email: string,
        department_phone: string,
        department_status: string,
        created_by: number,
        created_at: Date,
        updated_at: Date

    };      
}