import { styled } from "@mui/material/styles";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavigationItemProps } from "../NavigationItem";
import { useMemo } from "react";
import Icon from "@/src/components/Icon";

type ListItemButtonStyleProps = ListItemButtonProps & {
  _itempadding: number;
};

const RootComponent = styled(ListItemButton)<ListItemButtonStyleProps>(
  ({ theme, ...props }) => ({
    margin: "0 0 4px 0",
    paddingLeft: `${props._itempadding > 80 ? 80 : props._itempadding}!important`,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: "8px",
  }),
);

export default function NavigationItemTypeButton(props: NavigationItemProps) {
  const { item, nestedLevel = 0, onItemClick } = props;
  const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;
  console.log(nestedLevel > 0, item.active);

  return useMemo(
    () => (
      <RootComponent _itempadding={itempadding} className="nav-list-item space-x-2">
        {item.icon && <Icon color="action" sx={{
            fontSize: "16px !important",
            marginTop: "-3px",
            
        }}>{item.icon}</Icon>}
        <ListItemText primary={item.title} sx={{margin: "0!important"}} />
      </RootComponent>
    ),
    [item, itempadding],
  );
}
