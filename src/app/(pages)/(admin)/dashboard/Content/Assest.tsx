import Button from "@/src/components/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function AssestSchoolNews() {
  return (
    <Paper className="w-full h-full p-4">
      <Typography variant="h6" className=" tracking-tight dark:text-zinc-50 text-black">
        Assest School News & Articles
      </Typography>
      <Typography variant="subtitle1">STEM Students Win National Science Fair Inaugurated</Typography>
      <div className="w-full flex gap-1 bg-teal-100 p-1 rounded-sm mt-2">
        <Typography className="ml-1 text-md font-medium">
          Campus Safety Update
        </Typography>
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <Button>view details</Button>
        <Button>respond now</Button>
      </div>
    </Paper>
  );
}
