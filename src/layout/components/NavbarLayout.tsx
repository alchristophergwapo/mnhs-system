import NavbarContent from "./navbar/NavbarContent";

import { styled } from "@mui/material/styles";
const StyledNavbar = styled("div")(() => ({
  minWidth: "280px",
  width: "280px",
  maxWidth: "280px",
}));

export default function NavbarLayout() {
  return (
    <StyledNavbar className="h-screen flex-auto flex-col overflow-hidden">
      <NavbarContent />
    </StyledNavbar>
  );
}
