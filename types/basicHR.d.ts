import { EventApi, EventInput } from '@fullcalendar/core';
import { number } from 'prop-types';

declare namespace Basics {
    type Unit = {
        id: number
        unit_name: string
        unit_code: string
        unit_status: string
        unit_type: string
        divisionId: number
        officeId: any
        division: Division
        office: Office
    };
    type Office = {
        id: number
        office_name: string
        office_code: string
        office_status: string
        divisionId: number
        division: Division
        units: any[]
    };
     type Division = {
        id: number
        division_name: string
        division_code: string
        division_status: string
        departmentId: number
        department: Department
        units: Unit[]
        offices: Office[]
    };
    type Department = {
        id: number
        department_name: string
        department_code: string
        department_status: string
        divisions: Division[]
    }
}