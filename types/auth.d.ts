import { EventApi, EventInput } from '@fullcalendar/core';
import { number } from 'prop-types';

declare namespace Users {
    type LoginInput = {
        username?: string;
        password?: string;
    };
    type Login = {
        user: UserLogin;
        token: string;
    };
    type UserLogin = {
        id: number;
        code: string;
        boardId: number;
        positionId: number;
        departmentId: number;
        divisionId: number;
        officeId: null;
        unitId: number;
        roleId: number;
        levelId: number;
    }
    type User = {
        id: number;
        username: string;
        password: string;
        firstname: string;
        lastname: string;
        code: string;
        actived: boolean;
        genderId: number;
        tel: string;
        telapp: string;
        email: string;
        userimg: null | string;
        createdAt: string;
        updatedAt: string;
        gender: Gender;
        board: Board;
        position: Position;
        department: Department;
        division: Division;
        office: Office;
        unit: Unit;
        role: Role;
        level: Level;
    }
    type Gender = {
        id: number;
        name: string;
    };
    type Board = {
        id: number;
        name: string;
    };
    type Position = {
        id: number;
        name: string;
    };
    type Department = {
        id: number;
        name: string;
    };
    type Division = {
        id: number;
        name: string;
    };
    type Office = {
        id: number;
        name: string;
    };
    type Unit =  {
        id: number;
        name: string
    };
    type Role = {
        id: number;
        name: string
    };
    type Level = {
        id: number;
        name: string
    }
}