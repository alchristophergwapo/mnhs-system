import NavbarContent from "./navbar/NavbarContent";
import Drawer from "@mui/material/Drawer";

import { styled, Theme, CSSObject, useTheme } from "@mui/material/styles";

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

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
const StyledNavbar = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
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
export default function NavbarLayout({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  
  return (
    <StyledNavbar
      className="h-full flex-auto flex-col overflow-hidden"
      variant="permanent"
      open={open}
      elevation={10}
      
    >
      <NavbarContent open={open} onClose={onClose} />
    </StyledNavbar>
  );
}
