import { EventApi, EventInput } from '@fullcalendar/core';
import { number } from 'prop-types';

declare namespace Checkin {
    type Department = {
        id: number
        department_name: string
        department_code: string
        department_status: string
    };
    type Division = {
        id: number
        division_name: string
        division_code: string
        division_status: string
        departmentId: number
    };
    type Office = {
        id: number
        office_name: string
        office_code: string
        office_status: string
        divisionId: number
    }
    type Unit =  {
        id: number
        unit_name: string
        unit_code: string
        unit_status: string
        unit_type: string
        divisionId: number
        officeId: any
    };
    type MobileUser = {
        id: number
        emp_code: string
        ful_name: string
        status: string
        department: Department
        division: Division
        office: Office
        unit: Unit
    }

    type WorkArea = {
        id: any
        area_name: string
        latitude: number
        longitude: number
        radius_km: number
    }

    type FieldWork = {
        fw_req_id:          number;
        emp_code:           string;
        field_work_type:    string;
        description:        string;
        workplace:          string;
        start_date:         Date;
        end_date:           Date;
        total_days:         number;
        file_path:          string;
        status:             string;
        created_at:         string | null;
        updated_at:         string | null;
        fieldWorkApprovals: null;
    }
    type ApproveField = FormData | {
        fwReq_id:   string;
        approvedBy: string;
        status:     string;
        comments:   string;
    }
    type OutSideWork = {
        work_out_id: number
        emp_code: string
        description: string
        punch_time: string
        latitude: number
        longitude: number
        file_path: string
        status: string
        workOutsideApprovals: any | null
    }
    type ApproveOutSideWork = FormData | {
        workOutId:   string;
        approvedBy: string;
        status:     string;
        comments:   string;
    }
    type SickLeave = {
        leave_req_id: number
        emp_code: string
        leave_type_id: number
        reasons: string
        start_date: string
        end_date: string
        total_days: number
        file_path: string
        status: string
        created_at: string
        updated_at: any
        leaveType: any
        leaveApprovals: any
    }
    type ApproveSickLeave = FormData | {
        leaveReqId:   string;
        approvedBy: string;
        status:     string;
        comments:   string;
    }
    type LeaveType = {
        leave_type_id: number
        leave_type_name: string
        description: string
        max_leave_days: number
        created_at: string
        updated_at: any
        leaveBalances: any
        leaveRequests: any
    }
    
    // ----- Report Check-In -----
    type EmployeeReport = {
        emp_code: string
        punch_date: string
        first_punch: string
        last_punch: string
        late_minutes: number
        early_leave_minutes: number
    }
    type MonthlyReport = {
        empCode: string
        totalLateMinute: number
        totalFingerScanDays: number
        totalLeaveDays: any
    }

    type Overtime = {
        ot_id: number
        emp_code: string
        description: string
        punch_time: string
        latitude: number
        longitude: number
        file_path: string
        status: string
        overtimeApprovals: any
    }

    type ApproveOvertime = FormData | {
        otid:   string;
        approvedBy: string;
        status:     string;
        comments:   string;
    }
}
