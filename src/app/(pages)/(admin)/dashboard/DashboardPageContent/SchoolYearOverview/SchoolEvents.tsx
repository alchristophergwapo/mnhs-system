import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@components/Button";

function SchoolEvents() {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[#006666] rounded-t-sm p-2 px-4">
        <Typography className="mb-2" variant="h6" sx={{ color: "white" }}>
        Upcoming School Events
      </Typography>
      </div>
      {[1, 2].map((item) => (
        <div key={item} className="flex flex-col px-4 gap-2">
          <div className="flex flex-row justify-between">
            <div>
              <Typography variant="subtitle1">Annual Sports Meet</Typography>
              <Typography variant="caption">
                May 25-27 | 8:00 AM - 4:00 PM
              </Typography>
            </div>
            <Button size="small" sx={{ height: 24 }}>
              View Details
            </Button>
          </div>
          <Typography variant="caption">
            Campus Grounds | Basketball, Ping-pong, Volleyball, Tennis
          </Typography>
          <Divider flexItem orientation="horizontal" />
        </div>
      ))}
    </div>
  );
}

export default SchoolEvents;
