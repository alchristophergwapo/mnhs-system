import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import NavigationItem, { components } from "./NavigationItem";
import { NavigationItemType } from "./types/NavigationItemType";
import NavigationItemTypeButton from "./navigationcomponents/NavigationItemType";
import NavigationGroupTypeButton from "./navigationcomponents/NavigationGroupTypeButton";
import NavigationCollapseTypeButton from "./navigationcomponents/NavigationCollapseTypeButton";
import { useMemo } from "react";

/**
 * Registers a component with the given name and component.
 * The component will be stored in the components object with the given name.
 * The component will be cast to React.FC<unknown> when stored.
 * @param {string} name - The name of the component.
 * @param {React.FC<T>} Component - The component to register.
 */
function registerComponent<T = unknown>(name: string, Component: React.FC<T>) {
  components[name] = Component as React.FC<unknown>;
}

registerComponent("item", NavigationItemTypeButton);
registerComponent("group", NavigationGroupTypeButton);
registerComponent("collapse", NavigationCollapseTypeButton);

type NavigationProps = {
  navigation?: NavigationItemType[];
};

const StyledList = styled(List)(() => ({
  padding: "8px 12px 0",
}));

/**
 * A component that renders a list of navigation items.
 * It takes a list of navigation items as a prop and renders them as a list.
 * Each item is rendered as a NavigationItem component.
 * The onItemClick function is called when an item is clicked, and it logs the item to the console.
 * @param {NavigationProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element for the component.
 * @example
 * <Navigation navigation={navigationConfig} />
 */
export default function Navigation(props: NavigationProps) {
  const { navigation } = props;

  return useMemo(() => {
    /**
     * Handles the click event on a navigation item.
     * Logs the clicked item to the console.
     * @param {NavigationItemType} item - The navigation item that was clicked.
     */
    function handleItemClick(item: NavigationItemType) {
    }

    return (
      <StyledList className="flex min-h-0 flex-col whitespace-nowrap px-3 pt-1 ">
        {navigation?.map((item) => (
          <NavigationItem
            key={item.id}
            type={item.type}
            item={item}
            onItemClick={handleItemClick}
          />
        ))}
      </StyledList>
    );
  }, [navigation]);
}
