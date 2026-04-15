import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Tracks from "./Tracks";
import Strands from "./Strands";

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
    <Paper className="w-full h-full flex flex-col gap-4 p-4">
      <h4 className=" text-xl font-semibold tracking-tight text-zinc-50 dark:text-black">
        Senior High Tracks and Strands
      </h4>
      <Divider flexItem orientation="horizontal" className="border-gray-400" />
      <Tracks />
      <Strands />
    </Paper>
  );
}
