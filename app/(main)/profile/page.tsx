'use client';

import { LayoutContext } from '@/layout/context/layoutcontext';
import React, { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import CreateUserProfile from './edit-profile';

const FroatProfileComponent = (user?: any) => {
    return (
        <div className="float-card flex flex-wrap align-items-center justify-content gap-4">
            <img src={`/layout/images/testProfile.png`} alt="logo" />
            <div className='flex flex-column '>
                <p className="text-l text-900 font-bold">ທ່ານ ສຸກສະຫວັນ ພານທອງ</p>
                <p className="text-s" style={{ color: "#718096" }}>esthera@simmmple.com</p>
            </div>
        </div>
    );
};

const ProfileUser = () => {
    const [lang, setLang] = useState("LA");
    const [user, setUser] = useState({
        empoyee_code: 44476,
        frist_name: "the Rock",
        last_name: "Dude",
        postion: "ວິຊາການ",
        // Department Infomation
        department: "ຝ່າຍບຸຄະລະກອນ",
        division: "ພະແນກ ICT - APP",
        center_service_unit: null,
        unit: null,
        // Contract Info
        tel_phone: 99822455,
        whatapp: 99822455,
        email: "kayeriveren@gmail.com",
        // Deputy
        deputy_one: "10011",
        deputy_two: "10012",
        deputy_three: "10013",
        deputy_four: "10014",

    });
    const [curscreen, setCurscreen] = useState("");
    const { layoutState } = useContext(LayoutContext);
    const isMobileM = useMediaQuery({ query: '(max-width: 375px)' });
    const isMobileL = useMediaQuery({ query: '(max-width: 425px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isLaptop = useMediaQuery({ query: '(max-width: 1024px)' });
    useEffect(() => {
        if (isMobileM) {
            setCurscreen("86%");
            // console.log("Current screen size: Mobile (375px)");
        } else if (isMobileL) {
            setCurscreen("87%");
            // console.log("Current screen size: Mobile (425px)");
        } else if (isTablet) {
            setCurscreen("88%");
            // console.log("Current screen size: Tablet (768px)");
        } else if (isLaptop) {
            setCurscreen("93%");
            // console.log("Current screen size: Laptop (1024px)");
        } else {
            setCurscreen("82%");
            // console.log("Current screen size: Desktop");
        }
    }, [isMobileM, isMobileL, isTablet, isLaptop]);

    return (
        <div className='container-profile'>
            <div className="broad-profile" style={{ width: layoutState.staticMenuDesktopInactive == false && curscreen }}>
                <FroatProfileComponent />
            </div>
            <CreateUserProfile data={user} className="profile-from" />
        </div>
    );
};

export default ProfileUser;
