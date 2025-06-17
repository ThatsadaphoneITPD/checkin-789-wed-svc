import { AppMenuItem } from "@/types";
import { defaultsides, devItem, menuItems, sideGroups, adminmenu } from "./menu-role";


export const roleAuthMenu = (role: string) => {
    switch (role) {
        case "Super Admin": return menuItems;
        case "admin": return adminmenu;
        case "User": return sideGroups;
        default: return defaultsides;
    }
}

export const filterMenuItems = (menuItems: AppMenuItem[], users: { role: string; sideGroup: any[] }) => {
    const isSuperAdmin = users.role === "Super Admin"; // Check if the user is a Super Admin
    const isDev = users.role === "Dev"; // Check if the user is a Dev

    // Handle Super Admin Role
    if (isSuperAdmin) {
        const combinedMenu = [...menuItems, ...devItem];
        localStorage.setItem('sideMenu', JSON.stringify(combinedMenu));
        return combinedMenu;
    }

    // Handle Dev Role
    if (isDev) {
        const combinedMenu = [...menuItems, ...devItem];
        localStorage.setItem('sideMenu', JSON.stringify(combinedMenu));
        return combinedMenu;
    }

    const extractSideBarNames = (sideBars: any[]): string[] => {
        return sideBars.flatMap((bar) => [
            bar.side_bar_name, 
            ...(bar.sideBars ? extractSideBarNames(bar.sideBars) : []) // Recursively extract nested sideBars
        ]);
    };

    // Flatten sideBars for easier comparison
    const allowedSideBars = users.sideGroup?.flatMap((group) =>
        group.sideBars ? extractSideBarNames(group.sideBars) : []
    );

    // Recursive function to filter menuItems
    const filterItems = (items: AppMenuItem[]): AppMenuItem[] => {
        if (!Array.isArray(items)) return []; // Ensure items is an array
        return items
            .map((item) => {
                const isAllowed =
                    Array.isArray(allowedSideBars) &&
                    (allowedSideBars.includes(item.label) ||
                        (Array.isArray(item.slugs) && item.slugs.some((slug) =>
                            allowedSideBars.some((barName) =>
                            slug.includes(barName)
                        )
                    )));
    
                const filteredItems = item.items ? filterItems(item.items) : [];
    
                if (isAllowed || filteredItems.length > 0) {
                    return {
                        ...item,
                        items: filteredItems.length > 0 ? filteredItems : undefined,
                    };
                }
                return null;
            })
            .filter(Boolean) as AppMenuItem[];
    };

    // Filter menu items for non-admin/non-super-admin users
    let finalMenuItems = filterItems(menuItems);
    if (!isSuperAdmin && typeof window !== "undefined") {
        localStorage.setItem('sideMenu', JSON.stringify(finalMenuItems)); // Ensure execution only on client-side
    }
    return finalMenuItems;
};

