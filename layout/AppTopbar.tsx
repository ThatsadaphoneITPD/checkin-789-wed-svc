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
import { authenStore } from '@/app/store';
// import toast from 'react-hot-toast';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const openprofile = useRef<any>(null);
    const topbarmenubuttonRef = useRef(null);
    const pathname = usePathname();
    const router = useRouter();
    const { authData } = authenStore();

    const [curscreen, setCurscreen] = useState("");
    const [sidebarWidth, setSidebarWidth] = useState("16rem");
    const [mounted, setMounted] = useState(false);

    // ✅ Prevent hydration mismatch
    useEffect(() => setMounted(true), []);

    // Media query hooks
    const isMobile = useMediaQuery({ query: '(max-width: 425px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isLaptop = useMediaQuery({ query: '(max-width: 1024px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('eoffice_token');
        localStorage.removeItem('eoffice_token');
        localStorage.removeItem('authStore');
        localStorage.removeItem('sideMenu');
        // localStorage.removeItem('ally-supports-cache');
        document.cookie = 'token=; eoffice_token=; authStore=; sideMenu=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        router.replace('/auth/login');

    };
    useEffect(() => {
        if (!mounted) return;

        let width = "16rem";
        if (isMobile || isTablet) {
            width = "0";
            setCurscreen("#2f54eb");
        } else if (isLaptop) {
            width = pathname === "/profile" ? "14rem" : "12rem";
            setCurscreen("#2f54eb");
        } else if (isDesktop) {
            width = pathname === "/profile" ? "16rem" : "14rem";
            setCurscreen("#2f54eb");
        }
        setSidebarWidth(width);
    }, [mounted, isMobile, isTablet, isLaptop, isDesktop, pathname]);

    // ✅ Button position logic
    const getButtonPosition = () => {
        if (!mounted) return "16rem"; // SSR default to avoid mismatch

        if (layoutState.staticMenuDesktopInactive) {
            return "0";
        }
        if (isMobile || isTablet) {
            return layoutState.staticMenuMobileActive ? sidebarWidth : "0";
        }
        return sidebarWidth;
    };

    const buttonPosition = getButtonPosition();

    const css = `
        .p-menu {
            padding: 0 0;
            background: #ffffff;
            color:#2f54eb;
            border: none;
            border-radius: 6px;
            width: 12.5rem;
        }
        @media (max-width: 768px) {
            .layout-menu-button {
                left: 0 !important;
                position: fixed;
                z-index: 999;
            }
        }
        @media (min-width: 769px) {
            .layout-menu-button {
                transition: left 0.3s ease;
            }
        }
    `;

    const overlaycss = `
       .p-overlaypanel .p-overlaypanel-content {
           padding: 0.5em;
       }
    `;

    const items = [
        {
            template: (item: any, options: any) => (
                <Link
                    href={"/profile"}
                    passHref
                    className={classNames(options.className, 'w-full p-link flex align-items-center p-2 text-color hover:surface-200 border-noround')}
                >
                    <Avatar image="/layout/images/DataWarehouse.svg" className="mr-2" shape="circle" />
                    <div className="flex flex-column align" style={{ color: "#2f54eb" }}>
                        <span className="font-bold">{authData != null ? `${authData?.fullname != null ? authData?.fullname : ""}` : "---"}</span>
                        <span className="text-sm">{authData != null ? authData.position_name : "---"} {authData != null ? `[${authData.role}]` : ""}</span>
                    </div>
                </Link>
            )
        },
        { separator: true },
        {
            command: () => handleLogout(),
            label: 'Logout',
            icon: 'pi pi-sign-out',
            template: itemRenderer
        }
    ];
    return (
        <div className="layout-topbar-profile">
            <button
                ref={menubuttonRef}
                style={{
                    left: buttonPosition,
                    transition: 'left 0.3s ease'
                }}
                type="button"
                className="p-link layout-menu-button layout-topbar-button"
                onClick={onMenuToggle}
            >
                <i className="pi pi-bars" />
            </button>

            <button
                ref={topbarmenubuttonRef}
                type="button"
                className="p-link layout-topbar-menu-button layout-topbar-button"
                onClick={showProfileSidebar}
            >
                <i className="pi pi-ellipsis-v" />
            </button>

            <div
                ref={topbarmenuRef}
                className={classNames('layout-topbar-menu', {
                    'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible
                })}
            >
                <button
                    type="button"
                    className="p-link layout-topbar-button"
                    onClick={(e) => openprofile.current.toggle(e)}
                >
                    <i className="pi pi-user" />
                    <span>Profile</span>
                </button>

                <OverlayPanel ref={openprofile}>
                    <Menu model={items} className="w-full" />
                    <style>{css}</style>
                    <style>{overlaycss}</style>
                </OverlayPanel>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;