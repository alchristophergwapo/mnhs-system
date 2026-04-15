import NavbarContent from "./navbar/NavbarContent";

import { styled } from "@mui/material/styles";
const StyledNavbar = styled("div")(() => ({
  minWidth: "280px",
  width: "280px",
  maxWidth: "280px",
}));

/**
 * A layout component that renders the navbar.
 * It includes a container with a fixed width and height of 100vh.
 * The container is set to flex and overflow-hidden.
 * It renders the NavbarContent component inside the container.
 * @returns {JSX.Element} - The JSX element for the component.
 */
export default function NavbarLayout() {
  return (
    <StyledNavbar className="h-screen flex-auto flex-col overflow-hidden">
      <NavbarContent />
    </StyledNavbar>
  );
}
