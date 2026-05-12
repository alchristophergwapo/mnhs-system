import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function SchoolNewsAndEvents() {
  return (
    <Paper className="w-full p-4">
      <Typography
        variant="h6"
        className=" text-xl font-semibold tracking-tight dark:text-zinc-50 text-black "
      >
        Latest School News & Articles
      </Typography>
      <div className="w-full mb-2" />
      {[
        "STEM Students Win National Science Fair",
        "Modern Science Labs Inaugurated",
        "Campus Safety Update",
      ].map((news, index) => (
        <div
          key={index}
          className="w-full flex gap-2 flex-col mb-2"
        >
          <Typography variant="subtitle1">{news}</Typography>
          {index !== 2 && <Divider />}
        </div>
      ))}
    </Paper>
  );
}

export default SchoolNewsAndEvents;
