import { NavItem } from "./models";

export const updateNavItem = (
  setNavItems: (item: NavItem[]) => void,
  navItems: NavItem[],
  item: NavItem
) => {
  setNavItems(
    navItems.map((n) => ({
      ...n,
      yAxisPlacement:
        n.name === item.name ? item.yAxisPlacement : n.yAxisPlacement,
    }))
  );
};
