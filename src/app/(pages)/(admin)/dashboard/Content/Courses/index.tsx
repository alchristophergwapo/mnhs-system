import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Tracks from "./Tracks";
import Strands from "./Strands";
import Typography from "@mui/material/Typography";

/**
 * Component for displaying the tracks and strands for senior high school students.
 * It consists of a heading, a divider, and two sub-components: Tracks and Strands.
 * The Tracks component displays a list of tracks available for senior high school students.
 * The Strands component displays a list of strands available for senior high school students.
 *
 * @returns {JSX.Element} - The JSX element for the component.
 */
export default function Courses() {
  return (
    <Paper className="w-full h-full flex flex-col gap-1 p-4">
      <Typography variant="h6"  className=" text-xl font-semibold tracking-tight dark:text-zinc-50 text-black">
        Senior High Tracks and Strands
      </Typography>
      <div className="w-full grid grid-cols-2 justify-evenly gap-2">
        <div className="col-span-1 flex flex-row">
          <Strands />
          <Divider
            flexItem
            orientation="vertical"
            className="border-gray-400"
          />
        </div>
        <div className="col-span-1">
          <Tracks />
        </div>
      </div>
    </Paper>
  );
}
