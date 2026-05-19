import CardActions from "@mui/material/CardActions";
import { teal } from "@mui/material/colors";
import Button from "@components/ui/Button";
import Icon from "@mui/material/Icon";
import { Edit, ListOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

type SectionCardActionsProps = {
  onEdit: () => void;
};

const StyledButton = styled(Button)(({ theme }) => ({
  ":hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? `${teal[500]}!important`
        : `${teal[100]}!important`,
    color: theme.palette.mode === "dark" ? "white!important" : "inherit",
    "& .MuiSvgIcon-root": { color: "#006666!important" },
  },
  "& .MuiSvgIcon-root": {
    color:
      theme.palette.mode === "dark"
        ? `${theme.palette.primary.main}!important`
        : "#006666!important",
  },
}));

/**
 * A React functional component that renders the action buttons for a section card.
 * It provides options to view a list, edit the section, and assign an adviser.
 *
 * @param {SectionCardActionsProps} props - The props for the component.
 * @param {() => void} props.onEdit - The callback function triggered when the edit button is clicked.
 * @returns {JSX.Element} The rendered card actions component.
 */
function SectionCardActions({ onEdit }: SectionCardActionsProps) {
  return (
    <CardActions
      sx={{
        paddingX: 0,
      }}
      className="flex flex-row justify-end"
    >
      <StyledButton variant="text" startIcon={<ListOutlined />}>
        view list
      </StyledButton>
      <StyledButton variant="text" startIcon={<Edit />} onClick={onEdit}>
        edit
      </StyledButton>
      <Button variant="text" startIcon={<Icon>how_to_reg</Icon>}>
        assign adviser
      </Button>
    </CardActions>
  );
}

export default SectionCardActions;
