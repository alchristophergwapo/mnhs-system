import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import OverviewData from "./OverviewData";

export default function SchoolYearOverview() {
  return (
    <Paper className="w-full mt-8 p-4 flex flex-col z-10 gap-6 bg-white ">
      <h4 className=" text-xl font-semibold tracking-tight text-zinc-50 dark:text-black">
        School Year Overview
      </h4>
      <Divider flexItem orientation="horizontal" />
      <div className="w-full flex flex-row justify-between items-center px-6">
        <OverviewData value={80} title="Junior High" data="1280 total" />
        <OverviewData
          value={96}
          title="Senior High"
          data="180 total"
          color="cyan"
        />
        <OverviewData
          value={100}
          title="Transfer Students"
          data="20 total"
          color="magenta"
        />
        <OverviewData
          value={98}
          title="Teachers"
          data="180 total"
          color="lime"
        />
      </div>
    </Paper>
  );
}
