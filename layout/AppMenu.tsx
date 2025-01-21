'use client';
import React, { useContext, useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';
import { menuItems } from './menu-items';
import { filterMenuItems, roleAuthMenu } from './authmenu-itens';
import authenStore from '@/app/store/user/loginAuthStore';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [currentTime, setCurrentTime] = useState<string>('');
    // Example usage
    const { authData } = authenStore();
    const users = {
        role: authData?.role,
        sideGroup: roleAuthMenu(authData?.role,)
    }

    const finalmenuItems: AppMenuItem[] = filterMenuItems(menuItems, users);

    // console.log("finalmenuItems", finalmenuItems)

    // Function to format time
    const formatTime = (date: Date) => {
        const hours24 = date?.getHours();
        const minutes = date?.getMinutes();
        const seconds = date?.getSeconds();

        const hours12 = ((hours24 % 12) || 12); // Convert to 12-hour format
        const period = hours24 >= 12 ? 'PM' : 'AM'; // Determine AM/PM
        return `${period} ${hours12?.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds?.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(formatTime(new Date()));
        };

        updateTime(); // Set initial time
        const intervalId = setInterval(updateTime, 1000); // Update time every second

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);



    const BroadHelper = (<div className="broad-contrainer w-full mt-3" style={{ width: "100%", borderRadius: "15px", height: "12rem", background: "#2B7BF4" }}>
        <div className='help-tag'>
            <div className='time-container'>
                <span className='keep-icon'  >
                    <i className='pi pi-question icon-help' />
                </span>
                <div className='timecount'>
                    {currentTime}
                </div>
            </div>
            <h5 className='title'>Need Help?</h5>
            <h6 className='content'>Please contact EDL Office</h6>
            <button className='button-contactus'>Contact Us</button>
        </div>

        <div className='main-cycle cycle-7'>
            <div className='cycle-6'>
                <div className='cycle-5'>
                    <div className='cycle-4'>
                        <div className='cycle-3'>
                            <div className='cycle-2'>
                                <div className='cycle-1'>
                                    <div className='cycle-0' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)

    return (
        <MenuProvider>
            <Link href="/" className="layout-apptopbar layout-topbar-logo">
                <img src={`/layout/images/edl_logo.svg`} width="40px" height="35px" alt="logo" />
                <span style={{ color: "#fff", marginTop: "-0.3rem" }}> CHCEK-IN TIME</span>
            </Link>
            <ul className="layout-menu" >
                {finalmenuItems.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
                {BroadHelper}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
