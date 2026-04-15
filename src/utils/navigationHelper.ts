import {
  FlatNavigationItemType,
  NavigationItemType,
} from "../layout/components/navigation/types/NavigationItemType";

export default class NavigationHelper {
  /**
   * Takes a hierarchical array of navigation items and returns a flattened array of navigation items.
   * If an item has a parent (i.e. its order string contains a hyphen), it is added to its parent's children array.
   * If it does not have a parent, it is added to the root navigation items array.
   * @param {NavigationItemType[]} navigationItems - A hierarchical array of navigation items.
   * @param {string} order - The order string to use when flattening the navigation items.
   * @returns {FlatNavigationItemType[]} - A flattened array of navigation items.
   */
  static flattenNavigationItems(
    navigationItems: NavigationItemType[],
    order: string = "",
  ): FlatNavigationItemType[] {
    if (!navigationItems) {
      return [];
    }
    // Implementation for flattening navigation items
    return navigationItems.flatMap((navigationItem, index) => {
      const currentOrder = order ? `${order}-${index + 1}` : `${index + 1}`;
      let flattendItem: FlatNavigationItemType[] = [
        {
          ...navigationItem,
          order: currentOrder,
          children: navigationItem.children?.map((child) => child.id),
        },
      ];

      if (navigationItem.children && navigationItem.children.length > 0) {
        flattendItem = flattendItem.concat(
          this.flattenNavigationItems(navigationItem.children, currentOrder),
        );
      }

      return flattendItem;
    });
  }

  /**
   * A function that takes a flattened array of navigation items and returns a hierarchical array of navigation items.
   * It works by mapping each item to a record with the item's id as the key, and then iterating over the flattened array to build the hierarchical structure.
   * If an item has a parent (i.e. its order string contains a hyphen), it is added to its parent's children array. If it does not have a parent, it is added to the root navigation items array.
   * Finally, the function maps over the root navigation items array and returns a new array with the same structure, but without the 'id' and 'children' properties.
   * @param {FlatNavigationItemType[]} flatNavigationItems - A flattened array of navigation items.
   * @returns {NavigationItemType[]} - A hierarchical array of navigation items.
   */
  static unflattenNavigationItems(
    flatNavigationItems: FlatNavigationItemType[],
  ): NavigationItemType[] {
    const navigationItemMap: Record<string, NavigationItemType> = {};
    flatNavigationItems.forEach((item) => {
      navigationItemMap[item.id] = { ...item, children: [] };
    });

    const rootNavigationItems: NavigationItemType[] = [];

    flatNavigationItems.forEach((item) => {
      if (item.order.includes("-")) {
        const parentOrder = item.order.substring(
          0,
          item.order.lastIndexOf("-"),
        );
        const parentItem = navigationItemMap[parentOrder];
        if (parentItem) {
          navigationItemMap[parentItem.id].children!.push(
            navigationItemMap[item.id],
          );
        } else {
          rootNavigationItems.push(navigationItemMap[item.id]);
        }
      }
    });

    return rootNavigationItems.map((navigationItem) => {
      const { ...rest } = navigationItem;
      return rest;
    });
  }
}
