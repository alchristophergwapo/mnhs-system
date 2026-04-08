import { NavigationItemType } from "./types/NavigationItemType"

export type NavigationItemProps = {
    type: string;
    item: NavigationItemType;
    onItemClick: (args: NavigationItemType) => void;
    nestedLevel?: number;
}

export const components: Record<string, React.FC<unknown>> = {};

export default function NavigationItem(props: NavigationItemProps) {
    const {type} = props;

    const C = components[type];

    return C ? <C {...(props as object)} />: null;
}