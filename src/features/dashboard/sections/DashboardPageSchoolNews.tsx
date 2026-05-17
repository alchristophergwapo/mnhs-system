import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import DashboardPaper from "../components/DashboardPaper";

/**
 * @component SchoolNewsAndEvents
 * @description A React functional component that renders a section displaying
 * the latest school news and articles. It uses a Material-UI Paper container
 * with a header and maps over a static array of news headlines, separating
 * them with dividers.
 * @returns {JSX.Element} The rendered school news and events component.
 */
function DashboardSchoolNewsAndEvents() {
  return (
    <DashboardPaper title="Latest School News & Articles">
      <div className="w-full mb-2" />
      {[
        "STEM Students Win National Science Fair",
        "Modern Science Labs Inaugurated",
        "Campus Safety Update",
      ].map((news, index) => (
        <div key={index} className="w-full flex gap-2 flex-col mb-2">
          <Typography variant="subtitle1">{news}</Typography>
          {index !== 2 && <Divider />}
        </div>
      ))}
    </DashboardPaper>
  );
}

export default DashboardSchoolNewsAndEvents;
