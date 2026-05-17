import Button from "@components/ui/Button";
import Typography from "@mui/material/Typography";
import DashboardPaper from "../components/DashboardPaper";

/**
 * @component AssestSchoolNews
 * @description A React functional component that renders a card displaying
 * school news and articles. It includes a main title, a highlighted subtitle
 * for a specific news event, a secondary notification banner for campus safety,
 * and action buttons to view details or respond.
 * @returns {JSX.Element} The rendered school news component wrapped in a Paper element.
 */
function DashboardAssestSchoolNews() {
  return (
    <DashboardPaper title="Assest School News & Articles">
      <Typography variant="subtitle1">
        STEM Students Win National Science Fair Inaugurated
      </Typography>
      <div className="w-full flex gap-1 bg-[#70FFEA] dark:bg-teal-100 p-1 rounded-sm mt-2">
        <Typography className="ml-1 text-md font-medium text-black! dark:text-inherit">
          Campus Safety Update
        </Typography>
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <Button>view details</Button>
        <Button>respond now</Button>
      </div>
    </DashboardPaper>
  );
}

export default DashboardAssestSchoolNews;
