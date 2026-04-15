import { alpha, styled } from "@mui/material/styles";
import { useMemo } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import NavigationItem, { NavigationItemProps } from "../NavigationItem";
import { ListItemButtonProps } from "@mui/material";

type ListItemButtonComponentProps = ListItemButtonProps & {
  _itempadding: number;
};

// A styled root component. We use styled from @mui/material/styles and pass ListItem as the base component 
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

/**
 * A component that renders a navigation group type button.
 * It takes a navigation item as a prop and renders it as a button.
 * If the item has children, it renders them as a list.
 * The onItemClick function is called when an item is clicked, and it logs the item to the console.
 * @param {NavigationItemProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 */
export default function NavigationGroupTypeButton(props: NavigationItemProps) {
  const { item, nestedLevel = 0, onItemClick } = props;
  const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;

  // Memoize the navigation items
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
