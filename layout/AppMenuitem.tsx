/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import React, { useEffect, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MenuContext } from './context/menucontext';
import { AppMenuItemProps } from '@/types';
import { usePathname, useSearchParams } from 'next/navigation';

const AppMenuitem = (props: AppMenuItemProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();  // Initialize useRouter
    const { activeMenu, setActiveMenu } = useContext(MenuContext);
    const item = props.item;
    const key = props.parentKey ? props.parentKey + '-' + props.index : String(props.index);
    const isActiveRoute = item!.to && pathname === item!.to;
    const isActiveDynamicRoute = (item!.slugs && Array.isArray(item!.slugs))
    ? item!.slugs.some(slug => pathname.startsWith(slug.split('[viewDetail]')[0]))
    : item!.slug && pathname.startsWith(item!.slug.split('[viewDetail]')[0]);
    const active = activeMenu === key || activeMenu.startsWith(key + '-');

    const onRouteChange = (url: string) => {
        if (item!.to && item!.to === url) {
            setActiveMenu(key);
        }
    };

    useEffect(() => {
        onRouteChange(pathname);
    }, [pathname, searchParams]);

    const itemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Avoid processing disabled items
        event.preventDefault();
        if (item!.disabled) {
            event.preventDefault();
            return;
        }

        // Execute command if defined
        if (item!.command) {
            item!.command({ originalEvent: event, item: item });
        }

        // Toggle active state
        if (item!.items) {
            setActiveMenu(active ? (props.parentKey as string) : key);
        } else {
            setActiveMenu(key);
            if (item!.to) {
                // Navigate using router
                router.push(item!.to);  // Use router.push to navigate
            }
        }
    };

    const subMenu = item!.items && item!.visible !== false && (
        <CSSTransition timeout={{ enter: 1000, exit: 450 }} classNames="layout-submenu" in={props.root ? true : active} key={item!.label}>
            <ul>
                {item!.items.map((child, i) => {
                    return <AppMenuitem item={child} index={i} className={child.badgeClass} parentKey={key} key={child.label} />;
                })}
            </ul>
        </CSSTransition>
    );

    return (
        <li className={classNames({ 'layout-root-menuitem': props.root, 'active-menuitem': active })}>
            {props.root && item!.visible !== false && <div className="layout-menuitem-root-text">{item!.label}</div>}
            {(!item!.to || item!.items) && item!.visible !== false ? (
                <a href={item!.url} onClick={(e) => itemClick(e)} className={classNames(item!.class, 'p-ripple')} target={item!.target} tabIndex={0}>
                    <div className='menu-container'>
                        <span className={item?.cusicon ? 'keepmenu-cusicon': 'keepmenu-icon'}  >
                            {item?.cusicon ? <i className={classNames('layout-menuitem-icon cusicon-help')}>{item?.cusicon}</i>: <i className={classNames('layout-menuitem-icon icon-help', item!.icon)}></i>}
                        </span>
                    </div>
                    <span className="layout-menuitem-text">{item!.label}</span>
                    {item!.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
                    <Ripple />
                </a>
            ) : null}

            {item!.to && !item!.items && item!.visible !== false ? (
                <Link href={item!.to} replace={item!.replaceUrl} target={item!.target} className={classNames(item!.class, 'p-ripple', { 'active-route': isActiveRoute || isActiveDynamicRoute })} tabIndex={0} onClick={(e) => itemClick(e)}>
                    <div className='menu-container'>
                        <span className={item?.cusicon ? 'keepmenu-cusicon': 'keepmenu-icon'}  >
                            {item?.cusicon ? <i className={classNames('layout-menuitem-icon cusicon-help')}>{item?.cusicon}</i>: <i className={classNames('layout-menuitem-icon icon-help', item!.icon)} ></i>}
                        </span>
                    </div>
                    <span className="layout-menuitem-text">{item!.label}</span>
                    {item!.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
                    <Ripple />
                </Link>
            ) : null}

            {subMenu}
        </li>
    );
};

export default AppMenuitem;
