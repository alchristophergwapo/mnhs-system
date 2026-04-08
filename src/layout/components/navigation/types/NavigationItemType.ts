export type NavigationItemType = {
  id: string;
  title?: string;
  subtitle?: string;
  type: string;
  children: Array<NavigationItemType>;
  icon: string;
};

export type FlatNavigationItemType = Omit<
  NavigationItemType,
  "children" | "sx"
> & { children?: string[]; order: string };
