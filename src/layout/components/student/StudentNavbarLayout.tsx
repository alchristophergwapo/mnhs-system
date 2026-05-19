import Drawer from "@mui/material/Drawer";

import { styled, Theme, CSSObject } from "@mui/material/styles";
import NavbarContent from "../navbar/NavbarContent";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 280;

/**
 * Generates the CSS styles for a drawer in its opened state.
 * Sets the drawer to its full width with a smooth transition animation
 * and hides horizontal overflow.
 *
 * @param {Theme} theme - The MUI theme object used to access transition settings.
 * @returns {CSSObject} The CSS properties to apply when the drawer is opened.
 */
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

/**
 * Generates the CSS styles for a drawer component in its closed state.
 * Applies a width transition, hides horizontal overflow, and sets a responsive width
 * based on the theme's spacing and breakpoints.
 *
 * @param {Theme} theme - The MUI theme object used to access spacing, transitions, and breakpoints.
 * @returns {CSSObject} The CSS properties for the closed drawer state.
 */
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

// Define the styled component for the drawer
const StyledNavbar = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

/**
 * A layout component that renders the navbar.
 * It includes a container with a fixed width and height of 100vh.
 * The container is set to flex and overflow-hidden.
 * It renders the NavbarContent component inside the container.
 * @returns {JSX.Element} - The JSX element for the component.
 */
export default function StudentNavbarLayout(props: {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}) {
  const { open, onClose } = props;

  return (
    <StyledNavbar
      variant="permanent"
      open={open}
    >
      <Toolbar />
      <NavbarContent open={open} onClose={onClose} />
    </StyledNavbar>
  );
}
