export type NavigationItemType = {
  id: string;
  title?: string;
  subtitle?: string;
  type: string;
  children: Array<NavigationItemType>;
  icon: string;
  url?: string;
  disabled?: boolean;
  end?: boolean;
  exact?: boolean;
};

export type FlatNavigationItemType = Omit<
  NavigationItemType,
  "children" | "sx"
> & { children?: string[]; order: string };
