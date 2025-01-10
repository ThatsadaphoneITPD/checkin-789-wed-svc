/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from 'react-responsive';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Menu } from 'primereact/menu';
import { itemRenderer } from './AppTopItem';
import { Avatar } from 'primereact/avatar';
import authenStore from '@/app/store/user/loginAuthStore';
// import toast from 'react-hot-toast';



const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar, closeProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const openprofile = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const pathname = usePathname();
    const router = useRouter();
    const {authData}= authenStore();

    const [curscreen, setCurscreen] = useState("");

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));
    const handleLogout = () => {
        localStorage.removeItem('token');
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        router.replace('/auth/login');

    };
    const isMobileM = useMediaQuery({ query: '(max-width: 375px)' });
    const isMobileL = useMediaQuery({ query: '(max-width: 425px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isLaptop = useMediaQuery({ query: '(max-width: 1024px)' });
    useEffect(() => {
        if (isMobileM) {
            setCurscreen("#fff");
            // console.log("Current screen size: Mobile (375px)");
        } else if (isMobileL) {
            setCurscreen("#fff");
            // console.log("Current screen size: Mobile (425px)");
        } else if (isTablet) {
            setCurscreen("#fff");
            // console.log("Current screen size: Tablet (768px)");
        } else if (isLaptop) {
            setCurscreen("#fff");
            //console.log("Current screen size: Laptop (1024px)");
        } else {
            setCurscreen("#000");
            // console.log("Current screen size: Desktop");
        }
    }, [isMobileM, isMobileL, isTablet, isLaptop]);

    const css = `
        .p-menu {
            padding: 0 0;
            background: #ffffff;
            color:#2f54eb;
            border: none;
            border-radius: 6px;
            width: 12.5rem;
        }
    `
    const overlaycss = `
       .p-overlaypanel .p-overlaypanel-content {
       padding: 0.5em;
       }
    `

    const items = [
        {
            // command: () => {
            //     toast.error('Item Selected');
            // },
            template: (item: any, options: any) => {
                return (
                    <Link href={"/profile"} passHref className={classNames(options.className, 'w-full p-link flex align-items-center p-2 text-color hover:surface-200 border-noround')}>
                        <Avatar image="/layout/images/testProfile.png" className="mr-2" shape="circle" />
                        <div className="flex flex-column align" style={{color: "#2f54eb"}}>
                            <span className="font-bold">{authData != null ? `${authData?.gender != null ? authData?.gender?.name : ""} ${authData?.firstname} ${authData?.lastname}` : "---"}</span>
                            <span className="text-sm">{authData != null ? authData.positionId : "---"}</span>
                        </div>
                    </Link>
                );
            }
        },
        {
            separator: true
        },
        {
            command: () => handleLogout(),
            label: 'Logout',
            icon: 'pi pi-sign-out',
            link: "",
            backicon: "pi pi-fw pi-user",
            color: "red",
            backiconcolor: "red",
            template: itemRenderer
        }
    ];
    // const color = pathname === "/profile" ? (layoutState.staticMenuDesktopInactive ? 'white' : 'dark'): 'dark';
    const side = pathname === "/profile"? layoutState.staticMenuDesktopInactive == true ? "0" : "16rem" : layoutState.staticMenuDesktopInactive == true ? "0" : "14rem";
    return (
        <div className={pathname == "/profile" ? "layout-topbar-profile" : "layout-topbar-profile"}>
            <button ref={menubuttonRef}  style={{left: side}} type="button" className="p-link layout-menu-button layout-topbar-button"  onClick={onMenuToggle}>
                <i className="pi pi-bars" style={pathname == "/profile" ? { color: layoutState.staticMenuDesktopInactive == true ? "#fff" : curscreen } : {}} />
            </button>
            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" style={pathname == "/profile" ? { color: layoutState.staticMenuDesktopInactive == true ? "#fff" : "#fff" }: {}} />
            </button>
            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button" onClick={(e) => openprofile.current.toggle(e)} >
                    <i className="pi pi-user" style={pathname == "/profile" ? { color: layoutState.staticMenuDesktopInactive == true ? "#fff" : "#fff" } : {}}  ></i>
                    <span>Profile</span>
                </button>
                <OverlayPanel ref={openprofile} >
                    <Menu model={items}  className='w-full'/>
                    <style>{css}</style>
                    <style>{overlaycss}</style>
                </OverlayPanel>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
