import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List, { ListProps } from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import NavigationItem, { NavigationItemProps } from "../NavigationItem";
import { useMemo, useState } from "react";
import Icon from "@mui/material/Icon";

type ListComponentProps = ListProps & {
  _itempadding: number;
};

// A styled root component. We use styled from @mui/material/styles and pass List as the base component
const RootComponent = styled(List)<ListComponentProps>(
  ({ theme, ...props }) => ({
    padding: 0,
    "& .nav-list-item": {
      paddingLeft: props._itempadding > 80 ? 80 : props._itempadding,
      margin: "0 0 4px 0"
    },
    borderRadius: "8px!important",
  }),
);

/**
 * A component that renders a navigation item of type "collapse".
 * It takes a navigation item as a prop and renders it as a button.
 * If the item has children, it renders them as a list.
 * The onItemClick function is called when an item is clicked, and it logs the item to the console.
 * @param {NavigationItemProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 * @example
 * const item = {
 *   id: "1",
 *   title: "Home",
 *   type: "collapse",
 *   children: [
 *     {
 *       id: "1.1",
 *       title: "Submenu 1",
 *       url: "/submenu1",
 *       type: "item",
 *     },
 *     {
 *       id: "1.2",
 *       title: "Submenu 2",
 *       url: "/submenu2",
 *       type: "item",
 *     },
 *   ],
 * };
 * const onItemClick = (item: NavigationItemType) => console.log(item.title);
 * <NavigationCollapseTypeButton item={item} onItemClick={onItemClick} />
 */
export default function NavigationCollapseTypeButton(
  props: NavigationItemProps,
) {
  const { item, nestedLevel = 0, onItemClick } = props;
  const [open, setOpen] = useState(false);
  const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;

  // Memoize the navigation items to prevent unnecessary re-renders
  const memoizedContent = useMemo(() => {
    let items = null;
    if (item.children) {
      items = (
        <Collapse in={open} className="pl-6">
          {item.children.map((_item) => (
            <NavigationItem
              key={_item.id}
              type={_item.type}
              item={_item}
              nestedLevel={nestedLevel + 1}
              onItemClick={onItemClick}
            />
          ))}
        </Collapse>
      );
    }
    return (
      <RootComponent className="w-full" _itempadding={itempadding}>
        <ListItemButton
          className="nav-list-item space-x-2"
          onClick={() => {
            setOpen(!open);
          }}
          sx={{ borderRadius: "8px" }}
        >
          {item.icon && (
            <Icon
              color="action"
              sx={{
                fontSize: "18px !important",
                marginTop: "-3px",
              }}
            >
              {item.icon}
            </Icon>
          )}
          <ListItemText primary={item.title} secondary={item.subtitle} />
          <IconButton
            disableRipple
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setOpen(!open);
            }}
            sx={{
              paddingY: 0,
            }}
          >
            <Icon>{open ? "keyboard_arrow_down" : "keyboard_arrow_up"}</Icon>
          </IconButton>
        </ListItemButton>
        {items}
      </RootComponent>
    );
  }, [open]);

  return memoizedContent;
}
