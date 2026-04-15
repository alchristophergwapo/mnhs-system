import { NavigationItemType } from "./types/NavigationItemType"

export type NavigationItemProps = {
    type: string;
    item: NavigationItemType;
    onItemClick: (args: NavigationItemType) => void;
    nestedLevel?: number;
}

export const components: Record<string, React.FC<unknown>> = {};

/**
 * A component that renders a navigation item based on the type.
 * It takes the type and item props, and uses the type to determine the component to render.
 * If the type is not found in the components object, it will render null.
 * @param {NavigationItemProps} props - The props for the component.
 * @returns {JSX.Element | null} - The JSX element for the component, or null if the type is not found.
 */
export default function NavigationItem(props: NavigationItemProps) {
    const {type} = props;

    const C = components[type];

    return C ? <C {...(props as object)} />: null;
}