import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List, { ListProps } from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import NavigationItem, { NavigationItemProps } from "../NavigationItem";
import { useMemo, useState } from "react";
import Icon from "@/src/components/Icon";

type ListComponentProps = ListProps & {
  _itempadding: number;
};

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

export default function NavigationCollapseTypeButton(
  props: NavigationItemProps,
) {
  const { item, nestedLevel = 0, onItemClick } = props;
  const [open, setOpen] = useState(false);
  const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;

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
                fontSize: "16px !important",
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
