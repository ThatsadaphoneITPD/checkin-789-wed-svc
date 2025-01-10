/* FullCalendar Types */
import { EventApi, EventInput } from '@fullcalendar/core';

/* Chart.js Types */
import { ChartData, ChartOptions } from 'chart.js';

type InventoryStatus = 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';

type Status = 'DELIVERED' | 'PENDING' | 'RETURNED' | 'CANCELLED';

type Priority = 'NORUSH' | 'NORMAL' | 'URGENT';
type TaskStaus = 'PEND_EVAlUATE' | 'PEND_ACCEPT' | 'OPERATING'| 'AUDIT' | "COMPLETED" ;
type Cooperative = 'owner' | 'viewer' | 'edit';
type ActionStatus = 'new' | 'viewed'| 'assginTo' | 'accept';

declare namespace Eoffice {
    type User = {
        id: number;
        f_name: string;
        l_name: string;
        position: string;
        permission: Array[any];
        image: string;
        status: string;
        inActive: string;
    }
    
    //ProductService
    type ExportDocment = {
        _id: number;
        name: string;
        title: string;
        content: string;
        priority: Priority;
        kind_doc: KINDDC;
        belong_to: Department;
        task_status: TaskStaus;
        arrival_dep_at: Date;
        complete_at: Date;
        created_by: string;
        created_at: Date;
        updated_at: Date;
    };
    type ImportExternalDocment = {
        _id: number;
        ex_code: string;
        name: string;
        title: string;
        content: string;
        priority: Priority;
        kind_doc: KINDDC;
        belong_to: Department;
        task_status: TaskStaus;
        arrival_dep_at: Date;
        complete_at: Date;
        created_by: string;
        created_at: Date;
        updated_at: Date;
    };
    type ImportInternalDocment = {
        _id: number;
        name: string;
        title: string;
        content: string;
        priority: Priority;
        kind_doc: KINDDC;
        belong_to: Department;
        task_status: TaskStaus;
        arrival_dep_at: Date;
        complete_at: Date;
        created_by: string;
        created_at: Date;
        updated_at: Date;
    };
    type ExportInternalDocment = {
        _id: number;
        title: string;
        content: string;
        priority: Priority;
        kind_doc: KINDDC;
        belong_to: Department;
        task_status: TaskStaus;
        arrival_dep_at: Date;
        complete_at: Date;
        created_by: string;
        created_at: Date;
        updated_at: Date;
        destination_to: Destination;
    };
    type ExportExternalDocment = {
        _id: number;
        name: string;
        title: string;
        content: string;
        priority: Priority;
        kind_doc: KINDDC;
        belong_to: Department;
        destination_to: Destination;
        task_status: TaskStaus;
        arrival_dep_at: Date;
        complete_at: Date;
        created_by: string;
        created_at: Date;
        updated_at: Date;
    };
    type MDDocment = {
        _id: number;
        name: string;
        title: string;
        content: string;
        priority: Priority;
        kind_doc: KINDDC;
        belong_to: Department;
        task_status: TaskStaus;
        arrival_dep_at: Date;
        complete_at: Date;
        created_by: string;
        created_at: Date;
        updated_at: Date;
    };
    type File = {
        _id?: number;
        file_name?: string;
        url_path: string;
        size: number;
        created_by: number;
        created_at: Date;
        updated_at: Date;
    };

    type DocFile = {
        _id: number;
        code: string;
        file_name: string;
        kind_doc: KINDDC;
        send_to: ShareUser;
        path_url: string;
        created_at: Date;
        created_by: string;      
        updated_at: Date;
    };

    type Department ={
        id: number;
        d_name: string
    }
    type Destination ={
        id: number;
        c_name: string
    }
    type KINDDC ={
        id: number;
        dc_name: string
    }
    type HistoryViewEXportDoc = {
        id: number;
        ex_doc: number;
        assign_userid: number;
        view_status: boolean;
        action_status: string;
    };
    
    type ShareExportDoc = {
        id: number;
        ex_doc: number;
        sharedUsers: ShareUser[];
    };
    type ShareUser = {
        User: User;
        cooperative: Cooperative;
    }
      
}
