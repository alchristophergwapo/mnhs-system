import { memo } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Navigation from "../navigation/Navigation";
import { navigationConfig } from "@/src/configs/navigationConfig";
import Image from "next/image";
import Divider from "@mui/material/Divider";

const StyledContent = styled("div")(({theme}) => ({
  overscrollBehavior: "contain",
  overflowX: "hidden",
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 40px, 100% 10px",
  backgroundAttachment: "local, scroll",
  backgroundColor: theme.palette.background.default,
}));

function NavbarContent() {
  const navigation = navigationConfig;
  const theme = useTheme();
  console.log(theme)

  return (
    <>
      <StyledContent className="h-full flex flex-1 min-h-0 flex-col">
      <div className="p-4 py-5 mb-1">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
      </div>
      <Divider
        flexItem
        orientation="horizontal"
        sx={{
          borderColor: "gray",
        }}
      />
        <Navigation navigation={navigation} />
      </StyledContent>
    </>
  );
}

export default memo(NavbarContent);
