import { EventApi, EventInput } from '@fullcalendar/core';
import { number } from 'prop-types';

declare namespace Basics {
    type Unit = {
        id: number;
        name: string;
        division: Division;
        officeId: null | number;
    };
    type Office = {
        id: number;
        name: string;
        Unit: Unit;
    };
    type Division = {
        id: number;
        name: string;
        department: Department;
        Office: Office;
    };
    type Department = {
        id: number;
        name: string;
        name_en: string;
        Division: Division;
    }
}