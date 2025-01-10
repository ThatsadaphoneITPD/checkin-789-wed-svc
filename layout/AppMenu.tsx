'use client';
import React, { useContext, useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';
import WorkplaceIcon from '@/app/components/icons/workplace';
import SkyscraperIcon from '@/app/components/icons/skyscraper';
import DiningIcon from '@/app/components/icons/dining';
import UsersColorIcon from '@/app/components/icons/users-color';
import ApartmentIcon from '@/app/components/icons/apartment';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [currentTime, setCurrentTime] = useState<string>('');

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

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'ການບໍລິຫານ',
            items: [
                {
                    label: 'ພະນັກງານ',
                    icon: 'pi pi-users',
                    to: '/users',
                    slugs: ['/users/external-doc/[viewDetail]','/users/internal-doc/[viewDetail]']
                },
                {
                    label: 'ການຄອບວຽກ',
                    icon: 'pi pi-verified',
                    to: '/aprove',
                },
            ]
        },
        {
            label: 'ລາຍງານ',
            items: [
                {
                    label: 'ການເຂົ້າ-ອອກວຽກ',
                    icon: 'pi pi-arrow-right-arrow-left',
                    to: '/report',
                    slugs: []
                },
            ]
        },
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                {
                    label: 'Icons',
                    icon: 'pi pi-fw pi-briefcase',
                    to: '/uikit/icons'
                },
                // {
                //     label: 'ALL Thing',
                //     icon: 'pi pi-fw pi-user',
                //     items: [
                //         {
                //             label: 'UI Components',
                //             items: [
                //                 { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
                //                 { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
                //                 { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
                //                 { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
                //                 { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
                //                 { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
                //                 { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
                //                 { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
                //                 { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
                //                 { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
                //                 { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
                //                 { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
                //                 { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
                //                 { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
                //                 { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
                //                 { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
                //             ]
                //         },
                //         {
                //             label: 'Prime Blocks',
                //             items: [
                //                 { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
                //                 { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://blocks.primereact.org', target: '_blank' }
                //             ]
                //         },
                //         {
                //             label: 'Utilities',
                //             items: [
                //                 { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
                //                 { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://primeflex.org/', target: '_blank' }
                //             ]
                //         },
                //         {
                //             label: 'Pages',
                //             icon: 'pi pi-fw pi-briefcase',
                //             to: '/pages',
                //             items: [
                //                 {
                //                     label: 'Landing',
                //                     icon: 'pi pi-fw pi-globe',
                //                     to: '/landing'
                //                 },
                //                 {
                //                     label: 'Auth',
                //                     icon: 'pi pi-fw pi-user',
                //                     items: [
                //                         {
                //                             label: 'Login',
                //                             icon: 'pi pi-fw pi-sign-in',
                //                             to: '/auth/login'
                //                         },
                //                         {
                //                             label: 'Error',
                //                             icon: 'pi pi-fw pi-times-circle',
                //                             to: '/auth/error'
                //                         },
                //                         {
                //                             label: 'Access Denied',
                //                             icon: 'pi pi-fw pi-lock',
                //                             to: '/auth/access'
                //                         }
                //                     ]
                //                 },
                //                 {
                //                     label: 'Crud',
                //                     icon: 'pi pi-fw pi-pencil',
                //                     to: '/pages/crud'
                //                 },
                //                 {
                //                     label: 'Timeline',
                //                     icon: 'pi pi-fw pi-calendar',
                //                     to: '/pages/timeline'
                //                 },
                //                 {
                //                     label: 'Not Found',
                //                     icon: 'pi pi-fw pi-exclamation-circle',
                //                     to: '/pages/notfound'
                //                 },
                //                 {
                //                     label: 'Empty',
                //                     icon: 'pi pi-fw pi-circle-off',
                //                     to: '/pages/empty'
                //                 }
                //             ]
                //         },
                //         {
                //             label: 'Hierarchy',
                //             items: [
                //                 {
                //                     label: 'Submenu 1',
                //                     icon: 'pi pi-fw pi-bookmark',
                //                     items: [
                //                         {
                //                             label: 'Submenu 1.1',
                //                             icon: 'pi pi-fw pi-bookmark',
                //                             items: [
                //                                 { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                //                                 { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                //                                 { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                //                             ]
                //                         },
                //                         {
                //                             label: 'Submenu 1.2',
                //                             icon: 'pi pi-fw pi-bookmark',
                //                             items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                //                         }
                //                     ]
                //                 },
                //                 {
                //                     label: 'Submenu 2',
                //                     icon: 'pi pi-fw pi-bookmark',
                //                     items: [
                //                         {
                //                             label: 'Submenu 2.1',
                //                             icon: 'pi pi-fw pi-bookmark',
                //                             items: [
                //                                 { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                //                                 { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                //                             ]
                //                         },
                //                         {
                //                             label: 'Submenu 2.2',
                //                             icon: 'pi pi-fw pi-bookmark',
                //                             items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                //                         }
                //                     ]
                //                 }
                //             ]
                //         },
                //         {
                //             label: 'Get Started',
                //             items: [
                //                 {
                //                     label: 'Documentation',
                //                     icon: 'pi pi-fw pi-question',
                //                     to: '/documentation'
                //                 },
                //                 {
                //                     label: 'Figma',
                //                     url: 'https://www.dropbox.com/scl/fi/bhfwymnk8wu0g5530ceas/sakai-2023.fig?rlkey=u0c8n6xgn44db9t4zkd1brr3l&dl=0',
                //                     icon: 'pi pi-fw pi-pencil',
                //                     target: '_blank'
                //                 },
                //                 {
                //                     label: 'View Source',
                //                     icon: 'pi pi-fw pi-search',
                //                     url: 'https://github.com/primefaces/sakai-react',
                //                     target: '_blank'
                //                 }
                //             ]
                //         }
                //     ]
                // },
            ]
        },
    ];

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
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
                {BroadHelper}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
