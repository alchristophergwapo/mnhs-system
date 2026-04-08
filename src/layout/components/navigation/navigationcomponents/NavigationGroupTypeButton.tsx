import { alpha, styled } from "@mui/material/styles";
import { useMemo } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import NavigationItem, { NavigationItemProps } from "../NavigationItem";
import { ListItemButtonProps } from "@mui/material";

type ListItemButtonComponentProps = ListItemButtonProps & {
  _itempadding: number;
};

const RootComponent = styled(ListItem)<ListItemButtonComponentProps>(
  ({ theme, ...props }) => ({
    width: "100%",
    minHeight: 36,
    color: alpha(theme.palette.text.primary, 0.8),
    letterSpacing: "0.025em",
    paddingLeft: props._itempadding > 80 ? 80 : props._itempadding,
    paddingTop: 10,
    paddingBottom: 10,
  }),
);

export default function NavigationGroupTypeButton(props: NavigationItemProps) {
  const { item, nestedLevel = 0, onItemClick } = props;
  const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;
  console.log(nestedLevel);

  const memoizedContent = useMemo(() => {
    let items = null;
    if (item.children) {
      items = item.children.map((_item) => (
        <NavigationItem
          key={_item.id}
          type={_item.type}
          item={_item}
          nestedLevel={nestedLevel}
          onItemClick={onItemClick}
        />
      ));
    }
    return (
      <>
        <RootComponent
          _itempadding={itempadding}
          className="w-full flex flex-col text-start justify-center"
          onClick={() => onItemClick && onItemClick(item)}
        >
          <ListItemText
            primary={item?.title}
            secondary={item?.subtitle}
            className="w-full"
            sx={(theme) => ({
							margin: 0,
							'& > .MuiListItemText-primary': {
								fontSize: 12,
								color: 'secondary.main',
								fontWeight: 600,
								textTransform: 'uppercase',
								letterSpacing: '.05em',
								lineHeight: '20px',
							},
						})}
          />
        </RootComponent>
        {items}
      </>
    );
  }, [item, nestedLevel, onItemClick]);
  return memoizedContent;
}
