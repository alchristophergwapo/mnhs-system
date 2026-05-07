import { styled } from "@mui/material/styles";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavigationItemProps } from "../NavigationItem";
import { useMemo } from "react";
import Icon from "@mui/material/Icon";
import NavigationLinkAdapter from "@/src/components/NavigationLinkAdapter";

type ListItemButtonStyleProps = ListItemButtonProps & {
  _itempadding: number;
};

/**
 * A styled component that renders a navigation item of type "item".
 */
const RootComponent = styled(ListItemButton)<ListItemButtonStyleProps>(
  ({ theme, ...props }) => ({
    margin: "0 0 4px 0",
    paddingLeft: `${props._itempadding > 80 ? 80 : props._itempadding}!important`,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: "8px",
    color: "white",
    "&.active": {
      color: "white",
      backgroundColor:
        theme.palette.mode === "light"
          ? "rgba(0, 0, 0, .05)!important"
          : "rgba(255, 255, 255, .1)!important",
      transition: "border-radius .15s cubic-bezier(0.4,0.0,0.2,1)",
      "& > .nav-list-item-icon": {
        color: "inherit",
      },
    },
  }),
);

/**
 * A component that renders a navigation item of type "item".
 * It takes the item, nestedLevel, and onItemClick props, and passes them to the RootComponent.
 * The RootComponent is a styled ListItemButton that renders a navigation item with an icon and a title.
 * The component also handles the onClick event, by calling the onItemClick function if it is provided.
 * @param {NavigationItemProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 * @example
 * const item = {
 *   id: "1",
 *   title: "Home",
 *   url: "/",
 *   type: "item",
 *   icon: <HomeIcon />,
 * };
 * const onItemClick = (item: NavigationItemType) => console.log(item.title);
 * <NavigationItemTypeButton item={item} onItemClick={onItemClick} />
 */
export default function NavigationItemTypeButton(props: NavigationItemProps) {
  const { item, nestedLevel = 0, onItemClick } = props;
  const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;
  const component = item.url ? NavigationLinkAdapter : "li";

  // Memoize the item props
  const itemProps = useMemo(
    () => ({
      ...(component !== "li" && {
        disabled: item.disabled,
        to: item.url || "",
        end: item.end,
        role: "button",
        exact: item?.exact,
      }),
    }),
    [item, component],
  );

  return useMemo(
    () => (
      <RootComponent
        component={component}
        _itempadding={itempadding}
        className="nav-list-item flex flex-row space-x-2"
        onClick={() => (onItemClick ? onItemClick(item) : null)}
        {...itemProps}
      >
        {item.icon && (
          <Icon
            sx={{
              fontSize: "18px !important",
              marginTop: "-3px",
            }}
            className="nav-list-item-icon"
          >
            {item.icon}
          </Icon>
        )}
        <ListItemText primary={item.title} sx={{ margin: "0!important", paddingLeft: "6px" }} />
      </RootComponent>
    ),
    [item, itempadding],
  );
}
