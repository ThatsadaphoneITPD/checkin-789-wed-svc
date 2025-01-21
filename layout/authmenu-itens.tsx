import { AppMenuItem } from "@/types";
import { defaultsides, devItem, menuItems, sideGroups } from "./menu-items";

export const users = {
    username: "user", // Simulated user data
    sideGroup: sideGroups,
};

export const roleAuthMenu = (role: string) => {
    switch (role) {
        case "Admin": return menuItems;
        case "User": return sideGroups;
        default: return defaultsides;
    }
}

export const filterMenuItems = (menuItems: AppMenuItem[], users: { role: string; sideGroup: any[] }) => {
    const isAdmin = users.role === "Admin"; // Check if the user is an admin
    const isDev = users.role === "Dev"; // Check if the user is dev

    if (isDev) {
        return [...menuItems, ...devItem];
    }
    if (isAdmin) {
        // If the user is admin, return all menu items
        return menuItems;
    }
    // Flatten sideBars for easier comparison
    const allowedSideBars = users.sideGroup?.flatMap((group) =>
        group.sideBars.map((bar: any) => bar.side_bar_name)
    );

    // Recursive function to filter menuItems
    const filterItems = (items: AppMenuItem[]): AppMenuItem[] => {
        return items
            .map((item) => {
                // Check if this item or its slugs match an allowed sideBar
                const isAllowed =
                    allowedSideBars.includes(item.label) ||
                    (item.slugs &&
                        item.slugs.some((slug) =>
                            allowedSideBars.some((barName) =>
                                slug.includes(barName)
                            )
                        ));

                // If the item has nested items, filter them recursively
                const filteredItems = item.items ? filterItems(item.items) : [];

                // Include the item if it's explicitly allowed or has any allowed nested items
                if (isAllowed || filteredItems.length > 0) {
                    // Return the item, but only include `items` if it has any valid sub-items
                    const itemCopy = { ...item };
                    if (filteredItems.length > 0) {
                        itemCopy.items = filteredItems; // Only add `items` if there are valid sub-items
                    }
                    return itemCopy;
                }

                return null; // Exclude items not allowed
            })
            .filter(Boolean) as AppMenuItem[]; // Remove nulls and enforce type
    };

    let finalMenuItems = filterItems(menuItems);

    return finalMenuItems;
};
