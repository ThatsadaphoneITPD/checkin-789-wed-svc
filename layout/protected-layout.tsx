'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { menuItems, sideGroups } from './menu-items';
import { AppMenuItem } from '@/types';
import { ProgressSpinner } from 'primereact/progressspinner';
import authenStore from '@/app/store/user/loginAuthStore';
import { roleAuthMenu } from './authmenu-itens';
// import { users } from './authmenu-itens';

// Helper: Check if path is public
const isPublicPath = (path: string): boolean => {
    const publicPaths = ['/auth/login', '/auth/unauthorized', '/api'];
    return publicPaths.some((publicPath) => path.startsWith(publicPath));
};

const findMenuItemByPath = (items: AppMenuItem[], path: string): AppMenuItem | null => {
    for (const item of items) {
        // Match the `to` path
        if (item.to === path) return item;

        // Match against `slugs`
        if (item.slugs && item.slugs.some((slug) => path.startsWith(slug))) {
            return item;
        }

        // Recursively check nested items
        if (item.items) {
            const found = findMenuItemByPath(item.items, path);
            if (found) return found;
        }
    }
    return null;
};


// Helper: Check user permissions for a menu item
const checkPermission = (userSideGroups: any[], menuName: string): boolean => {
    const sideMenuString = localStorage.getItem('sideMenu');// Retrieve and parse the sideMenu from localStorage
    if (!sideMenuString) {
        console.error('No sideMenu found in localStorage');
        return false;
    }
    try {
        const sideMenu = JSON.parse(sideMenuString);
        const permissionNames = sideMenu.flatMap((item: any) => {// Flatten the menu to extract all `label` values
            const labels = [item.label];// Include top-level label
            if (item.items) {// Include nested items' labels
                labels.push(...item.items.map((subItem: any) => subItem.label));
            }
            return labels;
        }).filter(Boolean); // Remove undefined values
        return permissionNames.includes(menuName);
    } catch (error) {
        console.error('Error parsing sideMenu from localStorage:', error);
        return false;
    }
};


export default function ProtectedLayout({ children }: { children: React.ReactNode }) {

    const { authData } = authenStore();
    const router = useRouter();
    const pathname = usePathname();

    const users = {
        role: authData?.role,
        sideGroup: roleAuthMenu(authData?.role,)
    }

    useEffect(() => {
        if (isPublicPath(pathname)) return;

        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            return;
        }
        // Redirect to login if not authenticated
        if (!users) {
            router.push('/auth/login');
            return;
        }
        // Admin bypass for all routes
        if (users.role === 'Super Admin') return;

        // Admin bypass for all routes
        if (users.role === 'Admin') return;

        // Check route permissions
        const currentMenuItem = findMenuItemByPath(menuItems, pathname);
        if (currentMenuItem?.label) {
            const hasPermission = checkPermission(users.sideGroup, currentMenuItem.label);
            if (!hasPermission) {
                router.push('/auth/unauthorized');
            }
        }
    }, [pathname, users, router]);

    // Loading state while authentication is being verified
    if (!users && !isPublicPath(pathname)) {
        return <ProgressSpinner />;
    }

    // Render children if all checks pass
    return <>{children}</>;
}
