import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import NavigationItem, { components } from "./NavigationItem";
import { NavigationItemType } from "./types/NavigationItemType";
import NavigationItemTypeButton from "./navigationcomponents/NavigationItemType";
import NavigationGroupTypeButton from "./navigationcomponents/NavigationGroupTypeButton";
import NavigationCollapseTypeButton from "./navigationcomponents/NavigationCollapseTypeButton";
import { useMemo } from "react";

function registerComponent<T = unknown>(name: string, Component: React.FC<T>) {
  components[name] = Component as React.FC<unknown>;
}

registerComponent("item", NavigationItemTypeButton);
registerComponent("group", NavigationGroupTypeButton);
registerComponent("collapse", NavigationCollapseTypeButton);

type NavigationProps = {
  navigation?: NavigationItemType[];
  active: boolean;
};

const StyledList = styled(List)(() => ({
  padding: "8px 12px 0"
}));

export default function Navigation(props: NavigationProps) {
  const { navigation, active } = props;

  return useMemo(() => {
    function handleItemClick() {

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
