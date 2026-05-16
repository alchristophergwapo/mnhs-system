import { useAppSelector } from "@store/hooks";
import { selectAllNavigation } from "../store/navigationSlice";
import { useMemo } from "react";
import NavigationHelper from "@utils/navigationHelper";

/**
 * Custom hook for managing navigation state in the application.
 * This hook retrieves the flat list of navigation items from the Redux store and computes both the navigation tree and the flattened navigation list.
 */
export default function useNavigation() {
    const navigationList = useAppSelector(selectAllNavigation)

    /**
     * The navigation tree is derived from the flat navigation list in the Redux store. 
     * The unflattenNavigationItems function is used to convert the flat list of navigation items into a hierarchical tree structure based on parent-child relationships. 
     * This allows for easier rendering of nested navigation menus in the UI. 
     * The useMemo hook is used to memoize the computed navigation tree, so it will only be recalculated when the navigationList changes, 
     * improving performance by avoiding unnecessary computations on every render.
     */
    const navigationTree = useMemo(() => {
        const _unflattenedNavigation = NavigationHelper.unflattenNavigationItems(navigationList);

        return _unflattenedNavigation;
    }, [navigationList]);

    /**
     * The flattenedNavigation is derived from the navigation tree using the flattenNavigationItems function.
     */
    const flattenedNavigation = useMemo(() => {
        return NavigationHelper.flattenNavigationItems(navigationTree);
    }, [navigationTree]);

    /**
     * The hook returns both the navigation tree and the flattened navigation list, which can be used in different parts of the application depending on the requirements. 
     * The navigation tree is useful for rendering nested navigation menus, while the flattened navigation list can be used for operations that require a flat structure, 
     * such as searching or filtering navigation items.
     */
    return {
        navigationTree,
        flattenedNavigation
    }
}
