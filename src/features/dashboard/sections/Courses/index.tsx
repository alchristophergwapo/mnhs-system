import Divider from "@mui/material/Divider";
import StrandsList from "./components/StrandsList";
import TracksList from "./components/TracksList";
import DashboardPaper from "@features/dashboard/components/DashboardPaper";

/**
 * Component for displaying the tracks and strands for senior high school students.
 * It consists of a heading, a divider, and two sub-components: TracksList and StrandsList.
 * The TracksList component displays a list of tracks available for senior high school students.
 * The StrandsList component displays a list of strands available for senior high school students.
 *
 * @returns {JSX.Element} - The JSX element for the component.
 */
function Courses() {
  return (
    <DashboardPaper
      className="w-full h-full flex flex-col gap-1 p-4"
      title="Senior High Tracks and Strands"
    >
      <div className="w-full grid grid-cols-2 justify-evenly gap-2">
        <div className="col-span-1 flex flex-row">
          <StrandsList />
          <Divider
            flexItem
            orientation="vertical"
            className="border-gray-400"
          />
        </div>
        <div className="col-span-1">
          <TracksList />
        </div>
      </div>
    </DashboardPaper>
  );
}

export default Courses;
