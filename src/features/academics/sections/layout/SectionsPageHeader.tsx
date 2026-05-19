import { amber, teal } from "@mui/material/colors";
import { PlusOne } from "@mui/icons-material";
import Button from "@components/ui/Button";

/**
 * Properties for the Headers component, which displays the header section of the Non-Advisory Teachers page.
 */
type HeadersProps = {
  onAddSection: () => void;
};

/**
 * Headers component for the Non-Advisory Teachers page.
 * @param props
 * @returns ReactNode
 */
function SectionsPageHeaders(props: HeadersProps) {
  //   const { total, parameters, isLoading = false, setParameters } = props;

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col text-white">
        <h1 className="text-2xl font-bold">Students</h1>
        {/* <div>{total} students currently enrolled</div> */}
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="contained"
          sx={{
            backgroundColor: amber[400],
            color: teal[900],
            "& .MuiSvgIcon-root": {
              color: "black!important",
              fontSize: "17px",
            },
          }}
          size="large"
          onClick={props.onAddSection}
          endIcon={<PlusOne fontSize="small" />}
        >
          add new section
        </Button>
      </div>
    </div>
  );
}

export default SectionsPageHeaders;
