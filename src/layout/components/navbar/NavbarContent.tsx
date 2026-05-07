import { memo } from "react";
import { styled } from "@mui/material/styles";
import Navigation from "../navigation/Navigation";
import { adminNavigationConfig } from "@/src/configs/adminNavigationConfig";
import Image from "next/image";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";
import { useSession } from "next-auth/react";
import { studentNavigationConfig } from "@/src/configs/studentNavigationConfig";
import clsx from "clsx";

const StyledContent = styled("div")(({ theme }) => ({
  overscrollBehavior: "contain",
  overflowX: "hidden",
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 40px, 100% 10px",
  backgroundAttachment: "local, scroll",
  backgroundColor: theme.palette.primary.main,
}));

/**
 * A component that renders the content of the navbar.
 * It includes the logo, a divider, and a navigation menu.
 * The navigation menu is rendered using the Navigation component and the adminNavigationConfig object.
 * @returns {JSX.Element} - The JSX element for the component.
 */
function NavbarContent({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const {data: session} = useSession();
  const role = session?.user.role;
  const navigation = role === 'STUDENT' ? studentNavigationConfig: adminNavigationConfig;

  return (
    <StyledContent className="h-full flex flex-1 min-h-0 flex-col">
      <div className={clsx("flex flex-row justify-between py-3 pl-4 pr-1 mb-1", role === 'STUDENT' && 'hidden')}>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <IconButton onClick={onClose}>
          <ChevronLeft sx={{ color: "white!important" }} />
        </IconButton>
      </div>
      <Navigation navigation={navigation} />
    </StyledContent>
  );
}

export default memo(NavbarContent);
