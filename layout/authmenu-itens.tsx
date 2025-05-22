import { AppMenuItem } from "@/types";
import { defaultsides, devItem, menuItems, sideGroups } from "./menu-items";

export const users = {
    username: "user", // Simulated user data
    sideGroup: sideGroups,
};

export const roleAuthMenu = (role: string) => {
    switch (role) {
        case "Super Admin": return menuItems;
        case "Admin": return menuItems;
        case "User": return sideGroups;
        default: return defaultsides;
    }
}

export const filterMenuItems = (menuItems: AppMenuItem[], users: { role: string; sideGroup: any[] }) => {
    const isSuperAdmin = users.role === "Super Admin"; // Check if the user is a Super Admin
    const isAdmin = users.role === "admin"; // Check if the user is an Admin
    const isDev = users.role === "Dev"; // Check if the user is a Dev
    const isUser = users.role === "User"; // Check if the user is a User

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

    // Handle Admin Role
    if (isAdmin) {
        localStorage.setItem('sideMenu', JSON.stringify(menuItems));
        return menuItems;
    }

    // Flatten sideBars for easier comparison
    const allowedSideBars = users.sideGroup?.flatMap((group) =>
        group.sideBars?.map((bar: any) => bar.side_bar_name)
    );

    // Recursive function to filter menuItems
    const filterItems = (items: AppMenuItem[]): AppMenuItem[] => {
        return items
            .map((item) => {
                const isAllowed =
                    allowedSideBars.includes(item.label) ||
                    (item.slugs &&
                        item.slugs.some((slug) =>
                            allowedSideBars.some((barName) => slug.includes(barName))
                        ));

                const filteredItems = item.items ? filterItems(item.items) : [];

                if (isAllowed || filteredItems.length > 0) {
                    const itemCopy = { ...item };
                    if (filteredItems.length > 0) {
                        itemCopy.items = filteredItems; // Only add `items` if valid sub-items exist
                    }
                    return itemCopy;
                }

                return null; // Exclude disallowed items
            })
            .filter(Boolean) as AppMenuItem[]; // Remove null values
    };

    // Filter menu items for non-admin/non-super-admin users
    let finalMenuItems = filterItems(menuItems);
    if (isUser) {
        localStorage.setItem('sideMenu', JSON.stringify(finalMenuItems)); // Client-side only
    }
    return finalMenuItems;
};

